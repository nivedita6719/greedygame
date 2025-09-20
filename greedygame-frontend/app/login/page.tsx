
"use client"
import { useState } from "react"
import { api } from "@/lib/api"
import { useAuth } from "@/context/AuthContext"

export default function LoginPage(){
  const { login } = useAuth() || {}
  const [email,setEmail] = useState(''); const [password,setPassword] = useState(''); const [err,setErr] = useState('')
  const submit = async (e:any)=> {
    e.preventDefault(); setErr('')
    try {
      const res = await api.post('/auth/login',{ email, password })
      const token = res.data.accessToken || res.data.token
      login(token, res.data.user)
    } catch (err:any) { setErr(err?.response?.data?.message || 'Login failed') }
  }
  return (
    <div className="min-h-screen flex">
      <div className="hidden md:block md:w-1/2 login-left"></div>
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full form-card">
          <div className="text-center mb-6">
            <div className="text-xs text-gray-400 font-semibold">GREEDYGAME</div>
            <h1 className="text-2xl font-bold mt-2">Welcome to GGTodo</h1>
            <p className="text-sm text-gray-500 mt-1">To get started, please sign in</p>
          </div>
          <div className="mb-4"><div className="google-btn">Log In with Google (placeholder)</div></div>
          <div className="hr-or my-4"><hr/><span>Or</span><hr/></div>
          {err && <div className="text-sm text-red-600 mb-2">{err}</div>}
          <form onSubmit={submit} className="space-y-4">
            <div><label className="text-sm text-gray-600">Email Address</label><input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Enter your registered email" className="form-input mt-1" /></div>
            <div><label className="text-sm text-gray-600">Password</label><input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Enter your password" className="form-input mt-1" /></div>
            <div className="flex justify-between items-center text-sm text-gray-500"><label><input type="checkbox" className="mr-2"/> Remember me</label><a className="text-gg-green">Forgot Password</a></div>
            <button type="submit" className="btn-primary bg-gg-green">Login</button>
            <p className="text-sm text-center text-gray-500">Don't have an account? <a href="/signup" className="text-gg-green">Sign up</a></p>
          </form>
        </div>
      </div>
    </div>
  )
}
