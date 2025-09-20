
// // // // // import './globals.css'
// // // // // import { ReactNode } from 'react'
// // // // // import { GoogleOAuthProvider } from '@react-oauth/google'
// // // // // import { AuthProvider } from '@/context/AuthContext'
// // // // // import Sidebar from '@/components/Sidebar'
// // // // // import Navbar from '@/components/Navbar'

// // // // // export const metadata = { title: 'GreedyGame' }

// // // // // export default function RootLayout({ children }: { children: ReactNode }) {
// // // // //   return (
// // // // //     <html lang="en">
// // // // //       <body className="min-h-screen flex bg-gray-50">
// // // // //         <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''}>
// // // // //           <AuthProvider>
// // // // //             <Sidebar />
// // // // //             <div className="flex-1 min-h-screen flex flex-col">
// // // // //               <Navbar />
// // // // //               <main className="flex-1 max-w-7xl mx-auto px-6 py-8">
// // // // //                 {children}
// // // // //               </main>
// // // // //             </div>
// // // // //           </AuthProvider>
// // // // //         </GoogleOAuthProvider>
// // // // //       </body>
// // // // //     </html>
// // // // //   )
// // // // // }

// // // // // app/layout.tsx (temporary debug copy)
// // // // import "./globals.css";
// // // // import { ReactNode } from "react";
// // // // // removed AuthProvider for debugging
// // // // import Sidebar from "@/components/Sidebar";
// // // // import Navbar from "@/components/Navbar";

// // // // export const metadata = { title: "GreedyGame" };

// // // // export default function RootLayout({ children }: { children: ReactNode }) {
// // // //   return (
// // // //     <html lang="en">
// // // //       <body className="min-h-screen flex bg-gray-50">
// // // //         {/* NOTE: AuthProvider removed temporarily for debugging */}
// // // //         <Sidebar />
// // // //         <div className="flex-1 min-h-screen flex flex-col">
// // // //           <Navbar />
// // // //           <main className="flex-1 max-w-7xl mx-auto px-6 py-8">{children}</main>
// // // //         </div>
// // // //       </body>
// // // //     </html>
// // // //   );
// // // // }

// // // // app/layout.tsx
// // // import "./globals.css";
// // // import { ReactNode } from "react";
// // // import { GoogleOAuthProvider } from "@react-oauth/google";
// // // import { AuthProvider } from "@/context/AuthContext";
// // // import Sidebar from "@/components/Sidebar";
// // // import Navbar from "@/components/Navbar";

// // // export const metadata = { title: "GreedyGame" };

// // // export default function RootLayout({ children }: { children: ReactNode }) {
// // //   return (
// // //     <html lang="en">
// // //       <body className="min-h-screen flex bg-gray-50">
// // //         <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}>
// // //           <AuthProvider>
// // //             <Sidebar />
// // //             <div className="flex-1 min-h-screen flex flex-col">
// // //               <Navbar />
// // //               <main className="flex-1 max-w-7xl mx-auto px-6 py-8">{children}</main>
// // //             </div>
// // //           </AuthProvider>
// // //         </GoogleOAuthProvider>
// // //       </body>
// // //     </html>
// // //   );
// // // }

// // // app/layout.tsx
// // import "./globals.css";
// // import { ReactNode } from "react";
// // import { GoogleOAuthProvider } from "@react-oauth/google";
// // import { AuthProvider } from "@/context/AuthContext";
// // import Sidebar from "@/components/Sidebar";
// // import Navbar from "@/components/Navbar";

// // export const metadata = { title: "GreedyGame" };

// // export default function RootLayout({ children }: { children: ReactNode }) {
// //   return (
// //     <html lang="en">
// //       <body className="min-h-screen flex bg-gray-50">
// //         <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? ""}>
// //           {/* AuthProvider is client; Server layout can include it because it renders client content */}
// //           <AuthProvider>
// //             <Sidebar />
// //             <div className="flex-1 min-h-screen flex flex-col">
// //               <Navbar />
// //               <main className="flex-1 max-w-7xl mx-auto px-6 py-8">{children}</main>
// //             </div>
// //           </AuthProvider>
// //         </GoogleOAuthProvider>
// //       </body>
// //     </html>
// //   );
// // }
// // app/layout.tsx

// // Make sure this import path is correct!

// import { AuthProvider } from '@/context/AuthContext'; // Using '@/' alias is common

// // ... rest of your layout file
// import "./globals.css";
// import { ReactNode } from "react";
// import { GoogleOAuthProvider } from "@react-oauth/google";
// import Sidebar from "@/components/Sidebar";
// import Navbar from "@/components/Navbar";
// import { Providers } from "@/components/Providers";

// export const metadata = { title: "GreedyGame" };

// export default function RootLayout({ children }: { children: ReactNode }) {
//   return (
//     <html lang="en">
//       <body className="min-h-screen flex bg-gray-50">
//         <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? ""}>
//           <AuthProvider>
//             <Sidebar />
//             <div className="flex-1 min-h-screen flex flex-col">
//               <Navbar />
//               <main className="flex-1 max-w-7xl mx-auto px-6 py-8">{children}</main>
//             </div>
//           </AuthProvider>
//         </GoogleOAuthProvider>
//       </body>
//     </html>
//   );
// }
// app/layout.tsx
import "./globals.css";
import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import { Providers } from "@/components/Providers";

export const metadata = { title: "GreedyGame" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
