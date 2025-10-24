"use client"
import React, { useState } from 'react'
import { fetchPlaces } from '@/lib/googlePlaces'

const WyomingTest: React.FC = () => {
  const [input, setInput] = useState('wy')
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const testWyoming = async () => {
    if (!input.trim()) return

    setLoading(true)
    setError(null)
    setResults([])

    try {
      console.log('Testing Wyoming search with input:', input)
      
      const places = await fetchPlaces(input)
      
      console.log('Wyoming test results:', places)
      setResults(places)
      
    } catch (err) {
      console.error('Wyoming test error:', err)
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
        🐎 Wyoming Test - Fixed!
      </h2>
      
      <div className="mb-4 p-4 bg-green-50 rounded-lg">
        <p className="text-green-800 text-sm">
          <strong>✅ FIXED!</strong> The issue was that "wy" was being filtered for street addresses only.
          Now it searches for all geocoded places (states, cities, etc.) so Wyoming should appear!
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Test Input (try &quot;wy&quot;, &quot;wyo&quot;, &quot;wyoming&quot;):
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
              onClick={testWyoming}
              disabled={loading || !input.trim()}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Testing...' : 'Test Wyoming'}
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
              <span className="text-blue-800">Testing Wyoming search...</span>
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
                <div key={index} className={`p-3 rounded border ${
                  result.fullAddress.toLowerCase().includes('wyoming') 
                    ? 'bg-yellow-100 border-yellow-300' 
                    : 'bg-white'
                }`}>
                  <div className="font-medium text-gray-900">{result.fullAddress}</div>
                  <div className="text-sm text-gray-600">
                    {result.city}, {result.state}
                  </div>
                  <div className="text-xs text-gray-500">
                    Place ID: {result.placeId}
                  </div>
                  {result.fullAddress.toLowerCase().includes('wyoming') && (
                    <div className="text-xs text-yellow-700 font-semibold">
                      🐎 Wyoming found!
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {results.length === 0 && !loading && !error && (
          <div className="p-4 bg-yellow-50 rounded-lg">
            <p className="text-yellow-800 text-sm">
              No results found. Try &quot;wy&quot;, &quot;wyo&quot;, or &quot;wyoming&quot;.
            </p>
          </div>
        )}

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">What Was Fixed:</h4>
          <div className="text-sm text-blue-800 space-y-1">
            <p>• <strong>Before:</strong> Used <code>street_address</code> type for multi-char inputs</p>
            <p>• <strong>After:</strong> Always use <code>geocode</code> type for states, cities, etc.</p>
            <p>• <strong>Before:</strong> Filtered results to only show street addresses</p>
            <p>• <strong>After:</strong> Show all results, let Google handle relevance</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WyomingTest
