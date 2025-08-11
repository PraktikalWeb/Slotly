# Slotly - South African DTLC Slot Alert & Notification Service

## Overview

Slotly is a modern web application designed to help South Africans monitor and book driving license test slots at DTLC (Driving License Testing Centers) across the country. The application provides instant notifications when slots become available at preferred centers, catering to both individual users and driving schools with different subscription tiers. Built with a full-stack architecture using React, Express, and PostgreSQL, the platform emphasizes a clean, responsive design with real-time monitoring capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using functional components and hooks
- **Routing**: Wouter for lightweight client-side routing with protected routes for authenticated users
- **State Management**: React Context API for authentication state, TanStack Query for server state management
- **UI Framework**: Shadcn/ui components built on Radix UI primitives with Tailwind CSS for styling
- **Form Handling**: React Hook Form with Zod schema validation for type-safe form management
- **Design System**: Mobile-first responsive design with a modern AI-tech aesthetic using blue, purple, and white color schemes

### Backend Architecture
- **Runtime**: Node.js with Express.js server framework
- **Language**: TypeScript with ES modules for modern JavaScript features
- **API Design**: RESTful API endpoints with proper error handling and request logging middleware
- **Data Validation**: Zod schemas shared between client and server for consistent validation
- **Session Management**: In-memory storage for development with planned JWT authentication

### Data Storage Architecture
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Schema Design**: Normalized relational structure with users, DTLC centers, user preferences, notifications, and statistics tables
- **Migration System**: Drizzle Kit for database schema migrations and version control
- **Connection**: Neon Database serverless PostgreSQL for cloud deployment

### Authentication & Authorization
- **Strategy**: JWT-based authentication with user sessions stored in localStorage
- **User Types**: Role-based access with individual users and driving schools having different subscription tiers
- **Route Protection**: Client-side route guards that redirect unauthenticated users to login
- **Context Management**: React Context provides authentication state throughout the application

## External Dependencies

### Database Services
- **Neon Database**: Serverless PostgreSQL database hosting with connection pooling
- **Drizzle ORM**: Type-safe database toolkit with PostgreSQL dialect support

### UI Component Libraries
- **Radix UI**: Comprehensive set of accessible, unstyled UI primitives for dialogs, dropdowns, forms, and navigation
- **Shadcn/ui**: Pre-built component library providing consistent design patterns
- **Tailwind CSS**: Utility-first CSS framework for rapid styling and responsive design
- **Lucide React**: Icon library providing consistent iconography throughout the application

### Development Tools
- **Vite**: Build tool and development server with hot module replacement and optimized bundling
- **TypeScript**: Static type checking for enhanced developer experience and code reliability
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Autoprefixer for browser compatibility

### Monitoring & Analytics
- **TanStack Query**: Server state management with caching, background updates, and optimistic updates
- **Real-time Updates**: Polling-based system for notification counts with 30-second intervals
- **Error Handling**: Comprehensive error boundaries and user-friendly error messages