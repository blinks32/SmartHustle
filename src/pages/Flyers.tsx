import React, { useState } from 'react'
import { Palette, Download, Share, Sparkles, Image } from 'lucide-react'
import { Header } from '../components/Header'

const templates = [
  {
    id: 'promo',
    name: 'Promotion',
    description: 'Special offers and discounts',
    color: 'bg-red-600'
  },
  {
    id: 'service',
    name: 'Service Menu',
    description: 'Showcase your services',
    color: 'bg-blue-600'
  },
  {
    id: 'event',
    name: 'Event',
    description: 'Special occasions',
    color: 'bg-purple-600'
  },
  {
    id: 'announcement',
    name: 'Announcement',
    description: 'Business updates',
    color: 'bg-green-600'
  }
]

const samplePrompts = [
  "Weekend special: 20% off all haircuts",
  "New braiding styles available - book now!",
  "Grand opening celebration - free consultation",
  "Christmas special: Gele tying + makeup combo"
]

export function Flyers() {
  const [prompt, setPrompt] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState('promo')
  const [generatedFlyer, setGeneratedFlyer] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const generateFlyer = async () => {
    if (!prompt.trim()) return

    setLoading(true)
    
    // Simulate AI flyer generation
    setTimeout(() => {
      // In a real app, this would call an AI service
      setGeneratedFlyer(`Generated flyer for: "${prompt}"`)
      setLoading(false)
    }, 2000)
  }

  return (
    <div>
      <Header title="AI Flyer Generator" showBack />

      <div className="p-4 space-y-6">
        {/* Instructions */}
        <div className="card">
          <div className="flex items-center space-x-3 mb-3">
            <Sparkles className="text-primary-400" size={24} />
            <h2 className="text-lg font-semibold">Create Stunning Flyers</h2>
          </div>
          <p className="text-gray-400 text-sm">
            Describe what you want to promote and our AI will create a professional flyer 
            perfect for WhatsApp, Instagram, and other social media.
          </p>
        </div>

        {/* Template Selection */}
        <div>
          <h3 className="text-sm font-medium mb-3">Choose Template Style:</h3>
          <div className="grid grid-cols-2 gap-3">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => setSelectedTemplate(template.id)}
                className={`card text-left transition-all ${
                  selectedTemplate === template.id
                    ? 'ring-2 ring-primary-500 bg-gray-750'
                    : 'hover:bg-gray-750'
                }`}
              >
                <div className={`w-8 h-8 ${template.color} rounded-lg mb-2`} />
                <h4 className="font-medium">{template.name}</h4>
                <p className="text-sm text-gray-400">{template.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Sample Prompts */}
        <div>
          <h3 className="text-sm font-medium mb-3">Quick Examples:</h3>
          <div className="space-y-2">
            {samplePrompts.map((samplePrompt) => (
              <button
                key={samplePrompt}
                onClick={() => setPrompt(samplePrompt)}
                className="w-full text-left px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors"
              >
                "{samplePrompt}"
              </button>
            ))}
          </div>
        </div>

        {/* Prompt Input */}
        <div className="card">
          <label className="block text-sm font-medium mb-2">Describe Your Flyer:</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="E.g., Weekend special: 20% off all haircuts, valid Saturday and Sunday only..."
            className="input w-full min-h-[100px] resize-none mb-4"
            rows={4}
          />
          
          <button
            onClick={generateFlyer}
            disabled={loading || !prompt.trim()}
            className="btn-primary w-full flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Palette size={20} />
                <span>Generate Flyer</span>
              </>
            )}
          </button>
        </div>

        {/* Generated Flyer Preview */}
        {generatedFlyer && (
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Your Generated Flyer</h3>
            
            {/* Flyer Preview */}
            <div className="bg-gradient-to-br from-primary-600 to-accent-600 rounded-lg p-6 text-white text-center mb-4">
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <h2 className="text-xl font-bold mb-2">SMART HUSTLE SALON</h2>
                <div className="text-lg mb-2">{prompt}</div>
                <div className="text-sm opacity-90">📞 Call: +234 xxx xxx xxxx</div>
                <div className="text-sm opacity-90">📍 Your Location Here</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button className="btn-secondary flex items-center justify-center space-x-2">
                <Download size={16} />
                <span>Download</span>
              </button>
              <button className="btn-primary flex items-center justify-center space-x-2">
                <Share size={16} />
                <span>Share</span>
              </button>
            </div>
          </div>
        )}

        {/* Tips */}
        <div className="card bg-purple-900/10 border-purple-700">
          <h3 className="font-medium mb-2 text-purple-400">🎨 Design Tips:</h3>
          <ul className="text-sm text-purple-300 space-y-1">
            <li>• Be specific about your offer or service</li>
            <li>• Include dates and times for limited offers</li>
            <li>• Mention your location or contact info</li>
            <li>• Use action words like "Book Now" or "Limited Time"</li>
            <li>• Keep text short and easy to read on mobile</li>
          </ul>
        </div>
      </div>
    </div>
  )
}