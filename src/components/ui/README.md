# Portfolio - Matteo Ricci

Professional portfolio built with modern web technologies.

## 🛠️ Tech Stack

- **React 18+** - UI library
- **TypeScript** - Type safety (strict mode enabled)
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first styling
- **React Router v6.23+** - Client-side routing
- **React Hook Form** - Form handling
- **TanStack Query** - Data fetching and caching
- **Vitest + RTL** - Unit testing
- **ESLint + Prettier** - Code quality

## 📂 Project Structure

```
src/
  app/              # Router and providers
  components/
    ui/             # Reusable UI components
    layout/         # Layout components (Navbar, Footer)
    sections/       # Page sections (Hero, Projects)
  pages/            # Route pages
  contexts/         # React contexts
  hooks/            # Custom hooks
  lib/              # Utilities and helpers
  styles/           # Global styles
    globals.css
```

## 🚀 Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Run tests
npm run test
```

## 📋 Naming Conventions

- **Components**: `PascalCase` (e.g., `Button.tsx`)
- **Functions/Variables**: `camelCase` (e.g., `handleClick`)
- **Files**: `kebab-case` for configs, `PascalCase` for components
- **Boolean props**: `isOpen`, `isActive`, `isDisabled`

## ✅ Code Quality

- TypeScript strict mode enabled
- ESLint configured with React, TypeScript, and React Hooks rules
- Prettier for consistent formatting
- No `any` types allowed
- No unused code or console logs in production

## 🎨 Design System

The project uses a consistent design system with reusable UI components.

### UI Components

All components are located in `src/components/ui/` and follow these principles:

- **Type-safe** - Full TypeScript support with proper prop interfaces
- **Variants** - Support for different visual styles
- **Dark mode** - Automatic theme adaptation
- **Composable** - Use `cn()` utility for className merging
- **Accessible** - Semantic HTML and ARIA support

#### Available Components

**Button** - `variant`: primary, secondary, ghost | `size`: sm, md, lg
```tsx
<Button variant="primary" size="md">Click me</Button>
```

**Card** - Flexible container with shadow and border
```tsx
<Card as="section">Content here</Card>
```

**Input** - Form input with error states
```tsx
<Input isInvalid={hasError} placeholder="Enter text" />
```

**Textarea** - Multi-line input with error states
```tsx
<Textarea isInvalid={hasError} rows={4} />
```

**Badge** - `variant`: default, success, warning, danger
```tsx
<Badge variant="success">Active</Badge>
```

### Utility Functions

- **`cn()`** - Merges Tailwind classes safely using `clsx` and `tailwind-merge`

### Typography System (Minimalismo Tecnico 2025)

The portfolio uses a modern, minimal typography scale designed for optimal readability and visual hierarchy.

#### Typography Scale

| Element | Class | Responsive | Weight |
|---------|-------|------------|--------|
| H1 | `text-5xl md:text-6xl` | Yes | `font-bold tracking-tight` |
| H2 | `text-3xl md:text-4xl` | Yes | `font-semibold tracking-tight` |
| H3 | `text-2xl` | No | `font-semibold` |
| H4 | `text-xl` | No | `font-medium` |
| H5 | `text-lg` | No | `font-medium` |
| Body | `text-base` | No | `leading-relaxed` |
| Small | `text-sm` | No | `text-[var(--color-text-secondary)]` |

#### Font Stack

- **Primary**: Inter (system-ui, -apple-system fallbacks)
- **Color Palette**: CSS Variables (Issue 13.2b Palette Enforcement)
  - Primary: `text-[var(--color-text)]`
  - Secondary: `text-[var(--color-text-secondary)]`
  - Surface/Border: `bg-[var(--color-surface)]` / `border-[color:var(--color-surface)]`

#### Implementation

Typography defaults are defined in:
- `tailwind.config.js` - Custom fontSize scale with line-heights
- `src/styles/globals.css` - Base layer defaults for h1-h6, body, small + CSS variables

#### Usage Examples

```tsx
// Page Title (H1)
<h1 className="text-5xl md:text-6xl font-bold tracking-tight text-[var(--color-text)]">
  Page Title
