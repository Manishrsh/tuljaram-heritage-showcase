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

## Admin media manager on Vercel

The `/admin` page lets an administrator replace site photos and MP4 videos, including the reels. The site uses Vercel Functions for its Node.js API and PostgreSQL for persistent media storage. Uploads are sent as base64-encoded chunks, decoded to binary, and stored in PostgreSQL `BYTEA` rows. Videos are served with HTTP range support so browser playback and seeking work.

1. Import this project into Vercel and keep the project root at the repository root. Vercel builds the Vite frontend and deploys the `api/` functions alongside it.
2. Create a PostgreSQL database and set `DATABASE_URL` in the Vercel project environment variables. Use the provider's SSL-enabled connection string and allow connections from your deployment. The API creates its media tables automatically on first use.
3. In **Settings → Environment Variables**, add `ADMIN_PASSWORD` (a long, unique password) and `ADMIN_SESSION_SECRET` (a separate random secret of at least 32 characters). Apply all variables to Production and Preview as needed, then redeploy.
4. Open `https://your-domain.vercel.app/admin`, sign in with `ADMIN_PASSWORD`, choose a media location, and upload a replacement. Photos can be up to 4 MB and MP4 videos up to 500 MB; the client sends 768 KiB chunks to stay within Vercel Function request limits.

The public site reads saved overrides from the API on page load. To test locally, set `DATABASE_URL`, `ADMIN_PASSWORD`, and `ADMIN_SESSION_SECRET`, install the Vercel CLI, and run `vercel dev`; the regular Vite dev server does not run the Node API functions. Configure the database to allow connections from the local machine as well as Vercel if you need local uploads.

The media manager's **Remove** action deletes the stored replacement and restores the original bundled asset. PostgreSQL must have enough storage and connection capacity for your media library; database backups should be enabled for production.

## Technologies Used

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Shadcn/ui components

## License

This project is private and proprietary.
