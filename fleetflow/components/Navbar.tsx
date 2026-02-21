'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Menu, X, LogOut, Bell } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
  const { user, signOut, isAuthenticated } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200/60">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Mobile brand */}
          <Link href="/dashboard" className="flex items-center gap-2 md:hidden">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-sm">🚚</span>
            </div>
            <span className="text-lg font-bold text-slate-900">FleetFlow</span>
          </Link>

          {/* Search placeholder on desktop */}
          <div className="hidden md:flex items-center flex-1 max-w-md">
            <div className="w-full relative">
              <input
                type="text"
                placeholder="Search vehicles, drivers, trips..."
                className="w-full pl-10 pr-4 py-2 bg-slate-100 border-0 rounded-xl text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:bg-white transition"
              />
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            {/* Notification bell */}
            <button className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            {/* User */}
            <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white text-xs font-bold">
                {user?.email?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="hidden lg:block">
                <p className="text-sm font-semibold text-slate-800 leading-tight">
                  {user?.email?.split('@')[0] || 'User'}
                </p>
                <p className="text-[11px] text-slate-400">Fleet Manager</p>
              </div>
              <button
                onClick={() => signOut()}
                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                title="Sign out"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden py-4 border-t border-slate-100 space-y-1 animate-fade-in">
            {[
              { href: '/dashboard', label: 'Dashboard' },
              { href: '/vehicles', label: 'Vehicles' },
              { href: '/drivers', label: 'Drivers' },
              { href: '/trips', label: 'Trips' },
              { href: '/analytics', label: 'Analytics' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={() => { signOut(); setMenuOpen(false); }}
              className="w-full text-left px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
