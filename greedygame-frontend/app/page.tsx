
"use client"
import { useEffect, useState } from "react"
import { api } from "@/lib/api"

import AddTodoDrawer from "@/components/AddTodoDrawer"
import TodoDrawer from "@/components/TodoDrawer"
import NotificationsDrawer from "@/components/NotificationsDrawer"

type Todo = {
  _id?: string
  title: string
  description?: string
  dueAt?: string
  status?: string
}

export default function DashboardPage(){
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(false)

  // drawers
  const [openAdd, setOpenAdd] = useState(false)
  const [openTodo, setOpenTodo] = useState(false)
  const [openNotif, setOpenNotif] = useState(false)
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null)

  const [notifications, setNotifications] = useState<any[]>([])

  const fetchTodos = async () => {
    setLoading(true)
    try {
      const res = await api.get("/todos")
      // backend shape: { todos: [...] } or res.data
      const list = res?.data?.todos ?? res?.data ?? []
      setTodos(list)
    } catch (err) {
      console.error("Failed to fetch todos:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTodos()
    // optionally fetch notifications if you have an endpoint
    // setNotifications([...])
  }, [])

  // Create todo (called from AddTodoDrawer)
  const handleCreate = async (payload: any) => {
    try {
      await api.post("/todos", payload)
      await fetchTodos()
    } catch (err) {
      console.error("Create todo failed", err)
      throw err
    }
  }

  // Delete todo
  const handleDelete = async (id?: string) => {
    if (!id) return
    try {
      await api.delete(`/todos/${id}`)
      setOpenTodo(false)
      setCurrentTodo(null)
      await fetchTodos()
    } catch (err) {
      console.error("Delete todo failed", err)
    }
  }

  // Open todo details
  const openTodoDetails = (t: Todo) => {
    setCurrentTodo(t)
    setOpenTodo(true)
  }

  const upcoming = todos.filter(t => t.status === 'upcoming')
  const completed = todos.filter(t => t.status === 'completed')

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-extrabold">Hello,</h1>
        <div className="flex items-center gap-3">
          <button onClick={()=>setOpenNotif(true)} className="p-2 rounded-md hover:bg-gray-100">🔔</button>
        </div>
      </div>

      <div className="dashboard-cards mb-8">
        <div className="card stat-card">
          <div className="stat-title">All Todos</div>
          <div className="stat-number">{todos.length}</div>
        </div>
        <div className="card stat-card">
          <div className="stat-title">Upcoming</div>
          <div className="stat-number">{upcoming.length}</div>
        </div>
        <div className="card stat-card">
          <div className="stat-title">Completed</div>
          <div className="stat-number">{completed.length}</div>
        </div>
      </div>

      <div className="todos-panel max-w-3xl mx-auto">
        <div className="todos-header">
          <div>
            <h2 className="text-lg font-semibold">All Todos</h2>
            <div className="small-muted">Last Updated : {new Date().toLocaleString()}</div>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => setOpenAdd(true)} className="bg-gg-green text-white px-4 py-2 rounded-md">+ Add Todo</button>
          </div>
        </div>

        <div className="p-4">
          <table className="todos-table w-full">
            <thead>
              <tr>
                <th className="p-4">Todo</th>
                <th className="p-4">Due Date</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr><td colSpan={4} className="p-8 text-center text-gray-500">Loading...</td></tr>
              )}

              {!loading && todos.length === 0 && (
                <tr className="todo-row">
                  <td colSpan={4} className="p-8 text-center text-gray-400">No todos yet. Create one using the “Add Todo” button.</td>
                </tr>
              )}

              {!loading && todos.map((t) => (
                <tr key={t._id} className="todo-row hover:bg-gray-50 cursor-pointer" onClick={() => openTodoDetails(t)}>
                  <td className="p-4">
                    <div className="font-medium">{t.title}</div>
                    <div className="text-sm text-gray-400">{t.description}</div>
                  </td>
                  <td className="p-4">{t.dueAt ? new Date(t.dueAt).toLocaleString() : '-'}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${t.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {t.status ?? 'upcoming'}
                    </span>
                  </td>
                  <td className="p-4">
                    <button onClick={(e)=>{ e.stopPropagation(); setCurrentTodo(t); setOpenTodo(true) }} className="text-sm text-gg-green">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Drawers */}
      <AddTodoDrawer open={openAdd} onClose={()=>setOpenAdd(false)} onCreate={handleCreate} />
      <TodoDrawer open={openTodo} todo={currentTodo} onClose={()=>{ setOpenTodo(false); setCurrentTodo(null) }} onDelete={handleDelete} />
      <NotificationsDrawer open={openNotif} onClose={()=>setOpenNotif(false)} items={notifications} />
    </div>
  )
}
