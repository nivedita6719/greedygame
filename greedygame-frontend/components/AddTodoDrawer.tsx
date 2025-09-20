

"use client";
import { useState } from "react"

import { X } from "lucide-react"

type Props = {
  open: boolean
  onClose: () => void
  onCreate?: (payload: any) => Promise<void> | void
}

export default function AddTodoDrawer({ open, onClose, onCreate }: Props) {
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [dueTime, setDueTime] = useState("")
  const [loading, setLoading] = useState(false)

  if (!open) return null

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const dueAt = dueDate ? new Date(`${dueDate}T${dueTime || "00:00"}`).toISOString() : null
    try {
      if (onCreate) {
        await Promise.resolve(onCreate({ title, description: desc, dueAt }))
      }
      // reset form only after success
      setTitle("")
      setDesc("")
      setDueDate("")
      setDueTime("")
      onClose()
    } catch (err) {
      console.error(err)
      // optionally show UI error here
      throw err
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/40" onClick={onClose} />
      <aside className="w-[420px] bg-white p-6 overflow-auto">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold">Add Todo</h3>
            <div className="text-sm text-gray-500 mt-1">Create a new todo item</div>
          </div>
          <button onClick={onClose} aria-label="Close drawer" className="p-2 rounded-md hover:bg-gray-100">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm text-gray-700">Title *</label>
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-2 w-full border rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700">Description</label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="mt-2 w-full border rounded-md px-3 py-2 h-24"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-gray-700">Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="mt-2 w-full border rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="text-sm text-gray-700">Due Time</label>
              <input
                type="time"
                value={dueTime}
                onChange={(e) => setDueTime(e.target.value)}
                className="mt-2 w-full border rounded-md px-3 py-2"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button type="submit" disabled={loading} className="bg-gg-green text-white px-4 py-2 rounded-md">
              {loading ? "Creating..." : "Create Todo"}
            </button>
          </div>
        </form>
      </aside>
    </div>
  )
}
