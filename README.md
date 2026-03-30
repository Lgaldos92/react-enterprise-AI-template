# Quick Start React Template

A production-ready foundation for building modern web applications. This template provides a highly opinionated, scalable baseline focusing on developer experience, reactive design, and backend readiness.

## 🚀 Core Features & Stack

- **UI Framework**: React + Mantine v8. Complete with a natively integrated Dark/Light mode toggle.
- **Design System**: Centralized `index.css` leveraging CSS Variables for fluid layouts (`vw/vh`) and typography (`rem`), featuring a premium Slate & Blue color palette.
- **Data & Backend**: Pre-configured Supabase Repository Pattern for scalable CRUD operations.
- **State & Fetching**: TanStack React Query v5 pre-integrated for caching and server-state management.
- **AI Integration**: Boilerplate service for connecting to Azure OpenAI (`gpt-4.1`).
- **Routing**: React Router v7 (HashRouter) configured out of the box.

## 🛠️ Getting Started

### 1. Environment Setup
Copy the `.env.example` file to create your local environment setting:
```bash
cp .env.example .env
```
Fill in your Supabase and Azure OpenCV credentials in `.env`.

### 2. Installation
```bash
npm install
```

### 3. Development Server
```bash
npm run dev
```

## 🏗️ Architecture Directory

- `src/main.tsx`: App entry point with all Providers (Mantine, React Query).
- `src/App.tsx`: Routing configuration.
- `src/layouts/`: Base layout components (`MainLayout` with responsive Sidebar and Header).
- `src/pages/`: Root pages (`HomePage`).
- `src/lib/`:
  - `repositories/`: Database abstraction layer (Generic Supabase CRUD).
  - `services/`: External API integrations (Azure OpenAI).
  - `types.ts`: Domain models (`Profile`, `GenericEntity`).
- `supabase/schema.sql`: Your database table definitions.

## 🎨 Theme Customization
To customize the visual identity of the app, simply modify the variables in `src/index.css`. The entire application responds automatically to changes in `--primary-color`, typography scaling, and spacing variables.
