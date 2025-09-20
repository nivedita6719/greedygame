
'use client'
import { api } from '@/lib/api'


export default function UserTable({ users, reload }:{ users:any[], reload:()=>void }){
const toggle = async (id:string, role:string)=>{
const newRole = role === 'user' ? 'superuser' : 'user'
await api.patch(`/users/${id}/role`, { role: newRole })
reload()
}


return (
<table className="w-full text-sm bg-white">
<thead className="bg-gray-100 text-xs text-left"><tr><th className="p-3">Name</th><th className="p-3">Email</th><th className="p-3">Role</th><th className="p-3">Action</th></tr></thead>
<tbody>
{users.map(u=> (
<tr key={u._id} className="table-row">
<td className="p-3">{u.name}</td>
<td className="p-3">{u.email}</td>
<td className="p-3">{u.role}</td>
<td className="p-3"><button className="px-3 py-1 bg-indigo-600 text-white rounded" onClick={()=>toggle(u._id,u.role)}>{u.role==='user'?'Promote':'Demote'}</button></td>
</tr>
))}
</tbody>
</table>
)
}