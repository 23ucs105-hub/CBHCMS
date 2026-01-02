# Cloud-Based Voice Assistance & Health Worker Alert System (CBHCMS)

CBHCMS is a modern, cloud-ready web application designed to facilitate rapid response for medical emergencies. It features a voice-activated public interface, a robust admin dashboard for managing health workers, and a real-time alert dispatch system simulated via cloud gateways.

![Dashboard Preview](https://via.placeholder.com/800x400?text=CBHCMS+Dashboard)

## Key Features

*   ** Voice-Activated Assistance**: Users can trigger emergency alerts simply by speaking keywords like "Help" or "Emergency" using the Web Speech API.
*   ** Admin Dashboard**: Full CRUD management capabilities for Health Workers and Worker Categories.
*   **🚨 Real-Time Alert Broadcast**: Dispatch critical alerts to specific target groups (e.g., Doctors, Ambulance) via multiple channels (SMS, Voice, Email, App).
*   ** Cloud Simulation Gateway**: visualized event logging for SMS/Voice API dispatching (simulating AWS SNS/Twilio/FCM).
*   ** Responder PWA**: A mobile-first Progressive Web App interface for health workers to receive and acknowledge alerts instantly.

## Technology Stack

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

```bash
npm run build
npm start
```

## Deployment (Google Cloud)

This application is containerized and ready for Google Cloud Run. 

1.  **Build Container**:
    ```bash
    docker build -t cbhcms-app .
    ```
2.  **Push to GCR/Artifact Registry**:
    (See `deploy_to_gcp.md` for detailed GCP commands)

## Project Structure

*   `src/app`: Next.js App Router pages and API routes.
    *   `/admin`: Admin dashboard routes.
    *   `/worker`: Mobile worker view.
    *   `/simulate`: Cloud gateway simulation.
    *   `/api`: Backend endpoints for Workers, Alerts, and Categories.
*   `prisma/`: Database schema and seed scripts.
*   `public/`: Static assets.

## Contributing

1.  Fork the repository.
2.  Create a feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

## License

Distributed under the MIT License. See `LICENSE` for more information.
