"use client"
import React, { useState } from 'react'
import Autocomplete from '@/components/ui/autocomplete'
import { CityOption } from '@/lib/googlePlaces'

const SingleCharacterTest: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<CityOption | null>(null)
  const [inputValue, setInputValue] = useState('')
  const [searchHistory, setSearchHistory] = useState<string[]>([])

  const handleSelect = (option: CityOption) => {
    setSelectedOption(option)
    setInputValue(option.fullAddress)
  }

  const handleInputChange = (value: string) => {
    setInputValue(value)
    // Track search history for single characters
    if (value.length === 1 && !searchHistory.includes(value)) {
      setSearchHistory(prev => [...prev, value])
    }
  }

  const clearHistory = () => {
    setSearchHistory([])
    setSelectedOption(null)
    setInputValue('')
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Single Character Search Test
        </h2>
        
        <div className="mb-6 p-4 bg-green-50 rounded-lg">
          <h3 className="font-semibold text-green-900 mb-2">Test Instructions:</h3>
          <ul className="text-sm text-green-800 space-y-1">
            <li>• Type a single character (like &quot;h&quot;, &quot;a&quot;, &quot;n&quot;) to see immediate results</li>
            <li>• The search should trigger on every character, not just after 2+ characters</li>
            <li>• Try different single characters to see various results</li>
            <li>• The debounce time is reduced to 150ms for faster response</li>
          </ul>
        </div>  

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Test Single Character Search:
            </label>
            <Autocomplete
              placeholder="Type single characters to test..."
              value={inputValue}
              onChange={handleInputChange}
              onSelect={handleSelect}
              useWebsiteParams={true}
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={clearHistory}
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              Clear History
            </button>
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

        {searchHistory.length > 0 && (
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
            <h3 className="font-semibold text-yellow-900 mb-2">Single Character Search History:</h3>
            <div className="flex flex-wrap gap-2">
              {searchHistory.map((char, index) => (
                <span
                  key={index}
                  className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded text-sm font-mono"
                >
                  &quot;{char}&quot;
                </span>
              ))}
            </div>
            <p className="text-xs text-yellow-700 mt-2">
              These single characters triggered searches
            </p>
          </div>
        )}

        <div className="mt-6 p-4 bg-purple-50 rounded-lg">
          <h4 className="font-semibold text-purple-900 mb-2">Changes Made:</h4>
          <div className="text-sm text-purple-800 space-y-1">
            <p>• Changed minimum search length from 2 to 1 character</p>
            <p>• Reduced debounce time from 300ms to 150ms for faster response</p>
            <p>• Updated &quot;No addresses found&quot; condition to show after 1 character</p>
            <p>• Improved mock data filtering to work with single characters</p>
            <p>• All search methods (standard, website params, JSONP) now support single character search</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleCharacterTest

