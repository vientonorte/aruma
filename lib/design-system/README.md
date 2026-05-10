# ĀRŪḾA Design System

Comprehensive design system built with atomic design principles, inspired by the ARUMA brand identity and logo.

## 🎨 Design Philosophy

### Design Thinking Approach

1. **Empathize**: Understanding the needs of a premium photography and safe space booking platform
2. **Define**: Creating a design language that conveys security, professionalism, and organic beauty
3. **Ideate**: Extracting visual elements from the brand logo (botanical patterns, geometric forms)
4. **Prototype**: Building reusable components following atomic design
5. **Test**: Ensuring WCAG 2.1 AA accessibility compliance

### Brand Identity Analysis

From the ARUMA logo, we extracted:

- **Typography**: Bold, geometric letterforms with wide tracking (0.3em)
- **Visual Elements**: Botanical/leaf patterns integrated into the design
- **Color Palette**: 
  - Primary: Black (#000000) and Off-white (#F5F5F7)
  - Accent: Botanical green (#3D9461) from leaf patterns
  - Neutrals: Dark grays for depth and hierarchy
- **Tone**: Professional, artistic, safe, premium

## 📐 Atomic Design Structure

### Tokens (Design Decisions)

Located in `lib/design-system/tokens/`:

- **Colors**: Brand colors, semantic colors, surface colors, text colors
- **Typography**: Font families, sizes, weights, line heights, letter spacing
- **Spacing**: 8px grid system for consistency
- **Radius**: Border radius values
- **Shadows**: Elevation system with dark mode variants
- **Animation**: Duration, easing functions, and Framer Motion presets

### Atoms (Basic Elements)

Located in `lib/design-system/atoms/`:

- **Button**: Interactive component with variants (primary, secondary, ghost, botanical)
- **Input/Textarea**: Form inputs with validation states
- **Badge**: Small status and label component
- **Card**: Container component with elevation variants
- **Typography**: Semantic text components (Heading, Text, Label, Caption, Overline)

### Molecules (Component Combinations)

Located in `lib/design-system/molecules/`:

- **FormField**: Complete form field with label, input, and error message
- **IconCard**: Card with icon, title, and description
- **StatusMessage**: Alert/notification component
- **Logo**: Brand logo with variants (full, compact, icon)

### Organisms (Complex Components)

Located in `lib/design-system/organisms/`:

- **Header**: Site-wide navigation header
- **Footer**: Site footer with links and branding
- **Hero**: Landing page hero section
- **BentoGrid**: Modern grid layout for content
- **BookingForm**: Complete secure booking form with validation

### Patterns (Brand Elements)

Located in `lib/design-system/patterns/`:

- **BotanicalPattern**: SVG-based decorative patterns inspired by logo leaf motifs
- **BotanicalBackground**: Scattered botanical patterns for backgrounds

## 🚀 Usage

### Import Components

```tsx
import {
  // Tokens
  theme, colors, typography, spacing,
  
  // Atoms
  Button, Input, Card, Heading, Text,
  
  // Molecules
  FormField, IconCard, Logo,
  
  // Organisms
  Header, Footer, Hero, BentoGrid, BookingForm,
  
  // Patterns
  BotanicalPattern, BotanicalBackground
} from '@/lib/design-system';
```

### Example: Button Component

```tsx
<Button variant="botanical" size="lg">
  Reservar ahora
</Button>
```

### Example: Hero Section

```tsx
<Hero
  title="ĀRŪḾA"
  subtitle="High-End Booking & Identity"
  description="Experiencia premium con seguridad por diseño"
  variant="botanical"
  primaryAction={{
    label: "Comenzar",
    onClick: () => {}
  }}
/>
```

### Example: Form

```tsx
<BookingForm
  variant="botanical"
  onSubmit={async (data) => {
    // Handle submission
    return { success: true };
  }}
/>
```

## ♿ Accessibility

All components follow WCAG 2.1 AA standards:

- Semantic HTML elements
- ARIA labels and descriptions
- Keyboard navigation support
- Focus visible states
- Color contrast ratios > 4.5:1
- Screen reader friendly

## 🎭 Variants

### Color Variants

- **default**: Standard dark theme
- **botanical**: Green accent variant with botanical patterns
- **elevated**: Enhanced depth with shadows
- **outlined**: Border-only variant

### Size Variants

- **sm**: Small (mobile-friendly)
- **md**: Medium (default)
- **lg**: Large (emphasis)
- **xl**: Extra large (hero elements)

## 🌿 Botanical Pattern System

Inspired by the leaf patterns in the ARUMA logo:

```tsx
// Single pattern
<BotanicalPattern variant="leaf" size="lg" color="#3D9461" />

// Background scatter
<BotanicalBackground variant="scatter" density="medium" />
```

Variants:
- **leaf**: Simple leaf shape
- **branch**: Branch with leaves
- **scatter**: Scattered leaf elements
- **geometric**: Geometric plant-inspired forms

## 📱 Responsive Design

All components are mobile-first and responsive:

- Base styles for mobile
- `sm:` breakpoint at 640px
- `md:` breakpoint at 768px
- `lg:` breakpoint at 1024px
- `xl:` breakpoint at 1280px

## 🎬 Motion Design

Using Framer Motion for smooth, organic animations:

```tsx
import { animation } from '@/lib/design-system';

// Use predefined variants
<motion.div variants={animation.variants.slideUp} />
```

Easing functions inspired by natural movements:
- **botanical**: Bouncy, plant-like
- **elegant**: Smooth and refined
- **smooth**: Gentle and flowing

## 🔒 Security

- Input sanitization built-in
- XSS protection
- GDPR/LOPD consent flows
- Validation with Zod schemas

## 📦 File Structure

```
lib/design-system/
├── tokens/           # Design tokens
│   ├── colors.ts
│   ├── typography.ts
│   ├── spacing.ts
│   ├── radius.ts
│   ├── shadows.ts
│   └── animation.ts
├── atoms/           # Basic components
│   ├── button.tsx
│   ├── input.tsx
│   ├── textarea.tsx
│   ├── badge.tsx
│   ├── card.tsx
│   └── typography.tsx
├── molecules/       # Component combinations
│   ├── form-field.tsx
│   ├── icon-card.tsx
│   ├── status-message.tsx
│   └── logo.tsx
├── organisms/       # Complex components
│   ├── header.tsx
│   ├── footer.tsx
│   ├── hero.tsx
│   ├── bento-grid.tsx
│   └── booking-form.tsx
└── patterns/        # Brand patterns
    └── botanical.tsx
```

## 🎨 Color Palette

### Brand Colors

```
Black:       #000000
White:       #FFFFFF
Off-white:   #F5F5F7
Botanical:   #3D9461
```

### Surface Colors

```
Background:  #0A0A0A
Elevated:    #1C1C1E
Overlay:     #2C2C2E
```

### Text Colors

```
Primary:     #F5F5F7
Secondary:   #86868B
Tertiary:    #636366
Disabled:    #48484A
```

## 📝 Typography Scale

```
Display:  96px - 48px (0.3em tracking)
Heading:  60px - 20px (0.3em - 0em tracking)
Body:     18px - 16px (normal tracking)
Label:    14px - 12px (0.05em tracking)
Caption:  12px (normal tracking)
```

## 🤝 Contributing

When adding new components:

1. Follow atomic design principles
2. Ensure WCAG 2.1 AA compliance
3. Include TypeScript types
4. Add variants for flexibility
5. Document with JSDoc comments
6. Test with keyboard navigation

## 📄 License

This design system is part of the ĀRŪḾA project.
