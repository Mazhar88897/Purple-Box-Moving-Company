"use client"
import React, { useState, useEffect } from 'react'
import Autocomplete from '@/components/ui/autocomplete'
import { CityOption } from '@/lib/googlePlaces'

const FetchingTest: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<CityOption | null>(null)
  const [inputValue, setInputValue] = useState('')
  const [fetchCount, setFetchCount] = useState(0)
  const [lastFetchTime, setLastFetchTime] = useState<Date | null>(null)

  const handleSelect = (option: CityOption) => {
    setSelectedOption(option)
    setInputValue(option.fullAddress)
  }

  const handleInputChange = (value: string) => {
    setInputValue(value)
  }

  // Track fetch count by monitoring console logs or API calls
  useEffect(() => {
    const originalConsoleLog = console.log
    console.log = (...args) => {
      if (args[0] === 'Searching for:') {
        setFetchCount(prev => prev + 1)
        setLastFetchTime(new Date())
      }
      originalConsoleLog(...args)
    }

    return () => {
      console.log = originalConsoleLog
    }
  }, [])

  const resetTest = () => {
    setInputValue('')
    setSelectedOption(null)
    setFetchCount(0)
    setLastFetchTime(null)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Continuous Fetching Test
        </h2>
        
        <div className="mb-6 p-4 bg-red-50 rounded-lg">
          <h3 className="font-semibold text-red-900 mb-2">Issue Found:</h3>
          <p className="text-red-800 text-sm">
            The autocomplete was continuously fetching because the useEffect dependency array included &apos;filteredOptions&apos;, 
            which caused an infinite loop: search → update filteredOptions → trigger useEffect → search again.
          </p>
        </div>

        <div className="mb-6 p-4 bg-green-50 rounded-lg">
          <h3 className="font-semibold text-green-900 mb-2">Fix Applied:</h3>
          <ul className="text-green-800 text-sm space-y-1">
            <li>• Removed &apos;filteredOptions&apos; from useEffect dependency array</li>
            <li>• Added &apos;lastSearchRef&apos; to track previous search value</li>
            <li>• Added check to prevent searching if value hasn&apos;t changed</li>
            <li>• Improved exact match logic to avoid unnecessary checks</li>
          </ul>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Test Search (watch fetch count):
            </label>
            <Autocomplete
              placeholder="Type to test fetching behavior..."
              value={inputValue}
              onChange={handleInputChange}
              onSelect={handleSelect}
              useWebsiteParams={true}
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={resetTest}
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              Reset Test
            </button>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">Fetch Statistics:</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Total Fetches:</span>
              <span className="ml-2 text-blue-800 font-mono">{fetchCount}</span>
            </div>
            <div>
              <span className="font-medium">Last Fetch:</span>
              <span className="ml-2 text-blue-800 font-mono">
                {lastFetchTime ? lastFetchTime.toLocaleTimeString() : 'Never'}
              </span>
            </div>
          </div>
          <p className="text-xs text-blue-700 mt-2">
            The fetch count should only increase when you actually change the search term, not continuously.
          </p>
        </div>

        {selectedOption && (
          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <h3 className="font-semibold text-green-900">Selected Option:</h3>
            <p className="text-green-800">{selectedOption.fullAddress}</p>
            <p className="text-sm text-green-700">
              City: {selectedOption.city} | State: {selectedOption.state}
            </p>
          </div>
        )}

        <div className="mt-6 p-4 bg-purple-50 rounded-lg">
          <h4 className="font-semibold text-purple-900 mb-2">Technical Changes:</h4>
          <div className="text-sm text-purple-800 space-y-1">
            <p><strong>Dependency Array:</strong> Removed &apos;filteredOptions&apos; to prevent infinite loop</p>
            <p><strong>Search Tracking:</strong> Added &apos;lastSearchRef&apos; to track previous search value</p>
            <p><strong>Duplicate Prevention:</strong> Check if value changed before searching</p>
            <p><strong>Exact Match Logic:</strong> Only check exact matches when options exist</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FetchingTest
