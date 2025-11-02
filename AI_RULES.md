# AI Development Rules for Real Preço Market

This document provides guidelines for the AI developer to follow when working on this project. The goal is to maintain code quality, consistency, and simplicity.

## Tech Stack

The application is built with a modern, lightweight tech stack:

-   **Framework**: React 19, built with Vite for a fast development experience.
-   **Language**: TypeScript for type safety and better code quality.
-   **Styling**: Tailwind CSS is used exclusively for styling. All styles should be applied via utility classes.
-   **State Management**: React Context API (`useContext`) is used for simple global state (like the shopping cart). For local state, use `useState` and `useMemo`.
-   **AI Integration**: The Google Gemini API (`@google/genai`) is used for all AI-powered features.
-   **Components**: The UI is built with custom, single-purpose React components located in `src/components`.
-   **Navigation**: The app uses a state-based navigation system within a single page. No routing library is currently used.

## Library and Code Style Rules

To keep the codebase clean and consistent, please adhere to the following rules:

1.  **Styling**:
    -   **ONLY** use Tailwind CSS for styling.
    -   Do not write custom CSS files or use other styling libraries.
    -   Keep components responsive by using Tailwind's responsive prefixes (e.g., `md:`, `lg:`).

2.  **Components**:
    -   Create small, reusable components in the `src/components` directory.
    -   Each component should have its own file.
    -   Do not create components with multiple responsibilities. Keep them focused.

3.  **Icons**:
    -   Use the `lucide-react` library for all icons. It's lightweight and integrates well with Tailwind.
    -   Example: `import { ShoppingCart } from 'lucide-react';`

4.  **State Management**:
    -   For global state that needs to be shared across many components (e.g., user session, cart), use the React Context API.
    -   For state that is local to a component or a small part of the component tree, use `useState`.
    -   Do not introduce complex state management libraries like Redux or Zustand without a clear need.

5.  **AI Features**:
    -   All interactions with the Gemini API must be handled through the `@google/genai` package.
    -   Encapsulate AI-related functions in the `src/lib` directory (e.g., `lib/gemini.ts`).

6.  **Code Structure**:
    -   **Pages/Views**: Major app views should be in `src/components` and controlled by the main `App.tsx` file.
    -   **Types**: All TypeScript types and interfaces should be defined in `src/types.ts`.
    -   **Constants**: Static data like product lists or categories should be in `src/constants.ts`.