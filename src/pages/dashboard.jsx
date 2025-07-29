import React, { useState } from 'react'
import LoginModal from '../components/modals/loginModal'

export default function Dashboard() {
    const [loginModalOpen, setOpenLoginModal] = useState(false)
  return (

    <div>
        <button onClick={()=> setOpenLoginModal(true)}>Login</button>
        {loginModalOpen && <LoginModal open={loginModalOpen} onClose = {()=> setOpenLoginModal(false)}/>}

    </div>


  )
}
