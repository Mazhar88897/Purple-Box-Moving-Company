"use client"
import React, { useState } from 'react'

const MinimalTest: React.FC = () => {
  const [input, setInput] = useState('k')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const testMinimal = async () => {
    setLoading(true)
    setResult(null)

    try {
      // Test the basic Google Places API that was working initially
      const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=AIzaSyBVh5anaF4M3aW7ZE8rvoRX2Zf3hmYUxss`
      
      console.log('Testing minimal URL:', url)
      
      const response = await fetch(url)
      const data = await response.json()
      
      console.log('Minimal test result:', data)
      setResult(data)
      
    } catch (error) {
      console.error('Minimal test error:', error)
      setResult({ error: (error as Error).message || 'Unknown error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Minimal Google Places API Test
      </h2>
      
      <div className="mb-4 p-4 bg-red-50 rounded-lg">
        <p className="text-red-800 text-sm">
            <strong>Problem:</strong> We are getting ZERO_RESULTS even with correct parameters.
          Let&apos;s test the most basic possible call to see if the API works at all.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Test Input:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Try: k, ku, kut, kutztown"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={testMinimal}
              disabled={loading || !input.trim()}
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Testing...' : 'Test Basic API'}
            </button>
          </div>
        </div>

        {result && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Result:</h3>
            <div className="space-y-2 text-sm">
              <div><strong>Status:</strong> <span className={`px-2 py-1 rounded text-xs ${
                result.status === 'OK' ? 'bg-green-100 text-green-800' : 
                result.status === 'ZERO_RESULTS' ? 'bg-yellow-100 text-yellow-800' : 
                'bg-red-100 text-red-800'
              }`}>{result.status}</span></div>
              <div><strong>Predictions:</strong> {result.predictions?.length || 0}</div>
              {result.error && <div><strong>Error:</strong> <span className="text-red-600">{result.error}</span></div>}
            </div>
            
            <div className="mt-4">
              <h4 className="font-semibold text-gray-900 mb-2">Raw Response:</h4>
              <pre className="bg-gray-100 p-3 rounded text-xs overflow-x-auto max-h-60">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          </div>
        )}

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">What This Tests:</h4>
          <div className="text-sm text-blue-800 space-y-1">
            <p>• <strong>API Key Validity:</strong> Is our API key working?</p>
            <p>• <strong>Basic Functionality:</strong> Can we get ANY results?</p>
            <p>• <strong>Input Sensitivity:</strong> What inputs work?</p>
            <p>• <strong>Rate Limiting:</strong> Are we hitting limits?</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MinimalTest