</h1>

// Section Heading (H2)
<h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[var(--color-text)]">
  Section Title
</h2>

// Card Title (H3)
<h3 className="text-2xl font-semibold text-[var(--color-text)]">
  Card Title
</h3>

// Body Text
<p className="text-base leading-relaxed text-[var(--color-text-secondary)]">
  Body content with comfortable line height.
</p>

// Muted/Secondary Text
<p className="text-sm text-[var(--color-text-secondary)]">
  Secondary information or metadata.
</p>
```

## 🏠 Homepage

### Hero Section

The Hero Section is the main landing area featuring:

**Structure:**
- Responsive two-column layout (stacks on mobile)
- Headline with name and role badge
- Descriptive subheadline highlighting skills
- CTA buttons for navigation
- Portrait image placeholder with fallback icon

**Features:**
- ✅ Semantic HTML (`<section>`, `<h1>`, proper heading hierarchy)
- ✅ Mobile-first responsive design
- ✅ Dark mode support with proper contrast
- ✅ Accessible with proper ARIA labels
- ✅ CTA navigation to Projects page
- ✅ Download CV button (ready for asset)
- ✅ Keyboard navigation friendly

**Components Used:**
- `Button` (primary and ghost variants)
- `Badge` (role indicator)

## 💼 Projects Section

### Complete Portfolio Showcase

The Projects section demonstrates full-stack development capabilities with a professional, filterable portfolio:

**Data Architecture:**
- **Project Model** (`src/lib/projects.ts`) - TypeScript interface defining project structure
- **Mock Data** - 6 realistic projects showcasing diverse tech stacks
- **TanStack Query** - Custom `useProjects()` hook with simulated API fetch
- **Type Safety** - Full TypeScript coverage with proper interfaces

**Project Structure:**
```typescript
interface Project {
  id: string
  title: string
  description: string
  tech: string[]      // Technology stack
  image?: string      // Optional project screenshot
  repoUrl?: string    // GitHub repository
  liveUrl?: string    // Live demo URL
}
```

**Components:**

**ProjectCard** (`src/components/sections/ProjectCard.tsx`)
- Responsive card layout with aspect-ratio image
- Project title, description, and tech badges
- Dynamic "View Project" CTA (opens live URL or repo)
- Hover effects with scale and shadow transitions
- Placeholder image fallback with icon
- Full dark mode support

**ProjectsSection** (`src/components/sections/ProjectsSection.tsx`)
- Featured projects on homepage (top 4)
- Responsive grid: 1 column mobile → 2 columns tablet
- "View All Projects" CTA to dedicated page
- Loading state with skeleton feedback

**Projects Page** (`src/pages/Projects/index.tsx`)
- Complete project listing with all 6 projects
- **Tech Filters** - All, React, Django, Python, Blockchain, TypeScript
- Active filter highlighting with primary button variant
- Filtered results with `useMemo` optimization
- Empty state with "Show All Projects" reset button
- Responsive grid: 1 → 2 → 3 columns (mobile → tablet → desktop)
- Loading state during data fetch

**Features:**
- ✅ TanStack Query for data fetching with loading states
- ✅ Client-side filtering with React state
- ✅ Responsive multi-column grids
- ✅ External link handling with proper `target="_blank"` and security
- ✅ Empty state UX when no results match filter
- ✅ Project Details page with dynamic routing
- ✅ SEO-friendly semantic HTML
- ✅ Full accessibility (keyboard navigation, ARIA labels)
- ✅ Dark mode with proper contrast ratios

**Testing:**
- ProjectCard: 9 tests (render, title, badges, CTA, disabled state, images)
- ProjectsSection: 8 tests (loading, cards, CTA link, data fetching)
- Projects Page: 14 tests (filters, empty state, loading, card rendering)

## 📄 Project Details Page

### Dynamic Case Study Layout

The Project Details page provides an in-depth view of each project, serving as a professional case study for portfolio review:

**Route Configuration:**
- Dynamic route: `/projects/:id`
- Lazy loaded component for performance
- ProjectsErrorBoundary for error isolation

**Page Structure:**

**Header Section:**
- Project title (H1) with semantic heading
- Project description as subtitle
- Tech stack badges for quick tech identification
- CTA buttons:
  - "View Repository" - Links to GitHub (when available)
  - "Live Demo" - Links to live project (when available)
- Both CTAs open in new tab with `rel="noopener noreferrer"` security

**Main Content Sections:**
- **Overview** - Extended project description with context and motivation
- **Key Features** - Bulleted list of main project features with checkmark icons
- **Technologies Used** - Visual tech stack display with styled chips
- **Screenshots** - Gallery of project screenshots (SVG placeholders ready for real images)
- **Technical Approach** - Description of development practices and architecture

**Sidebar (Desktop):**
- **Project Info Card:**
  - Status badge (In Production / In Progress / Archived / Demo)
  - Created date
  - Last Updated date
- **Related Projects:**
  - 3 projects with overlapping tech stack
  - Links to navigate to related project details

**Data Model Extended:**
```typescript
interface Project {
  id: string
  title: string
  description: string
  longDescription?: string      // For Overview section
  features?: string[]           // For Key Features list
  tech: string[]
  image?: string
  screenshots?: string[]        // Gallery images
  repoUrl?: string
  liveUrl?: string
  status?: ProjectStatus        // 'in-production' | 'in-progress' | 'archived' | 'demo'
  createdAt?: string            // ISO date string
  updatedAt?: string            // ISO date string
}
```

**Loading States:**
- `ProjectDetailsSkeleton` - Full page skeleton with:
  - Header skeleton (title, description, badges, buttons)
  - Section skeletons (overview, features, screenshots)
  - Sidebar skeleton (info card, related projects)
- Skeleton uses `animate-pulse` for shimmer effect
- Proper `role="status"` and `aria-label` for accessibility

**Error Handling:**
- `ProjectsErrorBoundary` wraps page content
- Retry button triggers TanStack Query refetch
- Error state shows warning icon with retry option

**Not Found State:**
- Custom SEO: "Project Not Found — Matteo Ricci"
- `EmptyState` component with:
  - "Project not found" heading
  - Descriptive message
  - "View All Projects" CTA button
- Back to Projects link for navigation

**SEO Dynamic:**
```tsx
<Seo
  title={`${project.title} — Matteo Ricci`}
  description={project.description}
  canonical={`https://matteoricci.net/projects/${id}`}
