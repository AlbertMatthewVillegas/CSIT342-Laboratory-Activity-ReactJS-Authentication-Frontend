import Login from './pages/login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './pages/register'
import Dashboard from './pages/dashboard'
import { UserProvider } from './hooks/user/provider'

function App() {
  return (
    <UserProvider>
        
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  )
}

export default App
