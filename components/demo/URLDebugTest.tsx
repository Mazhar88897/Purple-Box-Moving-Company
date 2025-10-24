"use client"
import React, { useState } from 'react'
import { fetchPlacesWithJSONP } from '@/lib/googlePlaces'

const URLDebugTest: React.FC = () => {
  const [input, setInput] = useState('k')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const testURLGeneration = async () => {
    if (!input.trim()) return

    setLoading(true)
    setResult(null)

    try {
      console.log('Testing URL generation for input:', input)
      
      // Override console.log to capture the URL
      const originalLog = console.log
      let capturedURL = ''
      
      console.log = (...args) => {
        if (args[0] === 'JSONP URL:' && args[1]) {
          capturedURL = args[1]
        }
        originalLog(...args)
      }

      // Call the JSONP function
      const results = await fetchPlacesWithJSONP(input)
      
      // Restore console.log
      console.log = originalLog

      setResult({
        url: capturedURL,
        results: results,
        resultsCount: results.length
      })

    } catch (error) {
      console.error('Error testing URL generation:', error)
      setResult({
        error: error.message,
        url: 'Error occurred'
      })
    } finally {
      setLoading(false)
    }
  }

  const clearResult = () => {
    setResult(null)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        URL Generation Debug Test
      </h2>
      
      <div className="mb-4 p-4 bg-yellow-50 rounded-lg">
        <p className="text-yellow-800 text-sm">
          <strong>Issue:</strong> Your request shows <code>GetPredictionsJson</code> but our code uses <code>GetPredictions</code>.
          Let's see what URL is actually being generated.
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
              onClick={testURLGeneration}
              disabled={loading || !input.trim()}
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Testing...' : 'Test URL Generation'}
            </button>
            <button
              onClick={clearResult}
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
              <span className="text-blue-800">Testing URL generation...</span>
            </div>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Generated URL:</h3>
              <div className="text-sm">
                <code className="break-all bg-gray-100 p-2 rounded block">
                  {result.url}
                </code>
              </div>
            </div>

            {result.error ? (
              <div className="p-4 bg-red-50 rounded-lg">
                <h3 className="font-semibold text-red-900 mb-2">Error:</h3>
                <p className="text-red-800">{result.error}</p>
              </div>
            ) : (
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-2">Results:</h3>
                <div className="text-sm text-green-800">
                  <p><strong>Results Count:</strong> {result.resultsCount}</p>
                  {result.results.length > 0 && (
                    <div className="mt-2">
                      <p><strong>Sample Results:</strong></p>
                      <ul className="list-disc list-inside ml-4">
                        {result.results.slice(0, 3).map((result: any, index: number) => (
                          <li key={index}>{result.fullAddress}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">What to Check:</h4>
          <div className="text-sm text-blue-800 space-y-1">
            <p>• <strong>URL contains &quot;GetPredictions&quot;:</strong> Our code is working correctly</p>
            <p>• <strong>URL contains &quot;GetPredictionsJson&quot;:</strong> Something else is modifying the URL</p>
            <p>• <strong>Results count > 0:</strong> The API is working</p>
            <p>• <strong>Results count = 0:</strong> Still getting ZERO_RESULTS</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default URLDebugTest
