# React Enterprise AI Template

A production-ready React 19 boilerplate configured with Vite, Mantine v8, TanStack Query v5, Supabase, and a unified LLM Service (OpenAI/Azure). It implements a decoupled architecture suitable for scalable applications.

---

## 🏗️ Architecture & Core Patterns

### 1. Database Repository Pattern
Data access logic is abstracted away from UI components.
- **Implementation**: `src/lib/repositories/` contains generic abstract classes and concrete Supabase implementations.
- **Technical Benefit**: Decouples React components from the BaaS (Supabase). This allows for seamless mocking in unit tests or swapping the underlying database engine without refactoring component logic.

### 2. Asynchronous State Management
Global server-state management is handled by TanStack React Query.
- **Implementation**: Integrated at the root level (`main.tsx`) via `queryClient.ts`.
- **Technical Benefit**: Replaces manual `useEffect` fetching. Provides automatic caching, request deduplication, background refetch-on-window-focus, and built-in `isLoading`/`isError` state handling.

### 3. Unified LLM Integration (OpenAI & Azure)
A centralized AI service for interacting with ChatGPT models.
- **Implementation**: `src/lib/services/LLMService.ts` implements an agnostic wrapper.
- **Technical Benefit**: Dynamically routes API requests based on environment configurations. Dispatches standard `Bearer` token requests to `api.openai.com` if `VITE_OPENAI_API_KEY` is present, or falls back to custom endpoint routing using `api-key` headers for Azure OpenAI deployments.

### 4. Fluid Design System & Custom CSS Variables
UI constraints are managed via native CSS definitions rather than strictly relying on Mantine's defaults.
- **Implementation**: `index.css` scopes layout tokens (`rem`) and fluid dimensions (`vw/vh`) to the `:root`. Scheme-aware selectors (`[data-mantine-color-scheme="dark"]`) override color palettes in real-time.
- **Technical Benefit**: Ensures zero-flicker Dark/Light theme switching directly tied to Mantine's engine, with stable, rem-based layout spacing that scales proportionally with browser accessibility settings.

---

## 🛠️ Quick Start

### 1. Environment Setup
Copy the environment template and configure your keys:
```bash
cp .env.example .env
```
*(Required: Ensure you define either standard OpenAI credentials or Azure OpenAI credentials).*

### 2. Installation & Run
```bash
npm install
npm run dev
```

### 3. Implementation Workflow
1. **Schema**: Define your PostgreSQL tables in `supabase/schema.sql`.
2. **Types**: Reflect your entities globally in `src/lib/types.ts`.
3. **Usage**: Import the database factory `db` from `src/lib/db.ts` and fetch entries inside your hooks: `useQuery({ queryKey: [...], queryFn: () => db.findAll('table_name') })`.

---

## 📂 Directory Structure

```text
src/
├── lib/
│   ├── repositories/       # Generic CRUD abstractions and implementations
│   ├── services/           # Third-party integrations (LLMService)
│   ├── config.ts           # Environment variable mapping
│   ├── db.ts               # Database factory and DI container
│   ├── queryClient.ts      # Global React Query cache configuration
│   └── types.ts            # Global Type/Interface definitions
├── layouts/
│   └── MainLayout.tsx      # Core AppShell (Header, Navbar, Theme Toggle)
├── pages/
│   └── HomePage.tsx        # View components
├── main.tsx                # Application entry point & Providers
└── index.css               # Design system tokens and baseline resets
```
