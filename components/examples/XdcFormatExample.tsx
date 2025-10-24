"use client"
import React, { useState, useEffect } from 'react'
import { handleXdcResponse, useXdcGooglePlaces, parseGoogleAutocompleteData } from '@/lib/googlePlaces'
import { CityOption } from '@/lib/googlePlaces'

const XdcFormatExample: React.FC = () => {
  const [input, setInput] = useState('')
  const [results, setResults] = useState<CityOption[]>([])
  const [rawData, setRawData] = useState('')

  // This simulates the _xdc_._dz6919 function from the website
  const mockXdcFunction = (params: any[]) => {
    console.log('Mock _xdc_ function called with:', params)
    
    // Return the same format as the website you're cloning
    return [
      0,
      [
        ["Huntsville, AL, USA", null, ["geocode", "locality", "political"], "ChIJjYmizWdrYogRa1YEyIl-LJo", null, [["Huntsville", 0], ["AL", 12], ["USA", 16]], [[0, 2]], null, "ChIJjYmizWdrYogRa1YEyIl-LJo", ["Huntsville", "AL, USA", [[0, 2]]]],
        ["Huntington Beach, CA, USA", null, ["geocode", "locality", "political"], "ChIJtSrI-SIk3YARATtmpMmF7UU", null, [["Huntington Beach", 0], ["CA", 18], ["USA", 22]], [[0, 2]], null, "ChIJtSrI-SIk3YARATtmpMmF7UU", ["Huntington Beach", "CA, USA", [[0, 2]]]],
        ["Huntsville, TX, USA", null, ["geocode", "locality", "political"], "ChIJT1oksR0GR4YR8eT49Bnt1bw", null, [["Huntsville", 0], ["TX", 12], ["USA", 16]], [[0, 2]], null, "ChIJT1oksR0GR4YR8eT49Bnt1bw", ["Huntsville", "TX, USA", [[0, 2]]]],
        ["Humble, TX, USA", null, ["geocode", "locality", "political"], "ChIJMd6gq02yQIYR2uXexzEpNA4", null, [["Humble", 0], ["TX", 8], ["USA", 12]], [[0, 2]], null, "ChIJMd6gq02yQIYR2uXexzEpNA4", ["Humble", "TX, USA", [[0, 2]]]],
        ["Hudson, NY, USA", null, ["geocode", "locality", "political"], "ChIJbU_L8ymU3YkRzaqMXJfLnmQ", null, [["Hudson", 0], ["NY", 8], ["USA", 12]], [[0, 2]], null, "ChIJbU_L8ymU3YkRzaqMXJfLnmQ", ["Hudson", "NY, USA", [[0, 2]]]]
      ]
    ]
  }

  // Example 1: Direct parsing of the data format
  const handleDirectParse = () => {
    const sampleData = [
      0,
      [
        ["Huntsville, AL, USA", null, ["geocode", "locality", "political"], "ChIJjYmizWdrYogRa1YEyIl-LJo", null, [["Huntsville", 0], ["AL", 12], ["USA", 16]], [[0, 2]], null, "ChIJjYmizWdrYogRa1YEyIl-LJo", ["Huntsville", "AL, USA", [[0, 2]]]],
        ["Huntington Beach, CA, USA", null, ["geocode", "locality", "political"], "ChIJtSrI-SIk3YARATtmpMmF7UU", null, [["Huntington Beach", 0], ["CA", 18], ["USA", 22]], [[0, 2]], null, "ChIJtSrI-SIk3YARATtmpMmF7UU", ["Huntington Beach", "CA, USA", [[0, 2]]]]
      ]
    ]
    
    const parsed = parseGoogleAutocompleteData(sampleData)
    setResults(parsed)
    setRawData(JSON.stringify(sampleData, null, 2))
  }

  // Example 2: Using the _xdc_ function
  const handleXdcFunction = () => {
    const parsed = handleXdcResponse(mockXdcFunction, input)
    setResults(parsed)
    
    // Show what the function would return
    const mockResult = mockXdcFunction([0, [input]])
    setRawData(JSON.stringify(mockResult, null, 2))
  }

  // Example 3: Using the hook-style approach
  const xdcPlaces = useXdcGooglePlaces(mockXdcFunction)
  
  const handleHookSearch = async () => {
    const parsed = await xdcPlaces.search(input)
    setResults(parsed)
    
    const mockResult = mockXdcFunction([0, [input]])
    setRawData(JSON.stringify(mockResult, null, 2))
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          _xdc_._dz6919 Format Examples
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
              onClick={handleDirectParse}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Parse Sample Data
            </button>
            
            <button
              onClick={handleXdcFunction}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              Use _xdc_ Function
            </button>
            
            <button
              onClick={handleHookSearch}
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
            >
              Use Hook Style
            </button>
          </div>
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
              Raw Data:
            </h3>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
              {rawData}
            </pre>
          </div>
        )}

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">Integration Instructions:</h4>
          <div className="text-sm text-blue-800 space-y-2">
            <p><strong>1. For direct data parsing:</strong></p>
            <pre className="bg-blue-100 p-2 rounded text-xs">
{`const data = [0, [["Huntsville, AL, USA", ...]]]
const options = parseGoogleAutocompleteData(data)`}
            </pre>
            
            <p><strong>2. For _xdc_ function calls:</strong></p>
            <pre className="bg-blue-100 p-2 rounded text-xs">
{`const options = handleXdcResponse(_xdc_._dz6919, "hunt")`}
            </pre>
            
            <p><strong>3. For hook-style usage:</strong></p>
            <pre className="bg-blue-100 p-2 rounded text-xs">
{`const places = useXdcGooglePlaces(_xdc_._dz6919)
const options = await places.search("hunt")`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}

export default XdcFormatExample

