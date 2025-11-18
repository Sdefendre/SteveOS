# AI Agent Handbook - SteveOS

This document provides context and guidelines for AI agents working on the SteveOS codebase.

## 1. Project Overview

**SteveOS** is the personal operating system and portfolio for Steve Defendre. It acts as a central hub for his projects, writings, and digital identity.

### Key Entities

- **Project**: SteveOS
- **Owner**: Steve Defendre
- **Core Philosophy**: Discipline, Precision, Resilience.

## 2. Tech Stack & Architecture

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 (Utility-first).
- **UI Library**: Shadcn UI (Radix Primitives), Lucide React (Icons).
- **Animations**: Framer Motion.
- **State Management**: Minimal client state; preference for RSC.

## 3. File Structure

- `app/`: Routes and pages.
- `components/`: Reusable UI components.
- `constants/`: Static content (text, pricing, blog posts) - **Edit these to change site copy.**
- `blog_posts/`: Long-form content for the blog.
- `public/`: Static assets.

## 4. Coding Guidelines

### General

- **Functional**: Use functional components.
- **Types**: Explicitly type everything with interfaces.
- **Naming**: PascalCase for components, kebab-case for files/directories.

### Styling

- Use Tailwind utility classes.
- `app/globals.css` for global themes.

### Performance

- Favor **React Server Components (RSC)**.
- Wrap client components in `<Suspense>` if they fetch data.

## 5. Common Commands

- `npm run dev`: Start development server.
- `npm run build`: Build for production.
- `npm run lint`: Check for linting errors.

## 6. Deployment

- Deploys to Vercel.
