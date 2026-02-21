'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Menu, X, LogOut } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
  const { user, signOut, isAuthenticated } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <span className="text-2xl font-bold">🚚 FleetFlow</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/dashboard" className="hover:text-blue-200 transition">
              Dashboard
            </Link>
            <Link href="/vehicles" className="hover:text-blue-200 transition">
              Vehicles
            </Link>
            <Link href="/drivers" className="hover:text-blue-200 transition">
              Drivers
            </Link>
            <Link href="/trips" className="hover:text-blue-200 transition">
              Trips
            </Link>
            <Link href="/analytics" className="hover:text-blue-200 transition">
              Analytics
            </Link>
            <button
              onClick={() => signOut()}
              className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/dashboard" className="block hover:text-blue-200 py-2">
              Dashboard
            </Link>
            <Link href="/vehicles" className="block hover:text-blue-200 py-2">
              Vehicles
            </Link>
            <Link href="/drivers" className="block hover:text-blue-200 py-2">
              Drivers
            </Link>
            <Link href="/trips" className="block hover:text-blue-200 py-2">
              Trips
            </Link>
            <Link href="/analytics" className="block hover:text-blue-200 py-2">
              Analytics
            </Link>
            <button
              onClick={() => {
                signOut();
                setMenuOpen(false);
              }}
              className="w-full text-left hover:text-blue-200 py-2"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
