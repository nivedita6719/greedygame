
// // // components/Sidebar.tsx
// // "use client";

// // import Link from "next/link";
// // import { useAuth } from "@/context/AuthContext";
// // import { useEffect } from "react";

// // export default function Sidebar() {
// //   // useAuth must be called inside a client component function
// //   const { user, logout } = useAuth();

// //   // optional: guard if user isn't loaded yet (avoids flash)
// //   useEffect(() => {
// //     // no-op; ensures this runs client-side
// //   }, []);

// //   return (
// //     <aside className="w-72 bg-white border-r min-h-screen">
// //       <div className="px-6 py-6 text-xl font-bold">GREEDYGAME</div>

// //       <nav className="px-4 space-y-1">
// //         <Link href="/" className="block px-4 py-2 rounded hover:bg-gray-100">Dashboard</Link>
// //         <Link href="/todos" className="block px-4 py-2 rounded hover:bg-gray-100">Todos</Link>
// //         <Link href="/profile" className="block px-4 py-2 rounded hover:bg-gray-100">Profile</Link>
// //         {user?.role === "superuser" && (
// //           <Link href="/users" className="block px-4 py-2 rounded hover:bg-gray-100">Users</Link>
// //         )}
// //       </nav>

// //       <div className="p-4 mt-auto">
// //         <button onClick={() => logout()} className="w-full bg-red-500 text-white py-2 rounded">Logout</button>
// //       </div>
// //     </aside>
// //   );
// // }
// // components/Sidebar.tsx
// "use client";

// import Link from "next/link";

// export default function Sidebar() {
//   return (
//     <aside className="w-72 bg-white border-r min-h-screen">
//       <div className="px-6 py-6 text-xl font-bold">GREEDYGAME</div>
//       <nav className="px-4 space-y-1">
//         <Link href="/" className="block px-4 py-2 rounded hover:bg-gray-100">Dashboard</Link>
//         <Link href="/todos" className="block px-4 py-2 rounded hover:bg-gray-100">Todos</Link>
//         <Link href="/profile" className="block px-4 py-2 rounded hover:bg-gray-100">Profile</Link>
//       </nav>
//       <div className="p-4 mt-auto">
//         <button className="w-full bg-gray-100 py-2 rounded">Login</button>
//       </div>
//     </aside>
//   );
// }
// components/Sidebar.tsx
"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Sidebar() {
  const { user, logout } = useAuth();

  return (
    <aside className="w-72 bg-white border-r min-h-screen flex flex-col">
      <div className="px-6 py-6 text-xl font-bold">GREEDYGAME</div>
      <nav className="px-4 flex-1 space-y-1">
        <Link href="/" className="block px-4 py-3 rounded-md hover:bg-gray-100">Dashboard</Link>
        <Link href="/todos" className="block px-4 py-3 rounded-md hover:bg-gray-100">Todos</Link>
        <Link href="/profile" className="block px-4 py-3 rounded-md hover:bg-gray-100">Profile</Link>
        {user?.role === "superuser" && <Link href="/users" className="block px-4 py-3 rounded-md hover:bg-gray-100">Users</Link>}
      </nav>
      <div className="p-4">
        <button onClick={() => logout()} className="w-full bg-red-500 text-white py-2 rounded">Logout</button>
      </div>
    </aside>
  );
}

