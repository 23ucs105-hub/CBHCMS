# CBHCMS - Community Based Health Care Management System

A modern, real-time alert management system built with Next.js, Prisma, and Tailwind CSS.

## 🚀 Features

- ✅ **Authentication & User Management** (Admin & Workers)
- ✅ **Public AI Chat Interface** with Voice Assistant
- ✅ **Real-time Alert System** with Email Notifications
- ✅ **Location Services** (GPS tracking and Google Maps integration)
- ✅ **PWA Support** (Install as mobile app)
- ✅ **Multi-language Support** (English, Hindi, Tamil)
- ✅ **Admin Portal** for managing workers and alerts
- ✅ **Worker Dashboard** for receiving and responding to alerts

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Ollama (for AI features) - [Download here](https://ollama.ai)

<<<<<<< HEAD
## ⚙️ Setup
=======
*   **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
*   **Language**: TypeScript
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
*   **Database**: SQLite (Local) / PostgreSQL (Cloud Ready)
*   **ORM**: [Prisma](https://www.prisma.io/)
*   **Containerization**: Docker

## Prerequisites

*   Node.js v18+ 
*   npm or yarn

## Installation & Local Setup

1.  **Clone the repository or download**
    ```bash
    git clone https://github.com/yourusername/cbhcms.git
    cd cbhcms
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a `.env` file in the root directory (already set up for local dev):
    ```env
    DATABASE_URL="file:./dev.db"
    ```

4.  **Initialize Database**
    Push the Prisma schema to the database and seed initial data:
    ```bash
    npx prisma migrate dev --name init
    npx tsx prisma/seed.ts
    ```

5.  **Run Development Server**
    ```bash
    npm run dev
    ```
    Access the app at `http://localhost:3000`.

## Production Build

To build the application for production:
>>>>>>> 2c86f74c62da423df98dd90b03b22f41dd22e385

### 1. Clone & Install
```bash
git clone <your-repo-url>
cd CBHCMS
npm install
```

### 2. Environment Configuration
Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

**Required Environment Variables:**
- `DATABASE_URL` - Database connection string
- `AUTH_SECRET` - NextAuth secret (generate with `openssl rand -base64 32`)
- `SMTP_*` - Email configuration for notifications
- `OLLAMA_HOST` - Ollama API endpoint (default: `http://localhost:11434`)

### 3. Database Setup
```bash
npx prisma db push
```

### 4. Start Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## 🔐 Default Credentials

### Admin Login
- **URL:** `http://localhost:3000/login`
- **Username:** `admin`
- **Password:** `admin123`

**⚠️ Important:** Change these credentials in production!

## 🤖 AI Features

To enable AI chat and voice features:

1. Install Ollama: https://ollama.ai
2. Run a model:
   ```bash
   ollama run llama3
   ```
3. The AI will be available in the Public Chat interface

## 📱 PWA Installation

On mobile devices:
1. Open the app in Chrome/Safari
2. Look for the "Install" or "Add to Home Screen" prompt
3. The app will install as a native-like application

## 📚 Key URLs

- **Homepage (Public Chat):** `/`
- **Admin Login:** `/login`
- **Admin Dashboard:** `/admin`
- **Health Workers Management:** `/admin/workers`
- **Alerts & Logs:** `/admin/alerts`
- **Test Notifications:** `/admin/test-alerts`
- **Worker App:** `/worker` (requires login)
- **Simulation View:** `/simulate`

## 🛠️ Tech Stack

- **Framework:** Next.js 14
- **Database:** Prisma with SQLite (easily swappable to PostgreSQL)
- **Authentication:** NextAuth.js v5
- **Styling:** Tailwind CSS
- **PWA:** @ducanh2912/next-pwa
- **AI:** Ollama (self-hosted LLM)
- **Email:** Nodemailer

## 📧 Email Configuration

Configure SMTP in `.env`:
```env
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASS=your-password
```

Test emails via `/admin/test-alerts`

## 🚢 Deployment

See [DEPLOY.md](./DEPLOY.md) for detailed deployment instructions for:
- Vercel
- Docker
- Self-hosted VPS

## 📝 License

MIT License - see LICENSE file for details
