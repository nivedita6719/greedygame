
"use client";
import { useState } from 'react'

import { X } from 'lucide-react'
import Badge from './Badge'


type Todo = {
_id?: string
title: string
description?: string
dueAt?: string
status?: string
}


export default function TodoDrawer({ open, todo, onClose, onDelete }:{ open:boolean; todo:Todo | null; onClose:()=>void; onDelete?:(id?:string)=>void }){
if(!open) return null
return (
<div className="fixed inset-0 z-50 flex">
<div className="flex-1 bg-black/40" onClick={onClose} />
<aside className="w-[420px] bg-white p-6 overflow-auto">
<div className="flex items-start justify-between">
<div>
<h3 className="text-xl font-semibold">{todo?.title || 'Todo Details'}</h3>
<div className="text-sm text-gray-500 mt-1">{todo? '': ''}</div>
</div>
<button onClick={onClose} aria-label="Close drawer" className="p-2 rounded-md hover:bg-gray-100"><X size={18} /></button>
</div>


<div className="mt-6 space-y-4">
<div className="flex items-center gap-3">
<div className="text-sm text-gray-600">Due Date</div>
<div className="ml-auto text-sm text-gray-800">{todo?.dueAt ? new Date(todo.dueAt).toLocaleString() : '-'}</div>
</div>


<div className="flex items-center gap-3">
<div className="text-sm text-gray-600">Status</div>
<div className="ml-auto"><Badge variant={todo?.status === 'completed' ? 'success' : 'warn'}>{todo?.status || 'upcoming'}</Badge></div>
</div>


<div className="pt-3 border-t">
<h4 className="text-sm font-semibold">Description</h4>
<p className="text-sm text-gray-600 mt-2">{todo?.description || 'No description provided.'}</p>
</div>


<div className="flex gap-3 mt-4">
<button className="flex-1 py-2 rounded-md border border-gray-200 text-sm">Edit</button>
<button onClick={()=>onDelete && onDelete(todo?._id)} className="py-2 px-4 rounded-md bg-red-50 text-red-700 border border-red-100 text-sm">Delete</button>
</div>
</div>
</aside>
</div>
)
}