/>
```

**Accessibility Features:**
- ✅ Semantic HTML with proper heading hierarchy (H1 → H2 → H3)
- ✅ External links with `target="_blank"` and security attributes
- ✅ Focus-visible rings on all interactive elements
- ✅ Back link with arrow icon for clear navigation
- ✅ Proper alt text on all images
- ✅ Related projects as accessible links

**Testing:**
- ProjectDetails: 33 tests covering:
  - Route rendering and loading states
  - Not-found state (4 tests)
  - Project content display (9 tests)
  - CTA buttons and security (5 tests)
  - Sidebar info and related projects (5 tests)
  - Dynamic SEO tags (4 tests)
  - Different project types (3 tests)

## 🧭 Responsive Navigation

### Navbar with Mobile Menu

The Navbar adapts seamlessly to all screen sizes with professional UX:

**Desktop View:**
- Horizontal navigation with inline links
- Active route highlighting with distinct background
- Theme toggle button always visible

**Mobile View:**
- Compact header with logo and hamburger menu
- Animated hamburger icon (three lines → X when open)
- Full-screen overlay menu with touch-friendly buttons
- Theme toggle accessible in mobile header

**Accessibility Features:**
- ✅ Proper ARIA labels (`aria-label`, `aria-expanded`, `aria-hidden`)
- ✅ Keyboard navigation with Escape key to close menu
- ✅ Focus management for screen readers
- ✅ Semantic HTML with `<nav>` and proper roles

**User Experience:**
- ✅ Smooth animations for menu open/close transitions
- ✅ Body scroll lock when mobile menu is open
- ✅ Auto-close menu on route navigation
- ✅ Active link visual feedback on all devices

**Implementation:**
- Custom `useMobileMenu` hook for state management
- `Hamburger` component for animated menu button
- Responsive breakpoints using Tailwind `md:` utilities
- Mobile-first design approach

## 📬 Contact Form

### Professional Form with Validation

A fully functional contact form with client-side validation and elegant UX:

**Form Fields:**
- **Name** - Required, minimum 2 characters
- **Email** - Required, valid email format validation
- **Message** - Required, minimum 10 characters

**React Hook Form Integration:**
```typescript
const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()
```

**Validation Features:**
- ✅ Real-time inline validation with error messages
- ✅ Field-level error states (red borders, descriptive text)
- ✅ Submit button disabled during submission
- ✅ Form reset after successful submission
- ✅ Toast notifications for success/error feedback

**Toast System:**
- Custom lightweight implementation (`src/components/ui/Toast.tsx`)
- Context-based state management with `ToastProvider`
- Auto-dismiss after 3 seconds
- Success (green) and error (red) variants
- Slide-in animation from right
- Fixed position top-right corner
- Full dark mode support
- Accessible with ARIA live regions

**Accessibility:**
- ✅ Proper `<label>` with `htmlFor` attributes
- ✅ `aria-invalid` on error states
- ✅ `aria-describedby` linking errors to fields
- ✅ Visible focus rings with proper contrast
- ✅ Keyboard navigation support
- ✅ Screen reader friendly error messages

**User Experience:**
- ✅ Loading state with "Sending..." text
- ✅ Clear visual feedback for validation errors
- ✅ Non-intrusive toast notifications (no alerts)
- ✅ Smooth transitions and animations
- ✅ Mobile-friendly touch targets
- ✅ Responsive layout (max-width 600px)

**Architecture:**
- `ContactForm.tsx` - Form component with validation logic
- `toastContext.ts` - Separate context for Fast Refresh compliance
- `useToast.ts` - Custom hook for toast management
- Mock submit handler (800ms delay) - ready for Django backend (Issue #12)

**Testing:**
- 13 comprehensive tests covering:
  - Form rendering and field presence
  - Validation errors (empty, min length, email format)
  - Submit behavior and loading states
  - Toast visibility after submission
  - Form reset functionality
  - Accessibility attributes

## ℹ️ About Page

### Professional Bio + Skills + Timeline

The About page provides a comprehensive professional overview without fluff:

**Bio Section:**
- 3 concise paragraphs focusing on technical expertise
- Emphasis on Django, React, TypeScript stack
- DevOps and AI integration experience
- Professional tone without unnecessary storytelling

**Skills Grid** (`src/components/sections/SkillsGrid.tsx`)
- Categorized technical skills in 4 groups:
  - **Frontend**: React, TypeScript, Vite, TailwindCSS, Next.js, React Router
  - **Backend**: Django, Django REST Framework, PostgreSQL, Python, REST API
  - **DevOps**: Docker, GitHub Actions, CI/CD, Linux
  - **AI**: Prompt Engineering, LLM Integration, AI Workflows
- Card-based layout with Badge components
- Typed skills array with category interface
- Responsive grid adapting to screen size

**Timeline** (`src/components/sections/Timeline.tsx`)
- Vertical timeline with 4 key milestones:
  - 2023: Python Foundation
  - 2024: Full-Stack Development
  - 2024: Major Projects Launch (BlogManager, MessyMind, SchoolPlatform)
  - 2025: Modern Stack & AI Integration
- Visual timeline with:
  - Border-left separator line
  - Blue dot indicators with ring
  - Year badges with accent colors
  - Title and description for each entry

**Features:**
- ✅ Type-safe skill and timeline data structures
- ✅ Semantic HTML with proper heading hierarchy
- ✅ Responsive layout with max-width container
- ✅ Dark mode support throughout
- ✅ Card components for visual grouping
- ✅ Badge system for skill tags
- ✅ Accessible timeline with ARIA-friendly structure

**Testing:**
- SkillsGrid: 8 tests (categories, skill count, grouping)
- Timeline: 7 tests (entries, years, structure)
- About Page: 11 tests (sections, content, accessibility)
- **26 new tests** - 103 total passing

## 🔍 SEO System

Professional SEO implementation with dynamic meta tags and Open Graph support.

### Meta Tags Generated

Each page automatically generates:
- `<title>` - Unique page-specific title
- `<meta name="description">` - Tailored description for each page
- `<meta property="og:title">` - Open Graph title for social sharing
- `<meta property="og:description">` - Open Graph description
- `<meta property="og:url">` - Canonical URL for the page
- `<meta property="og:type">` - Set to "website"
- `<link rel="canonical">` - Canonical URL to avoid duplicate content

### Usage

The `<Seo>` component is used in every page:

```tsx
import Seo from '../../components/seo/Seo'

