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

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Database:** Prisma with SQLite (Local) / PostgreSQL (Cloud Ready)
- **Authentication:** NextAuth.js v5
- **Styling:** Tailwind CSS v4
- **PWA:** @ducanh2912/next-pwa
- **AI:** Ollama (self-hosted LLM)
- **Email:** Nodemailer

## ⚙️ Setup & Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd CBHCMS
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="file:./dev.db"
   AUTH_SECRET="your-secret-here"
   SMTP_HOST="smtp.example.com"
   SMTP_PORT=587
   SMTP_USER="your-email"
   SMTP_PASS="your-password"
   ```

4. **Initialize Database**
   ```bash
   npx prisma db push
   npx tsx prisma/seed.ts
   ```

5. **Run Development Server**
   ```bash
   npm run dev
   ```
   Access the app at `http://localhost:3000`.

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
