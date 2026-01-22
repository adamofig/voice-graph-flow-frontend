# Cómo Empezar con Next.js 🚀

¡Bienvenido a tu nueva aventura con Next.js! Esta guía te llevará paso a paso por el proceso de inicialización de un proyecto desde cero y te explicará exactamente qué esperar de los comandos principales.

---

## 🏗️ 1. Inicializar tu Proyecto

Para comenzar un nuevo proyecto de Next.js, la forma recomendada es usar `create-next-app`. Ejecuta el siguiente comando en tu terminal:

```bash
npx create-next-app@latest
```

### Qué esperar cuando ejecutas esto:
Al ejecutar este comando, aparecerán una serie de preguntas de configuración. Aquí te explicamos qué significan:

1.  **Project Name**: ¿Cómo quieres llamar a tu carpeta? (ej: `mi-gran-app`)
2.  **TypeScript**: (Recomendado: **Yes**) Agrega tipado estático a tu JavaScript, facilitando la detección de errores.
3.  **ESLint**: (Recomendado: **Yes**) Una herramienta que ayuda a mantener tu código limpio y siguiendo las mejores prácticas.
4.  **Tailwind CSS**: (Muy Recomendado: **Yes**) Un framework de CSS que hace que el diseño sea increíblemente rápido y consistente.
5.  **`src/` directory**: (Recomendado: **Yes**) Mantiene tus archivos de configuración separados del código real de tu aplicación.
6.  **App Router**: (Muy Recomendado: **Yes**) La forma moderna de manejar rutas en Next.js (usando la carpeta `app/`).
7.  **Import Alias**: (Recomendado: `@/*`) Permite importar archivos usando `@/components/...` en lugar de rutas relativas complicadas como `../../../components/...`.

---

## 🛠️ 2. Comandos Principales Explicados

Una vez creado tu proyecto, usarás estos cuatro comandos primordiales ubicados en tu `package.json`:

### 🟢 `npm run dev`
*   **Qué hace**: Inicia el servidor de desarrollo.
*   **Cuándo usarlo**: Siempre que estés escribiendo código.
*   **Expectativa**: Habilita **Fast Refresh**. Cuando guardas un archivo, el navegador se actualiza automáticamente sin perder el estado de tu aplicación. También muestra errores detallados si algo falla.

### 🔵 `npm run build`
*   **Qué hace**: Crea una versión optimizada de tu aplicación para producción.
*   **Cuándo usarlo**: Antes de desplegar en un servidor (como Vercel, Netlify o AWS).
*   **Expectativa**: Next.js compilará tu código, optimizará imágenes, minificará CSS/JS y pre-renderizará tus páginas. Mostrará un resumen indicando qué páginas son estáticas (○) y cuáles dinámicas (λ).

### 🟡 `npm run start`
*   **Qué hace**: Inicia el servidor de producción usando la construcción creada por `npm run build`.
*   **Cuándo usarlo**: Para probar exactamente cómo se comportará tu app en producción localmente.
*   **Expectativa**: La app correrá mucho más rápido que en modo `dev`, pero no tendrás actualizaciones automáticas al cambiar el código.

### 🔴 `npm run lint`
*   **Qué hace**: Ejecuta ESLint para buscar problemas de calidad y posibles errores en el código.
*   **Cuándo usarlo**: Antes de subir tu código o como parte de un proceso automatizado.
*   **Expectativa**: Listará advertencias o errores encontrados según las reglas configuradas.

---

## 📂 3. Estructura Moderna (App Router)

Si elegiste las opciones recomendadas, tu proyecto se verá así:

*   **`src/app/`**: Contiene tus rutas, layouts y páginas.
    *   `layout.tsx`: El diseño compartido (Navbar, Footer) para todas las páginas.
    *   `page.tsx`: La página de inicio de tu aplicación.
    *   `globals.css`: Tus estilos globales e importaciones de Tailwind.
*   **`public/`**: Archivos estáticos como imágenes, fuentes e iconos.
*   **`next.config.mjs`**: Ajustes de configuración de Next.js.
*   **`tailwind.config.ts`**: Configuración de los estilos de Tailwind CSS.

---

## 💡 Consejos Pro
- **Despliegue**: Next.js es creado por **Vercel**. Desplegar allí es tan simple como conectar tu repositorio de GitHub.
- **Componentes**: Crea una carpeta `src/components/` para piezas reutilizables como Botones, Tarjetas y Modales.
- **Server vs Client**: Por defecto, los componentes en la carpeta `app` son **Server Components**. Si necesitas interactividad (como `useState` o `useEffect`), añade `'use client';` al principio del archivo.

¡Feliz programación! 🚀
