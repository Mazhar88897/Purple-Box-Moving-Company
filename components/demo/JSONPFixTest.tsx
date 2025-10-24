"use client"
import React, { useState } from 'react'

const JSONPFixTest: React.FC = () => {
  const [input, setInput] = useState('k')
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const testJSONPWithDifferentKeys = async () => {
    if (!input.trim()) return

    setLoading(true)
    setResults([])

    const apiKeys = [
      'AIzaSyBVh5anaF4M3aW7ZE8rvoRX2Zf3hmYUxss', // Our key
      'AIzaSyAU138ZldfzhJDUeC4uiepjYa9DNLok6bQ', // Target website key
    ]

    const tests = [
      {
        name: 'Our Key - Basic',
        url: `https://maps.googleapis.com/maps/api/place/js/AutocompletionService.GetPredictions?input=${input}&key=AIzaSyBVh5anaF4M3aW7ZE8rvoRX2Zf3hmYUxss`,
        method: 'fetch'
      },
      {
        name: 'Target Key - Basic',
        url: `https://maps.googleapis.com/maps/api/place/js/AutocompletionService.GetPredictions?input=${input}&key=AIzaSyAU138ZldfzhJDUeC4uiepjYa9DNLok6bQ`,
        method: 'fetch'
      },
      {
        name: 'Our Key - JSONP',
        url: `https://maps.googleapis.com/maps/api/place/js/AutocompletionService.GetPredictions?input=${input}&key=AIzaSyBVh5anaF4M3aW7ZE8rvoRX2Zf3hmYUxss&callback=testCallback`,
        method: 'jsonp'
      },
      {
        name: 'Target Key - JSONP',
        url: `https://maps.googleapis.com/maps/api/place/js/AutocompletionService.GetPredictions?input=${input}&key=AIzaSyAU138ZldfzhJDUeC4uiepjYa9DNLok6bQ&callback=testCallback`,
        method: 'jsonp'
      }
    ]

    for (const test of tests) {
      try {
        console.log(`Testing: ${test.name}`)
        
        if (test.method === 'fetch') {
          const response = await fetch(test.url)
          const data = await response.json()
          
          setResults(prev => [...prev, {
            name: test.name,
            url: test.url,
            status: data.status,
            predictionsCount: data.predictions?.length || 0,
            data: data
          }])
        } else if (test.method === 'jsonp') {
          await new Promise<void>((resolve) => {
            const callbackName = `testCallback_${Date.now()}`
            const jsonpUrl = test.url.replace('testCallback', callbackName)
            
            (window as any)[callbackName] = (data: any) => {
              console.log(`JSONP result for ${test.name}:`, data)
              setResults(prev => [...prev, {
                name: test.name,
                url: jsonpUrl,
                status: data.status,
                predictionsCount: data.predictions?.length || 0,
                data: data
              }])
              delete (window as any)[callbackName]
              resolve()
            }

            const script = document.createElement('script')
            script.src = jsonpUrl
            script.onerror = () => {
              setResults(prev => [...prev, {
                name: test.name,
                url: jsonpUrl,
                status: 'ERROR',
                predictionsCount: 0,
                data: { error: 'Script load failed' }
              }])
              delete (window as any)[callbackName]
              resolve()
            }
            
            document.head.appendChild(script)
          })
        }
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
        JSONP Fix Test
      </h2>
      
      <div className="mb-4 p-4 bg-yellow-50 rounded-lg">
        <p className="text-yellow-800 text-sm">
          <strong>Goal:</strong> Test different API keys and methods to find what works.
          We'll try both our key and the target website's key with both fetch and JSONP.
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
              onClick={testJSONPWithDifferentKeys}
              disabled={loading || !input.trim()}
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Testing...' : 'Test All Methods'}
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
              <span className="text-blue-800">Testing all methods...</span>
            </div>
          </div>
        )}

        {results.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Test Results:</h3>
            {results.map((result, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{result.name}</h4>
                  <div className="flex gap-2">
                    <span className={`px-2 py-1 rounded text-xs ${
                      result.status === 'OK' ? 'bg-green-100 text-green-800' : 
                      result.status === 'ZERO_RESULTS' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
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

        <div className="mt-6 p-4 bg-green-50 rounded-lg">
          <h4 className="font-semibold text-green-900 mb-2">What to Look For:</h4>
          <div className="text-sm text-green-800 space-y-1">
            <p>• <strong>Status &quot;OK&quot;:</strong> This method works! Use this approach.</p>
            <p>• <strong>Status &quot;ZERO_RESULTS&quot;:</strong> API works but no matches for this input.</p>
            <p>• <strong>Status &quot;REQUEST_DENIED&quot;:</strong> API key doesn't have permission.</p>
            <p>• <strong>Status &quot;ERROR&quot;:</strong> Network or other technical issue.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JSONPFixTest
