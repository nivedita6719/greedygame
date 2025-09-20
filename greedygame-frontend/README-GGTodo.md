This repo contains the frontend UI matching the Figma screens you provided (Login/Signup, Dashboard, Todos, Drawers, Notifications). Files you should have added already: layout, globals.css, tailwind config, auth context, sidebar, navbar, login/signup, dashboard.


What I added in this batch:
- `components/TodoDrawer.tsx` (view/edit/delete placeholder)
- `components/AddTodoDrawer.tsx` (create todo form with date/time)
- `components/NotificationsDrawer.tsx` (notifications list)
- `components/Badge.tsx` (tiny status badge)
- `globals-polish.css` (small css tweaks; merge into `app/globals.css`)


How to integrate:
1. Copy the three drawer components and `Badge.tsx` into `components/`.
2. Merge the CSS in `globals-polish.css` into `app/globals.css` (append at end).
3. In `app/page.tsx` (Dashboard) import and wire the drawers. Example snippet:


```tsx
import AddTodoDrawer from '@/components/AddTodoDrawer'
import TodoDrawer from '@/components/TodoDrawer'
import NotificationsDrawer from '@/components/NotificationsDrawer'


// in component state
const [openAdd,setOpenAdd] = useState(false)
const [openTodo,setOpenTodo] = useState(false)
const [currentTodo,setCurrentTodo] = useState(null)
const [openNotif,setOpenNotif] = useState(false)


// when clicking +Add button
<button onClick={()=>setOpenAdd(true)}>+ Add Todo</button>


// table row click
<tr onClick={()=>{ setCurrentTodo(todo); setOpenTodo(true) }}>


// render drawers
<AddTodoDrawer open={openAdd} onClose={()=>setOpenAdd(false)} onCreate={async (payload)=>{/* call api then refetch todos */}} />
<TodoDrawer open={openTodo} todo={currentTodo} onClose={()=>setOpenTodo(false)} onDelete={async (id)=>{/* delete api + refetch */}} />
<NotificationsDrawer open={openNotif} onClose={()=>setOpenNotif(false)} items={notifications} />
```


4. For full production match, wire API endpoints to `lib/api` and implement server responses for create/delete/update.


If you want, I can now paste the exact patch for your `app/page.tsx` (Dashboard) which integrates these drawers and includes the create/delete handlers with `api` calls. Paste `yes` if you want that patch and I will provide the full Dashboard file replacement ready-to-paste.

