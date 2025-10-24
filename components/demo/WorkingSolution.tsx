"use client"
import React, { useState } from 'react'
import Autocomplete from '@/components/ui/autocomplete'
import { CityOption } from '@/lib/googlePlaces'

const WorkingSolution: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<CityOption | null>(null)
  const [inputValue, setInputValue] = useState('')

  const handleSelect = (option: CityOption) => {
    setSelectedOption(option)
    setInputValue(option.fullAddress)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Working Solution
        </h2>
        
        <div className="mb-6 p-4 bg-green-50 rounded-lg">
          <h3 className="font-semibold text-green-900 mb-2">✅ What's Working:</h3>
          <p className="text-green-800 text-sm">
            The Standard Google Places API is working perfectly with numbers and letters. 
            This is the recommended approach for production use.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Working Autocomplete (Standard Google Places API):
            </label>
            <Autocomplete
              placeholder="Type to search (works with numbers and letters)..."
              value={inputValue}
              onChange={setInputValue}
              onSelect={handleSelect}
              // Using default settings (standard Google Places API)
            />
          </div>
        </div>

        {selectedOption && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900">Selected Option:</h3>
            <p className="text-blue-800">{selectedOption.fullAddress}</p>
            <p className="text-sm text-blue-700">
              City: {selectedOption.city} | State: {selectedOption.state}
            </p>
            <p className="text-xs text-blue-600">
              Place ID: {selectedOption.placeId}
            </p>
          </div>
        )}

        <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
          <h4 className="font-semibold text-yellow-900 mb-2">Current Status:</h4>
          <div className="text-sm text-yellow-800 space-y-1">
            <p>✅ <strong>Standard Google Places API:</strong> Working perfectly</p>
            <p>✅ <strong>Single character search:</strong> Working on both numbers and letters</p>
            <p>✅ <strong>Alphabetic search:</strong> Fixed and working</p>
            <p>✅ <strong>Continuous fetching issue:</strong> Fixed</p>
            <p>❌ <strong>JSONP with target parameters:</strong> Still getting ZERO_RESULTS</p>
            <p>❌ <strong>Website parameters method:</strong> May have CORS issues</p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-purple-50 rounded-lg">
          <h4 className="font-semibold text-purple-900 mb-2">Recommendation:</h4>
          <div className="text-sm text-purple-800 space-y-1">
            <p>• <strong>Use the Standard Google Places API</strong> for production</p>
            <p>• It works with both numbers and letters</p>
            <p>• It has proper error handling and fallbacks</p>
            <p>• It doesn't have CORS issues</p>
            <p>• It's more reliable and maintainable</p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">Implementation:</h4>
          <div className="text-sm text-blue-800">
            <p>Simply use the Autocomplete component without any special props:</p>
            <pre className="bg-blue-100 p-2 rounded text-xs mt-2">
{`<Autocomplete
  placeholder="Search addresses..."
  value={inputValue}
  onChange={setInputValue}
  onSelect={handleSelect}
/>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WorkingSolution
