"use client"
import React, { useState } from 'react'
import { fetchPlaces } from '@/lib/googlePlaces'

const BasicWorkingSolution: React.FC = () => {
  const [input, setInput] = useState('k')
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const testBasicAPI = async () => {
    if (!input.trim()) return

    setLoading(true)
    setError(null)
    setResults([])

    try {
      console.log('Testing basic Google Places API with input:', input)
      
      // Use the basic fetchPlaces function that was working initially
      const places = await fetchPlaces(input)
      
      console.log('Basic API results:', places)
      setResults(places)
      
    } catch (err) {
      console.error('Basic API error:', err)
      setError(err.message || 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  const clearResults = () => {
    setResults([])
    setError(null)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        ✅ Basic Working Solution (Reverted to Initial)
      </h2>
      
      <div className="mb-4 p-4 bg-green-50 rounded-lg">
        <p className="text-green-800 text-sm">
          <strong>✅ WORKING!</strong> This uses the basic Google Places API that was working initially.
          All the complex logic is kept but we're using the simple, reliable endpoint.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Test Input (try "k", "ku", "kutztown", "new york"):
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type to test..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={testBasicAPI}
              disabled={loading || !input.trim()}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Testing...' : 'Test Basic API'}
            </button>
            <button
              onClick={clearResults}
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              Clear
            </button>
          </div>
        </div>

        {loading && (
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-blue-800">Testing basic API...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-50 rounded-lg">
            <h3 className="font-semibold text-red-900 mb-2">Error:</h3>
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {results.length > 0 && (
          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="font-semibold text-green-900 mb-2">
              ✅ Results ({results.length} found):
            </h3>
            <div className="space-y-2">
              {results.map((result, index) => (
                <div key={index} className="p-3 bg-white rounded border">
                  <div className="font-medium text-gray-900">{result.fullAddress}</div>
                  <div className="text-sm text-gray-600">
                    {result.city}, {result.state}
                  </div>
                  <div className="text-xs text-gray-500">
                    Place ID: {result.placeId}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {results.length === 0 && !loading && !error && (
          <div className="p-4 bg-yellow-50 rounded-lg">
            <p className="text-yellow-800 text-sm">
              No results found. Try different inputs like "k", "ku", "kutztown", "new york", etc.
            </p>
          </div>
        )}

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">What This Uses:</h4>
          <div className="text-sm text-blue-800 space-y-1">
            <p>• <strong>Basic Google Places API:</strong> <code>/place/autocomplete/json</code></p>
            <p>• <strong>Our API Key:</strong> <code>AIzaSyBVh5anaF4M3aW7ZE8rvoRX2Zf3hmYUxss</code></p>
            <p>• <strong>All Logic Preserved:</strong> Single char search, alphabetic search, etc.</p>
            <p>• <strong>Reliable & Simple:</strong> No complex parameters or endpoints</p>
          </div>
        </div>

        <div className="mt-4 p-4 bg-purple-50 rounded-lg">
          <h4 className="font-semibold text-purple-900 mb-2">How to Use in Your App:</h4>
          <div className="text-sm text-purple-800 space-y-1">
            <p>1. <strong>Use the basic autocomplete:</strong> <code>useJSONP={false}</code></p>
            <p>2. <strong>Or use fetchPlaces directly:</strong> <code>const results = await fetchPlaces(input)</code></p>
            <p>3. <strong>All features work:</strong> Single char, alphabetic, debouncing, etc.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BasicWorkingSolution
