# DocVerse — PhD Guidance & Admission Platform

A full-stack Next.js 14 web application for DocVerse, India's #1 PhD Guidance Platform for Working Professionals.

## Features

- **Public Website**: Homepage, Programs, Services, Universities, Blog, FAQ, Contact, Apply Now
- **Lead Capture**: Multi-step form with CRM integration
- **Admin Dashboard**: Leads CRM, University management, Services, Mentors, Content, Reports
- **Authentication**: JWT-based auth with role-based access control
- **Database**: Prisma ORM with SQLite (easily switch to MySQL/PostgreSQL)

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 19, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes, Server Actions
- **Database**: Prisma ORM + SQLite
- **Auth**: JWT (jose) + bcryptjs
- **UI Components**: Radix UI primitives + custom shadcn components

## Quick Start

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# Seed database with sample data
npx prisma db seed

# Start development server
npm run dev
```

## Default Credentials

- **Admin**: admin@docverse.in / admin123
- **Counsellor**: counsellor@docverse.in / counsellor123

## Project Structure

```
docverse/
├── app/
│   ├── (public)/          # Public marketing pages
│   ├── (admin)/           # Admin dashboard pages
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── layout/            # Navbar, Footer, Sidebar
│   ├── sections/          # Homepage sections
│   └── forms/             # Lead form
├── lib/
│   ├── prisma.ts          # Prisma client
│   ├── auth.ts            # JWT auth utilities
│   ├── actions.ts         # Server actions
│   └── utils.ts           # Utilities & constants
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Seed data
└── hooks/                 # Custom hooks
```

## Environment Variables

Copy `.env.example` to `.env.local` and configure:

```
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

## License

Proprietary — Prohostix Digital, Kochi
