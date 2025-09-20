// 'use client'
// import React from 'react'
"use client";
import { useEffect } from 'react'  // or remove if not used

import { GoogleLogin } from '@react-oauth/google'
import { api } from '@/lib/api'
import { useAuth } from '@/context/AuthContext'


export default function GoogleButton() {
const { login } = useAuth() || {}
const onSuccess = async (resp:any) => {
try {
const idToken = resp.credential
// send to backend to verify (if backend exists). If not, skip.
const res = await api.post('/auth/google', { idToken })
const token = res.data.accessToken || res.data.token
login(token, res.data.user)
} catch (err) {
console.error('Google error', err)
}
}
return (
<div className="w-full">
<GoogleLogin onSuccess={onSuccess} onError={()=>console.error('Google login failed')} />
</div>
)
}