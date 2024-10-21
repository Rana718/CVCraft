"use client";
import Header from '@/components/Header';
import { Toaster } from '@/components/ui/sonner';
import React, { ReactNode } from 'react';

interface DashboardLayoutProps {
  children: ReactNode;
}

function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <>
      <div className="">
        <Header />
        <div className="">
          {children}
        </div>
        <Toaster/>
      </div>
    </>

  );
}

export default DashboardLayout;
