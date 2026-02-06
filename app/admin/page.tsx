/** @format */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  FileText,
  Handshake,
  Users,
  Eye,
  Loader2
} from 'lucide-react';

interface Stats {
  totalArticles: number;
  totalPartnerships: number;
  totalAlumni: number;
  totalViews: number;
}

interface Activity {
  id: string;
  type: 'article' | 'partnership' | 'alumni';
  title: string;
  user: string;
  timestamp: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [stats, setStats] = useState<Stats | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, [selectedPeriod]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch stats
      const statsRes = await fetch(`/api/dashboard/stats?period=${selectedPeriod}`);
      if (statsRes.status === 401) {
        router.push('/login?redirect=/admin');
        return;
      }
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }

      // Fetch recent activities
      const activitiesRes = await fetch('/api/dashboard/activities');
      if (activitiesRes.status === 401) {
        router.push('/login?redirect=/admin');
        return;
      }
      if (activitiesRes.ok) {
        const activitiesData = await activitiesRes.json();
        setActivities(activitiesData.activities || []);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statsData = [
    {
      id: 1,
      title: 'Total Articles',
      value: stats?.totalArticles ?? 0,
      icon: FileText,
      color: 'blue',
    },
    {
      id: 2,
      title: 'Partnerships',
      value: stats?.totalPartnerships ?? 0,
      icon: Handshake,
      color: 'green',
    },
    {
      id: 3,
      title: 'Alumni Records',
      value: stats?.totalAlumni ?? 0,
      icon: Users,
      color: 'purple',
    },
    {
      id: 4,
      title: 'Total Views',
      value: stats?.totalViews ?? 0,
      icon: Eye,
      color: 'orange',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <header className="h-14 px-6 bg-white border-b border-gray-200 flex items-center justify-between">
        <div>
          <h1 className="text-sm font-semibold text-gray-900">Dashboard</h1>
          <p className="text-xs text-gray-500">SPE UP SC Admin Panel</p>
        </div>

        <div className="flex items-center gap-2">
          {/* Period Selector */}
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="h-9 px-3 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
          >
            <option value="7d" className="text-gray-900">Last 7 days</option>
            <option value="30d" className="text-gray-900">Last 30 days</option>
            <option value="90d" className="text-gray-900">Last 90 days</option>
          </select>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {statsData.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.id} className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Icon className={`w-4 h-4 ${stat.color === 'blue' ? 'text-blue-600' :
                    stat.color === 'green' ? 'text-green-600' :
                      stat.color === 'purple' ? 'text-purple-600' :
                        'text-orange-600'
                    }`} />
                  <h3 className="text-xs font-medium text-gray-700">{stat.title}</h3>
                </div>
                <div className="flex items-end justify-between">
                  <p className="text-xl font-semibold text-gray-900">{stat.value}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activities */}
          <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-sm font-semibold text-gray-900">Recent Activities</h2>
            </div>
            <div className="p-4">
              {activities.length === 0 ? (
                <p className="text-xs text-gray-500 text-center py-4">No recent activities</p>
              ) : (
                <div className="space-y-3">
                  {activities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 p-3 rounded-md hover:bg-gray-50 transition-colors">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${activity.type === 'article' ? 'bg-blue-100 text-blue-600' :
                        activity.type === 'partnership' ? 'bg-green-100 text-green-600' :
                          'bg-purple-100 text-purple-600'
                        }`}>
                        {activity.type === 'article' ? <FileText className="w-3 h-3" /> :
                          activity.type === 'partnership' ? <Handshake className="w-3 h-3" /> :
                            <Users className="w-3 h-3" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-900 font-medium">{activity.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">by {activity.user}</span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-400">{activity.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-sm font-semibold text-gray-900">Quick Actions</h2>
            </div>
            <div className="p-4">
              <div className="space-y-2">
                <a href="/admin/articles/new" className="block w-full p-3 text-left rounded-md border border-gray-200 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <div>
                      <p className="text-xs font-medium text-gray-900">New Article</p>
                      <p className="text-xs text-gray-500">Create a new article</p>
                    </div>
                  </div>
                </a>

                <a href="/admin/partnerships" className="block w-full p-3 text-left rounded-md border border-gray-200 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Handshake className="w-4 h-4 text-green-600" />
                    <div>
                      <p className="text-xs font-medium text-gray-900">Review Partnership</p>
                      <p className="text-xs text-gray-500">Check pending applications</p>
                    </div>
                  </div>
                </a>

                <a href="/admin/alumni" className="block w-full p-3 text-left rounded-md border border-gray-200 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Users className="w-4 h-4 text-purple-600" />
                    <div>
                      <p className="text-xs font-medium text-gray-900">Manage Alumni</p>
                      <p className="text-xs text-gray-500">View alumni records</p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}