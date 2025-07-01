import React from 'react'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <>
    <div>MainLayout</div>
    <div>
        <Outlet></Outlet>
    </div>
    </>
  )
}

export default MainLayout