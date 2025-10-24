"use client"
import React, { useState } from 'react'
import { parseGoogleAutocompleteData, handleGoogleAutocompleteResponse, createMockGoogleAutocompleteData } from '@/lib/googlePlaces'
import { MapPin } from 'lucide-react'

const GoogleFormatDemo: React.FC = () => {
  const [input, setInput] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [rawData, setRawData] = useState('')

  // The exact data format you're seeing from the website
  const sampleData = [
    0,
    [
      ["Huntsville, AL, USA", null, ["geocode", "locality", "political"], "ChIJjYmizWdrYogRa1YEyIl-LJo", null, [["Huntsville", 0], ["AL", 12], ["USA", 16]], [[0, 2]], null, "ChIJjYmizWdrYogRa1YEyIl-LJo", ["Huntsville", "AL, USA", [[0, 2]]]],
      ["Huntington Beach, CA, USA", null, ["geocode", "locality", "political"], "ChIJtSrI-SIk3YARATtmpMmF7UU", null, [["Huntington Beach", 0], ["CA", 18], ["USA", 22]], [[0, 2]], null, "ChIJtSrI-SIk3YARATtmpMmF7UU", ["Huntington Beach", "CA, USA", [[0, 2]]]],
      ["Huntsville, TX, USA", null, ["geocode", "locality", "political"], "ChIJT1oksR0GR4YR8eT49Bnt1bw", null, [["Huntsville", 0], ["TX", 12], ["USA", 16]], [[0, 2]], null, "ChIJT1oksR0GR4YR8eT49Bnt1bw", ["Huntsville", "TX, USA", [[0, 2]]]],
      ["Humble, TX, USA", null, ["geocode", "locality", "political"], "ChIJMd6gq02yQIYR2uXexzEpNA4", null, [["Humble", 0], ["TX", 8], ["USA", 12]], [[0, 2]], null, "ChIJMd6gq02yQIYR2uXexzEpNA4", ["Humble", "TX, USA", [[0, 2]]]],
      ["Hudson, NY, USA", null, ["geocode", "locality", "political"], "ChIJbU_L8ymU3YkRzaqMXJfLnmQ", null, [["Hudson", 0], ["NY", 8], ["USA", 12]], [[0, 2]], null, "ChIJbU_L8ymU3YkRzaqMXJfLnmQ", ["Hudson", "NY, USA", [[0, 2]]]]
    ]
  ]

  const handleParseData = () => {
    try {
      const parsedResults = parseGoogleAutocompleteData(sampleData)
      setResults(parsedResults)
      setRawData(JSON.stringify(sampleData, null, 2))
    } catch (error) {
      console.error('Error parsing data:', error)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInput(value)
    
    // Generate mock data based on input
    const mockData = createMockGoogleAutocompleteData(value)
    const parsedResults = parseGoogleAutocompleteData(mockData)
    setResults(parsedResults)
    setRawData(JSON.stringify(mockData, null, 2))
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Google Autocomplete Data Format Demo
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Test Input (try typing &quot;hunt&quot;):
            </label>
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Type to see filtered results..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <button
            onClick={handleParseData}
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
          >
            Parse Sample Data
          </button>
        </div>

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
                  <MapPin className="w-4 h-4 text-gray-500 flex-shrink-0" />
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
              Raw Data Format:
            </h3>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
              {rawData}
            </pre>
          </div>
        )}

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">How to Use This Format:</h4>
          <div className="text-sm text-blue-800 space-y-1">
            <p>1. The data comes as an array: <code>[0, [array of places]]</code></p>
            <p>2. Each place is: <code>[&quot;Full Address&quot;, null, types, &quot;place_id&quot;, null, address_parts, ...]</code></p>
            <p>3. Address parts: <code>[[&quot;City&quot;, 0], [&quot;State&quot;, 12], [&quot;Country&quot;, 16]]</code></p>
            <p>4. Use <code>parseGoogleAutocompleteData()</code> to convert to your format</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GoogleFormatDemo

