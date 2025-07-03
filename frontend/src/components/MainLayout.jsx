import React from 'react'
import { Outlet } from 'react-router-dom'
import LeftSidebar from './LeftSidebar'

const MainLayout = () => {
  return (
    <>
    <LeftSidebar/>
    <div>
        <Outlet></Outlet>
    </div>
    </>
  )
}

export default MainLayout