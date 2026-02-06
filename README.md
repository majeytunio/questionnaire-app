# Questionnaire App – Technical Documentation

## 1. Project Overview
The **Questionnaire App** is a role‑based, AI‑powered web application designed to create, manage, and analyze questionnaires. The platform supports three user roles — **Admin**, **Counsellor**, and **User** — each with distinct permissions and workflows.

The application leverages **AI (OpenAI)** to assist in generating questionnaire content, **Supabase** for authentication and database management, and **Next.js** for building a modern, server‑rendered frontend. The app is deployed on **Vercel**, enabling seamless CI/CD and serverless execution.

Live Application:
- https://questionnaire-app-zeta.vercel.app/

GitHub Repository:
- https://github.com/majeytunio/questionnaire-app

---

## 2. Core Features

### Authentication & Authorization
- Email‑based authentication using **Supabase Auth**
- Secure login for Admin, Counsellor, and User roles
- Role‑based access control enforced at the application level

### Questionnaire Management
- Create and manage questionnaires
- AI‑assisted question generation using OpenAI
- Store questionnaires and responses in Supabase

### User Roles
- **Admin**: Manages users, questionnaires, and system‑level settings
- **Counsellor**: Reviews responses and insights
- **User**: Fills out questionnaires

### AI Integration
- OpenAI is used to dynamically generate or enhance questionnaire questions
- AI logic is abstracted into API routes for security

---

## 3. Tech Stack

### Frontend
- **Next.js (App Router)** – React framework for SSR, routing, and server actions
- **React** – Component‑based UI
- **JavaScript / TypeScript** – Core language
- **CSS / Tailwind (if applicable)** – Styling

### Backend
- **Next.js API Routes / Server Actions** – Server‑side logic
- **Node.js Runtime** – Execution environment

### Database & Auth
- **Supabase**
  - PostgreSQL database
  - Supabase Auth (Email & Password)
  - Row‑level security (RLS)

### AI
- **OpenAI API**
  - Used for questionnaire generation
  - Accessed securely via server‑side API routes

### Deployment
- **Vercel**
  - Serverless deployment
  - Automatic builds from GitHub
  - Environment variable management

---

## 4. Application Architecture

```
Browser (Client)
   ↓
Next.js App Router (UI Components)
   ↓
Server Actions / API Routes
   ↓
Supabase (Auth + Database)
   ↓
OpenAI API (AI Question Generation)
```

### Key Architectural Decisions
- Sensitive keys (OpenAI, Supabase service role) are never exposed to the client
- AI calls are handled server‑side
- Authentication state is managed by Supabase
- Server Actions simplify form handling and authentication

---

## 5. Environment Variables

The following environment variables are required:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_OPENAI_API_KEY=
```

### Variable Purpose
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Public key for client‑side operations
- `NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY`: Server‑side privileged access
- `NEXT_PUBLIC_OPENAI_API_KEY`: OpenAI authentication key

---

## 6. Supabase Integration

### Authentication
- Uses `supabase.auth.signInWithPassword`
- Email/password‑based login
- Session handled automatically by Supabase

### Example Login Server Action

```js
'use server';

import { supabase } from "../../../lib/supabase";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function signIn(prevState, formData) {
  const email = formData.get('email');
  const password = formData.get('password');

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  return { success: "Login successful! Redirecting..." };
}
```

### Database
- PostgreSQL tables hosted on Supabase
- Used to store:
  - Users
  - Questionnaires
  - Responses
  - Roles

---

## 7. AI (OpenAI) Integration

### Purpose
- Automatically generate questionnaire questions
- Enhance relevance and personalization

### Implementation
- OpenAI API is called from secure API routes
- Prompts are dynamically constructed based on context
- Responses are parsed and stored in Supabase

### Security
- OpenAI key is never exposed to the frontend
- Requests are validated server‑side

---

## 8. Project Structure (High‑Level)

```
questionnaire-app/
├─ app/                # Next.js App Router pages
├─ lib/                # Supabase client & helpers
├─ components/         # Reusable UI components
├─ api/                # API routes (AI, auth, etc.)
├─ public/             # Static assets
├─ package.json        # Dependencies & scripts
└─ next.config.js      # Next.js configuration
```

---

## 9. Deployment (Vercel)

### Process
- GitHub repository connected to Vercel
- Automatic deployments on push
- Environment variables configured in Vercel dashboard

### Runtime
- Serverless Node.js functions
- Edge‑friendly frontend rendering

---

## 10. Security Considerations
- Server‑side handling of secrets
- Supabase Row‑Level Security
- Role‑based access enforcement
- No direct client access to OpenAI or service keys

---

## 11. Future Improvements
- Add analytics dashboard
- Improve AI prompt tuning
- Add questionnaire versioning
- Enhance access control with stricter RLS policies
- Introduce audit logs

---

## 12. Conclusion

The Questionnaire App is a modern, scalable, AI‑powered platform built with **Next.js**, **Supabase**, and **OpenAI**, deployed on **Vercel**. Its clean separation of frontend, backend, authentication, and AI services makes it easy to maintain, secure, and extend.

This documentation provides a complete overview of how the system is built, how technologies interact, and how AI is integrated to deliver intelligent questionnaire functionality.