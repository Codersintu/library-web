import { useContext } from 'react'
import './App.css'
import { Navbar } from './Navbar'
import { Home } from './Home'
import { Feed } from './Feed'
import {Route,Routes,Navigate, useLocation} from 'react-router-dom'
import { Register } from './Register'
import { Post } from './Post'
import { Login } from './Login'
import { AuthContext } from '../context/AuthContext'

function App() {
  const location=useLocation();
  const {state}=useContext(AuthContext);
  const user=state?.user?.user
  return (
   <div>
   {location.pathname !== '/register' && location.pathname !== '/login' && <Navbar />}

   <Routes>
     <Route path="/" element={user ? <Home /> : <Navigate to='/register' />} />
     <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
     <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
     <Route path="/feed" element={user ? <Feed /> : <Navigate to="/login" />} />
     <Route path="/post" element={user ? <Post /> : <Navigate to="/login" />} />
   </Routes>
 </div>
  
  )
}

export default App
