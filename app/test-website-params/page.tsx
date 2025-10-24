"use client"
import React, { useState } from 'react'
import { analyzeWebsiteRequest, fetchPlacesWithWebsiteParams, fetchPlacesWithJSONP } from '@/lib/googlePlaces'
import { CityOption } from '@/lib/googlePlaces'

export default function TestWebsiteParamsPage() {
  const [input, setInput] = useState('')
  const [results, setResults] = useState<CityOption[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [requestInfo, setRequestInfo] = useState<any>(null)

  const showRequestInfo = () => {
    setRequestInfo(analyzeWebsiteRequest())
  }

  const testWebsiteParams = async () => {
    if (!input.trim()) return
    
    setLoading(true)
    setError(null)
    
    try {
      const results = await fetchPlacesWithWebsiteParams(input)
      setResults(results)
    } catch (err) {
      setError('Failed to fetch with website params')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const testJSONP = async () => {
    if (!input.trim()) return
    
    setLoading(true)
    setError(null)
    
    try {
      const results = await fetchPlacesWithJSONP(input)
      setResults(results)
    } catch (err) {
      setError('Failed to fetch with JSONP')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Website Parameters Test
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Request Analysis
          </h2>
          <button
            onClick={showRequestInfo}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors mb-4"
          >
            Show Request Parameters
          </button>
          
          {requestInfo && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Analysis Results:</h3>
              <p><strong>Base URL:</strong> {requestInfo.baseUrl}</p>
              <p><strong>Method:</strong> {requestInfo.method}</p>
              <p><strong>Note:</strong> {requestInfo.note}</p>
              <div className="mt-3">
                <h4 className="font-semibold text-blue-900 mb-2">Parameters:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  {Object.entries(requestInfo.parameters).map(([key, value]) => (
                    <div key={key} className="flex">
                      <span className="font-mono text-blue-800 w-40">{key}:</span>
                      <span className="text-blue-700">{value as string}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Test Search
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Input:
              </label>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type to search..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={testWebsiteParams}
                disabled={loading || !input.trim()}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Test Website Params
              </button>
              
              <button
                onClick={testJSONP}
                disabled={loading || !input.trim()}
                className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Test JSONP
              </button>
            </div>

            {loading && (
              <div className="text-center text-gray-600">
                Loading...
              </div>
            )}

            {error && (
              <div className="text-red-600 bg-red-50 p-3 rounded-lg">
                {error}
              </div>
            )}
          </div>
        </div>

        {results.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Results ({results.length} items)
            </h2>
            <div className="space-y-2">
              {results.map((result, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border"
                >
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">
                      {result.fullAddress}
                    </div>
                    <div className="text-sm text-gray-600">
                      City: {result.city} | State: {result.state}
                    </div>
                    <div className="text-xs text-gray-500">
                      Place ID: {result.placeId}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-900 mb-3">
            Implementation Notes:
          </h3>
          <div className="text-yellow-800 space-y-2 text-sm">
            <p>
              <strong>Website Parameters:</strong> Uses the exact same parameters as the website youre cloning, including the API key, referrer URL, and all the specific parameter names.
            </p>
            <p>
              <strong>JSONP Method:</strong> Replicates the exact JSONP callback behavior using dynamic script injection, just like the website does.
            </p>
            <p>
              <strong>API Key:</strong> The website uses <code>AIzaSyAU138ZldfzhJDUeC4uiepjYa9DNLok6bQ</code> - you may want to use your own key for production.
            </p>
            <p>
              <strong>CORS:</strong> The JSONP method bypasses CORS restrictions, which is why the website uses it instead of regular fetch requests.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

