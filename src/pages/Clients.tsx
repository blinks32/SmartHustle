import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { User, Phone, Mail, Plus, Search } from 'lucide-react'
import { Header } from '../components/Header'

// Mock data - replace with real data from Supabase
const mockClients = [
  {
    id: '1',
    name: 'Adaora Okafor',
    phone: '+234 803 123 4567',
    email: 'adaora@email.com',
    lastService: 'Hair Braiding',
    totalSpent: 25000,
    visits: 5,
  },
  {
    id: '2',
    name: 'Emeka Johnson',
    phone: '+234 805 987 6543',
    email: '',
    lastService: 'Haircut',
    totalSpent: 12000,
    visits: 3,
  },
  {
    id: '3',
    name: 'Fatima Abdul',
    phone: '+234 807 456 7890',
    email: 'fatima@email.com',
    lastService: 'Gele Tying',
    totalSpent: 18000,
    visits: 4,
  },
]

export function Clients() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredClients = mockClients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.includes(searchTerm)
  )

  return (
    <div>
      <Header 
        title="Clients" 
        rightAction={
          <Link to="/clients/new" className="btn-primary">
            <Plus size={20} />
          </Link>
        }
      />

      <div className="p-4 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input w-full pl-10"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="card text-center">
            <div className="text-2xl font-bold text-primary-400">{mockClients.length}</div>
            <div className="text-sm text-gray-400">Total Clients</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-accent-400">
              {mockClients.reduce((sum, client) => sum + client.visits, 0)}
            </div>
            <div className="text-sm text-gray-400">Total Visits</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-green-400">
              ₦{mockClients.reduce((sum, client) => sum + client.totalSpent, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-400">Total Revenue</div>
          </div>
        </div>

        {/* Clients List */}
        <div className="space-y-3">
          {filteredClients.map((client) => (
            <Link
              key={client.id}
              to={`/clients/${client.id}`}
              className="card hover:bg-gray-750 transition-colors block"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
                  <User className="text-white" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium mb-1">{client.name}</h3>
                  <div className="space-y-1 text-sm text-gray-400">
                    <div className="flex items-center space-x-2">
                      <Phone size={14} />
                      <span>{client.phone}</span>
                    </div>
                    {client.email && (
                      <div className="flex items-center space-x-2">
                        <Mail size={14} />
                        <span>{client.email}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-primary-400">
                    ₦{client.totalSpent.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-400">
                    {client.visits} visits
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredClients.length === 0 && (
          <div className="text-center py-12">
            <User className="mx-auto text-gray-600 mb-4" size={48} />
            <h3 className="text-lg font-medium mb-2">
              {searchTerm ? 'No clients found' : 'No clients yet'}
            </h3>
            <p className="text-gray-400 mb-4">
              {searchTerm 
                ? 'Try adjusting your search terms'
                : 'Start adding your clients to keep track of their information'
              }
            </p>
            {!searchTerm && (
              <Link to="/clients/new" className="btn-primary">
                Add First Client
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  )
}