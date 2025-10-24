"use client"
import React, { useState } from 'react'
import { fetchPlacesWithJSONP, fetchPlaces } from '@/lib/googlePlaces'
import { CityOption } from '@/lib/googlePlaces'

const ParameterVariationTest: React.FC = () => {
  const [input, setInput] = useState('k')
  const [results, setResults] = useState<{[key: string]: any}>({})
  const [isLoading, setIsLoading] = useState<{[key: string]: boolean}>({})

  const testMethods = async () => {
    if (!input.trim()) return

    const methods = {
      'JSONP with Target Params': () => fetchPlacesWithJSONP(input),
      'Standard Google Places': () => fetchPlaces(input)
    }

    const newResults: {[key: string]: any} = {}
    const newLoading: {[key: string]: boolean} = {}

    for (const [methodName, method] of Object.entries(methods)) {
      newLoading[methodName] = true
      setLoading(prev => ({ ...prev, [methodName]: true }))

      try {
        console.log(`Testing ${methodName} with input: "${input}"`)
        const result = await method()
        newResults[methodName] = {
          success: true,
          count: result.length,
          data: result
        }
        console.log(`${methodName} result:`, result)
      } catch (error) {
        console.error(`${methodName} error:`, error)
        newResults[methodName] = {
          success: false,
          error: (error as Error).message || 'Unknown error',
          count: 0
        }
      } finally {
        newLoading[methodName] = false
        setLoading(prev => ({ ...prev, [methodName]: false }))
      }
    }

    setResults(newResults)
  }

  const setLoading = (updater: (prev: {[key: string]: boolean}) => {[key: string]: boolean}) => {
    setIsLoading(updater)
  }

  const clearResults = () => {
    setResults({})
    setIsLoading({})
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Parameter Variation Test
        </h2>
        
        <div className="mb-6 p-4 bg-red-50 rounded-lg">
          <h3 className="font-semibold text-red-900 mb-2">Current Issue:</h3>
          <p className="text-red-800 text-sm">
            Even with corrected parameters, we are still getting <code>ZERO_RESULTS</code> from the JSONP method. 
            This test will help identify which methods work and which don&apos;t.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Test Input (try &quot;k&quot;, &quot;ku&quot;, &quot;kut&quot;):
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type to test different methods..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                onClick={testMethods}
                disabled={!input.trim()}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Test All Methods
              </button>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={clearResults}
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              Clear Results
            </button>
          </div>
        </div>

        {/* Results Display */}
        {Object.keys(results).length > 0 && (
          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Test Results:</h3>
            {Object.entries(results).map(([methodName, result]) => (
              <div key={methodName} className="p-4 border rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold text-gray-900">{methodName}</h4>
                  <div className="flex items-center gap-2">
                    {isLoading[methodName] && (
                      <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    )}
                    <span className={`px-2 py-1 rounded text-sm ${
                      result.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {result.success ? `✅ ${result.count} results` : `❌ ${result.error}`}
                    </span>
                  </div>
                </div>
                
                {result.success && result.data && result.data.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {result.data.slice(0, 3).map((item: CityOption, index: number) => (
                      <div key={index} className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                        {item.fullAddress}
                      </div>
                    ))}
                    {result.data.length > 3 && (
                      <div className="text-xs text-gray-500">
                        ... and {result.data.length - 3} more results
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
          <h4 className="font-semibold text-yellow-900 mb-2">Possible Reasons for ZERO_RESULTS:</h4>
          <div className="text-sm text-yellow-800 space-y-1">
            <p>• API key might not have the right permissions</p>
            <p>• Some parameters might be incorrect or missing</p>
            <p>• The search term might be too short or specific</p>
            <p>• Rate limiting or quota issues</p>
            <p>• Geographic restrictions</p>
            <p>• The API endpoint might require different authentication</p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">Recommendations:</h4>
          <div className="text-sm text-blue-800 space-y-1">
            <p>• Use the Standard Google Places API (which works)</p>
            <p>• Check if the API key has Places API enabled</p>
            <p>• Verify billing is set up for the Google Cloud project</p>
            <p>• Try different search terms to see if it&apos;s input-specific</p>
            <p>• Consider using a proxy server to avoid CORS issues</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ParameterVariationTest
