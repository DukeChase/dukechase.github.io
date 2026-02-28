# AGENTS.md

Coding guidelines and conventions for AI coding agents in this repository.

## Project Overview

GitHub profile page clone built with React 19 and Vite, deployed to GitHub Pages.

## Build/Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build locally
npm run deploy       # Deploy to GitHub Pages (builds and deploys)
```

**Note:** No lint, test, or typecheck commands are currently configured.

## Tech Stack

- React 19.2.4, Vite 7.3.1
- No TypeScript, no testing framework, no linting
- Deployment via gh-pages

## File Structure

```
src/
├── main.jsx          # Entry point
├── App.jsx           # Main app component
├── styles.css        # Global styles
└── components/       # React components (Navbar, Sidebar, MainContent, RepoCard)
```

## Code Style Guidelines

### Component Structure

- Functional components with default exports
- One component per file in `src/components/`
- Component name matches filename

```jsx
function ComponentName({ prop1, prop2 }) {
  return (
    <div className="component-name">
      {/* content */}
    </div>
  )
}

export default ComponentName
```

### Imports

```jsx
import { useState, useEffect } from 'react'
import ChildComponent from './ChildComponent'
import './styles.css'
```

### State Management

- Use `useState` for local state
- Initialize from localStorage with lazy initializer:

```jsx
const [value, setValue] = useState(() => localStorage.getItem('key') || 'default')
```

- Persist with `useEffect`:

```jsx
useEffect(() => {
  localStorage.setItem('key', value)
}, [value])
```

### Props

- Destructure props in function parameters
- No prop-types validation

```jsx
function RepoCard({ repo, view }) { /* ... */ }
```

### Styling

- Use CSS classes (`className`), not inline styles (except for dynamic values)
- Global styles in `src/styles.css`
- Theme switching via `data-theme="dark|light"` attribute

### Naming Conventions

- Components: PascalCase (`Navbar`, `RepoCard`)
- Functions: camelCase (`toggleTheme`, `setActiveTab`)
- CSS classes: kebab-case (`nav-logo`, `repo-card`)
- Data object keys: camelCase

### JSX Guidelines

- Self-closing tags for void elements: `<i className="..." />`
- Parentheses for multi-line JSX
- Always use `key` prop with unique IDs when mapping

### Event Handlers

- Inline arrow functions or function references
- Descriptive names: `onClick`, `onToggle`

```jsx
<button onClick={() => setView('grid')}>Grid</button>
<button onClick={toggleTheme}>Toggle</button>
```

### Icons

Font Awesome icons throughout:
- Solid: `<i className="fas fa-icon-name"></i>`
- Regular: `<i className="far fa-icon-name"></i>`
- Brand: `<i className="fab fa-icon-name"></i>`

### Conditional Rendering

```jsx
<div className={`base-class ${isActive ? 'active' : ''}`}>
<i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
```

### Data Structures

Define static data at component top:

```jsx
const repos = [
  {
    id: 1,
    name: 'repo-name',
    desc: 'Description text',
    lang: 'JavaScript',
    langColor: '#61dafb',
    stars: '1.2k',
    forks: 89,
    updated: '3天前'
  }
]
```

### Accessibility

- `aria-label` for icon-only buttons: `<button aria-label="切换深色模式">`
- `title` for tooltips: `<button title="网格视图">`

### Internationalization

Chinese text used in some UI elements; maintain consistency.

## Important Notes

- React 19 with StrictMode enabled
- Build output: `dist/` directory
- Theme localStorage key: `'theme'`
- View preference localStorage key: `'repo-view'`
- Base path: '/' (in vite.config.js)