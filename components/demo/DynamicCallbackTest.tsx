"use client"
import React, { useState } from 'react'
import { parseGoogleAutocompleteData, handleDynamicCallback } from '@/lib/googlePlaces'
import { CityOption } from '@/lib/googlePlaces'

const DynamicCallbackTest: React.FC = () => {
  const [input, setInput] = useState('')
  const [results, setResults] = useState<CityOption[]>([])
  const [callbackName, setCallbackName] = useState('')
  const [rawData, setRawData] = useState('')

  // Simulate the dynamic callback pattern from the website
  const simulateDynamicCallback = (searchTerm: string) => {
    // Generate a random callback name like the website does
    const randomId = Math.random().toString(36).substring(2, 8)
    const dynamicCallbackName = `_xdc_._${randomId}`
    setCallbackName(dynamicCallbackName)

    // Simulate the response data format
    const mockResponse = [
      0,
      [
        ["Huntsville, AL, USA", null, ["geocode", "locality", "political"], "ChIJjYmizWdrYogRa1YEyIl-LJo", null, [["Huntsville", 0], ["AL", 12], ["USA", 16]], [[0, 2]], null, "ChIJjYmizWdrYogRa1YEyIl-LJo", ["Huntsville", "AL, USA", [[0, 2]]]],
        ["Huntington Beach, CA, USA", null, ["geocode", "locality", "political"], "ChIJtSrI-SIk3YARATtmpMmF7UU", null, [["Huntington Beach", 0], ["CA", 18], ["USA", 22]], [[0, 2]], null, "ChIJtSrI-SIk3YARATtmpMmF7UU", ["Huntington Beach", "CA, USA", [[0, 2]]]],
        ["Huntsville, TX, USA", null, ["geocode", "locality", "political"], "ChIJT1oksR0GR4YR8eT49Bnt1bw", null, [["Huntsville", 0], ["TX", 12], ["USA", 16]], [[0, 2]], null, "ChIJT1oksR0GR4YR8eT49Bnt1bw", ["Huntsville", "TX, USA", [[0, 2]]]],
        ["Humble, TX, USA", null, ["geocode", "locality", "political"], "ChIJMd6gq02yQIYR2uXexzEpNA4", null, [["Humble", 0], ["TX", 8], ["USA", 12]], [[0, 2]], null, "ChIJMd6gq02yQIYR2uXexzEpNA4", ["Humble", "TX, USA", [[0, 2]]]],
        ["Hudson, NY, USA", null, ["geocode", "locality", "political"], "ChIJbU_L8ymU3YkRzaqMXJfLnmQ", null, [["Hudson", 0], ["NY", 8], ["USA", 12]], [[0, 2]], null, "ChIJbU_L8ymU3YkRzaqMXJfLnmQ", ["Hudson", "NY, USA", [[0, 2]]]]
      ]
    ]

    // Filter based on search term
    const filteredResponse = [
      0,
      mockResponse[1].filter((place: any) => 
        place[0].toLowerCase().includes(searchTerm.toLowerCase())
      )
    ]

    setRawData(JSON.stringify(filteredResponse, null, 2))
    
    // Parse the response
    const parsedResults = parseGoogleAutocompleteData(filteredResponse)
    setResults(parsedResults)
  }

  const handleSearch = () => {
    if (input.trim()) {
      simulateDynamicCallback(input)
    }
  }

  const testSpecificCallback = () => {
    // Test with the specific callback name you mentioned
    const specificCallbackName = '_xdc_._393iyu'
    setCallbackName(specificCallbackName)
    
    // Simulate the exact response you showed
    const specificResponse = [
      0,
      [
        ["Huntsville, AL, USA", null, ["geocode", "locality", "political"], "ChIJjYmizWdrYogRa1YEyIl-LJo", null, [["Huntsville", 0], ["AL", 12], ["USA", 16]], [[0, 2]], null, "ChIJjYmizWdrYogRa1YEyIl-LJo", ["Huntsville", "AL, USA", [[0, 2]]]],
        ["Huntington Beach, CA, USA", null, ["geocode", "locality", "political"], "ChIJtSrI-SIk3YARATtmpMmF7UU", null, [["Huntington Beach", 0], ["CA", 18], ["USA", 22]], [[0, 2]], null, "ChIJtSrI-SIk3YARATtmpMmF7UU", ["Huntington Beach", "CA, USA", [[0, 2]]]],
        ["Huntsville, TX, USA", null, ["geocode", "locality", "political"], "ChIJT1oksR0GR4YR8eT49Bnt1bw", null, [["Huntsville", 0], ["TX", 12], ["USA", 16]], [[0, 2]], null, "ChIJT1oksR0GR4YR8eT49Bnt1bw", ["Huntsville", "TX, USA", [[0, 2]]]],
        ["Humble, TX, USA", null, ["geocode", "locality", "political"], "ChIJMd6gq02yQIYR2uXexzEpNA4", null, [["Humble", 0], ["TX", 8], ["USA", 12]], [[0, 2]], null, "ChIJMd6gq02yQIYR2uXexzEpNA4", ["Humble", "TX, USA", [[0, 2]]]],
        ["Hudson, NY, USA", null, ["geocode", "locality", "political"], "ChIJbU_L8ymU3YkRzaqMXJfLnmQ", null, [["Hudson", 0], ["NY", 8], ["USA", 12]], [[0, 2]], null, "ChIJbU_L8ymU3YkRzaqMXJfLnmQ", ["Hudson", "NY, USA", [[0, 2]]]]
      ]
    ]

    setRawData(JSON.stringify(specificResponse, null, 2))
    
    // Parse the response
    const parsedResults = parseGoogleAutocompleteData(specificResponse)
    setResults(parsedResults)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Dynamic Callback Test
        </h2>
        
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">Website Behavior:</h3>
          <p className="text-blue-800 text-sm">
            The website uses dynamic callback names like <code>_xdc_._dz6919</code>, <code>_xdc_._393iyu</code>, etc.
            Each request gets a unique callback name to avoid conflicts.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Input (try):
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type to search..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                onClick={handleSearch}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Search
              </button>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={testSpecificCallback}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              Test _xdc_._393iyu
            </button>
            
            <button
              onClick={() => {
                setInput('')
                setResults([])
                setCallbackName('')
                setRawData('')
              }}
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              Clear
            </button>
          </div>
        </div>

        {callbackName && (
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
            <h3 className="font-semibold text-yellow-900 mb-2">Callback Name:</h3>
            <p className="font-mono text-yellow-800">{callbackName}</p>
          </div>
        )}

        {results.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Parsed Results ({results.length} items):
            </h3>
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

        {rawData && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Raw Response Data:
            </h3>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
              {rawData}
            </pre>
          </div>
        )}

        <div className="mt-6 p-4 bg-purple-50 rounded-lg">
          <h4 className="font-semibold text-purple-900 mb-2">Implementation Notes:</h4>
          <div className="text-sm text-purple-800 space-y-1">
            <p><strong>Dynamic Callbacks:</strong> Each JSONP request gets a unique callback name</p>
            <p><strong>Pattern:</strong> <code>_xdc_._[randomId]</code> where randomId is 6 characters</p>
            <p><strong>Parsing:</strong> The data format remains the same regardless of callback name</p>
            <p><strong>Cleanup:</strong> Callback functions are cleaned up after use</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DynamicCallbackTest
