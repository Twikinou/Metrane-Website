# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the Metrane company website - a static single-page application (SPA) showcasing reporting and business intelligence solutions for financial institutions. The website is built with vanilla HTML, CSS, and JavaScript, featuring modern animations and responsive design.

## Technology Stack

- **HTML5**: Semantic markup for content structure
- **CSS3**: Custom properties, flexbox/grid layouts, animations
- **JavaScript**: Vanilla JS for interactivity (no framework)
- **Lenis**: Smooth scroll library (loaded via CDN)
- **Fonts**: Google Fonts (Inter, Radio Canada Big, Space Grotesk)

## Architecture & Structure

### File Organization
```
/
├── index.html          # Single HTML page with all sections
├── styles.css          # All styling, including responsive design
├── script.js           # Main JavaScript for interactions
├── lenis-config.js     # Smooth scroll configuration
└── assets/            # Images, icons, and visual assets
```

### Key Design Patterns

1. **Component Structure**: Reusable CSS classes following BEM-like naming (`.feature-card`, `.benefit-item`, etc.)
2. **Responsive Design**: Mobile-first approach with specific mobile sections (`.benefits-mobile`)
3. **Smooth Scrolling**: Lenis library integration for enhanced scroll experience
4. **Intersection Observer**: Used for scroll-triggered animations and dynamic image changes

### Main Website Sections

- **Navigation**: Fixed header with mobile hamburger menu
- **Hero**: Landing section with 3D visual effect
- **Features**: Grid layout showcasing three main services
- **Benefits**: Scroll-triggered animation with synchronized image/text changes
- **FAQ**: Accordion-style expandable questions
- **Footer**: Multi-column layout with contact information

## Development Guidelines

### Working with Animations
- Intersection Observer handles scroll-triggered animations in `script.js`
- Benefits section has custom scroll behavior for both desktop and mobile
- CSS transitions defined via custom properties for consistency

### Responsive Breakpoints
- Mobile: < 768px (hamburger menu, stacked layouts)
- Tablet: 768px - 1024px
- Desktop: > 1024px (full grid layouts)

### Asset Management
- Images optimized with `loading="lazy"` attribute
- SVG icons for scalability
- Background images handled via CSS for performance

## Common Tasks

### Modifying Content
- All content is in `index.html` - no templating system
- Text changes can be made directly in HTML
- Ensure French language consistency throughout

### Updating Styles
- CSS custom properties in `:root` for theme colors
- Component styles are grouped by section in `styles.css`
- Mobile-specific styles typically use `.mobile-` prefix

### Adding Interactivity
- Event listeners initialized in `script.js` after DOM load
- Mobile menu, FAQ accordion, and smooth scroll already implemented
- Lenis configuration in separate file for maintainability

## Testing Approach
- Manual testing across browsers (Chrome, Firefox, Safari, Edge)
- Responsive testing using browser developer tools
- No automated test suite currently in place

## Deployment
- Static site - can be deployed to any web server
- No build process required
- Assets should be optimized before deployment

## Notes
- Website is in French - maintain language consistency
- Focus on financial/reporting industry context
- Senegal expansion is featured prominently
- Contact number: 01 86 95 04 08
- Address: 10 rue de Penthièvre, 75008 Paris