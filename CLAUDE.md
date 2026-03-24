# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

NCMS (NatureCode Management System) — an Angular 20 frontend for managing a coding school. Two roles: **admin** (manages students, payments, attendance) and **student** (views own dashboard, attendance, payments). Authentication via Google Sign-In with a backend REST API.

## Commands

All commands run from the `naturecode/` directory:

```bash
npm start          # dev server on localhost:4200
npm run build      # production build → dist/
npm test           # unit tests (Karma + Jasmine, Chrome)
npm run watch      # dev build with watch mode
```

## Architecture

**Standalone components throughout** — no NgModules. All routing uses lazy-loaded `loadComponent`.

### Path Aliases (tsconfig.json)

| Alias | Path |
|-------|------|
| `@app/*` | `src/app/*` |
| `@core/*` | `src/core/*` |
| `@shared/*` | `src/shared/*` |
| `@layouts/*` | `src/layouts/*` |
| `@routes/*` | `src/routes/*` |
| `@env/*` | `src/environments/*` |

### Key Layers

- **`src/core/`** — Singleton services (`AuthService`, `AdminService`, `StudentService`), functional route guards (`authGuard`, `adminGuard`, `studentGuard`), HTTP interceptor (`authInterceptor`), and data models.
- **`src/shared/`** — Reusable UI: `ModalService`/`ModalHostComponent` (promise-based dynamic modal system), `ToastService`/`ToastHostComponent`, `ToolbarComponent`.
- **`src/layouts/`** — Shell components for admin and student areas, each wrapping a `<router-outlet>`.
- **`src/routes/`** — Page components organized by role: `admin/` (student-list, student-detail, add-student, add-payment, student-attendance), `student/` (dashboard, attendance-history, payment-history), plus `login/` and `profile/`.

### Auth Flow

- Google Sign-In → backend validates ID token at `/api/auth/google-login` → returns `User` object with role.
- Session stored in `sessionStorage` (idToken + user JSON). `AuthService` uses Angular signals for reactive state.
- `authInterceptor` attaches Bearer token; auto-signs out on 401.

### Styling

- **Tailwind CSS v4** + **SCSS** for component styles. Angular Material and CDK available.
- Custom theme tokens defined in `src/styles.scss` (green primary palette, custom animations).
- SCSS include paths: `src/` and `src/theme/`.

### Formatting

Prettier config in `package.json`: 100 char width, single quotes, Angular HTML parser.

### TypeScript

Strict mode enabled with strict Angular template checking.
