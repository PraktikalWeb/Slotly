Frontend (Vercel)
------------------

1) In Vercel, create a new project from this repo.
2) Build command: `npm run frontend:build`
3) Output directory: `dist/public`
4) Root directory: repo root (Vercel will detect `client` via vite.config root)
5) Environment variables:
   - `VITE_API_URL` = `https://<your-render-service>.onrender.com`

Backend (Render)
-----------------

Create a Web Service from this repo.

- Build Command: `npm install && npm run server:build`
- Start Command: `SERVE_STATIC=false npm run server:start`
- Health Check Path: `/api/centers`
- Environment Variables:
  - `NODE_ENV` = `production`
  - `NODE_VERSION` = `20`
  - `SERVE_STATIC` = `false`
  - `CORS_ORIGIN` = `https://<your-vercel-domain>.vercel.app`

Local Development
-----------------

- Start backend: `npm run dev` (port defined by `PORT`, default 5000)
- Start frontend: `cd client && npm run dev` (Vite dev server)
- Create `client/.env.local` with `VITE_API_URL` pointing to your backend.

