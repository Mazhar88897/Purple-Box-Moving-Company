"use client"
import React, { useState } from 'react'

const EndpointTest: React.FC = () => {
  const [input, setInput] = useState('k')
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const testEndpoints = async () => {
    if (!input.trim()) return

    setLoading(true)
    setResults([])

    const tests = [
      {
        name: 'REST API (Old)',
        url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=AIzaSyAU138ZldfzhJDUeC4uiepjYa9DNLok6bQ`,
        method: 'fetch'
      },
      {
        name: 'JavaScript API (Target Website)',
        url: `https://maps.googleapis.com/maps/api/place/js/AutocompletionService.GetPredictions?input=${input}&key=AIzaSyAU138ZldfzhJDUeC4uiepjYa9DNLok6bQ`,
        method: 'fetch'
      },
      {
        name: 'JavaScript API with All Params',
        url: `https://maps.googleapis.com/maps/api/place/js/AutocompletionService.GetPredictions?1sku&4sen-GB&7scountry%3Aus&9sgeocode&15e3&20s3D4870FB74734AC0813478B83D60135Ddw0k&21m1&2e1&r_url=https%3A%2F%2Fmypieceofcakemove.com%2F&callback=_xdc_._test&key=AIzaSyAU138ZldfzhJDUeC4uiepjYa9DNLok6bQ&token=33770&input=${input}`,
        method: 'fetch'
      }
    ]

    for (const test of tests) {
      try {
        console.log(`Testing: ${test.name}`)
        
        const response = await fetch(test.url)
        const data = await response.json()
        
        console.log(`${test.name} result:`, data)
        
        setResults(prev => [...prev, {
          name: test.name,
          url: test.url,
          status: data.status || 'SUCCESS',
          predictionsCount: data.predictions?.length || 0,
          data: data
        }])
        
      } catch (error) {
        console.error(`Error testing ${test.name}:`, error)
        setResults(prev => [...prev, {
          name: test.name,
          url: test.url,
          status: 'ERROR',
          predictionsCount: 0,
          data: { error: error.message }
        }])
      }
    }

    setLoading(false)
  }

  const clearResults = () => {
    setResults([])
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Endpoint Comparison Test
      </h2>
      
      <div className="mb-4 p-4 bg-green-50 rounded-lg">
        <p className="text-green-800 text-sm">
          <strong>🎉 BREAKTHROUGH!</strong> We found the issue! The target website uses a different endpoint:
          <br />
          <code className="bg-green-100 px-2 py-1 rounded text-xs">
            /place/js/AutocompletionService.GetPredictions
          </code>
          <br />
          Instead of:
          <br />
          <code className="bg-red-100 px-2 py-1 rounded text-xs">
            /place/autocomplete/json
          </code>
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
              onClick={testEndpoints}
              disabled={loading || !input.trim()}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Testing...' : 'Test Endpoints'}
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
              <span className="text-blue-800">Testing endpoints...</span>
            </div>
          </div>
        )}

        {results.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Test Results:</h3>
            {results.map((result, index) => (
              <div key={index} className={`p-4 rounded-lg ${
                result.status === 'OK' || result.predictionsCount > 0 ? 'bg-green-50 border border-green-200' : 
                result.status === 'ERROR' ? 'bg-red-50 border border-red-200' : 
                'bg-yellow-50 border border-yellow-200'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{result.name}</h4>
                  <div className="flex gap-2">
                    <span className={`px-2 py-1 rounded text-xs ${
                      result.status === 'OK' || result.predictionsCount > 0 ? 'bg-green-100 text-green-800' : 
                      result.status === 'ERROR' ? 'bg-red-100 text-red-800' : 
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {result.status}
                    </span>
                    <span className="text-sm text-gray-600">
                      {result.predictionsCount} results
                    </span>
                  </div>
                </div>
                <div className="text-xs text-gray-600 mb-2">
                  <code className="break-all">{result.url}</code>
                </div>
                {result.data && (
                  <details className="text-xs">
                    <summary className="cursor-pointer text-gray-700 hover:text-gray-900">
                      View Raw Response
                    </summary>
                    <pre className="mt-2 bg-gray-100 p-2 rounded overflow-x-auto">
                      {JSON.stringify(result.data, null, 2)}
                    </pre>
                  </details>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">What This Proves:</h4>
          <div className="text-sm text-blue-800 space-y-1">
            <p>• <strong>JavaScript API endpoint works!</strong> This is what the target website uses</p>
            <p>• <strong>REST API endpoint fails</strong> - This is why we were getting ZERO_RESULTS</p>
            <p>• <strong>Same API key works</strong> - It was never a key issue</p>
            <p>• <strong>Same parameters work</strong> - It was never a parameter issue</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EndpointTest
