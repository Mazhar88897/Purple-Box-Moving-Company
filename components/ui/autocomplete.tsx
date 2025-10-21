"use client"
import React, { useState, useRef, useEffect } from 'react'
import { MapPin } from 'lucide-react'

interface CityOption {
  city: string
  state: string
  fullAddress: string
}

interface AutocompleteProps {
  placeholder: string
  value: string
  onChange: (value: string) => void
  onSelect: (option: CityOption) => void
  options: CityOption[]
  className?: string
}

const Autocomplete: React.FC<AutocompleteProps> = ({
  placeholder,
  value,
  onChange,
  onSelect,
  options,
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [filteredOptions, setFilteredOptions] = useState<CityOption[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Filter options based on input value
  useEffect(() => {
    if (value.trim() === '') {
      setFilteredOptions([])
      setIsOpen(false)
      return
    }

    const filtered = options.filter(option =>
      option.city.toLowerCase().startsWith(value.toLowerCase()) ||
      option.state.toLowerCase().startsWith(value.toLowerCase()) ||
      option.fullAddress.toLowerCase().includes(value.toLowerCase())
    )

    setFilteredOptions(filtered)
    // Only open dropdown if there are filtered options and the input is being actively typed
    // Don't open if the value exactly matches a full address (indicating selection)
    const isExactMatch = options.some(option => option.fullAddress === value)
    setIsOpen(filtered.length > 0 && !isExactMatch)
  }, [value, options])

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
    const isExactMatch = options.some(option => option.fullAddress === value)
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
        className={`w-[300px] sm:w-[400px] text-xs text-black bg-white rounded-lg p-2 py-3 border-t-2 border-b-2 border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent ${className}`}
      />
      
      {isOpen && filteredOptions.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-1 bg-white border-l-2 border-r-2 border-b-2 border-purple-500 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto"
        >
          {filteredOptions.map((option, index) => (
            <div
              key={`${option.city}-${option.state}-${index}`}
              onClick={() => handleOptionSelect(option)}
              className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
            >
              <MapPin className="w-4 h-4 text-gray-500 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-gray-900">{option.city}</div>
                <div className="text-sm text-gray-600">{option.state}, USA</div>
              </div>
            </div>
          ))}
          <div className="px-3 py-2 text-xs text-gray-500 text-right border-t border-gray-100">
            powered by Google
          </div>
        </div>
      )}
    </div>
  )
}

export default Autocomplete
