import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Clock, User, Plus, Filter } from 'lucide-react'
import { Header } from '../components/Header'
import { formatCurrency, formatDate } from '../lib/utils'

// Mock data - replace with real data from Supabase
const mockBookings = [
  {
    id: '1',
    client: 'Adaora Okafor',
    service: 'Hair Braiding',
    date: '2024-01-15',
    time: '10:00 AM',
    price: 8000,
    status: 'confirmed' as const,
  },
  {
    id: '2',
    client: 'Emeka Johnson',
    service: 'Haircut & Styling',
    date: '2024-01-15',
    time: '2:00 PM',
    price: 3500,
    status: 'pending' as const,
  },
  {
    id: '3',
    client: 'Fatima Abdul',
    service: 'Gele Tying',
    date: '2024-01-16',
    time: '11:00 AM',
    price: 5000,
    status: 'completed' as const,
  },
]

const statusColors = {
  pending: 'bg-yellow-900/20 text-yellow-400 border-yellow-700',
  confirmed: 'bg-blue-900/20 text-blue-400 border-blue-700',
  completed: 'bg-green-900/20 text-green-400 border-green-700',
  cancelled: 'bg-red-900/20 text-red-400 border-red-700',
}

export function Bookings() {
  const [filter, setFilter] = useState<'all' | 'today' | 'upcoming'>('all')

  return (
    <div>
      <Header 
        title="Bookings" 
        rightAction={
          <Link to="/bookings/new" className="btn-primary">
            <Plus size={20} />
          </Link>
        }
      />

      <div className="p-4 space-y-4">
        {/* Filter Tabs */}
        <div className="flex space-x-2">
          {[
            { key: 'all', label: 'All' },
            { key: 'today', label: 'Today' },
            { key: 'upcoming', label: 'Upcoming' },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === key
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Bookings List */}
        <div className="space-y-3">
          {mockBookings.map((booking) => (
            <div key={booking.id} className="card">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
                    <User className="text-white" size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium">{booking.client}</h3>
                    <p className="text-sm text-gray-400">{booking.service}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs border ${statusColors[booking.status]}`}>
                  {booking.status}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-400">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Calendar size={16} />
                    <span>{formatDate(booking.date)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock size={16} />
                    <span>{booking.time}</span>
                  </div>
                </div>
                <span className="font-medium text-primary-400">
                  {formatCurrency(booking.price)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {mockBookings.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="mx-auto text-gray-600 mb-4" size={48} />
            <h3 className="text-lg font-medium mb-2">No bookings yet</h3>
            <p className="text-gray-400 mb-4">Start scheduling appointments with your clients</p>
            <Link to="/bookings/new" className="btn-primary">
              Create First Booking
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}