// "use client"
// import React from 'react'
"use client";
import { useState, useEffect } from 'react'

import { X } from 'lucide-react'
import Badge from './Badge'


type Notif = { id:string; title:string; body?:string; time?:string; status?: 'upcoming'|'completed' }


export default function NotificationsDrawer({ open, onClose, items }:{ open:boolean; onClose:()=>void; items?:Notif[] }){
if(!open) return null
return (
<div className="fixed inset-0 z-50 flex">
<div className="flex-1 bg-black/40" onClick={onClose} />
<aside className="w-[420px] bg-white p-6 overflow-auto">
<div className="flex items-center justify-between">
<h3 className="text-lg font-semibold">All Notifications</h3>
<button onClick={onClose} aria-label="Close" className="p-2 rounded-md hover:bg-gray-100"><X size={18} /></button>
</div>


<div className="mt-6 space-y-4">
{(!items || items.length === 0) && <div className="text-sm text-gray-500">No notifications</div>}
{items?.map(n=> (
<div key={n.id} className="border rounded-lg p-4">
<div className="flex items-start justify-between">
<div>
<div className="font-medium">{n.title}</div>
<div className="text-sm text-gray-500 mt-1">{n.body}</div>
</div>
<Badge variant={n.status === 'completed' ? 'success' : 'warn'}>{n.status || 'upcoming'}</Badge>
</div>
<div className="text-xs text-gray-400 mt-3">{n.time}</div>
</div>
))}
</div>
</aside>
</div>
)
}

