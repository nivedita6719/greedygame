'use client'; // This directive is essential

import { createContext, useState, ReactNode } from 'react';

// Define the shape of your context data (optional but good practice with TypeScript)
interface IMyContext {
  // Add any values or functions you want to share
  // For example:
  user: string | null;
  setUser: (name: string | null) => void;
}

// Create the context
export const MyContext = createContext<IMyContext | null>(null);

// Create the provider component
export default function MyContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>('Guest');

  return (
    <MyContext.Provider value={{ user, setUser }}>
      {children}
    </MyContext.Provider>
  );
}