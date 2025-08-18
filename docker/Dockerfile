# ─────────────────────────────────────────────
# Stage 1: Build Frontend with Vite
# ─────────────────────────────────────────────
FROM node:18 AS frontend-builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build

# ─────────────────────────────────────────────
# Stage 2: Final Image with Nginx + Node
# ─────────────────────────────────────────────
FROM nginx:stable-alpine AS final

# Copy frontend build to Nginx
COPY --from=frontend-builder /app/dist /usr/share/nginx/html

# Optional: custom Nginx config
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy backend files
COPY . /app

# Install Node.js runtime
RUN apk add --no-cache nodejs npm

# Expose ports
EXPOSE 80
EXPOSE 3000

# Start backend and Nginx
CMD ["sh", "-c", "node /app/server.js & nginx -g 'daemon off;'"]
