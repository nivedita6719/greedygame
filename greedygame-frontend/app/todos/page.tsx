
'use client'
import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import TodoDrawer from '@/components/TodoDrawer'


export default function Todos(){
const [todos,setTodos]=useState<any[]>([])
const [open,setOpen]=useState(false)
const [selected,setSelected]=useState<any|null>(null)


const load = async()=>{
const res = await api.get('/todos')
setTodos(res.data.todos||[])
}
useEffect(()=>{ load() },[])


return (
<div>
<div className="flex justify-between items-center mb-4">
<h1 className="text-2xl font-bold">Todos</h1>
<button onClick={()=>{ setSelected(null); setOpen(true) }} className="btn-primary">+ Add Todo</button>
</div>


<div className="card">
<table className="w-full text-sm">
<thead className="text-left text-gray-500 text-xs">
<tr><th className="p-3">Todo</th><th className="p-3">Due Date</th><th className="p-3">Status</th><th className="p-3">Actions</th></tr>
</thead>
<tbody>
{todos.map(t=> (
<tr key={t._id} className="table-row">
<td className="p-3"><div className="font-semibold">{t.title}</div><div className="text-xs text-gray-400">{t.description}</div></td>
<td className="p-3">{new Date(t.dueAt).toLocaleString()}</td>
<td className="p-3">{t.status}</td>
<td className="p-3 space-x-2">
<button className="px-2 py-1 bg-yellow-400 text-white rounded" onClick={()=>{ setSelected(t); setOpen(true) }}>Edit</button>
<button className="px-2 py-1 bg-red-400 text-white rounded" onClick={async()=>{ await api.delete(`/todos/${t._id}`); load() }}>Delete</button>
</td>
</tr>
))}
</tbody>
</table>
</div>


{open && <TodoDrawer todo={selected} onClose={()=>{ setOpen(false); load() }} />}
</div>
)
}