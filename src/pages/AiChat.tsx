import React, { useState } from 'react'
import { MessageSquare, Send, Copy, Languages, Sparkles } from 'lucide-react'
import { Header } from '../components/Header'

const sampleMessages = [
  "How much is braiding?",
  "Are you available tomorrow?",
  "Can you do gele for my wedding?",
  "What time do you close?",
  "Do you accept card payment?",
]

const sampleReplies = {
  "How much is braiding?": [
    "Hi! Braiding starts from ₦3,000 depending on the style. What type are you looking for? 😊",
    "Hello dear! My braiding prices range from ₦3,000 - ₦8,000. Send me a picture of the style you want and I'll give you exact pricing 💕",
    "Good day! Braiding dey start from ₦3k o. Wetin kind style you wan do? Make I give you better price 🔥"
  ],
  "Are you available tomorrow?": [
    "Yes, I have slots available tomorrow! What time works best for you?",
    "Tomorrow I get space! Morning or afternoon you prefer? Let me check my schedule 📅",
    "I dey available tomorrow o! Wetin time you wan come? Make we book am sharp sharp ⚡"
  ]
}

export function AiChat() {
  const [clientMessage, setClientMessage] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [language, setLanguage] = useState<'english' | 'pidgin'>('english')

  const generateReplies = async () => {
    if (!clientMessage.trim()) return

    setLoading(true)
    
    // Simulate AI processing
    setTimeout(() => {
      const replies = sampleReplies[clientMessage as keyof typeof sampleReplies] || [
        "Thank you for your message! Let me get back to you with the details.",
        "Hi there! I appreciate you reaching out. How can I help you today?",
        "Hello! Thanks for contacting me. I'll be happy to assist you."
      ]
      
      setSuggestions(replies)
      setLoading(false)
    }, 1500)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // You could add a toast notification here
  }

  return (
    <div>
      <Header title="AI Chat Replies" showBack />

      <div className="p-4 space-y-6">
        {/* Instructions */}
        <div className="card">
          <div className="flex items-center space-x-3 mb-3">
            <Sparkles className="text-primary-400" size={24} />
            <h2 className="text-lg font-semibold">Smart Reply Generator</h2>
          </div>
          <p className="text-gray-400 text-sm">
            Paste your client's message below and get AI-powered reply suggestions. 
            Choose between professional English or friendly Pidgin responses.
          </p>
        </div>

        {/* Language Toggle */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Response Language:</span>
          <div className="flex bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setLanguage('english')}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                language === 'english'
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLanguage('pidgin')}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                language === 'pidgin'
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Pidgin
            </button>
          </div>
        </div>

        {/* Sample Messages */}
        <div>
          <h3 className="text-sm font-medium mb-3">Quick Examples:</h3>
          <div className="flex flex-wrap gap-2">
            {sampleMessages.map((message) => (
              <button
                key={message}
                onClick={() => setClientMessage(message)}
                className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors"
              >
                "{message}"
              </button>
            ))}
          </div>
        </div>

        {/* Input Section */}
        <div className="card">
          <label className="block text-sm font-medium mb-2">Client's Message:</label>
          <div className="flex space-x-2">
            <textarea
              value={clientMessage}
              onChange={(e) => setClientMessage(e.target.value)}
              placeholder="Paste your client's message here..."
              className="input flex-1 min-h-[80px] resize-none"
              rows={3}
            />
            <button
              onClick={generateReplies}
              disabled={loading || !clientMessage.trim()}
              className="btn-primary px-3 self-end"
            >
              {loading ? (
                <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <Send size={20} />
              )}
            </button>
          </div>
        </div>

        {/* AI Suggestions */}
        {suggestions.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold flex items-center space-x-2">
              <MessageSquare className="text-primary-400" size={20} />
              <span>Suggested Replies</span>
            </h3>
            
            {suggestions.map((suggestion, index) => (
              <div key={index} className="card">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs bg-primary-900/30 text-primary-400 px-2 py-1 rounded">
                    Option {index + 1}
                  </span>
                  <button
                    onClick={() => copyToClipboard(suggestion)}
                    className="p-1 hover:bg-gray-700 rounded transition-colors"
                    title="Copy to clipboard"
                  >
                    <Copy size={16} />
                  </button>
                </div>
                <p className="text-gray-100">{suggestion}</p>
              </div>
            ))}
          </div>
        )}

        {/* Tips */}
        <div className="card bg-blue-900/10 border-blue-700">
          <h3 className="font-medium mb-2 text-blue-400">💡 Pro Tips:</h3>
          <ul className="text-sm text-blue-300 space-y-1">
            <li>• Use Pidgin for more casual, friendly responses</li>
            <li>• Always personalize the AI suggestions before sending</li>
            <li>• Include your business hours and contact info when relevant</li>
            <li>• Add emojis to make your responses more engaging</li>
          </ul>
        </div>
      </div>
    </div>
  )
}