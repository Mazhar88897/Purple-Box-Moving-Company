"use client"
import React, { useState, useEffect } from 'react'
import { fetchPlacesWithJSONP } from '@/lib/googlePlaces'
import { CityOption } from '@/lib/googlePlaces'

const JSONPDebugTest: React.FC = () => {
  const [input, setInput] = useState('')
  const [results, setResults] = useState<CityOption[]>([])
  const [debugInfo, setDebugInfo] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Capture console logs for debugging
  useEffect(() => {
    const originalLog = console.log
    const originalError = console.error
    
    console.log = (...args) => {
      if (args[0]?.includes?.('JSONP') || args[0]?.includes?.('callback')) {
        setDebugInfo(prev => [...prev, `LOG: ${args.join(' ')}`])
      }
      originalLog(...args)
    }
    
    console.error = (...args) => {
      if (args[0]?.includes?.('JSONP') || args[0]?.includes?.('callback')) {
        setDebugInfo(prev => [...prev, `ERROR: ${args.join(' ')}`])
      }
      originalError(...args)
    }

    return () => {
      console.log = originalLog
      console.error = originalError
    }
  }, [])

  const testJSONP = async () => {
    if (!input.trim()) return
    
    setIsLoading(true)
    setResults([])
    setDebugInfo(prev => [...prev, `Testing JSONP for: "${input}"`])
    
    try {
      const results = await fetchPlacesWithJSONP(input)
      setResults(results)
      setDebugInfo(prev => [...prev, `JSONP returned ${results.length} results`])
    } catch (error) {
      setDebugInfo(prev => [...prev, `JSONP error: ${error}`])
    } finally {
      setIsLoading(false)
    }
  }

  const clearDebug = () => {
    setInput('')
    setResults([])
    setDebugInfo([])
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          JSONP Debug Test
        </h2>
        
        <div className="mb-6 p-4 bg-red-50 rounded-lg">
          <h3 className="font-semibold text-red-900 mb-2">Issue:</h3>
          <p className="text-red-800 text-sm">
            Dynamic response (JSONP) is not working, but numbers work perfectly. 
            This debug test will help identify what's going wrong with the JSONP requests.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Test Input (try "hu" or "123"):
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type to test JSONP..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                onClick={testJSONP}
                disabled={isLoading || !input.trim()}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Testing...' : 'Test JSONP'}
              </button>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={clearDebug}
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              Clear Debug
            </button>
          </div>
        </div>

        {results.length > 0 && (
          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <h3 className="font-semibold text-green-900 mb-2">
              JSONP Results ({results.length} items):
            </h3>
            <div className="space-y-2">
              {results.map((result, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-white rounded-lg border"
                >
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">
                      {result.fullAddress}
                    </div>
                    <div className="text-sm text-gray-600">
                      City: {result.city} | State: {result.state}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {debugInfo.length > 0 && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Debug Information:</h3>
            <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm max-h-64 overflow-y-auto">
              {debugInfo.map((info, index) => (
                <div key={index} className="mb-1">
                  {info}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
          <h4 className="font-semibold text-yellow-900 mb-2">Possible Issues:</h4>
          <div className="text-sm text-yellow-800 space-y-1">
            <p>• Google Places API may not support JSONP with those specific parameters</p>
            <p>• CORS policy might be blocking the requests</p>
            <p>• The callback function might not be executing properly</p>
            <p>• The API key might not have the right permissions</p>
            <p>• The request URL might be malformed</p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">Recommendations:</h4>
          <div className="text-sm text-blue-800 space-y-1">
            <p>• Use the standard Google Places API (which works with numbers)</p>
            <p>• Check browser network tab for failed requests</p>
            <p>• Verify the API key permissions</p>
            <p>• Consider using a proxy server for CORS issues</p>
            <p>• Test with different input types to see the pattern</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JSONPDebugTest
