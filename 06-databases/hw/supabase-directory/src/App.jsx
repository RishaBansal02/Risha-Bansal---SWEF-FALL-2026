import { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { supabase } from './supabase'

function Login() {
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)

    setError('')
    setPending(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: form.get('email'),
      password: form.get('password'),
    })
    setPending(false)

    if (error) setError(error.message)
  }

  return (
    <main>
      <h1>Sign in</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email <input name="email" type="email" autoComplete="username" required />
        </label>
        <label>
          Password <input name="password" type="password" autoComplete="current-password" required />
        </label>
        <button disabled={pending}>{pending ? 'Signing in…' : 'Sign in'}</button>
      </form>
      {error && <p role="alert">{error}</p>}
    </main>
  )
}

function Members() {
  const [rows, setRows] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    async function loadMembers() {
      const { data, error } = await supabase
        .from('members')
        .select('user_id, name, major, tamid_class, member_private_details(email, hometown)')
        .order('name')

      if (!active) return
      if (error) setError(error.message)
      else setRows(data)
    }

    loadMembers()
    return () => { active = false }
  }, [])

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut({ scope: 'local' })
    if (error) setError(error.message)
  }

  return (
    <main>
      <h1>TAMID Directory</h1>
      <button onClick={handleSignOut}>Sign out</button>
      {error && <p role="alert">{error}</p>}
      {!rows && !error && <p>Loading members…</p>}
      {rows && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Major</th>
              <th>TAMID class</th>
              <th>Email</th>
              <th>Hometown</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((member) => (
              <tr key={member.user_id}>
                <td>{member.name}</td>
                <td>{member.major}</td>
                <td>{member.tamid_class}</td>
                <td>{member.member_private_details?.email ?? 'Private'}</td>
                <td>{member.member_private_details?.hometown ?? 'Private'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  )
}

export default function App() {
  const [session, setSession] = useState(undefined)

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)
    })
    return () => data.subscription.unsubscribe()
  }, [])

  if (session === undefined) return <p>Loading…</p>

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={session ? <Navigate to="/members" replace /> : <Login />}
        />
        <Route
          path="/members"
          element={
            session ? <Members key={session.user.id} /> : <Navigate to="/login" replace />
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
