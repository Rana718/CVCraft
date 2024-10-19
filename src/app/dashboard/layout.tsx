"use client";
import Header from '@/components/Header';
import { ToastProvider, Toast } from '@/components/ui/toast';
import React, { ReactNode } from 'react';

interface DashboardLayoutProps {
  children: ReactNode;
}

function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <ToastProvider> 
      <div className="">
        <Header />
        <div className="">
          {children}
        </div>
        <Toast /> 
      </div>
    </ToastProvider>
  );
}

export default DashboardLayout;
