'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase, getSession } from '@/lib/supabaseClient';
import type { User } from '@supabase/supabase-js';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function loadUser() {
      try {
        const session = await getSession();
        setUser(session?.user || null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load user');
      } finally {
        setLoading(false);
      }
    }

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      // Sync auth cookie with actual auth state
      if (session?.user) {
        document.cookie = 'fleetflow_auth=true; path=/; max-age=604800; SameSite=Lax';
      } else {
        document.cookie = 'fleetflow_auth=; path=/; max-age=0; SameSite=Lax';
      }
    });

    return () => subscription?.unsubscribe();
  }, []);

  const signOut = async () => {
    try {
      // Clear auth cookie before signing out
      document.cookie = 'fleetflow_auth=; path=/; max-age=0; SameSite=Lax';
      await supabase.auth.signOut();
      setUser(null);
      router.push('/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign out');
    }
  };

  return { user, loading, error, signOut, isAuthenticated: !!user };
}

export function useAuthRequired() {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [loading, isAuthenticated, router]);

  return { user, loading, isAuthenticated };
}
