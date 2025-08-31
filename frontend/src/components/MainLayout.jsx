import React from 'react'
import { Outlet } from 'react-router-dom'
import LeftSidebar from './LeftSidebar'
import MobileNav from './MobileNav'

const MainLayout = () => {
  return (
    <>
    <MobileNav />
    <LeftSidebar/>
    <div>
        <Outlet></Outlet>
    </div>
    </>
  )
}

export default MainLayout