<Seo
  title="Projects — Matteo Ricci"
  description="Portfolio progetti di Matteo Ricci: applicazioni full-stack con React, Django, TypeScript."
  canonical="https://matteoricci.net/projects"
/>
```

### Page-Specific Metadata

- **Home**: "Matteo Ricci — Full-Stack Developer" - Main portfolio landing
- **Projects**: "Projects — Matteo Ricci" - Portfolio projects showcase
- **About**: "About — Matteo Ricci" - Bio, skills, technical journey
- **Contact**: "Contact — Matteo Ricci" - Contact form and collaboration opportunities

### Favicon & Web Manifest

- `/favicon.svg` - SVG favicon with "M" letter in blue circle
- `/icon-192.png` & `/icon-512.png` - PNG icons for PWA and mobile
- `/site.webmanifest` - Web app manifest for installation
- `<html lang="it">` - Italian language declaration

### Semantic HTML

All pages follow proper HTML semantics:
- ✅ Each page has exactly 1 `<h1>` tag
- ✅ Sections wrapped in `<section>` elements
- ✅ Proper heading hierarchy (h1 → h2 → h3)
- ✅ Accessible ARIA labels where needed

### Future Enhancements

Note: Full SEO optimization including `robots.txt`, sitemap.xml, and structured data will be implemented in Issue #16 during deployment configuration.

**Testing:**
- Seo Component: 11 tests (title, meta tags, og tags, canonical, fallbacks, updates)
- Page SEO Integration: 4 tests (Home, Projects, About, Contact verify correct titles and descriptions)
- **15 new SEO tests** - 129 total passing

## ♿ Accessibility Baseline (A11y)

Professional accessibility implementation achieving WCAG 2.1 AA-level standards.

### Skip Link

Skip navigation link for keyboard users:
- Visually hidden by default (sr-only class)
- Appears on keyboard focus with proper styling
- Links to `#main-content` landmark
- Smooth scroll behavior to main content area
- Positioned before all other content

