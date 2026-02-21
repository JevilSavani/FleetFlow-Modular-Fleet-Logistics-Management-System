'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated) {
        router.push('/dashboard');
      } else {
        router.push('/login');
      }
    }
  }, [isAuthenticated, loading, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      <div className="text-center animate-fade-in">
        <div className="relative mb-6">
          <div className="animate-spin rounded-full h-14 w-14 border-[3px] border-blue-500/20 border-t-blue-500 mx-auto"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl">🚚</span>
          </div>
        </div>
        <h2 className="text-white text-lg font-semibold tracking-tight">FleetFlow</h2>
        <p className="text-blue-300/80 text-sm mt-1">Loading your workspace...</p>
      </div>
    </div>
  );
}
