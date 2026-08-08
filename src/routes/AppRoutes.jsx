import React from 'react'
import {Routes , Route} from "react-router-dom"
import Login from '../pages/auth/Login'

const AppRoutes = () => {
  return (
    <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='*' element={
            <div className='flex min-h-screen items-center justify-center'>
                <h1 className='text-2xl font-bold'>
                    Water Intake Tracker
                </h1>
            </div>
        }/>
        
    </Routes>
  )
}

export default AppRoutes