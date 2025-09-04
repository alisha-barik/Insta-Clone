import React from "react";
import { Outlet } from "react-router-dom";
import LeftSidebar from "./LeftSidebar";
import MobileNav from "./MobileNav";

const MainLayout = () => {
  return (
    <>
      {/* Mobile navigation bar */}
      <div className="md:hidden">
        <MobileNav />
      </div>

      <div className="grid grid-cols-12 min-h-screen">
        {/* Sidebar (hidden on small screens) */}
        <div className="hidden md:block md:col-span-1 lg:col-span-2">
          <LeftSidebar />
        </div>

        {/* Main content area */}
        <div className="col-span-12 md:col-span-11 lg:col-span-10 p-4 ">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
