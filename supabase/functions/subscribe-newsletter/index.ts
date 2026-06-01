import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { z } from 'npm:zod@3.23.8';

const LISTMONK_BASE = 'https://lists.neighbor911.org';
const LIST_UUID = 'b1da29ee-306e-4725-97b2-66371e9152a5';

const BodySchema = z.object({
  email: z.string().trim().email().max(255),
  name: z.string().trim().max(150).optional().default(''),
  title: z.string().trim().max(150).optional().default(''),
  organization: z.string().trim().max(200).optional().default(''),
});

function authHeader() {
  const user = Deno.env.get('LISTMONK_API_USER') ?? '';
  const token = Deno.env.get('LISTMONK_API_TOKEN') ?? '';
  // Listmonk supports `Authorization: token user:token` for API users
  return `token ${user}:${token}`;
}

async function resolveListId(): Promise<number> {
  const res = await fetch(`${LISTMONK_BASE}/api/lists?per_page=all`, {
    headers: { Authorization: authHeader() },
  });
  if (!res.ok) {
    throw new Error(`Failed to load lists: ${res.status} ${await res.text()}`);
  }
  const json = await res.json();
  const results = json?.data?.results ?? [];
  const match = results.find((l: { uuid: string }) => l.uuid === LIST_UUID);
  if (!match) throw new Error('Newsletter list not found in Listmonk');
  return match.id as number;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const parsed = BodySchema.safeParse(await req.json());
    if (!parsed.success) {
      return new Response(
        JSON.stringify({ error: parsed.error.flatten().fieldErrors }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }
    const { email, name, title, organization } = parsed.data;

    const listId = await resolveListId();

    const attribs: Record<string, string> = {};
    if (title) attribs.title = title;
    if (organization) attribs.organization = organization;

    const body = {
      email,
      name: name || email.split('@')[0],
      status: 'enabled',
      lists: [listId],
      preconfirm_subscriptions: false, // triggers double opt-in if list requires it
      attribs,
    };

    const res = await fetch(`${LISTMONK_BASE}/api/subscribers`, {
      method: 'POST',
      headers: {
        Authorization: authHeader(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const text = await res.text();

    // 409 = subscriber already exists; treat as success and try to add to list via PUT
    if (res.status === 409) {
      return new Response(
        JSON.stringify({ ok: true, alreadySubscribed: true }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    if (!res.ok) {
      console.error('Listmonk error', res.status, text);
      return new Response(
        JSON.stringify({ error: 'Subscription failed', detail: text }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('subscribe-newsletter error', err);
    return new Response(
      JSON.stringify({ error: (err as Error).message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  }
});
