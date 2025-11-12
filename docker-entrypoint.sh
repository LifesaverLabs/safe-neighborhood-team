#!/bin/sh
set -e

# Set default port if not provided
export PORT=${PORT:-8080}

echo "Starting nginx on port $PORT"

# Generate nginx config from template with environment variable substitution
envsubst '${PORT}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

# Remove the template file
rm -f /etc/nginx/conf.d/default.conf.template

# Execute the original nginx entrypoint
exec nginx -g "daemon off;"