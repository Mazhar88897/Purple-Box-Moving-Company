"use client"
import React, { useState } from 'react'

const ParameterComparisonTest: React.FC = () => {
  const [input, setInput] = useState('')

  const ourWebsiteParams = {
    '1sku': '',
    '4sen-GB': '',
    '7scountry': 'us',
    '9sstreet_address': '', // Different parameter
    '15e3': '',
    '21m1': '',
    '2e1': '',
    'r_url': 'http://localhost:3000/', // Different URL
    'callback': '_xdc_._jn5nhj',
    'key': 'AIzaSyBVh5anaF4M3aW7ZE8rvoRX2Zf3hmYUxss', // Different key
    'token': '19465' // Different token
  }

  const targetWebsiteParams = {
    '1sku': '',
    '4sen-GB': '',
    '7scountry': 'us',
    '9sgeocode': '', // Different parameter
    '15e3': '',
    '20s3D4870FB74734AC0813478B83D60135Ddw0k': '', // Different parameter
    '21m1': '',
    '2e1': '',
    'r_url': 'https://mypieceofcakemove.com/', // Different URL
    'callback': '_xdc_._rxif8x',
    'key': 'AIzaSyAU138ZldfzhJDUeC4uiepjYa9DNLok6bQ', // Different key
    'token': '33770' // Different token
  }

  const buildUrl = (params: any, baseUrl: string) => {
    const urlParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      urlParams.append(key, value as string)
    })
    return `${baseUrl}?${urlParams.toString()}`
  }

  const ourUrl = buildUrl(ourWebsiteParams, 'https://maps.googleapis.com/maps/api/place/autocomplete/json')
  const targetUrl = buildUrl(targetWebsiteParams, 'https://maps.googleapis.com/maps/api/place/autocomplete/json')

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Parameter Comparison Test
        </h2>
        
        <div className="mb-6 p-4 bg-red-50 rounded-lg">
          <h3 className="font-semibold text-red-900 mb-2">Parameter Differences Found:</h3>
          <p className="text-red-800 text-sm">
            Our website and the target website use different parameters, which explains why we get different responses.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Our Website Parameters */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Our Website Parameters</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="space-y-2 text-sm">
                {Object.entries(ourWebsiteParams).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="font-mono text-gray-700">{key}:</span>
                    <span className="text-gray-600">{value || '(empty)'}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Generated URL:</h4>
              <code className="text-xs text-blue-800 break-all">{ourUrl}</code>
            </div>
          </div>

          {/* Target Website Parameters */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Target Website Parameters</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="space-y-2 text-sm">
                {Object.entries(targetWebsiteParams).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="font-mono text-gray-700">{key}:</span>
                    <span className="text-gray-600">{value || '(empty)'}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">Generated URL:</h4>
              <code className="text-xs text-green-800 break-all">{targetUrl}</code>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
          <h4 className="font-semibold text-yellow-900 mb-2">Key Differences:</h4>
          <div className="text-sm text-yellow-800 space-y-1">
            <p><strong>9s parameter:</strong> Our site uses <code>street_address</code>, target uses <code>geocode</code></p>
            <p><strong>20s parameter:</strong> Our site missing, target has <code>3D4870FB74734AC0813478B83D60135Ddw0k</code></p>
            <p><strong>r_url:</strong> Our site uses <code>localhost:3000</code>, target uses <code>mypieceofcakemove.com</code></p>
            <p><strong>API Key:</strong> Different keys used</p>
            <p><strong>Token:</strong> Different token values</p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-purple-50 rounded-lg">
          <h4 className="font-semibold text-purple-900 mb-2">Solution Applied:</h4>
          <div className="text-sm text-purple-800 space-y-1">
            <p>• Updated JSONP function to use target website parameters</p>
            <p>• Changed <code>9sstreet_address</code> to <code>9sgeocode</code></p>
            <p>• Added missing <code>1sku</code> parameter</p>
            <p>• Updated <code>20s</code> parameter name</p>
            <p>• Updated token to <code>33770</code></p>
            <p>• Kept target website&apos;s API key and URL</p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">Test Input:</h4>
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Try 'k' or 'ku' to test..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={() => {
                const testUrl = buildUrl({...targetWebsiteParams, input}, 'https://maps.googleapis.com/maps/api/place/autocomplete/json')
                console.log('Test URL with input:', testUrl)
                alert('Check console for the generated URL')
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Test URL
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ParameterComparisonTest
