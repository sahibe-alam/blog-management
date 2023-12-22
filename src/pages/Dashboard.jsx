import React, { useEffect } from 'react'
import AdminPanel from './AdminPanel'
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const isLoggedIn = !!localStorage.getItem('isAdminLoggedIn'); // Check authentication status
    const navigate = useNavigate()
useEffect(()=>{
    if (!isLoggedIn) {
        navigate('/login')
    }
})
  return (
   <>
   <AdminPanel/>
   </>
  )
}

export default Dashboard