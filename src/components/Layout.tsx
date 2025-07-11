import React from 'react'
import { Outlet } from 'react-router-dom'
import { BottomNav } from './BottomNav'

export function Layout() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <main className="pb-20">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}