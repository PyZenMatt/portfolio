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
- ✅ Ready for future "Project Details" page (routing prepared)
- ✅ SEO-friendly semantic HTML
- ✅ Full accessibility (keyboard navigation, ARIA labels)
- ✅ Dark mode with proper contrast ratios

**Testing:**
- ProjectCard: 9 tests (render, title, badges, CTA, disabled state, images)
- ProjectsSection: 8 tests (loading, cards, CTA link, data fetching)
- Projects Page: 11 tests (filters, empty state, loading, card rendering)

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

## ✅ Completed Features

- ✅ **Routing & Layout** - React Router with lazy loading
- ✅ **Dark Mode** - Theme context with localStorage persistence
- ✅ **Navigation** - Responsive navbar with mobile menu and animations
- ✅ **Page Structure** - All main pages complete (Home, Projects, About, Contact)
- ✅ **Design System** - Button, Card, Input, Textarea, Badge, Hamburger components
- ✅ **Hero Section** - Complete landing section with CTA and responsive layout
- ✅ **Projects Section** - Full portfolio showcase with filtering, TanStack Query, and 28 tests
- ✅ **Contact Form** - React Hook Form validation, toast notifications, 13 tests
- ✅ **About Page** - Professional bio, categorized skills grid, technical timeline, 26 tests (103 total)

## 🎯 TODO

- [ ] Implement project detail pages with routing
- [ ] Connect contact form to Django backend (mock currently)
- [ ] Add animations and micro-interactions
- [ ] Optimize images and lazy loading
- [ ] SEO optimization (meta tags, Open Graph)
