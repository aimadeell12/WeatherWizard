# ArabWeather Pro - تطبيق طقس العرب المطور

## Overview

ArabWeather Pro is a comprehensive full-stack weather application built with React and Express that provides accurate weather data and forecasts for cities worldwide. The app features a modern, responsive design with complete Arabic language support and RTL layout, integrating with WeatherAPI.com to deliver precise weather information. The application uses a beautiful purple color theme with gradients, displays all numbers in English numerals with Gregorian calendar for better readability, and includes a stunning custom SVG icon with weather elements.

## User Preferences

Preferred communication style: Simple, everyday language.
Display preferences: English numbers, Gregorian calendar, purple color theme with gradients.
App Identity: ArabWeather Pro (English name), طقس العرب المطور (Arabic name).

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state management
- **UI Components**: Radix UI primitives with shadcn/ui styling system
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Language**: Arabic UI with RTL support

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API endpoints for weather data and city search
- **Development**: Hot reload with Vite integration in development mode
- **Error Handling**: Centralized error handling middleware

### Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM
- **Connection**: Neon Database serverless connection
- **Schema**: User management and favorite cities storage
- **Migrations**: Drizzle Kit for database schema management
- **Development Storage**: In-memory storage implementation for development

## Key Components

### Weather Service Integration
- **Provider**: OpenWeatherMap API integration
- **Features**: City search, current weather, and forecast data
- **API Endpoints**: 
  - `/api/cities/search` - Search for cities by name
  - `/api/weather` - Get weather data by coordinates
  - `/api/favorites` - Manage user's favorite cities

### UI Components
- **Weather Display**: Current weather cards with temperature, conditions, and forecast (purple theme)
- **City Search**: Auto-complete search with city suggestions
- **Navigation**: Enhanced bottom navigation with Lucide React icons, gradient buttons and smooth animations
- **Responsive Design**: Optimized for both mobile and desktop viewing with RTL support
- **Number Display**: All numbers shown in English numerals with forced Western Arabic numerals
- **Date Display**: Gregorian calendar with Arabic month names but English numbers
- **App Icon**: Custom SVG icon with weather elements (sun, clouds, rain, thermometer) in purple gradient
- **Favorites System**: Add/remove cities from favorites with heart icon and localStorage persistence

### User Management
- **Schema**: Users table with username/password authentication
- **Favorites**: Users can save and manage favorite cities
- **Session Management**: Express session handling (configured for PostgreSQL)

## Data Flow

1. **User Search**: User types city name → Frontend calls `/api/cities/search` → Backend queries WeatherAPI.com search endpoint → Returns city suggestions
2. **Weather Data**: User selects city → Frontend calls `/api/weather` with coordinates → Backend fetches current weather and forecast from WeatherAPI → Returns formatted weather data
3. **Favorites**: User can save cities → Frontend calls `/api/favorites` → Backend stores in database → User can view saved cities

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL connection
- **drizzle-orm**: Type-safe database ORM
- **@tanstack/react-query**: Server state management
- **@radix-ui/react-***: Unstyled UI primitives
- **tailwindcss**: Utility-first CSS framework
- **wouter**: Lightweight React router

### Development Dependencies
- **vite**: Build tool and development server
- **tsx**: TypeScript execution for Node.js
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay
- **@replit/vite-plugin-cartographer**: Replit-specific development tooling

### External APIs
- **WeatherAPI.com**: Weather data and city geocoding with Arabic language support
- **Required Environment Variables**: `WEATHERAPI_KEY`, `DATABASE_URL`

### SEO Implementation
- **Complete SEO meta tags**: Title, description, keywords, author, robots
- **Open Graph tags**: Facebook and social media sharing optimization
- **Twitter Cards**: Enhanced Twitter sharing appearance
- **Structured Data**: JSON-LD schema for search engines
- **PWA Support**: Web App Manifest for installable app experience
- **Canonical URLs**: Proper URL canonicalization
- **Preloading**: Critical resource preloading for performance

## Deployment Strategy

### Build Process
1. **Frontend**: Vite builds React app to `dist/public`
2. **Backend**: esbuild bundles Express server to `dist/index.js`
3. **Database**: Drizzle migrations applied via `db:push` command

### Environment Configuration
- **Development**: Uses Vite dev server with Express API proxy
- **Production**: Serves built React app from Express static middleware
- **Database**: PostgreSQL connection via environment variable

### Scripts
- `npm run dev`: Development mode with hot reload
- `npm run build`: Production build for both frontend and backend
- `npm start`: Start production server
- `npm run db:push`: Apply database schema changes

The application is designed to be deployed on platforms like Replit, Vercel, or similar hosting services that support Node.js applications with PostgreSQL databases.