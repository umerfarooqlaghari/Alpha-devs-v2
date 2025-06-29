'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');

  // Mock data - in real app, this would come from API
  const [dashboardData] = useState({
    totalUsers: 1247,
    activeUsers: 892,
    totalRevenue: 45670,
    newSignups: 156,
    pageViews: 23456,
    conversionRate: 3.2,
    avgSessionDuration: '4m 32s',
    bounceRate: 42.1
  });

  const [trafficData] = useState([
    { date: '2024-01-01', visitors: 1200, pageViews: 3400, revenue: 2340 },
    { date: '2024-01-02', visitors: 1350, pageViews: 3800, revenue: 2890 },
    { date: '2024-01-03', visitors: 1100, pageViews: 3200, revenue: 2100 },
    { date: '2024-01-04', visitors: 1450, pageViews: 4100, revenue: 3200 },
    { date: '2024-01-05', visitors: 1600, pageViews: 4500, revenue: 3800 },
    { date: '2024-01-06', visitors: 1300, pageViews: 3700, revenue: 2900 },
    { date: '2024-01-07', visitors: 1550, pageViews: 4300, revenue: 3500 }
  ]);

  const [recentUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', plan: 'Professional', status: 'Active', joinDate: '2024-01-07' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', plan: 'Enterprise', status: 'Active', joinDate: '2024-01-06' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', plan: 'Starter', status: 'Trial', joinDate: '2024-01-05' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', plan: 'Professional', status: 'Active', joinDate: '2024-01-04' },
    { id: 5, name: 'David Brown', email: 'david@example.com', plan: 'Enterprise', status: 'Active', joinDate: '2024-01-03' }
  ]);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" color="black" />
          <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Dashboard Header */}
      <section className="bg-white border-b border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-black">Admin Dashboard</h1>
              <p className="text-gray-600 mt-2">Monitor your business metrics and user activity</p>
            </div>
            <div className="flex space-x-4">
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              >
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
              </select>
              <button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                Export Data
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-3xl font-bold text-black">{dashboardData.totalUsers.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span className="text-green-500 text-sm font-medium">+12.5%</span>
                <span className="text-gray-600 text-sm ml-2">vs last period</span>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Users</p>
                  <p className="text-3xl font-bold text-black">{dashboardData.activeUsers.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span className="text-green-500 text-sm font-medium">+8.2%</span>
                <span className="text-gray-600 text-sm ml-2">vs last period</span>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-3xl font-bold text-black">${dashboardData.totalRevenue.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span className="text-green-500 text-sm font-medium">+15.3%</span>
                <span className="text-gray-600 text-sm ml-2">vs last period</span>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">New Signups</p>
                  <p className="text-3xl font-bold text-black">{dashboardData.newSignups}</p>
                </div>
                <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span className="text-green-500 text-sm font-medium">+22.1%</span>
                <span className="text-gray-600 text-sm ml-2">vs last period</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Charts and Analytics */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Traffic Chart */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-black mb-6">Traffic Overview</h3>
              <div className="space-y-4">
                {trafficData.map((day, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-3 h-3 bg-black rounded-full"></div>
                      <span className="text-gray-600">{new Date(day.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex space-x-6 text-sm">
                      <span className="text-gray-600">{day.visitors} visitors</span>
                      <span className="text-gray-600">{day.pageViews} views</span>
                      <span className="font-medium text-black">${day.revenue}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-black mb-6">Performance Metrics</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Page Views</span>
                    <span className="font-medium text-black">{dashboardData.pageViews.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-black h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Conversion Rate</span>
                    <span className="font-medium text-black">{dashboardData.conversionRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gray-800 h-2 rounded-full" style={{ width: '32%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Avg Session Duration</span>
                    <span className="font-medium text-black">{dashboardData.avgSessionDuration}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gray-700 h-2 rounded-full" style={{ width: '68%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Bounce Rate</span>
                    <span className="font-medium text-black">{dashboardData.bounceRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gray-600 h-2 rounded-full" style={{ width: '42%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Users Table */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-black">Recent Users</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-black">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">{user.plan}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          user.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(user.joinDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-black hover:text-gray-700 mr-4">View</button>
                        <button className="text-gray-600 hover:text-gray-800">Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
