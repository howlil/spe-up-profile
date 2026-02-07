/** @format */

'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { 
  FileText, 
  Handshake, 
  Users, 
  LogOut,
  Settings,
  Loader2
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

interface User {
  id: string;
  email: string;
  name: string | null;
  role: 'SUPERADMIN' | 'WRITER' | 'EXTERNAL';
}

const navigationItems = [
  {
    icon: FileText,
    href: '/admin/articles',
    label: 'Articles',
    roles: ['SUPERADMIN', 'WRITER'],
  },
  {
    icon: Handshake,
    href: '/admin/partnerships',
    label: 'Partnerships',
    roles: ['SUPERADMIN'],
  },
  {
    icon: Users,
    href: '/admin/alumni',
    label: 'Alumni',
    roles: ['SUPERADMIN'],
  },
  {
    icon: Settings,
    href: '/admin/admins',
    label: 'Admin Management',
    roles: ['SUPERADMIN'],
  },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await fetch('/api/auth/me');
      if (res.status === 401) {
        router.push('/login');
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      }
    } catch (error) {
      console.error('Failed to fetch user:', error);
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Filter navigation based on user role
  const filteredNavigation = user 
    ? navigationItems.filter(item => item.roles.includes(user.role))
    : [];

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-[#3C8C98]" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Sidebar - Ultra-thin */}
      <aside className="w-14 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="h-14 flex items-center justify-center border-b border-gray-200">
          <div className="w-9 h-9 bg-gradient-to-br from-[#3C8C98] to-[#2cb385] rounded-lg flex items-center justify-center">
            <span className="text-white text-xs font-semibold">SPE</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2">
          <div className="space-y-1">
            {filteredNavigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname.startsWith(item.href);
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`w-10 h-10 flex items-center justify-center rounded-md transition-all group relative ${
                    isActive 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  title={item.label}
                >
                  <Icon className="w-5 h-5" />
                  
                  {/* Tooltip */}
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                    {item.label}
                  </div>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* User Info & Logout */}
        <div className="p-2 border-t border-gray-200 space-y-1">
          {/* User badge */}
          <div className="w-10 h-10 flex items-center justify-center group relative">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${
              user.role === 'SUPERADMIN' ? 'bg-purple-500' : 
              user.role === 'WRITER' ? 'bg-blue-500' : 'bg-gray-500'
            }`}>
              {user.name?.charAt(0).toUpperCase() || user.email.charAt(0).toUpperCase()}
            </div>
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
              {user.name || user.email}<br/>
              <span className="text-gray-400">{user.role}</span>
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            className="w-10 h-10 flex items-center justify-center rounded-md text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all group relative"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
              Logout
            </div>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {children}
      </div>
    </div>
  );
}