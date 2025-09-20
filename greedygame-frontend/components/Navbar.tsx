// "use client"
// import { useState } from "react"
// import { useAuth } from "@/context/AuthContext"

// export default function Navbar(){
//   const { user } = useAuth() || {}
//   const [open,setOpen] = useState(false)
//   return (
//     <header className="bg-white border-b shadow-sm">
//       <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
//         <div className="flex items-center gap-4">
//           <div className="font-semibold">GREEDYGAME</div>
//           <div className="hidden md:block">
//             <input placeholder="Search" className="border rounded-md px-3 py-2 text-sm w-72" />
//           </div>
//         </div>
//         <div className="flex items-center gap-4">
//           <button onClick={()=>setOpen(true)} className="text-xl">🔔</button>
//           <img src={user?.avatarUrl || "/avatar.png"} className="w-9 h-9 rounded-full" alt="avatar"/>
//         </div>
//       </div>
//     </header>
//   )
// }
// components/Navbar.tsx
"use client";
export default function Navbar(){
  return (
    <header className="w-full border-b bg-white p-3">
      <div className="max-w-7xl mx-auto">Navbar</div>
    </header>
  )
}
