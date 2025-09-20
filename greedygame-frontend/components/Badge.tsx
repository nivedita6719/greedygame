// "use client"
// import React from 'react'
// if using types or nothing, you can remove import entirely
// or use named imports if you need types:
import { FC, ReactNode } from 'react'



export default function Badge({ children, variant='default' }:{ children:React.ReactNode, variant?: 'default'|'success'|'warn' }){
const base = 'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium'
const cls = variant === 'success' ? `${base} bg-green-100 text-green-800` : variant === 'warn' ? `${base} bg-yellow-100 text-yellow-800` : `${base} bg-gray-100 text-gray-800`
return <span className={cls}>{children}</span>
}