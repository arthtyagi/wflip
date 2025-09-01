# wflip

A modern full-stack starter template with Next.js, shadcn/ui, PostgreSQL, and Redis.

## Quick Start

```bash
# Clone and setup
git clone <repository-url>
cd wflip
pnpm install

# Start services and development server
pnpm start
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) - you're ready to build! 🚀

## What's Included

- **Next.js 15** with App Router and TypeScript
- **shadcn/ui** components and Tailwind CSS
- **PostgreSQL 17** database ready to use
- **Redis 7** with Upstash-compatible HTTP interface
- **Docker** setup for development and production
- **Turborepo** monorepo structure

## Development Commands

| Command | Description |
|---------|-------------|
| `pnpm start` | Start database and Redis services |
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm stop` | Stop all services |
| `pnpm logs` | View service logs |
| `pnpm reset` | Reset database (fresh start) |

## Adding UI Components

```bash
# Add shadcn/ui components
pnpm dlx shadcn@latest add button -c apps/web

# Components are automatically available
import { Button } from "@workspace/ui/components/button"
```

## Environment Setup

Copy the environment file (defaults work with Docker setup):
```bash
cp apps/web/.env.example apps/web/.env.local
```

**Default services:**
- App: http://localhost:3000
- PostgreSQL: localhost:5432 (user: `wflip`, password: `wflipdev123`, db: `wflip`)
- Redis: localhost:6379
- Redis HTTP API: http://localhost:8079

## Project Structure

```
wflip/
├── apps/web/                 # Next.js application
├── packages/ui/              # Shared UI components
├── docker-compose.dev.yaml   # Development services
└── docker-compose.yaml       # Production setup
```

## Production Deployment

```bash
# Deploy everything with Docker
pnpm prod

# Or build for your preferred platform
pnpm build
```

## Database Access

```bash
# Connect to PostgreSQL
docker compose exec db psql -U wflip -d wflip

# Connect to Redis
docker compose exec redis redis-cli
```

## Troubleshooting

**Port conflicts?** Stop conflicting services or update ports in `docker-compose.dev.yaml`

**Database issues?** Reset with `pnpm reset`

**Build problems?** Clear caches: `rm -rf node_modules && pnpm install`

## Stack

- [Next.js](https://nextjs.org) - React framework
- [shadcn/ui](https://ui.shadcn.com) - UI components
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [PostgreSQL](https://postgresql.org) - Database
- [Redis](https://redis.io) - Caching
- [Docker](https://docker.com) - Containerization
- [Turborepo](https://turbo.build) - Monorepo tooling
