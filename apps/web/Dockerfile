FROM node:20-alpine AS base

# Install pnpm
RUN npm install -g pnpm

# Install dependencies and build the application
FROM base AS builder

WORKDIR /app

# Copy root package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./

# Copy package.json files from all packages
COPY apps/web/package.json apps/web/package.json
COPY packages/*/package.json packages/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY apps/web/ apps/web/
COPY packages/ packages/

# Set environment variables for build
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
# Set placeholder values for build-time validation
ENV DATABASE_URL="postgresql://placeholder:placeholder@localhost:5432/placeholder"
ENV UPSTASH_REDIS_REST_URL="http://localhost:8079"
ENV UPSTASH_REDIS_REST_TOKEN="placeholder"
ENV NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Build the application
WORKDIR /app/apps/web
RUN pnpm build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public

# Copy the standalone build
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static

RUN chown nextjs:nodejs apps

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "apps/web/server.js"]