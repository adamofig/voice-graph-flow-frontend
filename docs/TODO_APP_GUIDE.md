# 📝 Build Your First Todo App in Next.js

Now that your project is running, let's build a functional Todo application. This guide will take you through the architecture and the logic.

---

## 🚀 1. What to do first?

The first thing is to understand that in Next.js (App Router), components are **Server Components** by default. Since a Todo app needs interactivity (typing, clicking, state), we must use **Client Components**.

### Step 1: Clean up the default page
Open `src/app/page.tsx` and replace its content with a clean structure.

### Step 2: Define your "State"
You will need a list to store your todos. Use the `useState` hook from React.

---

## 🛠️ 2. Step-by-Step Implementation

### A. Create the Base Layout
Since we are using Tailwind CSS, we can make it look premium easily. Add this to `src/app/page.tsx`:

```tsx
'use client'; // CRITICAL: This allows interactivity

import { useState } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim() === '') return;
    const newTodo: Todo = {
      id: Date.now(),
      text: input,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setInput('');
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        My Tasks
      </h1>

      <div className="w-full max-w-md flex gap-2 mb-6">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What needs to be done?"
          className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
        />
        <button
          onClick={addTodo}
          className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg font-semibold transition-all"
        >
          Add
        </button>
      </div>

      <ul className="w-full max-w-md space-y-3">
        {todos.map(todo => (
          <li
            key={todo.id}
            className="flex items-center justify-between bg-gray-800 p-4 rounded-xl border border-gray-700 hover:border-purple-500 transition-colors"
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="w-5 h-5 rounded border-gray-600 text-purple-600 focus:ring-purple-500 bg-gray-700"
              />
              <span className={todo.completed ? 'line-through text-gray-500' : ''}>
                {todo.text}
              </span>
            </div>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-gray-500 hover:text-red-400 p-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
```

---

## 💻 3. Essential Commands for Development

As you build this, keep these commands in mind:

### 1. `npm run dev`
Run this in your terminal to see changes instantly at [http://localhost:3000](http://localhost:3000).

### 2. `npm install lucide-react` (Optional)
If you want better icons for your UI:
```bash
npm install lucide-react
```

### 3. `npm run build`
Run this before you finish to check if there are any TypeScript or configuration errors:
```bash
npm run build
```

---

## 🎯 Next Steps
- **Persistence**: Save your todos in `localStorage` so they don't disappear when you refresh.
- **Components**: Move the "TodoItem" into its own separate file in `src/components/TodoItem.tsx`.
- **Animations**: Use `framer-motion` to make items slide in and out beautifully.

Happy building! 🚀
