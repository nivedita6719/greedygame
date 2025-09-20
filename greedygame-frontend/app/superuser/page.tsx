
'use client'
import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import { useAuth } from '@/context/AuthContext'
import UserTable from '@/components/UserTable'


export default function Superuser(){
const { user } = useAuth() || {}
const [users,setUsers] = useState<any[]>([])
const load = async ()=>{
const res = await api.get('/users')
setUsers(res.data.users || [])
}
useEffect(()=>{ if(user?.role==='superuser') load() },[user])
if(user?.role!=='superuser') return <div className="text-red-500">Access Denied</div>
return (
<div>
<h1 className="text-2xl font-bold mb-6">Manage Users</h1>
<UserTable users={users} reload={load} />
</div>
)
}

