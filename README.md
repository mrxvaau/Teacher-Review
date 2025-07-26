# Teacher Review BD

Teacher Review BD is a full-stack web application built for rating and reviewing teachers at universities in Bangladesh. It features a modern **React frontend**, **Express.js backend**, **PostgreSQL database with Drizzle ORM**, and a comprehensive UI built with **shadcn/ui** components.

---

## **Overview**

Currently implemented as a full-stack application with a PostgreSQL database, featuring:

- University type selection (Private/Public)
- Private universities grid with AIUB enabled
- Faculty navigation for each university
- Teacher profiles with rating system (1–10 scale)
- Review submission with comments
- Rating history visualization with bar charts
- Responsive design with breadcrumb navigation

---

## **User Preferences**
- Preferred communication style: Simple, everyday language.

---

## **Recent Changes**

**Latest Update – July 15, 2025:**
- Created complete Teacher Review BD frontend application
- Implemented all required pages: Home, Universities, Faculties, Teachers
- Added rating slider component (1–10 scale)
- Created rating history bar chart visualization
- Integrated PostgreSQL database with Drizzle ORM
- Set up database seeding with initial data
- Implemented full API routes for CRUD operations
- Updated frontend to use database API instead of mock data
- Added database connection and storage layer
- Added breadcrumb navigation throughout the application

---

## **System Architecture**

### **Frontend Architecture**
- **Framework:** React + TypeScript
- **Build Tool:** Vite
- **Routing:** Wouter (lightweight client-side routing)
- **State Management:** TanStack Query
- **UI Framework:** shadcn/ui (Radix UI primitives)
- **Styling:** Tailwind CSS with CSS variables
- **Charts:** Recharts (for rating history)

### **Backend Architecture**
- **Runtime:** Node.js (Express.js framework)
- **Language:** TypeScript (ES modules)
- **API Structure:** RESTful API with `/api` prefix
- **Error Handling:** Centralized error middleware
- **Development:** Hot reload with Vite integration

### **Database Architecture**
- **Database:** PostgreSQL (Neon serverless driver)
- **ORM:** Drizzle ORM (type-safe operations)
- **Schema:** Universities, faculties, teachers, reviews
- **Migrations:** Drizzle Kit

---

## **Key Components**

### **Database Schema**
- **Universities:** Basic info (name, type, enabled status)
- **Faculties:** Departments linked to universities with color/icon theming
- **Teachers:** Profiles with subjects, images, rating aggregates
- **Reviews:** Ratings (1–10) with comments

### **Frontend Pages**
- **Home:** University type selection (public/private)
- **Universities:** List of available universities
- **Faculties:** Faculty listing for selected university
- **Teachers:** Teacher profiles with rating interface
- **Not Found:** 404 error page

### **UI Components**
- **Breadcrumb:** Navigation component
- **Rating Components:** Slider for rating input & history visualization
- **Form Components:** With validation
- **Layout Components:** Cards, buttons, dialogs, navigation

---

## **Data Flow**

### **Client-Side State Management**
- TanStack Query for API calls & caching
- LocalStorage for temporary review storage
- React Hook Form for form state & validation

### **API Integration**
- Query Client with custom fetch functions
- Authentication ready (session-based)
- Unified error responses with toast notifications

### **Data Storage**
- **Primary:** PostgreSQL via Drizzle ORM
- **Temporary:** LocalStorage for dev
- **Sessions:** Express sessions (PostgreSQL store)

---

## **External Dependencies**

### **Core Dependencies**
- `@neondatabase/serverless`
- `drizzle-orm`
- `@tanstack/react-query`
- `wouter`
- `@radix-ui/*`
- `tailwindcss`
- `recharts`

### **Dev Dependencies**
- `vite`
- `typescript`
- `@replit/vite-plugin-*`

---

## **Deployment Strategy**

### **Build Process**
- **Frontend:** `vite build` → `dist/public`
- **Backend:** `esbuild` → `dist/index.js`
- **Database:** `db:push` for Drizzle migrations

### **Environment Configuration**
- `DATABASE_URL` (PostgreSQL)
- Dev: `tsx` with hot reload
- Prod: Node.js runs compiled JS bundle

### **Replit Integration**
- Dev Banner, Error Overlay
- Cartographer for debugging

---

## **Project Structure**
```

├── client/ # React frontend
│ ├── src/
│ │ ├── components/ # UI components
│ │ ├── pages/ # Route components
│ │ ├── lib/ # Utilities and services
│ │ └── hooks/ # Custom React hooks
├── server/ # Express backend
│ ├── routes.ts # API routes
│ ├── storage.ts # Database interface
│ └── vite.ts # Dev server setup
├── shared/ # Shared types and schemas
└── migrations/ # Database migrations
```
---

## **Key Features**
- Responsive design (Tailwind)
- Type safety (TypeScript)
- Real-time features (ready for WebSockets)
- Scalable modular design
- Accessibility (Radix UI WCAG)
- Performance-focused architecture

---

## **License**
This project is proprietary and intended for internal use.
