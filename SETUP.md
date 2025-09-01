# Development Setup Guide

This guide will walk you through setting up the wflip development environment using Docker.

## Quick Start

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd wflip
   pnpm install
   ```

2. **Start Services**
   ```bash
   # Start PostgreSQL and Redis
   pnpm docker:dev
   
   # Copy environment configuration
   cp apps/web/.env.example apps/web/.env.local
   ```

3. **Start Development**
   ```bash
   pnpm dev
   ```

4. **Verify Setup**
   - App: http://localhost:3000
   - Health Check: http://localhost:3000/api/health
   - PostgreSQL: localhost:5432
   - Redis: localhost:6379

## Services

### PostgreSQL
- **Port**: 5432
- **Database**: wflip
- **User**: wflip
- **Password**: wflipdev123

### Redis
- **Port**: 6379
- **Connection**: Standard Redis protocol

### Upstash-Compatible Redis HTTP
- **Port**: 8079
- **Token**: dev_token_wflip
- **Endpoint**: http://localhost:8079

## Adding Components

### shadcn/ui Components
```bash
# Add a component (requires internet access)
pnpm dlx shadcn@latest add button -c apps/web
```

### Custom Components
```bash
# Shared components (used across apps)
touch packages/ui/src/components/my-component.tsx

# App-specific components
touch apps/web/components/feature-component.tsx
```

## Useful Commands

```bash
# Docker management
pnpm docker:dev     # Start development services
pnpm docker:down    # Stop services
pnpm docker:logs    # View logs
pnpm docker:reset   # Reset database

# Development
pnpm dev           # Start development server
pnpm build         # Build all packages
pnpm lint          # Run linting

# Database access
docker compose exec db psql -U wflip -d wflip

# Redis access
docker compose exec redis redis-cli
```

## Troubleshooting

- **Port conflicts**: Check if ports 3000, 5432, 6379, 8079 are available
- **Database issues**: Run `pnpm docker:reset` to reset the database
- **Build issues**: Clear caches with `rm -rf node_modules` and `pnpm install`