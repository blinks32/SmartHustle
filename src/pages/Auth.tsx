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
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
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
        <div className="card">
          <div className="flex mb-6 bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setIsSignUp(false)}
              className={`flex-1 py-2 px-4 text-center rounded-md transition-colors font-medium ${
                !isSignUp ? 'bg-primary-600 text-white shadow-sm' : 'text-gray-300 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsSignUp(true)}
              className={`flex-1 py-2 px-4 text-center rounded-md transition-colors font-medium ${
                isSignUp ? 'bg-primary-600 text-white shadow-sm' : 'text-gray-300 hover:text-white'
              }`}
            >
              Sign Up
            </button>
          </div>

          {error && (
            <div className="bg-red-900/20 border border-red-700 text-red-400 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          {isSignUp ? (
            <form onSubmit={signUpForm.handleSubmit(handleSignUp)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-200">Email</label>
                <input
                  {...signUpForm.register('email')}
                  type="email"
                  className="input w-full"
                  placeholder="your@email.com"
                />
                {signUpForm.formState.errors.email && (
                  <p className="text-red-400 text-sm mt-1">
                    {signUpForm.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-200">Password</label>
                <input
                  {...signUpForm.register('password')}
                  type="password"
                  className="input w-full"
                  placeholder="••••••••"
                />
                {signUpForm.formState.errors.password && (
                  <p className="text-red-400 text-sm mt-1">
                    {signUpForm.formState.errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-200">Business Name</label>
                <input
                  {...signUpForm.register('businessName')}
                  type="text"
                  className="input w-full"
                  placeholder="Your Business Name"
                />
                {signUpForm.formState.errors.businessName && (
                  <p className="text-red-400 text-sm mt-1">
                    {signUpForm.formState.errors.businessName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-200">Business Type</label>
                <select
                  {...signUpForm.register('businessType')}
                  className="input w-full bg-gray-800"
                >
                  <option value="">Select your business type</option>
                  {businessTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {signUpForm.formState.errors.businessType && (
                  <p className="text-red-400 text-sm mt-1">
                    {signUpForm.formState.errors.businessType.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-200">Phone (Optional)</label>
                <input
                  {...signUpForm.register('phone')}
                  type="tel"
                  className="input w-full"
                  placeholder="+234 xxx xxx xxxx"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full flex items-center justify-center h-12 mt-6"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  'Create Account'
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={signInForm.handleSubmit(handleSignIn)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-200">Email</label>
                <input
                  {...signInForm.register('email')}
                  type="email"
                  className="input w-full"
                  placeholder="your@email.com"
                />
                {signInForm.formState.errors.email && (
                  <p className="text-red-400 text-sm mt-1">
                    {signInForm.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-200">Password</label>
                <input
                  {...signInForm.register('password')}
                  type="password"
                  className="input w-full"
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
                className="btn-primary w-full flex items-center justify-center h-12 mt-6"
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