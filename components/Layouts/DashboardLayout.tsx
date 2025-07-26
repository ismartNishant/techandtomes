'use client';

import React, { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './SideBar';


const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', mobileOpen);
  }, [mobileOpen]);

  const handleToggleSidebar = () => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    if (isMobile) {
      setMobileOpen((prev) => !prev);
    } else {
      setCollapsed((prev) => !prev);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
 
      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

 
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}


      <div className="flex flex-col flex-1 min-w-0 min-h-screen">
        <Header collapsed={collapsed} onToggleSidebar={handleToggleSidebar} />
        <main className="flex-1 overflow-y-auto p-4 bg-muted  ">
          <div className='bg-background p-4 rounded-lg '>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
