import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare, Mail, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const schema = z.object({
  email: z.string().trim().email("Please enter a valid email").max(255),
  name: z.string().trim().max(150).optional(),
  title: z.string().trim().max(150).optional(),
  organization: z.string().trim().max(200).optional(),
});

const NewsletterSignup = () => {
  const { toast } = useToast();
  const [data, setData] = useState({ email: "", name: "", title: "", organization: "" });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      toast({
        title: "Check your input",
        description: parsed.error.issues[0]?.message ?? "Invalid input",
        variant: "destructive",
      });
      return;
    }
    setSubmitting(true);
    try {
      const { data: res, error } = await supabase.functions.invoke("subscribe-newsletter", {
        body: parsed.data,
      });
      if (error) throw error;
      setSuccess(true);
      toast({
        title: res?.alreadySubscribed ? "You're already on the list" : "Almost there!",
        description: res?.alreadySubscribed
          ? "This email is already subscribed to Neighbor 911 News."
          : "Check your inbox for a confirmation link to complete your subscription.",
      });
      setData({ email: "", name: "", title: "", organization: "" });
    } catch (err) {
      console.error(err);
      toast({
        title: "Subscription failed",
        description: "Something went wrong. Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Alert className="mb-12 max-w-4xl mx-auto border-primary/20 bg-primary/5">
      <MessageSquare className="h-5 w-5 text-primary" />
      <AlertTitle className="text-xl font-semibold mb-2">Join Our Community!</AlertTitle>
      <AlertDescription className="text-base space-y-4">
        <p>
          Subscribe to <strong>Neighbor 911 News</strong> for project updates, launch
          announcements, and ways to get involved. Roughly monthly, no spam.
        </p>

        {success ? (
          <div className="flex items-start gap-3 rounded-md border border-primary/30 bg-background p-4">
            <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="font-medium">Thanks! Please check your inbox.</p>
              <p className="text-sm text-muted-foreground">
                We sent you a confirmation link to complete your subscription.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1">
                <Label htmlFor="nl-email">Email *</Label>
                <Input
                  id="nl-email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  className="bg-background"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="nl-name">Name</Label>
                <Input
                  id="nl-name"
                  placeholder="Your name (optional)"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  className="bg-background"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="nl-title">Title</Label>
                <Input
                  id="nl-title"
                  placeholder="e.g. Volunteer Coordinator (optional)"
                  value={data.title}
                  onChange={(e) => setData({ ...data, title: e.target.value })}
                  className="bg-background"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="nl-org">Organization</Label>
                <Input
                  id="nl-org"
                  placeholder="e.g. Lifesaver Labs (optional)"
                  value={data.organization}
                  onChange={(e) => setData({ ...data, organization: e.target.value })}
                  className="bg-background"
                />
              </div>
            </div>
            <Button type="submit" disabled={submitting} className="gap-2">
              <Mail className="h-4 w-4" />
              {submitting ? "Subscribing..." : "Subscribe to Neighbor 911 News"}
            </Button>
            <p className="text-xs text-muted-foreground">
              A confirmation link will be emailed to you to complete your subscription.
            </p>
          </form>
        )}
      </AlertDescription>
    </Alert>
  );
};

export default NewsletterSignup;
