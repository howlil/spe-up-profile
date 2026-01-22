/** @format */

'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  FileText, 
  Handshake, 
  Users, 
  LogOut,
  Settings
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const navigationItems = [
  {
    icon: LayoutDashboard,
    href: '/admin',
    label: 'Dashboard',
  },
  {
    icon: FileText,
    href: '/admin/articles',
    label: 'Articles',
  },
  {
    icon: Handshake,
    href: '/admin/partnerships',
    label: 'Partnerships',
  },
  {
    icon: Users,
    href: '/admin/alumni',
    label: 'Alumni',
  },
  {
    icon: Settings,
    href: '/admin/admins',
    label: 'Admin Management',
  },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();

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
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
              
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

        {/* Bottom Actions */}
        <div className="p-2 border-t border-gray-200">
          <button
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