import React from 'react'
import { BarChart3, TrendingUp, Users, DollarSign, Calendar, Star } from 'lucide-react'
import { Header } from '../components/Header'
import { formatCurrency } from '../lib/utils'

// Mock data - replace with real analytics from Supabase
const analytics = {
  totalRevenue: 125000,
  totalClients: 45,
  totalBookings: 128,
  averageBookingValue: 4500,
  monthlyGrowth: 15.5,
  topServices: [
    { name: 'Hair Braiding', count: 35, revenue: 45000 },
    { name: 'Haircut & Styling', count: 28, revenue: 32000 },
    { name: 'Gele Tying', count: 22, revenue: 28000 },
    { name: 'Makeup', count: 18, revenue: 20000 },
  ],
  topClients: [
    { name: 'Adaora Okafor', visits: 8, spent: 15000 },
    { name: 'Fatima Abdul', visits: 6, spent: 12000 },
    { name: 'Emeka Johnson', visits: 5, spent: 8500 },
  ],
  weeklyBookings: [12, 15, 18, 22, 19, 25, 28],
  monthlyRevenue: [85000, 95000, 110000, 125000],
}

export function Analytics() {
  return (
    <div>
      <Header title="Analytics" />

      <div className="p-4 space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-3">
          <div className="card text-center">
            <DollarSign className="mx-auto mb-2 text-green-400" size={24} />
            <div className="text-2xl font-bold text-green-400">
              {formatCurrency(analytics.totalRevenue)}
            </div>
            <div className="text-sm text-gray-400">Total Revenue</div>
          </div>
          
          <div className="card text-center">
            <Users className="mx-auto mb-2 text-blue-400" size={24} />
            <div className="text-2xl font-bold text-blue-400">{analytics.totalClients}</div>
            <div className="text-sm text-gray-400">Total Clients</div>
          </div>
          
          <div className="card text-center">
            <Calendar className="mx-auto mb-2 text-purple-400" size={24} />
            <div className="text-2xl font-bold text-purple-400">{analytics.totalBookings}</div>
            <div className="text-sm text-gray-400">Total Bookings</div>
          </div>
          
          <div className="card text-center">
            <TrendingUp className="mx-auto mb-2 text-accent-400" size={24} />
            <div className="text-2xl font-bold text-accent-400">
              {formatCurrency(analytics.averageBookingValue)}
            </div>
            <div className="text-sm text-gray-400">Avg. Booking</div>
          </div>
        </div>

        {/* Growth Indicator */}
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Monthly Growth</h3>
              <p className="text-sm text-gray-400">Compared to last month</p>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="text-green-400" size={20} />
              <span className="text-xl font-bold text-green-400">
                +{analytics.monthlyGrowth}%
              </span>
            </div>
          </div>
        </div>

        {/* Weekly Bookings Chart */}
        <div className="card">
          <h3 className="font-semibold mb-4">Weekly Bookings</h3>
          <div className="flex items-end justify-between h-32 space-x-2">
            {analytics.weeklyBookings.map((bookings, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-primary-600 rounded-t"
                  style={{
                    height: `${(bookings / Math.max(...analytics.weeklyBookings)) * 100}%`,
                    minHeight: '4px'
                  }}
                />
                <div className="text-xs text-gray-400 mt-2">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                </div>
                <div className="text-xs font-medium">{bookings}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Services */}
        <div className="card">
          <h3 className="font-semibold mb-4">Top Services</h3>
          <div className="space-y-3">
            {analytics.topServices.map((service, index) => (
              <div key={service.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium">{service.name}</div>
                    <div className="text-sm text-gray-400">{service.count} bookings</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-green-400">
                    {formatCurrency(service.revenue)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Clients */}
        <div className="card">
          <h3 className="font-semibold mb-4">Top Clients</h3>
          <div className="space-y-3">
            {analytics.topClients.map((client, index) => (
              <div key={client.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-accent-600 rounded-full flex items-center justify-center">
                    <Star size={16} />
                  </div>
                  <div>
                    <div className="font-medium">{client.name}</div>
                    <div className="text-sm text-gray-400">{client.visits} visits</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-green-400">
                    {formatCurrency(client.spent)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Revenue Trend */}
        <div className="card">
          <h3 className="font-semibold mb-4">Revenue Trend (Last 4 Months)</h3>
          <div className="flex items-end justify-between h-24 space-x-2">
            {analytics.monthlyRevenue.map((revenue, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-green-600 rounded-t"
                  style={{
                    height: `${(revenue / Math.max(...analytics.monthlyRevenue)) * 100}%`,
                    minHeight: '4px'
                  }}
                />
                <div className="text-xs text-gray-400 mt-2">
                  {['Sep', 'Oct', 'Nov', 'Dec'][index]}
                </div>
                <div className="text-xs font-medium">
                  {formatCurrency(revenue / 1000)}k
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insights */}
        <div className="card bg-blue-900/10 border-blue-700">
          <h3 className="font-medium mb-2 text-blue-400">📊 Business Insights:</h3>
          <ul className="text-sm text-blue-300 space-y-1">
            <li>• Your busiest day is Sunday with 28 bookings</li>
            <li>• Hair Braiding is your most popular service</li>
            <li>• Revenue has grown 15.5% this month</li>
            <li>• Adaora Okafor is your most loyal client</li>
          </ul>
        </div>
      </div>
    </div>
  )
}