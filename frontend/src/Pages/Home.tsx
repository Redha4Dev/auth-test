import { Button } from '@/components/ui/button'
import { logout } from '@/Services/authService'
import React from 'react'

function Home() {

  return (
    <div>
      <Button onClick={logout}>Log out</Button>
    </div>
  )
}

export default Home