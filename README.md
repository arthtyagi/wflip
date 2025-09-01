# wflip - shadcn/ui monorepo

A modern, full-stack application built with Next.js, shadcn/ui, and TypeScript in a monorepo setup.

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/) (v20 or later)
- [pnpm](https://pnpm.io/installation) (v8 or later)
- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/)

### Development Setup

#### Option 1: Docker Setup (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd wflip
   ```

2. **Start the development services**
   ```bash
   # Start PostgreSQL, Redis, and supporting services
   docker compose -f docker-compose.dev.yaml up -d
   ```

3. **Install dependencies**
   ```bash
   pnpm install
   ```

4. **Configure environment variables**
   ```bash
   # Copy environment example
   cp apps/web/.env.example apps/web/.env.local
   
   # The default values in .env.example work with the Docker setup
   # Edit apps/web/.env.local if you need custom configuration
   ```

5. **Start the development server**
   ```bash
   pnpm dev
   ```

The application will be available at [http://localhost:3000](http://localhost:3000).

#### Option 2: Full Docker Setup

If you prefer to run everything in Docker:

```bash
# Build and start all services including the web app
docker compose up --build
```

#### Option 3: Local Development (without Docker)

If you prefer to run services locally:

1. Install and configure PostgreSQL and Redis locally
2. Update the connection strings in `apps/web/.env.local`
3. Follow steps 3-5 from Option 1

### Environment Variables

The project uses the following environment variables (see `apps/web/.env.example`):

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://wflip:wflipdev123@localhost:5432/wflip` |
| `UPSTASH_REDIS_REST_URL` | Redis HTTP endpoint (Upstash-compatible) | `http://localhost:8079` |
| `UPSTASH_REDIS_REST_TOKEN` | Redis authentication token | `dev_token_wflip` |
| `NEXT_PUBLIC_APP_URL` | Public URL of the application | `http://localhost:3000` |

## 📁 Project Structure

```
wflip/
├── apps/
│   └── web/                 # Next.js application
│       ├── app/            # Next.js 13+ app directory
│       ├── components/     # App-specific components
│       ├── lib/           # Utility functions
│       └── hooks/         # Custom React hooks
├── packages/
│   ├── ui/                # Shared UI components (shadcn/ui)
│   ├── eslint-config/     # Shared ESLint configuration
│   └── typescript-config/ # Shared TypeScript configuration
├── docker-compose.yaml       # Production Docker setup
├── docker-compose.dev.yaml  # Development Docker setup
└── turbo.json               # Turborepo configuration
```

## 🧩 Adding Components

This project uses [shadcn/ui](https://ui.shadcn.com/) for UI components. To add new components:

### Adding shadcn/ui Components

```bash
# Add a component to the shared UI package
pnpm dlx shadcn@latest add button -c apps/web

# This will place the component in packages/ui/src/components/
```

The components are automatically available in your app:

```tsx
import { Button } from "@workspace/ui/components/button"

export default function MyComponent() {
  return <Button>Click me</Button>
}
```

### Creating Custom Components

1. **Shared components** (used across multiple apps):
   ```bash
   # Add to packages/ui/src/components/
   touch packages/ui/src/components/my-component.tsx
   ```

2. **App-specific components**:
   ```bash
   # Add to apps/web/components/
   touch apps/web/components/my-feature.tsx
   ```

### Component Guidelines

- Use TypeScript for all components
- Follow the existing naming conventions
- Add proper TypeScript types and interfaces
- Include proper exports in `packages/ui/src/index.ts` for shared components

## 🏗️ Building and Deployment

### Local Build

```bash
# Build all packages
pnpm build

# Build only the web app
pnpm --filter web build
```

### Docker Production Build

```bash
# Build production Docker image
docker-compose -f docker-compose.yaml up --build
```

### Environment-Specific Builds

- **Development**: Uses `docker-compose.dev.yaml` (services only)
- **Production**: Uses `docker-compose.yaml` (full application stack)

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build all packages |
| `pnpm lint` | Run ESLint across all packages |
| `pnpm format` | Format code with Prettier |

## 🐳 Docker Services

The Docker setup includes:

- **PostgreSQL 17**: Primary database
- **Redis 7**: Caching and session storage
- **serverless-redis-http**: Upstash-compatible Redis HTTP interface
- **Web App**: Next.js application (production only)

### Managing Docker Services

```bash
# Start development services (DB + Redis only)
docker compose -f docker-compose.dev.yaml up -d

# Start all services including web app
docker compose up -d

# Stop services
docker compose down

# View logs
docker compose logs -f [service-name]

# Reset database
docker compose down -v
docker compose -f docker-compose.dev.yaml up -d
```

## 🛠️ Development Workflow

1. **Start development environment**:
   ```bash
   docker compose -f docker-compose.dev.yaml up -d
   pnpm install
   pnpm dev
   ```

2. **Make changes** to your code

3. **Add new dependencies**:
   ```bash
   # For the web app
   pnpm --filter web add package-name
   
   # For shared packages
   pnpm --filter @workspace/ui add package-name
   ```

4. **Add new shadcn/ui components**:
   ```bash
   pnpm dlx shadcn@latest add component-name -c apps/web
   ```

5. **Build and test**:
   ```bash
   pnpm build
   pnpm lint
   ```

## 🔍 Troubleshooting

### Common Issues

1. **Port conflicts**: If ports 3000, 5432, 6379, or 8079 are in use, update the port mappings in `docker-compose.dev.yaml`

2. **Database connection issues**: Ensure PostgreSQL is running and check the `DATABASE_URL` in your `.env.local`

3. **Redis connection issues**: Verify Redis and serverless-redis-http containers are healthy

4. **Build failures**: Clear node_modules and reinstall:
   ```bash
   rm -rf node_modules apps/web/node_modules packages/*/node_modules
   pnpm install
   ```

### Useful Commands

```bash
# Check Docker service health
docker compose ps

# Access PostgreSQL directly
docker compose exec db psql -U wflip -d wflip

# Access Redis directly
docker compose exec redis redis-cli

# View application logs
docker compose logs -f web
```

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Docker Compose Documentation](https://docs.docker.com/compose/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Run tests and linting: `pnpm build && pnpm lint`
5. Commit your changes: `git commit -m 'Add some feature'`
6. Push to the branch: `git push origin feature/your-feature-name`
7. Open a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
