# Deployment Guide for CBHCMS

This application is built with Next.js 14, Prisma, and Tailwind CSS. It is designed to be deployed on platforms like Vercel, or self-hosted using Docker.

## Prerequisites

- Node.js 18+
- PostgreSQL (recommended for production) or SQLite (for simple/local setups)
- Ollama (for AI features) running locally or on a separate server

## Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

## Deployment Options

### Option 1: Vercel (Recommended for Web App)

1.  Push your code to GitHub.
2.  Import the project into Vercel.
3.  Add the Environment Variables in the Vercel Dashboard.
4.  **Database**: Vercel works great with Vercel Postgres or Neon. Update `DATABASE_URL` to point to your Postgres instance.
5.  **AI**: Since Vercel is serverless, it cannot host Ollama. You need to host Ollama separately (e.g., on a VPS, AWS EC2, or use a provider) and set `OLLAMA_HOST` to that public URL.

### Option 2: Docker (Self-Hosted)

1.  Build the Docker image:
    ```bash
    docker build -t cbhcms .
    ```
2.  Run the container:
    ```bash
    docker run -p 3000:3000 --env-file .env cbhcms
    ```

## Post-Deployment

1.  **Database Migration**: Run `npx prisma migrate deploy` to apply schema changes.
2.  **Seed Admin**: You may need to manually create the first Admin user via the database console or a seed script if not already done.

## PWA

The app is configured as a PWA. Ensure your domain has SSL (HTTPS) enabled, as Service Workers require HTTPS.
