"use client"
import React, { useState } from 'react'

const SimpleAPITest: React.FC = () => {
  const [input, setInput] = useState('k')
  const [results, setResults] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const testDirectAPI = async () => {
    if (!input.trim()) return

    setLoading(true)
    setError(null)    
    setResults(null)

    try {
      // Test 1: Basic Google Places API (working initially)
      const basicUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=AIzaSyBVh5anaF4M3aW7ZE8rvoRX2Zf3hmYUxss`
      
      console.log('Testing basic API call:', basicUrl)
      
      const response = await fetch(basicUrl)
      const data = await response.json()
      
      console.log('Basic API response:', data)
      
      setResults({
        method: 'Basic Google Places API',
        url: basicUrl,
        status: data.status,
        predictionsCount: data.predictions?.length || 0,
        data: data
      })
      
    } catch (err) {
      console.error('Basic API error:', err)
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  const testWithAllParams = async () => {
    if (!input.trim()) return

    setLoading(true)
    setError(null)
    setResults(null)

    try {
      // Test 2: With all the parameters from target website
      const params = new URLSearchParams()
      params.append('input', input)
      params.append('key', 'AIzaSyAU138ZldfzhJDUeC4uiepjYa9DNLok6bQ')
      params.append('types', 'geocode')
      params.append('components', 'country:us')
      
      const fullUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?${params.toString()}`
      
      console.log('Testing with all params:', fullUrl)
      
      const response = await fetch(fullUrl)
      const data = await response.json()
      
      console.log('Full params response:', data)
      
      setResults({
        method: 'With All Parameters',
        url: fullUrl,
        status: data.status,
        predictionsCount: data.predictions?.length || 0,
        data: data
      })
      
    } catch (err) {
      console.error('Full params error:', err)
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  const testJSONP = async () => {
    if (!input.trim()) return

    setLoading(true)
    setError(null)
    setResults(null)

    return new Promise<void>((resolve) => {
      const callbackName: any = `_xdc_._test_${Date.now()}`
      const callbackNameString = callbackName as string
      
      // Set up callback
      (window as any)[callbackNameString] = (data: any) => {
        console.log('JSONP callback received:', data)
        setResults({
          method: 'JSONP Test',
          url: 'JSONP request',
          status: data.status,
          predictionsCount: data.predictions?.length || 0,
          data: data
        })
        setLoading(false)
        delete (window as any)[callbackName]
        resolve()
      }

      // Create script tag
      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=AIzaSyAU138ZldfzhJDUeC4uiepjYa9DNLok6bQ&callback=${callbackName}`
      script.onerror = () => {
        setError('JSONP request failed')
        setLoading(false)
        delete (window as any)[callbackName]
        resolve()
      }
      
      document.head.appendChild(script)
    })
  }

  const clearResults = () => {
    setResults(null)
    setError(null)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Simple API Test
        </h2>
        
        <div className="mb-6 p-4 bg-red-50 rounded-lg">
          <h3 className="font-semibold text-red-900 mb-2">Still Getting ZERO_RESULTS:</h3>
          <p className="text-red-800 text-sm">
            Let&apos;s test the Google Places API directly to see if we can get ANY results at all.
            This will help us understand if it&apos;s a parameter issue or something else.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Test Input (try &quot;k&quot;, &quot;ku&quot;, &quot;kut&quot;, &quot;kutztown&quot;):
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type to test..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={testDirectAPI}
              disabled={loading || !input.trim()}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Test Basic API
            </button>
            
            <button
              onClick={testWithAllParams}
              disabled={loading || !input.trim()}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Test With Params
            </button>
            
            <button
              onClick={testJSONP}
              disabled={loading || !input.trim()}
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Test JSONP
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
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-blue-800">Testing API...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-50 rounded-lg">
            <h3 className="font-semibold text-red-900 mb-2">Error:</h3>
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {results && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Test Results:</h3>
            <div className="space-y-2 text-sm">
              <div><strong>Method:</strong> {results.method}</div>
              <div><strong>Status:</strong> <span className={`px-2 py-1 rounded text-xs ${
                results.status === 'OK' ? 'bg-green-100 text-green-800' : 
                results.status === 'ZERO_RESULTS' ? 'bg-yellow-100 text-yellow-800' : 
                'bg-red-100 text-red-800'
              }`}>{results.status}</span></div>
              <div><strong>Predictions Count:</strong> {results.predictionsCount}</div>
              <div><strong>URL:</strong> <code className="text-xs break-all">{results.url}</code></div>
            </div>
            
            {results.data && (
              <div className="mt-4">
                <h4 className="font-semibold text-gray-900 mb-2">Raw Response:</h4>
                <pre className="bg-gray-100 p-3 rounded text-xs overflow-x-auto">
                  {JSON.stringify(results.data, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}

        <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
          <h4 className="font-semibold text-yellow-900 mb-2">What to Look For:</h4>
          <div className="text-sm text-yellow-800 space-y-1">
            <p>• <strong>Status &quot;OK&quot;:</strong> API is working, we should get results</p>
            <p>• <strong>Status &quot;ZERO_RESULTS&quot;:</strong> API is working but no matches found</p>
            <p>• <strong>Status &quot;REQUEST_DENIED&quot;:</strong> API key issue</p>
            <p>• <strong>Status &quot;OVER_QUERY_LIMIT&quot;:</strong> Rate limiting issue</p>
            <p>• <strong>CORS Error:</strong> Browser blocking the request</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SimpleAPITest
