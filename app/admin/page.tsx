/** @format */

'use client';

import { useState } from 'react';
import {
  FileText,
  Handshake,
  Users,
  TrendingUp,
  Calendar,
  Eye,
  Plus
} from 'lucide-react';

// Mock data untuk statistik
const statsData = [
  {
    id: 1,
    title: 'Total Articles',
    value: 42,
    change: '+12.5%',
    trend: 'up',
    icon: FileText,
    color: 'blue',
  },
  {
    id: 2,
    title: 'Partnerships',
    value: 18,
    change: '+8.2%',
    trend: 'up',
    icon: Handshake,
    color: 'green',
  },
  {
    id: 3,
    title: 'Alumni Records',
    value: 156,
    change: '+15.3%',
    trend: 'up',
    icon: Users,
    color: 'purple',
  },
  {
    id: 4,
    title: 'Monthly Views',
    value: '2.4K',
    change: '-2.1%',
    trend: 'down',
    icon: Eye,
    color: 'orange',
  },
];

// Mock data untuk aktivitas terbaru
const recentActivities = [
  {
    id: 1,
    type: 'article',
    title: 'New article published: "Advanced Drilling Techniques"',
    user: 'Dr. Sarah Johnson',
    timestamp: '2 hours ago',
  },
  {
    id: 2,
    type: 'partnership',
    title: 'Partnership application from Pertamina Hulu Energy',
    user: 'System',
    timestamp: '4 hours ago',
  },
  {
    id: 3,
    type: 'alumni',
    title: 'New alumni registration: John Doe',
    user: 'John Doe',
    timestamp: '1 day ago',
  },
  {
    id: 4,
    type: 'article',
    title: 'Article updated: "Sustainable Energy Transition"',
    user: 'Prof. Michael Chen',
    timestamp: '2 days ago',
  },
];

export default function AdminDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');

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
            className="h-8 px-3 text-xs border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
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
                  <p className={`text-xs ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                    {stat.change}
                  </p>
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
              <div className="space-y-3">
                {recentActivities.map((activity) => (
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

              <div className="mt-4 pt-4 border-t border-gray-100">
                <button className="text-xs text-blue-600 hover:underline">
                  View all activities
                </button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-sm font-semibold text-gray-900">Quick Actions</h2>
            </div>
            <div className="p-4">
              <div className="space-y-2">
                <button className="w-full p-3 text-left rounded-md border border-gray-200 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <div>
                      <p className="text-xs font-medium text-gray-900">New Article</p>
                      <p className="text-xs text-gray-500">Create a new article</p>
                    </div>
                  </div>
                </button>

                <button className="w-full p-3 text-left rounded-md border border-gray-200 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Handshake className="w-4 h-4 text-green-600" />
                    <div>
                      <p className="text-xs font-medium text-gray-900">Review Partnership</p>
                      <p className="text-xs text-gray-500">Check pending applications</p>
                    </div>
                  </div>
                </button>

                <button className="w-full p-3 text-left rounded-md border border-gray-200 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Users className="w-4 h-4 text-purple-600" />
                    <div>
                      <p className="text-xs font-medium text-gray-900">Alumni Export</p>
                      <p className="text-xs text-gray-500">Download alumni data</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>


      </main>
    </>
  );
}