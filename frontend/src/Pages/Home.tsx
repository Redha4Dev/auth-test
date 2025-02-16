import { Button } from '@/components/ui/button'
import { logout } from '@/Services/authService'
import React from 'react'
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const Logout = async () => {
    try {
      await logout()
      navigate("/Login");
    } catch (error) {
      console.log("Logout failed", error)
    }
  }
  return (
    <div>
      <Button onClick={Logout}>Log out</Button>
    </div>
  )
}

export default Home