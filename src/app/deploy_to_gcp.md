---
description: Deploy the CBHCMS application to Google Cloud Run
---

# Deploy to Google Cloud Run

This workflow guides you through deploying the Next.js application to Google Cloud Run.

> **Warning**: The current application uses SQLite (`dev.db`). In a serverless environment like Cloud Run, the filesystem is ephemeral, meaning **database data will be reset** if the container restarts or scales. For production, you should use **Google Cloud SQL (PostgreSQL)**.

## Prerequisites
1.  [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) installed and initialized.
2.  A Google Cloud Project created and billing enabled.

## Steps

1.  **Login to Google Cloud**
    Open your terminal and run:
    ```powershell
    gcloud auth login
    gcloud config set project [YOUR_PROJECT_ID]
    ```

2.  **Enable Services**
    Enable Cloud Run and Artifact Registry:
    ```powershell
    gcloud services enable run.googleapis.com artifactregistry.googleapis.com
    ```

3.  **Create Artifact Registry**
    Create a repository to store your Docker images:
    ```powershell
    gcloud artifacts repositories create cbhcms-repo --repository-format=docker --location=us-central1 --description="CBHCMS Docker Repository"
    ```

4.  **Build and Push Docker Image**
    Submit the build to Cloud Build (easiest method, no local Docker needed):
    ```powershell
    gcloud builds submit --tag us-central1-docker.pkg.dev/[YOUR_PROJECT_ID]/cbhcms-repo/cbhcms-app .
    ```

5.  **Deploy to Cloud Run**
    Deploy the container:
    ```powershell
    gcloud run deploy cbhcms-app --image us-central1-docker.pkg.dev/[YOUR_PROJECT_ID]/cbhcms-repo/cbhcms-app --platform managed --region us-central1 --allow-unauthenticated
    ```

6.  **Access the App**
    The command will output a URL (Service URL). Click it to view your hosted application.

## Switching to Cloud SQL (Recommended for Persistence)
To keep your data persistent:
1.  Create a Cloud SQL (PostgreSQL) instance.
2.  Update `schema.prisma` to use `provider = "postgresql"`.
3.  Set the `DATABASE_URL` environment variable in Cloud Run to point to your Cloud SQL instance.
