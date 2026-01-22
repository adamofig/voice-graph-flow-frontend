# VoiceGraphFlow
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Docker Setup

You can run this project using Docker for a consistent production-like environment.

### Using Docker Compose (Recommended)

The easiest way to run the application is using Docker Compose:

1. **Start the application:**
   ```bash
   docker compose up -d
   ```

2. **Access the app:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Stop the application:**
   ```bash
   docker compose down
   ```

### Using Docker Build/Run

If you prefer to build and run the image manually:

1. **Build the image:**
   ```bash
   docker build -t voice-graph-flow .
   ```

2. **Run the container:**
   ```bash
   docker run -p 3000:3000 --env-file .env.local voice-graph-flow
   ```

### Environment Variables

Make sure to provide the necessary environment variables. If you are using `docker-compose`, you can add them to the `environment` section in `docker-compose.yml` or create a `.env` file in the root directory.

Key variables:
- `OPENAI_API_KEY`: Required for chat functionality.
- `NODE_ENV`: Set to `production` by default in Docker.

## LLM Rag

The LLM Rag section allows you to perform semantic search and retrieval-augmented generation using the Gemini LLM.

### Endpoint

- **Method:** `GET`
- **URL:** `http://0.0.0.0:8000/llm`
- **Query Parameter:** `query` (The query text for the LLM)

### Access

The UI can be accessed at `/llm-rag`.
