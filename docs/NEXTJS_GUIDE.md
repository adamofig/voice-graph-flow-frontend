# Getting Started with Next.js 🚀

Welcome to your new Next.js journey! This guide will walk you through how to initialize a project from scratch and explain exactly what to expect from the core commands.

---

## 🏗️ 1. Initializing Your Project

To start a new Next.js project, the recommended way is using `create-next-app`. Run the following command in your terminal:

```bash
npx create-next-app@latest
```

### What to expect when you run this:
When you run this command, you will be prompted with a series of configuration questions. Here is what they mean:

1.  **Project Name**: What do you want to call your folder? (e.g., `my-awesome-app`)
2.  **TypeScript**: (Recommended: **Yes**) Adds static typing to your JavaScript, making it easier to catch bugs early.
3.  **ESLint**: (Recommended: **Yes**) A tool that helps you keep your code clean and follows best practices.
4.  **Tailwind CSS**: (Highly Recommended: **Yes**) A utility-first CSS framework that makes styling incredibly fast and consistent.
5.  **`src/` directory**: (Recommended: **Yes**) Keeps your configuration files separate from your actual application code.
6.  **App Router**: (Highly Recommended: **Yes**) The modern way to handle routing in Next.js (using the `app/` folder).
7.  **Import Alias**: (Recommended: `@/*`) Allows you to import files using `@/components/...` instead of messy relative paths like `../../../components/...`.

---

## 🛠️ 2. Core Commands Explained

Once your project is created, you will use these four primary commands located in your `package.json`:

### 🟢 `npm run dev`
*   **What it does**: Starts the development server.
*   **When to use it**: Every time you are writing code.
*   **Expectation**: It enables **Fast Refresh**. When you save a file, the browser will update automatically without losing the state of your application. It also provides detailed error overlays if something goes wrong.

### 🔵 `npm run build`
*   **What it does**: Creates an optimized production build of your application.
*   **When to use it**: Before deploying to a server (like Vercel, Netlify, or AWS).
*   **Expectation**: Next.js will compile your code, optimize images, minify CSS/JS, and pre-render your pages. It will output a summary showing which pages are static (○) and which are dynamic (λ).

### 🟡 `npm run start`
*   **What it does**: Starts the production server using the build created by `npm run build`.
*   **When to use it**: To test exactly how your app will behave in production on your local machine.
*   **Expectation**: The app will run much faster than in `dev` mode, but you won't get automatic updates when you change the code.

### 🔴 `npm run lint`
*   **What it does**: Runs ESLint to check for code quality issues and potential bugs.
*   **When to use it**: Before committing code or as part of a CI/CD pipeline.
*   **Expectation**: It will list any warnings or errors found in your codebase based on the rules you've configured.

---

## 📂 3. The Modern Project Structure (App Router)

If you chose the recommended settings, your project will look like this:

*   **`src/app/`**: Contains your routes, layouts, and pages.
    *   `layout.tsx`: The shared UI (Navbar, Footer) for all pages.
    *   `page.tsx`: The homepage of your application.
    *   `globals.css`: Your global styles and Tailwind imports.
*   **`public/`**: Static assets like images, fonts, and icons.
*   **`next.config.mjs`**: Configuration settings for Next.js.
*   **`tailwind.config.ts`**: Configuration for your Tailwind CSS styles.

---

## 💡 Pro Tips
- **Deployment**: Next.js is made by **Vercel**. Deploying there is as simple as connecting your GitHub repository.
- **Components**: Create a `src/components/` folder for reusable UI pieces like Buttons, Cards, and Modals.
- **Server vs. Client**: By default, components in the `app` folder are **Server Components**. If you need interactivity (like `useState` or `useEffect`), add `'use client';` at the very top of the file.

Happy coding! 🚀
