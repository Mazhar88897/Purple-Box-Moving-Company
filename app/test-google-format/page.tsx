"use client"
import React, { useState } from 'react'
import Autocomplete from '@/components/ui/autocomplete'
import GoogleFormatDemo from '@/components/demo/GoogleFormatDemo'
import XdcFormatExample from '@/components/examples/XdcFormatExample'
import WebsiteParamsDemo from '@/components/demo/WebsiteParamsDemo'
import SingleCharacterTest from '@/components/demo/SingleCharacterTest'
import AlphabetTest from '@/components/demo/AlphabetTest'
import FetchingTest from '@/components/demo/FetchingTest'
import DynamicCallbackTest from '@/components/demo/DynamicCallbackTest'
import MethodComparisonTest from '@/components/demo/MethodComparisonTest'
import JSONPDebugTest from '@/components/demo/JSONPDebugTest'
import ResponseFormatTest from '@/components/demo/ResponseFormatTest'
import ParameterComparisonTest from '@/components/demo/ParameterComparisonTest'
import ParameterVariationTest from '@/components/demo/ParameterVariationTest'
import WorkingSolution from '@/components/demo/WorkingSolution'
import SimpleAPITest from '@/components/demo/SimpleAPITest'
import MinimalTest from '@/components/demo/MinimalTest'
import JSONPFixTest from '@/components/demo/JSONPFixTest'
import EndpointTest from '@/components/demo/EndpointTest'
import URLDebugTest from '@/components/demo/URLDebugTest'
import BasicWorkingSolution from '@/components/demo/BasicWorkingSolution'
import WyomingTest from '@/components/demo/WyomingTest'
import { CityOption } from '@/lib/googlePlaces'

export default function TestGoogleFormatPage() {
  const [selectedOption, setSelectedOption] = useState<CityOption | null>(null)
  const [inputValue, setInputValue] = useState('')

  // Sample data in the format you're seeing from the website
  const sampleGoogleData = [
    0,
    [
      ["Huntsville, AL, USA", null, ["geocode", "locality", "political"], "ChIJjYmizWdrYogRa1YEyIl-LJo", null, [["Huntsville", 0], ["AL", 12], ["USA", 16]], [[0, 2]], null, "ChIJjYmizWdrYogRa1YEyIl-LJo", ["Huntsville", "AL, USA", [[0, 2]]]],
      ["Huntington Beach, CA, USA", null, ["geocode", "locality", "political"], "ChIJtSrI-SIk3YARATtmpMmF7UU", null, [["Huntington Beach", 0], ["CA", 18], ["USA", 22]], [[0, 2]], null, "ChIJtSrI-SIk3YARATtmpMmF7UU", ["Huntington Beach", "CA, USA", [[0, 2]]]],
      ["Huntsville, TX, USA", null, ["geocode", "locality", "political"], "ChIJT1oksR0GR4YR8eT49Bnt1bw", null, [["Huntsville", 0], ["TX", 12], ["USA", 16]], [[0, 2]], null, "ChIJT1oksR0GR4YR8eT49Bnt1bw", ["Huntsville", "TX, USA", [[0, 2]]]],
      ["Humble, TX, USA", null, ["geocode", "locality", "political"], "ChIJMd6gq02yQIYR2uXexzEpNA4", null, [["Humble", 0], ["TX", 8], ["USA", 12]], [[0, 2]], null, "ChIJMd6gq02yQIYR2uXexzEpNA4", ["Humble", "TX, USA", [[0, 2]]]],
      ["Hudson, NY, USA", null, ["geocode", "locality", "political"], "ChIJbU_L8ymU3YkRzaqMXJfLnmQ", null, [["Hudson", 0], ["NY", 8], ["USA", 12]], [[0, 2]], null, "ChIJbU_L8ymU3YkRzaqMXJfLnmQ", ["Hudson", "NY, USA", [[0, 2]]]]
    ]
  ]

  const handleSelect = (option: CityOption) => {
    setSelectedOption(option)
    setInputValue(option.fullAddress)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Google Autocomplete Format Test
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Standard Google Places API */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Standard Google Places API
            </h2>
            <Autocomplete
              placeholder="Search with standard Google Places API..."
              value={inputValue}
              onChange={setInputValue}
              onSelect={handleSelect}
              useTargetFormat={false}
            />
            {selectedOption && (
              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-green-900">Selected:</h3>
                <p className="text-green-800">{selectedOption.fullAddress}</p>
                <p className="text-sm text-green-700">
                  {selectedOption.city}, {selectedOption.state}
                </p>
              </div>
            )}
          </div>

          {/* Target Format (like the website you're cloning) */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Target Format (Website Style)
            </h2>
            <Autocomplete
              placeholder="Search with target format..."
              value={inputValue}
              onChange={setInputValue}
              onSelect={handleSelect}
              useTargetFormat={true}
              externalData={sampleGoogleData}
            />
            {selectedOption && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-900">Selected:</h3>
                <p className="text-blue-800">{selectedOption.fullAddress}</p>
                <p className="text-sm text-blue-700">
                  {selectedOption.city}, {selectedOption.state}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Demo Components */}
        <div className="mt-8 space-y-8">
          <WyomingTest />
          <BasicWorkingSolution />
          <URLDebugTest />
          <EndpointTest />
          <MinimalTest />
          <JSONPFixTest />
          <SimpleAPITest />
          <WorkingSolution />
          <ParameterVariationTest />
          <ParameterComparisonTest />
          <ResponseFormatTest />
          <JSONPDebugTest />
          <MethodComparisonTest />
          <DynamicCallbackTest />
          <FetchingTest />
          <AlphabetTest />
          <SingleCharacterTest />
          <WebsiteParamsDemo />
          <GoogleFormatDemo />
          <XdcFormatExample />
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-900 mb-3">
            How to Use This with Your Data:
          </h3>
          <div className="text-yellow-800 space-y-2">
            <p>
              <strong>1. Parse the data format:</strong> Use <code>parseGoogleAutocompleteData()</code> to convert the array format to your CityOption format.
            </p>
            <p>
              <strong>2. Handle the _xdc_ function:</strong> Use <code>handleGoogleAutocompleteResponse()</code> to handle the function-based response format.
            </p>
            <p>
              <strong>3. Use in your autocomplete:</strong> Set <code>useTargetFormat={true}</code> and pass your data via <code>externalData</code> prop.
            </p>
            <div className="mt-4 p-3 bg-yellow-100 rounded">
              <p className="font-mono text-sm">
                {`// Example usage:
const data = _xdc_._dz6919 && _xdc_._dz6919([0, [["Huntsville, AL, USA", ...]]])
const options = handleGoogleAutocompleteResponse(data)`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
