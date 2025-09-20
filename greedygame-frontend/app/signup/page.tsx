
"use client"
import { useState } from "react"
import { api } from "@/lib/api"
import { useAuth } from "@/context/AuthContext"

export default function SignupPage(){
  const { login } = useAuth() || {}
  const [name,setName]=useState(''); const [email,setEmail]=useState(''); const [password,setPassword]=useState('')
  const [agree,setAgree]=useState(false); const [err,setErr]=useState('')
  const submit = async (e:any)=> {
    e.preventDefault(); if(!agree){ setErr('Agree to terms'); return }
    try {
      const res = await api.post('/auth/register',{ name, email, password })
      const token = res.data.accessToken || res.data.token
      login(token, res.data.user)
    } catch (err:any){ setErr(err?.response?.data?.message || 'Signup failed') }
  }
  return (
    <div className="min-h-screen flex">
      <div className="hidden md:block md:w-1/2 login-left"></div>
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full form-card">
          <div className="text-center mb-6">
            <div className="text-xs text-gray-400 font-semibold">GREEDYGAME</div>
            <h1 className="text-2xl font-bold mt-2">You’re one click away from less busywork</h1>
          </div>
          <div className="mb-4"><div className="google-btn">Sign Up with Google (placeholder)</div></div>
          <div className="hr-or my-4"><hr/><span>Or</span><hr/></div>
          {err && <div className="text-sm text-red-600 mb-2">{err}</div>}
          <form onSubmit={submit} className="space-y-4">
            <div><label className="text-sm text-gray-600">Full Name</label><input value={name} onChange={e=>setName(e.target.value)} placeholder="John Doe" className="form-input mt-1" /></div>
            <div><label className="text-sm text-gray-600">Email Address</label><input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Example@site.com" className="form-input mt-1" /></div>
            <div><label className="text-sm text-gray-600">Password</label><input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Minimum 8 Characters" className="form-input mt-1" /></div>
            <label className="flex items-start gap-2 text-sm text-gray-600"><input type="checkbox" checked={agree} onChange={e=>setAgree(e.target.checked)} /> <span>I agree to Terms of Service and Privacy Policy</span></label>
            <button type="submit" className="btn-primary bg-gg-green">Get Started</button>
            <p className="text-sm text-center text-gray-500">Already have an account? <a href="/login" className="text-gg-green">Log in</a></p>
          </form>
        </div>
      </div>
    </div>
  )
}
