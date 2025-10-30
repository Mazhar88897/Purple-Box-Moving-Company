"use client"
import React, { useState, useRef, useEffect, useCallback } from 'react'
import { MapPin, Loader2 } from 'lucide-react'
import { fetchPlaces, searchPlaces, CityOption, fetchPlacesInTargetFormat, handleGoogleAutocompleteResponse, fetchPlacesWithWebsiteParams, fetchPlacesWithJSONP } from '@/lib/googlePlaces'

interface AutocompleteProps {
  placeholder: string
  value: string
  onChange: (value: string) => void
  onSelect: (option: CityOption) => void
  className?: string
  useTargetFormat?: boolean // New prop to use the target format
  externalData?: any // For external data in the target format
  useWebsiteParams?: boolean // Use the exact website parameters
  useJSONP?: boolean // Use JSONP method like the website
}

const Autocomplete: React.FC<AutocompleteProps> = ({
  placeholder,
  value,
  onChange,
  onSelect,
  className = "",
  useTargetFormat = false,
  externalData = null,
  useWebsiteParams = false,
  useJSONP = false
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [filteredOptions, setFilteredOptions] = useState<CityOption[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const lastSearchRef = useRef<string>('')

  // Debounced search function
  const searchPlacesDebounced = useCallback(async (searchTerm: string) => {
    if (searchTerm.trim().length < 1) {
      setFilteredOptions([])
      setIsOpen(false)
      return
    }

    console.log('Searching for:', searchTerm)
    setIsLoading(true)
    setError(null)

    try {
      let results: CityOption[] = []

      if (useJSONP) {
        // Use JSONP method like the website
        results = await fetchPlacesWithJSONP(searchTerm)
      } else if (useWebsiteParams) {
        // Use the exact website parameters
        results = await fetchPlacesWithWebsiteParams(searchTerm)
      } else if (useTargetFormat) {
        // Use the target format (like the website you're cloning)
        if (externalData) {
          results = handleGoogleAutocompleteResponse(externalData)
        } else {
          results = await fetchPlacesInTargetFormat(searchTerm)
        }
      } else {
        // Use standard Google Places API
        // Try autocomplete first, then fallback to text search
        results = await fetchPlaces(searchTerm)
        console.log('fetchPlaces results:', results)
        
        // If no results from autocomplete, try text search
        if (results.length === 0) {
          results = await searchPlaces(searchTerm)
          console.log('searchPlaces results:', results)
        }
      }

      setFilteredOptions(results)
      setIsOpen(results.length > 0)
    } catch (err) {
      console.error('Error fetching places:', err)
      setError('Failed to fetch address suggestions')
      setFilteredOptions([])
      setIsOpen(false)
    } finally {
      setIsLoading(false)
    }
  }, [useTargetFormat, externalData, useWebsiteParams, useJSONP])

  // Debounced effect for searching places
  useEffect(() => {
    // Clear previous timeout
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current)
    }

    if (value.trim() === '') {
      setFilteredOptions([])
      setIsOpen(false)
      setError(null)
      lastSearchRef.current = ''
      return
    }

    // Don't search if the value hasn't changed
    if (lastSearchRef.current === value) {
      return
    }

    // Check if the value exactly matches a selected option
    // Only check this if we have filtered options to avoid unnecessary checks
    if (filteredOptions.length > 0) {
      const isExactMatch = filteredOptions.some(option => option.fullAddress === value)
      if (isExactMatch) {
        setIsOpen(false)
        return
      }
    }

    // Debounce the search (reduced for single character searches)
    debounceTimeoutRef.current = setTimeout(() => {
      lastSearchRef.current = value
      searchPlacesDebounced(value)
    }, 150)

    // Cleanup timeout on unmount
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current)
      }
    }
  }, [value, searchPlacesDebounced])

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    onChange(newValue)
  }

  // Handle option selection
  const handleOptionSelect = (option: CityOption) => {
    onSelect(option)
    setIsOpen(false)
    // Clear focus from input to prevent immediate reopening
    if (inputRef.current) {
      inputRef.current.blur()
    }
  }

  // Handle input focus
  const handleFocus = () => {
    // Only show dropdown if there are filtered options and the current value is not a complete selection
    const isExactMatch = filteredOptions.some(option => option.fullAddress === value)
    if (filteredOptions.length > 0 && !isExactMatch) {
      setIsOpen(true)
    }
  }

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        onFocus={handleFocus}
        className={`w-[300px] sm:w-[400px] text-xs text-black bg-white rounded-lg p-2 py-3 border-t-2 border-b-2  ring-purple-300 ring-2 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent ${className}`}
      />
      
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-1 bg-white border-l-2 border-r-2 border-b-2 border-purple-500 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto"
        >
          {isLoading ? (
            <div className="flex items-center justify-center px-3 py-4">
              <Loader2 className="w-4 h-4 animate-spin text-purple-500 mr-2" />
              <span className="text-sm text-gray-600">Searching addresses...</span>
            </div>
          ) : error ? (
            <div className="px-3 py-2 text-sm text-red-600">
              {error}
            </div>
          ) : filteredOptions.length > 0 ? (
            <>
              {filteredOptions.map((option, index) => (
                <div
                  key={`${option.placeId}-${index}`}
                  onClick={() => handleOptionSelect(option)}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                >
                  <MapPin className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900">{option.fullAddress}</div>
                    {option.city && option.state && (
                      <div className="text-sm text-gray-600">{option.city}, {option.state}</div>
                    )}
                  </div>
                </div>
              ))}
              <div className="px-3 py-2 text-xs text-gray-500 text-right border-t border-gray-100">
                powered by Google
              </div>
            </>
          ) : value.trim().length >= 1 ? (
            <div className="px-3 py-2 text-sm text-gray-500 text-center">
              No addresses found
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}

export default Autocomplete
