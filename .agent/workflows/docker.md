---
description: Build and Run Docker Container
---

// turbo-all
# Docker Workflow

This workflow helps you build and run the Docker container for the Flow Video project.

## Prerequisites
- Docker installed and running
- `.env.local` file with `OPENAI_API_KEY`

## Steps

### 1. Build and Run with Docker Compose
Use this for a quick setup.

```bash
docker compose up --build -d
```

### 2. Check Logs
Monitor the application logs.

```bash
docker compose logs -f
```

### 3. Stop Application
Stop the running containers.

```bash
docker compose down
```

### 4. Manual Build (Alternative)
If you want to build the image manually.

```bash
docker build -t flow-video .
```

### 5. Manual Run (Alternative)
Run the built image manually.

```bash
docker run -p 3000:3000 --env-file .env.local flow-video
```
