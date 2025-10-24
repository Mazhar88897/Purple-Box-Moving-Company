"use client"
import React, { useState } from 'react'
import Autocomplete from '@/components/ui/autocomplete'
import { CityOption, analyzeWebsiteRequest } from '@/lib/googlePlaces'

const WebsiteParamsDemo: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<CityOption | null>(null)
  const [inputValue, setInputValue] = useState('')
  const [requestAnalysis, setRequestAnalysis] = useState<any>(null)

  const handleSelect = (option: CityOption) => {
    setSelectedOption(option)
    setInputValue(option.fullAddress)
  }

  const showRequestAnalysis = () => {
    setRequestAnalysis(analyzeWebsiteRequest())
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Website Parameters Demo
        </h2>
        
        <div className="mb-6">
          <button
            onClick={showRequestAnalysis}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Analyze Website Request
          </button>
        </div>

        {requestAnalysis && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">
              Request Analysis
            </h3>
            <div className="space-y-2">
              <p><strong>Base URL:</strong> {requestAnalysis.baseUrl}</p>
              <p><strong>Method:</strong> {requestAnalysis.method}</p>
              <p><strong>Note:</strong> {requestAnalysis.note}</p>
              <div className="mt-3">
                <h4 className="font-semibold text-blue-900 mb-2">Parameters:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  {Object.entries(requestAnalysis.parameters).map(([key, value]) => (
                    <div key={key} className="flex">
                      <span className="font-mono text-blue-800 w-32">{key}:</span>
                      <span className="text-blue-700">{value as string}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Standard Google Places API */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Standard Google Places API
            </h3>
            <Autocomplete
              placeholder="Search with standard API..."
              value={inputValue}
              onChange={setInputValue}
              onSelect={handleSelect}
            />
          </div>

          {/* Website Parameters Method */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Website Parameters Method
            </h3>
            <Autocomplete
              placeholder="Search with website params..."
              value={inputValue}
              onChange={setInputValue}
              onSelect={handleSelect}
              useWebsiteParams={true}
            />
          </div>

          {/* JSONP Method */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              JSONP Method (Like Website)
            </h3>
            <Autocomplete
              placeholder="Search with JSONP..."
              value={inputValue}
              onChange={setInputValue}
              onSelect={handleSelect}
              useJSONP={true}
            />
          </div>

          {/* Target Format Method */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Target Format Method
            </h3>
            <Autocomplete
              placeholder="Search with target format..."
              value={inputValue}
              onChange={setInputValue}
              onSelect={handleSelect}
              useTargetFormat={true}
            />
          </div>
        </div>

        {selectedOption && (
          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <h3 className="font-semibold text-green-900">Selected Option:</h3>
            <p className="text-green-800">{selectedOption.fullAddress}</p>
            <p className="text-sm text-green-700">
              City: {selectedOption.city} | State: {selectedOption.state}
            </p>
            <p className="text-xs text-green-600">
              Place ID: {selectedOption.placeId}
            </p>
          </div>
        )}

        <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
          <h4 className="font-semibold text-yellow-900 mb-2">
            Implementation Notes:
          </h4>
          <div className="text-sm text-yellow-800 space-y-2">
            <p>
              <strong>Website Parameters Method:</strong> Uses the exact same parameters as the website youre cloning, including the API key, referrer URL, and all the specific parameter names.
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

export default WebsiteParamsDemo

