import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FileText, Download, Eye, Plus, Mic } from 'lucide-react'
import { Header } from '../components/Header'
import { formatCurrency, formatDate } from '../lib/utils'

// Mock data - replace with real data from Supabase
const mockInvoices = [
  {
    id: '1',
    client: 'Adaora Okafor',
    items: [
      { name: 'Hair Braiding', quantity: 1, price: 8000 },
      { name: 'Hair Treatment', quantity: 1, price: 2000 },
    ],
    total: 10000,
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    client: 'Emeka Johnson',
    items: [
      { name: 'Haircut', quantity: 1, price: 2500 },
      { name: 'Beard Trim', quantity: 1, price: 1000 },
    ],
    total: 3500,
    createdAt: '2024-01-14T14:30:00Z',
  },
  {
    id: '3',
    client: 'Fatima Abdul',
    items: [
      { name: 'Gele Tying', quantity: 1, price: 5000 },
    ],
    total: 5000,
    createdAt: '2024-01-13T11:00:00Z',
  },
]

export function Invoices() {
  return (
    <div>
      <Header 
        title="Invoices" 
        rightAction={
          <div className="flex space-x-2">
            <Link to="/invoices/voice" className="p-2 bg-accent-600 hover:bg-accent-700 rounded-lg transition-colors">
              <Mic size={20} />
            </Link>
            <Link to="/invoices/new" className="btn-primary">
              <Plus size={20} />
            </Link>
          </div>
        }
      />

      <div className="p-4 space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="card text-center">
            <div className="text-2xl font-bold text-primary-400">{mockInvoices.length}</div>
            <div className="text-sm text-gray-400">Total Invoices</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-green-400">
              {formatCurrency(mockInvoices.reduce((sum, invoice) => sum + invoice.total, 0))}
            </div>
            <div className="text-sm text-gray-400">Total Revenue</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Link to="/invoices/voice" className="card hover:bg-gray-750 transition-colors text-center">
            <Mic className="mx-auto mb-2 text-accent-400" size={24} />
            <h3 className="font-medium">Voice Invoice</h3>
            <p className="text-sm text-gray-400">Create with voice</p>
          </Link>
          <Link to="/invoices/new" className="card hover:bg-gray-750 transition-colors text-center">
            <FileText className="mx-auto mb-2 text-primary-400" size={24} />
            <h3 className="font-medium">Text Invoice</h3>
            <p className="text-sm text-gray-400">Create manually</p>
          </Link>
        </div>

        {/* Invoices List */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Recent Invoices</h3>
          {mockInvoices.map((invoice) => (
            <div key={invoice.id} className="card">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-medium">{invoice.client}</h3>
                  <p className="text-sm text-gray-400">
                    {formatDate(invoice.createdAt)}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-primary-400">
                    {formatCurrency(invoice.total)}
                  </div>
                  <div className="text-xs text-gray-400">
                    {invoice.items.length} item{invoice.items.length !== 1 ? 's' : ''}
                  </div>
                </div>
              </div>

              <div className="space-y-1 mb-4">
                {invoice.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm text-gray-400">
                    <span>{item.quantity}x {item.name}</span>
                    <span>{formatCurrency(item.price)}</span>
                  </div>
                ))}
              </div>

              <div className="flex space-x-2">
                <button className="flex-1 btn-secondary flex items-center justify-center space-x-2">
                  <Eye size={16} />
                  <span>View</span>
                </button>
                <button className="flex-1 btn-primary flex items-center justify-center space-x-2">
                  <Download size={16} />
                  <span>Export</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {mockInvoices.length === 0 && (
          <div className="text-center py-12">
            <FileText className="mx-auto text-gray-600 mb-4" size={48} />
            <h3 className="text-lg font-medium mb-2">No invoices yet</h3>
            <p className="text-gray-400 mb-4">Create your first invoice to get started</p>
            <div className="flex space-x-3 justify-center">
              <Link to="/invoices/voice" className="btn-secondary">
                Voice Invoice
              </Link>
              <Link to="/invoices/new" className="btn-primary">
                Create Invoice
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}