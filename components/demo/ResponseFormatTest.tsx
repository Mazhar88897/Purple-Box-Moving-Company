"use client"
import React, { useState } from 'react'
import { handleGoogleAutocompleteResponse, convertPredictionsToCityOptions, parseGoogleAutocompleteData } from '@/lib/googlePlaces'
import { CityOption } from '@/lib/googlePlaces'

const ResponseFormatTest: React.FC = () => {
  const [results, setResults] = useState<CityOption[]>([])
  const [responseType, setResponseType] = useState<string>('')

  // Our website response format (JSON object with predictions array)
  const ourWebsiteResponse = {
    "predictions": [],
    "status": "ZERO_RESULTS"
  }

  // Target website response format (array format)
  const targetWebsiteResponse = [
    0,
    [
      ["Kutztown, PA, USA", null, ["geocode", "locality", "political"], "ChIJm5DtUUrSxYkREnnaCozDQKs", null, [["Kutztown", 0], ["PA", 10], ["USA", 14]], [[0, 2]], null, "ChIJm5DtUUrSxYkREnnaCozDQKs", ["Kutztown", "PA, USA", [[0, 2]]]],
      ["Kuna, ID, USA", null, ["geocode", "locality", "political"], "ChIJUaJmE2lFrlQRvNCFSAG-zhk", null, [["Kuna", 0], ["ID", 6], ["USA", 10]], [[0, 2]], null, "ChIJUaJmE2lFrlQRvNCFSAG-zhk", ["Kuna", "ID, USA", [[0, 2]]]],
      ["Kure Beach, NC, USA", null, ["geocode", "locality", "political"], "ChIJA3u846j4qYkRRgq8dBhO2F8", null, [["Kure Beach", 0], ["NC", 12], ["USA", 16]], [[0, 2]], null, "ChIJA3u846j4qYkRRgq8dBhO2F8", ["Kure Beach", "NC, USA", [[0, 2]]]],
      ["Kunkletown, PA, USA", null, ["geocode", "locality", "political"], "ChIJB1KZ7URbxIkRU5HXvSIl34Q", null, [["Kunkletown", 0], ["PA", 12], ["USA", 16]], [[0, 2]], null, "ChIJB1KZ7URbxIkRU5HXvSIl34Q", ["Kunkletown", "PA, USA", [[0, 2]]]]
    ]
  ]

  // Sample with actual predictions data
  const ourWebsiteResponseWithData = {
    "predictions": [
      {
        "description": "Kutztown, PA, USA",
        "place_id": "ChIJm5DtUUrSxYkREnnaCozDQKs",
        "structured_formatting": {
          "main_text": "Kutztown",
          "secondary_text": "PA, USA"
        }
      },
      {
        "description": "Kuna, ID, USA",
        "place_id": "ChIJUaJmE2lFrlQRvNCFSAG-zhk",
        "structured_formatting": {
          "main_text": "Kuna",
          "secondary_text": "ID, USA"
        }
      }
    ],
    "status": "OK"
  }

  const testOurFormat = () => {
    console.log('Testing our website format (JSON object):', ourWebsiteResponse)
    const results = handleGoogleAutocompleteResponse(ourWebsiteResponse)
    setResults(results)
    setResponseType('Our Website Format (JSON Object)')
  }

  const testOurFormatWithData = () => {
    console.log('Testing our website format with data:', ourWebsiteResponseWithData)
    const results = handleGoogleAutocompleteResponse(ourWebsiteResponseWithData)
    setResults(results)
    setResponseType('Our Website Format with Data (JSON Object)')
  }

  const testTargetFormat = () => {
    console.log('Testing target website format (array):', targetWebsiteResponse)
    const results = handleGoogleAutocompleteResponse(targetWebsiteResponse)
    setResults(results)
    setResponseType('Target Website Format (Array)')
  }

  const clearResults = () => {
    setResults([])
    setResponseType('')
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Response Format Test
        </h2>
        
        <div className="mb-6 p-4 bg-red-50 rounded-lg">
          <h3 className="font-semibold text-red-900 mb-2">Issue Identified:</h3>
          <p className="text-red-800 text-sm">
            Our website returns JSON object format with predictions array, but the target website returns array format. 
            The code now handles both formats.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex gap-4">
            <button
              onClick={testOurFormat}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
            >
              Test Our Format (Empty)
            </button>
            
            <button
              onClick={testOurFormatWithData}
              className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors"
            >
              Test Our Format (With Data)
            </button>
            
            <button
              onClick={testTargetFormat}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              Test Target Format
            </button>
            
            <button
              onClick={clearResults}
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              Clear
            </button>
          </div>
        </div>

        {responseType && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Response Type:</h3>
            <p className="text-blue-800">{responseType}</p>
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

        {results.length === 0 && responseType && (
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
            <h3 className="font-semibold text-yellow-900 mb-2">No Results:</h3>
            <p className="text-yellow-800 text-sm">
              This response format returned no results. This is expected for empty predictions arrays.
            </p>
          </div>
        )}

        <div className="mt-6 p-4 bg-purple-50 rounded-lg">
          <h4 className="font-semibold text-purple-900 mb-2">Response Format Comparison:</h4>
          <div className="text-sm text-purple-800 space-y-2">
            <div>
              <strong>Our Website (JSON Object):</strong>
              <pre className="bg-purple-100 p-2 rounded text-xs mt-1">
{`{
  "predictions": [],
  "status": "ZERO_RESULTS"
}`}
              </pre>
            </div>
            <div>
              <strong>Target Website (Array):</strong>
              <pre className="bg-purple-100 p-2 rounded text-xs mt-1">
{`[0, [["Kutztown, PA, USA", ...]]]`}
              </pre>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-green-50 rounded-lg">
          <h4 className="font-semibold text-green-900 mb-2">Solution:</h4>
          <div className="text-sm text-green-800 space-y-1">
            <p>• Added support for both response formats</p>
            <p>• JSON object format with predictions array</p>
            <p>• Array format with nested data structure</p>
            <p>• Automatic detection and parsing of both formats</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResponseFormatTest
