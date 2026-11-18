# Tuljaram Heritage Showcase

A modern React application showcasing traditional Maharashtrian jewelry from Tuljaram Saraf Jewellers.

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd tuljaram-heritage-showcase
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:8080](http://localhost:8080) in your browser.

### Build for Production

```bash
npm run build
```

### Run Tests

```bash
npm test
```

## Admin photo manager on Vercel

The `/admin` page lets an administrator replace site photos and MP4 videos, including the reels. The site uses Vercel Functions for its Node.js API and Vercel Blob for persistent media storage. Uploaded media and replacements survive new frontend deployments.

1. Import this project into Vercel and keep the project root at the repository root. Vercel builds the Vite frontend and deploys the `api/` functions alongside it.
2. In the Vercel project, open **Storage**, create a **Blob** store, and connect it to the project. Enable a read-write token so `BLOB_READ_WRITE_TOKEN` is available; browser uploads use it to send large video files directly to Blob.
3. In **Settings → Environment Variables**, add `ADMIN_PASSWORD` (a long, unique password) and `ADMIN_SESSION_SECRET` (a separate random secret of at least 32 characters). Apply both to Production and Preview as needed, then redeploy.
4. Open `https://your-domain.vercel.app/admin`, sign in with `ADMIN_PASSWORD`, choose a media location, and upload a replacement. Photos can be up to 4 MB and MP4 videos up to 500 MB.

The public site reads saved overrides from the API on page load. To test locally, install the Vercel CLI, link this folder to the Vercel project, pull its Development environment with `vercel env pull .env.local`, and run `vercel dev`. The regular Vite dev server does not run the Node API functions. Client uploads require Vercel Blob to call the API after the file transfer; localhost is not reachable by Blob. Expose the local `vercel dev` port through a public HTTPS tunnel such as ngrok, then set `VERCEL_BLOB_CALLBACK_URL` in `.env.local` to the tunnel URL ending in `/api/photos` (for example, `https://example.ngrok-free.app/api/photos`). Keep using the local app URL in your browser; the tunnel URL is only for the Blob completion callback. Restart `vercel dev` after changing the environment variable. Without a tunnel, use the deployed preview or production URL to test uploads.

Admin media replacement requires a Vercel deployment with Blob connected. The regular Vite static build does not run the Node API functions.

## Technologies Used

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Shadcn/ui components

## License

This project is private and proprietary.
