# Neighbor 911 Deployment & Technical Notes

## Table of Contents
- [Cloud Functions](#cloud-functions)
- [Cloud Run](#cloud-run)
- [DNS & Domain Setup](#dns--domain-setup)
- [Environment Variables](#environment-variables)
- [Common Issues](#common-issues)

## Cloud Functions

### Gen2 vs Gen1 Architecture
- **Gen2**: Runs as Cloud Run services, requires PORT handling, more scalable
- **Gen1**: Traditional serverless functions, simpler deployment

### Gen2 Requirements
1. **PORT Environment Variable**: Must listen on `process.env.PORT || 8080`
2. **HTTP Server**: Explicitly start server with Functions Framework
3. **Runtime**: Use `nodejs20` for latest features
4. **Entry Point**: Specify function name in `--entry-point`

### Deployment Commands
```bash
# Gen2 Cloud Function (recommended)
gcloud functions deploy submitInterest \
  --gen2 \
  --runtime=nodejs20 \
  --source=. \
  --entry-point=submitInterest \
  --trigger-http \
  --allow-unauthenticated \
  --region=us-central1 \
  --set-env-vars="KEY=value"

# Gen1 Cloud Function (legacy)
gcloud functions deploy submitInterest \
  --runtime=nodejs20 \
  --trigger-http \
  --allow-unauthenticated \
  --region=us-central1
```

### Function Structure for Gen2
```javascript
const functions = require('@google-cloud/functions-framework');

functions.http('functionName', (req, res) => {
  // Function logic
});
```

### CRITICAL: Gen2 PORT Issue Solution
Gen2 functions require explicit PORT handling. The Functions Framework must be properly configured:

1. **package.json** must have start script:
```json
"scripts": {
  "start": "functions-framework --target=submitInterest"
}
```

2. **Function must be exported** without functions.http wrapper for Gen2:
```javascript
exports.submitInterest = async (req, res) => {
  // Function logic
};
```

## Cloud Run

### IMPORTANT: Standardized Naming Convention
**ALWAYS use these names for consistency:**
- **Docker Image Name**: `neighbor911us-website`
- **Cloud Run Service Name**: `neighbor911us-website`
- **Artifact Registry Repository**: `neighbor911` (existing)

### Container Requirements
1. **PORT Binding**: Container must listen on PORT environment variable
2. **Health Checks**: Must respond to HTTP requests within timeout
3. **Platform**: Use `--platform linux/amd64` for compatibility

### Deployment Process
```bash
# STANDARDIZED BUILD COMMAND - Always use these exact names
docker build --platform linux/amd64 \
  -t us-central1-docker.pkg.dev/neighbor911usa-landing-page/neighbor911/neighbor911us-website:latest \
  -t us-central1-docker.pkg.dev/neighbor911usa-landing-page/neighbor911/neighbor911us-website:$(date +%Y%m%d-%H%M%S) .

# Push to Artifact Registry
docker push us-central1-docker.pkg.dev/neighbor911usa-landing-page/neighbor911/neighbor911us-website:latest

# STANDARDIZED DEPLOY COMMAND - Always use neighbor911us-website as service name
gcloud run deploy neighbor911us-website \
  --image=us-central1-docker.pkg.dev/neighbor911usa-landing-page/neighbor911/neighbor911us-website:latest \
  --region=us-central1 \
  --allow-unauthenticated \
  --port=8080 \
  --max-instances=100
```

### Domain Mapping
```bash
# Create domain mapping - Always use neighbor911us-website service
gcloud beta run domain-mappings create \
  --service=neighbor911us-website \
  --domain=www.neighbor911.us \
  --region=us-central1

# Delete domain mapping (if needed for updates)
gcloud beta run domain-mappings delete \
  --domain=www.neighbor911.us \
  --region=us-central1
```

## DNS & Domain Setup

### Cloudflare Configuration
1. **Root Domain Redirect**: A record to dummy IP + Page Rule redirect
2. **WWW Subdomain**: CNAME to `ghs.googlehosted.com`
3. **Proxy Settings**: Gray cloud (DNS only) for Google Cloud SSL validation

### SSL Certificate Provisioning
- Requires CNAME record visible to Google Cloud
- Turn OFF Cloudflare proxy (gray cloud) during initial setup
- Certificate provisioning takes 15-60 minutes
- Check status with domain mapping describe command

## Environment Variables

### Current Configuration
- **RESEND_API_KEY**: Email service API key
- **FROM_EMAIL**: "Neighbor 911 <noreply@neighbor911.us>"
- **TO_EMAIL**: "team@neighbor911.us"

### Setting Variables
```bash
# Cloud Functions
--set-env-vars="KEY1=value1,KEY2=value2"

# Cloud Run
--set-env-vars="KEY1=value1,KEY2=value2"
```

## Common Issues

### Cloud Functions Gen2 Port Issues
- **Error**: "Container failed to start and listen on the port"
- **Cause**: Function not listening on PORT environment variable
- **Solution**: Ensure Functions Framework is properly configured

### SSL Certificate Failures
- **Error**: "Certificate issuance pending"
- **Cause**: DNS not properly configured or proxied through Cloudflare
- **Solution**: Use CNAME to ghs.googlehosted.com with gray cloud (DNS only)

### Docker Platform Issues
- **Error**: "exec format error"
- **Cause**: ARM64 local build deployed to x86_64 Cloud Run
- **Solution**: Use `--platform linux/amd64` flag

### Organization Policy Restrictions
- **Error**: "allUsers not allowed"
- **Cause**: Organization policy blocks public access
- **Solution**: Create project-level policy override

---

*Last updated: November 16, 2024*
*Next sections to add: GitHub Actions CI/CD, Monitoring & Logging, Security Best Practices*