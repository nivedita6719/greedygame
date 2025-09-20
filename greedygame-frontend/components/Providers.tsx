// // components/Providers.tsx

// "use client"; // This component needs to be a client component

// import { ReactNode } from "react";
// import { GoogleOAuthProvider } from "@react-oauth/google";
// import { AuthProvider } from "@/context/AuthContext";
// import Sidebar from "@/components/Sidebar";
// import Navbar from "@/components/Navbar";

// export function Providers({ children }: { children: ReactNode }) {
//   return (
//     <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? ""}>
//       <AuthProvider>
//         <Sidebar />
//         <div className="flex-1 min-h-screen flex flex-col">
//           <Navbar />
//           <main className="flex-1 max-w-7xl mx-auto px-6 py-8">{children}</main>
//         </div>
//       </AuthProvider>
//     </GoogleOAuthProvider>
//   );
// }
// components/Providers.tsx
"use client";

import { createContext, useState, ReactNode } from "react";

export const MyContext = createContext<any>(null);

export function Providers({ children }: { children: ReactNode }) {
  const [state, setState] = useState(0);
  return <MyContext.Provider value={{ state, setState }}>{children}</MyContext.Provider>;
}
