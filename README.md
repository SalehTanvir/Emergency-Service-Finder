# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

**Tailwind CSS**

- **Install dependencies:**

```bash
npm install -D tailwindcss postcss autoprefixer
```

- We've added configuration files: [tailwind.config.cjs](tailwind.config.cjs) and [postcss.config.cjs](postcss.config.cjs).

- `src/index.css` has been updated to include the Tailwind directives (`@tailwind base; @tailwind components; @tailwind utilities;`) and your existing global styles are preserved.

- If you prefer to generate configs yourself, run:

```bash
npx tailwindcss init -p
```

- Start the dev server as usual after installing dependencies:

```bash
npm run dev
```

If you'd like, I can also convert UI components to use Tailwind utility classes.