### Focus Management

Consistent focus indicators across all interactive elements:
- ✅ Visible focus ring with `focus-visible:ring-2`
- ✅ High contrast focus indicators (blue-600 primary)
- ✅ Ring offset for better visibility
- ✅ Applied to: buttons, inputs, textareas, links, filter buttons
- ✅ Keyboard-only focus (no mouse focus rings)

### Landmark Roles

Semantic HTML5 landmarks with explicit ARIA roles:
- `<header role="banner">` - Site header with navigation
- `<nav role="navigation" aria-label="Main navigation">` - Primary navigation
- `<main id="main-content" role="main" tabIndex={-1}>` - Main content area (focusable)
- `<footer role="contentinfo">` - Site footer

### Mobile Menu Accessibility

Full keyboard and screen reader support:
- ✅ Hamburger button: `aria-expanded={isOpen}` state
- ✅ Mobile menu: `aria-hidden={!isOpen}` visibility
- ✅ Dynamic `aria-label`: "Open menu" / "Close menu"
- ✅ ESC key closes menu
- ✅ Focus trap when menu is open
- ✅ Smooth animations with accessibility in mind

### Form Accessibility

Contact form with complete ARIA support:
- ✅ Error messages: `role="alert"` for screen readers
- ✅ Invalid inputs: `aria-invalid={true}` attribute
- ✅ Error linking: `aria-describedby` connects errors to inputs
- ✅ Proper `<label>` associations with `htmlFor`
- ✅ Required fields marked with visual and semantic indicators

### Alt Text

