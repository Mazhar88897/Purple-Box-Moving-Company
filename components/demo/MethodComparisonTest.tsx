"use client"
import React, { useState } from 'react'
import Autocomplete from '@/components/ui/autocomplete'
import { CityOption } from '@/lib/googlePlaces'

const MethodComparisonTest: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<CityOption | null>(null)
  const [inputValue, setInputValue] = useState('')
  const [testResults, setTestResults] = useState<{[key: string]: any}>({})

  const handleSelect = (option: CityOption) => {
    setSelectedOption(option)
    setInputValue(option.fullAddress)
  }

  const testAllMethods = async () => {
    if (!inputValue.trim()) return

    const results: {[key: string]: any} = {}
    
    // Test each method
    try {
      console.log('Testing all methods for:', inputValue)
      
      // Method 1: Standard Google Places API
      console.log('Testing standard Google Places API...')
      const standardResults = await fetch('/api/test-standard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: inputValue })
      }).then(res => res.json()).catch(() => ({ error: 'API not available' }))
      results.standard = standardResults

      // Method 2: Website Parameters
      console.log('Testing website parameters...')
      const websiteResults = await fetch('/api/test-website-params', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: inputValue })
      }).then(res => res.json()).catch(() => ({ error: 'API not available' }))
      results.websiteParams = websiteResults

      // Method 3: JSONP
      console.log('Testing JSONP...')
      const jsonpResults = await fetch('/api/test-jsonp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: inputValue })
      }).then(res => res.json()).catch(() => ({ error: 'API not available' }))
      results.jsonp = jsonpResults

    } catch (error) {
      console.error('Error testing methods:', error)
    }

    setTestResults(results)
  }

  const clearResults = () => {
    setInputValue('')
    setSelectedOption(null)
    setTestResults({})
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Method Comparison Test
        </h2>
        
        <div className="mb-6 p-4 bg-yellow-50 rounded-lg">
          <h3 className="font-semibold text-yellow-900 mb-2">Current Status:</h3>
          <p className="text-yellow-800 text-sm">
            Numbers are working perfectly, but dynamic response (JSONP) is not working. 
            This test will help identify which methods are functioning correctly.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Test Input (try numbers like &quot;123&quot; or letters like &quot;hu&quot;):
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type to test all methods..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                onClick={testAllMethods}
                disabled={!inputValue.trim()}
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

        {/* Individual Method Tests */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Standard Google Places API */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Standard Google Places API
            </h3>
            <Autocomplete
              placeholder="Test standard API..."
              value={inputValue}
              onChange={setInputValue}
              onSelect={handleSelect}
            />
            <div className="text-sm text-green-600">
              ✅ Working - Numbers work perfectly
            </div>
          </div>

          {/* Website Parameters Method */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Website Parameters Method
            </h3>
            <Autocomplete
              placeholder="Test website params..."
              value={inputValue}
              onChange={setInputValue}
              onSelect={handleSelect}
              useWebsiteParams={true}
            />
            <div className="text-sm text-yellow-600">
              ⚠️ Testing - May have CORS issues
            </div>
          </div>

          {/* JSONP Method */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              JSONP Method (Dynamic)
            </h3>
            <Autocomplete
              placeholder="Test JSONP..."
              value={inputValue}
              onChange={setInputValue}
              onSelect={handleSelect}
              useJSONP={true}
            />
            <div className="text-sm text-red-600">
              ❌ Not Working - Dynamic response issue
            </div>
          </div>
        </div>

        {selectedOption && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900">Selected Option:</h3>
            <p className="text-blue-800">{selectedOption.fullAddress}</p>
            <p className="text-sm text-blue-700">
              City: {selectedOption.city} | State: {selectedOption.state}
            </p>
          </div>
        )}

        {Object.keys(testResults).length > 0 && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-3">Test Results:</h3>
            <div className="space-y-2">
              {Object.entries(testResults).map(([method, result]) => (
                <div key={method} className="flex justify-between items-center p-2 bg-white rounded border">
                  <span className="font-medium capitalize">{method}:</span>
                  <span className={`text-sm ${
                    result.error ? 'text-red-600' : 
                    Array.isArray(result) && result.length > 0 ? 'text-green-600' : 
                    'text-yellow-600'
                  }`}>
                    {result.error ? `Error: ${result.error}` : 
                     Array.isArray(result) ? `${result.length} results` : 
                     'No results'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 p-4 bg-purple-50 rounded-lg">
          <h4 className="font-semibold text-purple-900 mb-2">Debugging Steps:</h4>
          <div className="text-sm text-purple-800 space-y-1">
            <p>1. Check browser console for JSONP errors</p>
            <p>2. Verify CORS policy allows the requests</p>
            <p>3. Check if Google Places API supports JSONP with those parameters</p>
            <p>4. Test with different input types (numbers vs letters)</p>
            <p>5. Monitor network tab for failed requests</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MethodComparisonTest
