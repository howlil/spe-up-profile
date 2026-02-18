/** @format */

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/auth/me');
        if (!res.ok || cancelled) return;
        const data = await res.json();
        const role = data.user?.role;
        if (role === 'EXTERNAL') {
          router.replace('/admin/partnerships');
        } else {
          router.replace('/admin/articles');
        }
      } catch {
        if (!cancelled) router.replace('/admin/articles');
      }
    })();
    return () => { cancelled = true; };
  }, [router]);

  return null;
}
