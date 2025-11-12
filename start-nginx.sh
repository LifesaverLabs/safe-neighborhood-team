#!/bin/bash
set -e

# Set default port if not provided
export PORT=${PORT:-8080}

# Generate nginx config from template with environment variable substitution
envsubst '${PORT}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

# Remove the template file
rm -f /etc/nginx/conf.d/default.conf.template

# Start nginx
echo "Starting nginx on port $PORT"
nginx -g "daemon off;"