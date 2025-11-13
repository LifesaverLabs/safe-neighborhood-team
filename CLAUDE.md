# Claude Code Instructions

## ⚠️ MANDATORY: Read PROMPT.md First

**Before performing ANY operation on this project, Claude MUST:**

1. **Read PROMPT.md** - Contains critical deployment notes, common issues, and technical requirements
2. **Review the specific section** relevant to the task at hand
3. **Follow established patterns** documented in PROMPT.md to avoid repeating known issues

## Project Context

This is the **Neighbor 911™** open source community emergency response platform:
- **Repository**: https://github.com/LifesaverLabs/safe-neighborhood-team
- **Live Site**: https://www.neighbor911.us
- **Organization**: Lifesaver Labs Public Benefit Corporation
- **License**: MIT (code) + Trademark protected (Neighbor 911™ brand)

## Critical Files to Understand

1. **PROMPT.md** - Technical deployment notes and troubleshooting
2. **README.md** - Project overview and setup instructions  
3. **CONTRIBUTING.md** - Open source contribution guidelines
4. **functions/** - Cloud Functions backend with email integration
5. **src/components/GetInvolved.tsx** - Main contact form component

## Technology Stack

- **Frontend**: React 18, TypeScript, Vite, shadcn/ui, Tailwind CSS
- **Backend**: Google Cloud Functions (Gen2), Resend API for emails
- **Deployment**: Google Cloud Run, Docker containers
- **DNS**: Cloudflare with custom domain setup

## Common Operations

### Development
```bash
npm run dev          # Start local development server
npm run build        # Build for production
npm run lint         # Code linting
```

### Deployment
```bash
# Functions (see PROMPT.md for current issues)
cd functions && gcloud functions deploy submitInterest --gen2 --runtime=nodejs20

# Cloud Run (see PROMPT.md for docker setup)
docker build --platform linux/amd64 -t IMAGE .
gcloud run deploy --image=IMAGE
```

## Environment Variables

- **RESEND_API_KEY**: Email service API key
- **FROM_EMAIL**: "Neighbor 911 <noreply@neighbor911.us>"  
- **TO_EMAIL**: "team@neighbor911.us"

## Key Project Goals

1. **Open Source Community Building** - Welcoming contributors across all skill levels
2. **Emergency Response Technology** - Connecting neighbors during crises
3. **Public Benefit** - Serving community safety needs over profit
4. **Transparency** - Open development process and decision making

## Current Status

- ✅ Basic website and form functionality
- ✅ Docker containerization for Cloud Run
- 🔄 Cloud Functions Gen2 deployment (see PROMPT.md for current PORT issues)
- ⏳ SSL certificate provisioning for custom domain
- 📋 Open source launch preparation in progress

---

**Remember: Always check PROMPT.md before making changes to avoid known pitfalls!**