'use client';

import { useAuthRequired } from '@/hooks/useAuth';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { loading, isAuthenticated } = useAuthRequired();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="text-center animate-fade-in">
          <div className="relative mb-5">
            <div className="animate-spin rounded-full h-12 w-12 border-[3px] border-blue-500/20 border-t-blue-600 mx-auto"></div>
          </div>
          <p className="text-slate-500 text-sm font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="text-center animate-fade-in">
          <p className="text-slate-500 text-sm font-medium">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