All images have descriptive alternative text:
- Hero portrait: `alt="Portrait of Matteo Ricci"`
- Project images: `alt={project.title}`
- Decorative SVG icons marked appropriately
- No images without alt attributes

### Contrast Ratios

WCAG AA-level contrast verified:
- ✅ Text colors: gray-900/white on backgrounds
- ✅ Button variants: blue-600/blue-700 with white text
- ✅ Badge variants: proper foreground/background contrast
- ✅ Dark mode: adjusted colors for accessibility
- ✅ Links: distinguishable from body text

### Keyboard Navigation

Complete keyboard-only usability:
- ✅ Tab order follows logical flow
- ✅ All interactive elements reachable via keyboard
- ✅ No keyboard traps (except intentional focus management)
- ✅ Enter/Space activate buttons and links
- ✅ ESC closes modals and mobile menu
- ✅ Arrow keys for future component enhancements

### Screen Reader Support

Optimized for assistive technology:
- ✅ Semantic HTML structure
- ✅ ARIA labels on navigation regions
- ✅ Live regions for dynamic content (toasts with role="alert")
- ✅ Hidden decorative elements from screen readers
- ✅ Meaningful link text (no "click here")
- ✅ Form error announcements

**Testing:**
- SkipLink: 5 tests (render, href, sr-only, focus, keyboard)
- PageLayout: 7 tests (landmarks, banner, main, footer, skip link position)
- Navbar: +1 test (aria-label verification)
- ContactForm: +4 tests (role="alert", aria-invalid, aria-describedby)
- **16 new accessibility tests** - 145 total passing

## ⚠️ Error Handling & Loading States

Enterprise-level error boundaries, skeleton loaders, and empty states for production-ready UX.

### Error Boundaries

Professional error isolation preventing entire app crashes:

**Global ErrorBoundary** (`src/components/system/ErrorBoundary.tsx`)
- Class component using `getDerivedStateFromError()` lifecycle
- Catches errors from any child component tree
- Logs errors to `console.warn()` for debugging (not console.error to avoid noise)
- Fallback UI with red error icon and descriptive message
- **Retry mechanism** - "Try Again" button resets error state
- **Navigation escape** - "Go to Home" button for user recovery
- Dev mode: displays `error.message` for debugging
- Optional `onReset` callback for custom retry logic

**ProjectsErrorBoundary** (`src/components/sections/ProjectsErrorBoundary.tsx`)
- Specialized boundary for Projects section errors
- Yellow warning icon (less alarming than global red)
- Context-specific message: "Unable to load projects. Please try again."
- **Retry with refetch** - Calls `onRetry()` prop to trigger TanStack Query refetch
- Resets `hasError` state on retry attempt
- Wraps both ProjectsSection and Projects page

**Usage Pattern:**
```tsx
// Global error boundary in App.tsx
<ErrorBoundary>
  <AppProviders>
    <AppRouter />
  </AppProviders>
</ErrorBoundary>

// Component-specific boundary
<ProjectsErrorBoundary>
  <ProjectsContent />
</ProjectsErrorBoundary>
```

### Skeleton Loaders

Shimmer-effect loading states improving perceived performance:

**Skeleton Component** (`src/components/ui/Skeleton.tsx`)
- Base skeleton with `animate-pulse` Tailwind animation
- Background: `bg-gray-200 dark:bg-gray-700`
- Accessibility: `role="status" aria-label="Loading..."`
- **3 variants**:
  - `avatar`: Rounded-full circle for profile images
  - `text`: Height 4 (h-4) rounded bar for text lines
  - `card`: Rounded-lg block for card placeholders
- Composable with custom `className` for specific dimensions

**ProjectsSkeleton** (`src/components/sections/ProjectsSkeleton.tsx`)
- Grid of project card skeletons matching real card layout
- Configurable `count` prop (default 4)
- Each skeleton card includes:
  - `aspect-video` image skeleton
  - h-6 title skeleton
  - 2x h-4 description line skeletons
  - 3x rounded-full badge skeletons
- Responsive grid: 1 column mobile → 2 columns desktop
- Used in ProjectsSection (4 skeletons) and Projects page (6 skeletons)

