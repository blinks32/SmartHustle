import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Calendar, 
  Users, 
  FileText, 
  MessageSquare,
  Palette,
  BarChart3,
  Zap,
  QrCode
} from 'lucide-react'
import { Header } from '../components/Header'
import { useAuth } from '../hooks/useAuth'

const quickActions = [
  {
    title: 'New Booking',
    description: 'Schedule a client appointment',
    icon: Calendar,
    to: '/bookings/new',
    color: 'bg-primary-600'
  },
  {
    title: 'AI Chat Reply',
    description: 'Get smart response suggestions',
    icon: MessageSquare,
    to: '/ai-chat',
    color: 'bg-blue-600'
  },
  {
    title: 'Create Invoice',
    description: 'Generate invoice with voice/text',
    icon: FileText,
    to: '/invoices/new',
    color: 'bg-accent-600'
  },
  {
    title: 'AI Flyer',
    description: 'Design promotional flyers',
    icon: Palette,
    to: '/flyers',
    color: 'bg-purple-600'
  },
]

const features = [
  {
    title: 'Analytics',
    description: 'View business insights',
    icon: BarChart3,
    to: '/analytics'
  },
  {
    title: 'Business Profile',
    description: 'Your mini website',
    icon: QrCode,
    to: '/profile'
  },
  {
    title: 'Clients',
    description: 'Manage your clients',
    icon: Users,
    to: '/clients'
  },
]

export function Home() {
  const { user } = useAuth()

  return (
    <div>
      <Header title="Smart Hustle" />
      
      <div className="p-4 space-y-6">
        {/* Welcome Section */}
        <div className="card">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
              <Zap className="text-white" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold">Welcome back!</h2>
              <p className="text-gray-400">Ready to grow your business?</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => (
              <Link
                key={action.title}
                to={action.to}
                className="card hover:bg-gray-750 transition-colors"
              >
                <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center mb-3`}>
                  <action.icon className="text-white" size={20} />
                </div>
                <h4 className="font-medium mb-1">{action.title}</h4>
                <p className="text-sm text-gray-400">{action.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Features */}
        <div>
          <h3 className="text-lg font-semibold mb-3">More Features</h3>
          <div className="space-y-3">
            {features.map((feature) => (
              <Link
                key={feature.title}
                to={feature.to}
                className="card hover:bg-gray-750 transition-colors flex items-center space-x-4"
              >
                <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">
                  <feature.icon className="text-gray-300" size={20} />
                </div>
                <div>
                  <h4 className="font-medium">{feature.title}</h4>
                  <p className="text-sm text-gray-400">{feature.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}