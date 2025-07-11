import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Zap, Loader2 } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { generateReferralCode } from '../lib/utils'

const signUpSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  businessName: z.string().min(1, 'Business name is required'),
  businessType: z.string().min(1, 'Business type is required'),
  phone: z.string().optional(),
})

const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

type SignUpData = z.infer<typeof signUpSchema>
type SignInData = z.infer<typeof signInSchema>

const businessTypes = [
  'Tailor/Fashion Designer',
  'Hair Stylist/Barber',
  'Food Vendor/Catering',
  'POS Agent',
  'Beauty Services',
  'Repair Services',
  'Photography',
  'Other'
]

export function Auth() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { signUp, signIn } = useAuth()

  const signUpForm = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
  })

  const signInForm = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
  })

  const handleSignUp = async (data: SignUpData) => {
    setLoading(true)
    setError('')
    
    try {
      await signUp(data.email, data.password, {
        business_name: data.businessName,
        business_type: data.businessType,
        phone: data.phone || '',
        referral_code: generateReferralCode(),
      })
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSignIn = async (data: SignInData) => {
    setLoading(true)
    setError('')
    
    try {
      await signIn(data.email, data.password)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Zap className="text-white" size={32} />
          </div>
          <h1 className="text-2xl font-bold text-white">Smart Hustle</h1>
          <p className="text-gray-400 mt-2">Grow your business with AI</p>
        </div>

        {/* Auth Form */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg">
          {/* Tab Switcher */}
          <div className="flex mb-6 bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setIsSignUp(false)}
              className={`flex-1 py-2 px-4 text-center rounded-md transition-colors font-medium text-sm ${
                !isSignUp 
                  ? 'bg-primary-600 text-white shadow-sm' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsSignUp(true)}
              className={`flex-1 py-2 px-4 text-center rounded-md transition-colors font-medium text-sm ${
                isSignUp 
                  ? 'bg-primary-600 text-white shadow-sm' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-900/20 border border-red-700 text-red-400 px-4 py-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          {/* Sign Up Form */}
          {isSignUp ? (
            <form onSubmit={signUpForm.handleSubmit(handleSignUp)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-white">Email</label>
                <input
                  {...signUpForm.register('email')}
                  type="email"
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="your@email.com"
                />
                {signUpForm.formState.errors.email && (
                  <p className="text-red-400 text-sm mt-1">
                    {signUpForm.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-white">Password</label>
                <input
                  {...signUpForm.register('password')}
                  type="password"
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="••••••••"
                />
                {signUpForm.formState.errors.password && (
                  <p className="text-red-400 text-sm mt-1">
                    {signUpForm.formState.errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-white">Business Name</label>
                <input
                  {...signUpForm.register('businessName')}
                  type="text"
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Your Business Name"
                />
                {signUpForm.formState.errors.businessName && (
                  <p className="text-red-400 text-sm mt-1">
                    {signUpForm.formState.errors.businessName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-white">Business Type</label>
                <select
                  {...signUpForm.register('businessType')}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="" className="bg-gray-800 text-gray-400">Select your business type</option>
                  {businessTypes.map((type) => (
                    <option key={type} value={type} className="bg-gray-800 text-white">{type}</option>
                  ))}
                </select>
                {signUpForm.formState.errors.businessType && (
                  <p className="text-red-400 text-sm mt-1">
                    {signUpForm.formState.errors.businessType.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-white">Phone (Optional)</label>
                <input
                  {...signUpForm.register('phone')}
                  type="tel"
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="+234 xxx xxx xxxx"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center mt-6"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  'Create Account'
                )}
              </button>
            </form>
          ) : (
            /* Sign In Form */
            <form onSubmit={signInForm.handleSubmit(handleSignIn)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-white">Email</label>
                <input
                  {...signInForm.register('email')}
                  type="email"
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="your@email.com"
                />
                {signInForm.formState.errors.email && (
                  <p className="text-red-400 text-sm mt-1">
                    {signInForm.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-white">Password</label>
                <input
                  {...signInForm.register('password')}
                  type="password"
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="••••••••"
                />
                {signInForm.formState.errors.password && (
                  <p className="text-red-400 text-sm mt-1">
                    {signInForm.formState.errors.password.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center mt-6"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  'Sign In'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}