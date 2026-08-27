# Navittalo - Travel & Adventure App

A pixel-perfect, full-stack Next.js web application built with Tailwind CSS and Supabase.

## Features
- **Public Website**: Hero section, dynamic Camp and Europe Package listings, Custom Trip features.
- **Booking Flows**: Seamless inquiry forms integrated with Supabase.
- **Admin Dashboard**: Protected CRUD dashboard to manage camps, packages, and bookings.

## Local Development Setup

### 1. Install Dependencies
`npm install`

### 2. Configure Supabase Environment
Create a `.env.local` file in the root directory and add your remote Supabase instance keys:

```
NEXT_PUBLIC_SUPABASE_URL=https://[YOUR_PROJECT_ID].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=ey...
```

### 3. Setup Database (Schema & Seeds)
Since this app relies on Supabase, run the included SQL script in your Supabase SQL Editor:
1. Open your Supabase Dashboard -> SQL Editor.
2. Copy the contents of `supabase/migrations/20260826213657_init_schema.sql` and run it to set up tables and Row-Level Security (RLS).
3. Copy the contents of `supabase/seed.sql` and run it to insert the admin user (`nnavittalo@gmail.com` / `12345678`) and sample trips.

*Note: The application is programmed to smoothly display fallback data if it cannot fetch from Supabase, but will instantly transition to live queries once `.env.local` is set and seeded.*

### 4. Run the Next.js Server
`npm run dev`

Navigate to `http://localhost:3000` to view the application.
Navigate to `http://localhost:3000/admin` to log into the backend.

## Tech Stack
- Next.js (App Router, Server Components & Actions)
- Tailwind CSS & Lucide Icons
- Supabase (PostgreSQL, Auth, RLS)
