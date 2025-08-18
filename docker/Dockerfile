# ─────────────────────────────────────────────
# Stage 1: Build Frontend with Vite
# ─────────────────────────────────────────────
FROM node:18 AS frontend-builder

WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# ─────────────────────────────────────────────
# Stage 2: Build Backend
# ─────────────────────────────────────────────
FROM node:18 AS backend-builder

WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install
COPY backend/ ./

# ─────────────────────────────────────────────
# Stage 3: Final Image with Nginx + Node
# ─────────────────────────────────────────────
FROM nginx:stable-alpine AS final

# Copy frontend build to Nginx
COPY --from=frontend-builder /app/frontend/dist /usr/share/nginx/html

# Copy custom Nginx config
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# Copy backend files
COPY --from=backend-builder /app/backend /app/backend

# Install Node.js runtime for backend
RUN apk add --no-cache nodejs npm

# Expose ports for Railway
EXPOSE 80
EXPOSE 3000

# Start backend and Nginx
CMD ["sh", "-c", "node /app/backend/server.js & nginx -g 'daemon off;'"]
