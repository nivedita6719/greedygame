
'use client'
import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { api } from '@/lib/api'


export default function Profile(){
const { user, login, accessToken } = useAuth() || {}
const [name,setName] = useState(user?.name||'')
const [avatar,setAvatar] = useState<File|null>(null)


const save = async ()=>{
if(avatar){
const fd = new FormData(); fd.append('avatar', avatar)
const res = await api.post('/users/me/avatar', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
login(accessToken, res.data.user)
} else {
const res = await api.patch('/users/me', { name })
login(accessToken, res.data.user)
}
}
return (
<div className="max-w-md">
<h1 className="text-2xl font-bold mb-4">Profile</h1>
<div className="card">
<img src={user?.avatarUrl ? (process.env.NEXT_PUBLIC_API_URL?.replace('/api','') + user.avatarUrl) : '/avatar.png'} className="w-24 h-24 rounded-full mb-3"/>
<input type="file" onChange={e=>setAvatar(e.target.files?.[0]||null)} className="mb-3"/>
<input value={name} onChange={e=>setName(e.target.value)} className="w-full border p-2 rounded mb-3" />
<button onClick={save} className="btn-primary">Update Profile</button>
</div>
</div>
)
}