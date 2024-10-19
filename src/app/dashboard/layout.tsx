"use client"
import Header from '@/components/Header';
import React, { ReactNode } from 'react';


interface DashboardLayoutProps {
  children: ReactNode;
}

function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="">
      <Header/>
      <div className="">
        {children}
      </div>
     
    </div>
  );
}

export default DashboardLayout;