**Loading State Integration:**
```tsx
if (isLoading) {
  return <ProjectsSkeleton count={6} />
}
```

### Empty States

User-friendly feedback for empty results with optional actions:

**EmptyState Component** (`src/components/ui/EmptyState.tsx`)
- Props: `title`, `description?`, `actionLabel?`, `onAction?`
- Gray archive box SVG icon (decorative)
- Centered layout with max-width 512px
- **h3 title** for semantic heading hierarchy
- **Optional description** with gray text
- **Optional action button** - Primary variant Button component
- `onAction` callback for reset/navigation logic

**Usage Examples:**
```tsx
// Projects page - no results after filtering
<EmptyState
  title={`No projects found for "${activeFilter}"`}
  description="Try selecting a different filter to see more projects."
  actionLabel="Show All Projects"
  onAction={() => setActiveFilter('All')}
/>

// Projects section - no projects at all
<EmptyState
  title="No projects available"
  description="Check back soon for updates."
/>
```

### Implementation Highlights

**Wrapper Pattern:**
Content components split from error boundary wrappers:
- `ProjectsSection` → wraps → `ProjectsSectionContent`
- `Projects` page → wraps → `ProjectsContent`
- Clean separation of concerns
- Error boundaries catch errors in content logic
- Loading and error states isolated

**Console Logging:**
- Error boundaries use `console.warn()` not `console.error()`
- Rationale: Error boundaries are expected error handling, not unexpected crashes
- Logged errors include: `error.message`, `error.stack`, component stack trace

**Accessibility:**
- Skeletons: `role="status"` with `aria-label="Loading..."`
- Empty states: Proper heading hierarchy (h3)
- Error fallbacks: Semantic button elements with descriptive text
- All interactive elements keyboard-accessible

**Architecture Benefits:**
- ✅ Prevents full app crashes from component errors
- ✅ Improves perceived performance with skeleton feedback
- ✅ Professional empty state UX instead of blank pages
- ✅ Retry mechanisms reduce user frustration
- ✅ Component-specific boundaries isolate failures
- ✅ Enterprise-level error handling patterns

**Testing:**
- ErrorBoundary: 8 tests (catches errors, fallback UI, retry, console.warn, dev mode)
- ProjectsErrorBoundary: 7 tests (warning icon, retry callback, state reset)
- Skeleton: 9 tests (variants, aria-label, animate-pulse, dark mode)
- ProjectsSkeleton: 9 tests (grid, count prop, structure, responsive)
- EmptyState: 12 tests (title, description, action button, onAction callback)
- **45 error handling tests** - part of 222 total

## ✅ Completed Features

- ✅ **Routing & Layout** - React Router with lazy loading and dynamic routes
- ✅ **Dark Mode** - Theme context with localStorage persistence
- ✅ **Navigation** - Responsive navbar with mobile menu and animations
- ✅ **Page Structure** - All main pages complete (Home, Projects, ProjectDetails, About, Contact)
- ✅ **Design System** - Button, Card, Input, Textarea, Badge, Hamburger, Skeleton, EmptyState components
- ✅ **Hero Section** - Complete landing section with CTA and responsive layout
- ✅ **Projects Section** - Full portfolio showcase with filtering, TanStack Query, and 28 tests
- ✅ **Project Details** - Dynamic case study page with extended data model, 33 tests (222 total)
- ✅ **Contact Form** - React Hook Form validation, toast notifications, 13 tests
- ✅ **About Page** - Professional bio, categorized skills grid, technical timeline, 26 tests
- ✅ **SEO System** - Dynamic meta tags, Open Graph, favicon, manifest, semantic HTML, 15 tests
- ✅ **Accessibility (A11y)** - Skip link, landmarks, ARIA, keyboard nav, AA contrast, 16 tests
- ✅ **Error Handling & Loading** - Error boundaries, skeleton loaders, empty states, retry logic, 45 tests

## 🎯 TODO

- [ ] Connect contact form to Django backend (mock currently)
- [ ] Add animations and micro-interactions
- [ ] Optimize images and lazy loading
- [ ] Production deployment (robots.txt, sitemap.xml - Issue #16)
