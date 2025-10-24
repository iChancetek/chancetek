import { useState, useEffect } from 'react';
import { trpc } from '@/lib/trpc';

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const { data, refetch, isLoading } = trpc.auth.user.useQuery(undefined, {enabled: false});
  const loginMutation = trpc.auth.user.useMutation();

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

  const login = async (provider: string) => {
    const response = await fetch(`/api/auth/login/${provider}`);
    const { url } = await response.json();
    window.location.href = url;
  };

  const logout = async () => {
    await fetch("/api/auth/logout");
    setUser(null);
  };

  return { user, login, logout, isAuthenticated: !!user, loading: isLoading };
}
