# ARUMA Social Media Content Creator

A comprehensive social media content creation tool built with the ARUMA design system. Create stunning Instagram stories, reels, feed posts, carousels, and editorial content with consistent branding.

## Features

### Content Formats

- **Instagram Story** - 9:16 vertical format (1080x1920px)
- **Instagram Reel Cover** - 9:16 vertical format with play overlay
- **Instagram Feed Post** - 1:1 square format (1080x1080px)
- **Instagram Carousel** - Multi-image carousel with 1:1 slides
- **Editorial Dossier** - Professional editorial/portfolio layout
- **Panoramic Triptych** - Wide 3-panel panoramic layout

### UI Components

- **StarDivider** - Decorative divider with star ornaments
- **IconCircle** - Circular icon container with variants
- **NumberTag** - Numbered badge/tag component
- **OrnamentFrame** - Decorative frame element with botanical motifs
- **FooterMonoLine** - Single-line footer with ARUMA branding

### Color System

Complete ARUMA brand color palette including:
- Brand colors (Black, White, Off-White, Botanical Green)
- Botanical green scale (50-900)
- Neutral scale (0-950)
- Semantic colors (success, warning, error, info)
- Interactive states and alpha variants

## Design System Integration

All components follow ARUMA design principles:

- **Typography**: Signature 0.3em letter-spacing for headings
- **Colors**: Brand colors (#000000, #F5F5F7, #3D9461)
- **Accessibility**: WCAG 2.1 AA compliant
- **Responsive**: Mobile-first approach
- **Botanical Patterns**: Consistent brand decoration

## Usage

Access the tool at `/social-media` in the ARUMA app.

Navigate between different content formats using the tab navigation. Each format provides a preview with ARUMA branding and can be customized for your content needs.

## Component Examples

### Creating a Story
```tsx
<InstagramStory 
  title="ARUMA"
  subtitle="Wellness & Beauty"
  logoUrl="/path/to/logo.jpg"
/>
```

### Creating a Feed Post
```tsx
<InstagramFeedPost 
  title="ARUMA"
  caption="Experience the essence of wellness and beauty ✨"
  imageUrl="/path/to/image.jpg"
  likes={1234}
/>
```

### Creating a Carousel
```tsx
<InstagramCarousel 
  slides={[
    { title: 'ARUMA', subtitle: 'Wellness & Beauty' },
    { title: 'DISCOVER', subtitle: 'Your Inner Balance' },
    { title: 'TRANSFORM', subtitle: 'Mind, Body & Spirit' }
  ]}
/>
```

## Development

Built with:
- Next.js 16.2.6
- React 19.2.4
- TypeScript 5
- Tailwind CSS 4
- Lucide React (icons)
- ARUMA Design System

## File Structure

```
app/social-media/
├── App.tsx                          # Main application with tab navigation
├── page.tsx                         # Next.js page wrapper
├── components/
│   ├── StarDivider.tsx
│   ├── IconCircle.tsx
│   ├── NumberTag.tsx
│   ├── OrnamentFrame.tsx
│   ├── FooterMonoLine.tsx
│   ├── InstagramStory.tsx
│   ├── InstagramReelCover.tsx
│   ├── InstagramFeedPost.tsx
│   ├── InstagramCarousel.tsx
│   ├── EditorialDossier.tsx
│   └── PanoramicTriptych.tsx
└── imports/
    └── (logo images)
```

## License

Part of the ARUMA design system.
