// Google Places API utility functions
export interface CityOption {
  city: string
  state: string
  fullAddress: string
  placeId: string
  coordinates?: {
    lat: number
    lng: number
  }
}

// Global variable to store the Google Maps API
declare global {
  interface Window {
    google: any
    initGoogleMaps: () => void
  }
}

// Load Google Maps API script
export const loadGoogleMapsScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (window.google && window.google.maps) {
      resolve()
      return
    }

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "AIzaSyBVh5anaF4M3aW7ZE8rvoRX2Zf3hmYUxss"
    
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initGoogleMaps`
    script.async = true
    script.defer = true
    
    window.initGoogleMaps = () => {
      resolve()
    }
    
    script.onerror = () => {
      reject(new Error('Failed to load Google Maps API'))
    }
    
    document.head.appendChild(script)
  })
}

// Convert Google Places result to our CityOption format
export const convertGooglePlaceToCityOption = (place: any): CityOption => {
  const addressComponents = place.address_components || []
  
  // Extract city and state from address components
  let city = ''
  let state = ''
  
  for (const component of addressComponents) {
    if (component.types.includes('locality')) {
      city = component.long_name
    } else if (component.types.includes('administrative_area_level_1')) {
      state = component.short_name
    }
  }
  
  // Fallback to name if city not found
  if (!city) {
    city = place.name || place.formatted_address?.split(',')[0] || ''
  }
  
  // If no state found, try to extract from formatted address
  if (!state) {
    const parts = place.formatted_address?.split(',') || []
    if (parts.length > 1) {
      state = parts[1].trim().split(' ')[0]
    }
  }
  
  return {
    city,
    state,
    fullAddress: place.formatted_address || place.name || '',
    placeId: place.place_id || place.formatted_address || '',
    coordinates: place.geometry?.location ? {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng()
    } : undefined
  }
}

// Fetch places using Google Places Autocomplete service
export const fetchPlaces = async (input: string): Promise<CityOption[]> => {
  if (!input.trim()) return []
  
  try {
    await loadGoogleMapsScript()
    
    if (!window.google?.maps?.places) {
      throw new Error('Google Places API not loaded')
    }
    
    const service = new window.google.maps.places.AutocompleteService()
    
    return new Promise((resolve) => {
      service.getPlacePredictions(
        {
          input: input,
          types: ['geocode'], // Always use geocode to get states, cities, etc.
          componentRestrictions: { country: 'us' }
        },
        (predictions: any[], status: any) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
            // Show all results without filtering - let Google handle the relevance
            let resultsToUse = predictions
            
            const results = resultsToUse.slice(0, 5).map((prediction) => {
              // Extract city and state from structured formatting
              const structuredFormatting = prediction.structured_formatting
              const mainText = structuredFormatting?.main_text || ''
              const secondaryText = structuredFormatting?.secondary_text || ''
              
              // Parse city and state from the secondary text (usually contains city, state)
              const cityStateParts = secondaryText.split(', ')
              const city = cityStateParts[0] || mainText
              const state = cityStateParts[1]?.split(' ')[0] || ''
              
              return {
                city,
                state,
                fullAddress: prediction.description,
                placeId: prediction.place_id,
                coordinates: undefined // Will be populated if needed
              }
            })
            resolve(results)
          } else {
            console.warn('Places API error:', status)
            resolve([])
          }
        }
      )
    })
  } catch (error) {
    console.error('Error fetching places:', error)
    return []
  }
}

// Alternative method using Places Text Search for addresses
export const searchPlaces = async (input: string): Promise<CityOption[]> => {
  if (!input.trim()) return []
  
  try {
    await loadGoogleMapsScript()
    
    if (!window.google?.maps?.places) {
      throw new Error('Google Places API not loaded')
    }
    
    const service = new window.google.maps.places.PlacesService(
      document.createElement('div') // Dummy div for PlacesService
    )
    
    return new Promise((resolve) => {
      service.textSearch(
        {
          query: input + ' USA',
          type: 'geocode' // Always use geocode to get states, cities, etc.
        },
        (results: any[], status: any) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
            const places = results.slice(0, 5).map(convertGooglePlaceToCityOption)
            resolve(places)
          } else {
            console.warn('Places Text Search error:', status)
            resolve([])
          }
        }
      )
    })
  } catch (error) {
    console.error('Error searching places:', error)
    return []
  }
}

// Parse the specific Google autocomplete data format you're seeing
export const parseGoogleAutocompleteData = (data: any[]): CityOption[] => {
  if (!Array.isArray(data) || data.length < 2) return []
  
  // The data format is: [0, [array of place data]]
  const placesData = data[1]
  if (!Array.isArray(placesData)) return []
  
  return placesData.map((place: any) => {
    // Format: ["City, State, Country", null, ["geocode", "locality", "political"], "place_id", ...]
    const fullAddress = place[0] || ''
    const placeId = place[3] || ''
    const addressParts = place[4] || [] // [["City", 0], ["State", 12], ["Country", 16]]
    
    // Extract city and state from address parts
    let city = ''
    let state = ''
    
    if (Array.isArray(addressParts)) {
      for (const part of addressParts) {
        if (Array.isArray(part) && part.length >= 2) {
          const [name, position] = part
          if (position === 0) {
            city = name
          } else if (position === 12) {
            state = name
          }
        }
      }
    }
    
    // Fallback: parse from full address if parts not available
    if (!city || !state) {
      const parts = fullAddress.split(', ')
      if (parts.length >= 2) {
        city = city || parts[0]
        state = state || parts[1].split(' ')[0]
      }
    }
    
    return {
      city: city || fullAddress.split(',')[0],
      state: state || '',
      fullAddress,
      placeId,
      coordinates: undefined // Not available in this format
    }
  })
}

// Simulate the Google autocomplete data format for testing
export const createMockGoogleAutocompleteData = (input: string): any[] => {
  // This simulates the format you're seeing with diverse city names
  const mockData = [
    0,
    [
      ["Atlanta, GA, USA", null, ["geocode", "locality", "political"], "ChIJjQmTa7Kt9YgR4-c1sqD8u0Y", null, [["Atlanta", 0], ["GA", 9], ["USA", 13]], [[0, 2]], null, "ChIJjQmTa7Kt9YgR4-c1sqD8u0Y", ["Atlanta", "GA, USA", [[0, 2]]]],
      ["Boston, MA, USA", null, ["geocode", "locality", "political"], "ChIJGzE9DS1l44kRoOhiASS_fHg", null, [["Boston", 0], ["MA", 8], ["USA", 12]], [[0, 2]], null, "ChIJGzE9DS1l44kRoOhiASS_fHg", ["Boston", "MA, USA", [[0, 2]]]],
      ["Chicago, IL, USA", null, ["geocode", "locality", "political"], "ChIJ7cv00DwsDogRkLb9qKzEljg", null, [["Chicago", 0], ["IL", 9], ["USA", 13]], [[0, 2]], null, "ChIJ7cv00DwsDogRkLb9qKzEljg", ["Chicago", "IL, USA", [[0, 2]]]],
      ["Denver, CO, USA", null, ["geocode", "locality", "political"], "ChIJzxVH8yNla4cRqjaCyTsvvAA", null, [["Denver", 0], ["CO", 8], ["USA", 12]], [[0, 2]], null, "ChIJzxVH8yNla4cRqjaCyTsvvAA", ["Denver", "CO, USA", [[0, 2]]]],
      ["Houston, TX, USA", null, ["geocode", "locality", "political"], "ChIJAYWNSLS4QIYROwVl894CDec", null, [["Houston", 0], ["TX", 9], ["USA", 13]], [[0, 2]], null, "ChIJAYWNSLS4QIYROwVl894CDec", ["Houston", "TX, USA", [[0, 2]]]],
      ["Huntsville, AL, USA", null, ["geocode", "locality", "political"], "ChIJjYmizWdrYogRa1YEyIl-LJo", null, [["Huntsville", 0], ["AL", 12], ["USA", 16]], [[0, 2]], null, "ChIJjYmizWdrYogRa1YEyIl-LJo", ["Huntsville", "AL, USA", [[0, 2]]]],
      ["Huntington Beach, CA, USA", null, ["geocode", "locality", "political"], "ChIJtSrI-SIk3YARATtmpMmF7UU", null, [["Huntington Beach", 0], ["CA", 18], ["USA", 22]], [[0, 2]], null, "ChIJtSrI-SIk3YARATtmpMmF7UU", ["Huntington Beach", "CA, USA", [[0, 2]]]],
      ["Huntsville, TX, USA", null, ["geocode", "locality", "political"], "ChIJT1oksR0GR4YR8eT49Bnt1bw", null, [["Huntsville", 0], ["TX", 12], ["USA", 16]], [[0, 2]], null, "ChIJT1oksR0GR4YR8eT49Bnt1bw", ["Huntsville", "TX, USA", [[0, 2]]]],
      ["Humble, TX, USA", null, ["geocode", "locality", "political"], "ChIJMd6gq02yQIYR2uXexzEpNA4", null, [["Humble", 0], ["TX", 8], ["USA", 12]], [[0, 2]], null, "ChIJMd6gq02yQIYR2uXexzEpNA4", ["Humble", "TX, USA", [[0, 2]]]],
      ["Hudson, NY, USA", null, ["geocode", "locality", "political"], "ChIJbU_L8ymU3YkRzaqMXJfLnmQ", null, [["Hudson", 0], ["NY", 8], ["USA", 12]], [[0, 2]], null, "ChIJbU_L8ymU3YkRzaqMXJfLnmQ", ["Hudson", "NY, USA", [[0, 2]]]]
    ]
  ]
  
  // Filter based on input - now works with single characters
  const placesArray = mockData[1] as any[]
  const filteredPlaces = placesArray.filter((place: any) => 
    place[0].toLowerCase().includes(input.toLowerCase())
  )
  
  // If we have filtered results, return them, otherwise return all for single character searches
  if (filteredPlaces.length > 0 || input.length > 1) {
    return [0, filteredPlaces]
  }
  
  // For single character searches, return a subset of all data
  return [0, placesArray.slice(0, 3)]
}

// Function to fetch places using the same format as the website you're cloning
export const fetchPlacesInTargetFormat = async (input: string): Promise<CityOption[]> => {
  if (!input.trim()) return []
  
  try {
    // For now, we'll use the mock data to demonstrate the format
    // In a real implementation, you would make a request to get this specific format
    const mockData = createMockGoogleAutocompleteData(input)
    return parseGoogleAutocompleteData(mockData)
  } catch (error) {
    console.error('Error fetching places in target format:', error)
    return []
  }
}

// Function to handle the specific data format you're seeing from the website
export const handleGoogleAutocompleteResponse = (response: any): CityOption[] => {
  // Handle the _xdc_._dz6919, _xdc_._393iyu, etc. format
  if (typeof response === 'function') {
    // If it's a function, we need to call it to get the actual data
    try {
      const data = response()
      return parseGoogleAutocompleteData(data)
    } catch (error) {
      console.error('Error calling response function:', error)
      return []
    }
  }
  
  // If it's already an array, parse it directly
  if (Array.isArray(response)) {
    return parseGoogleAutocompleteData(response)
  }
  
  // Handle JSON object format with predictions array (our current response)
  if (response && typeof response === 'object' && response.predictions) {
    console.log('Handling JSON object format with predictions:', response)
    return convertPredictionsToCityOptions(response.predictions)
  }
  
  return []
}

// Convert Google Places predictions to CityOption format
export const convertPredictionsToCityOptions = (predictions: any[]): CityOption[] => {
  if (!Array.isArray(predictions)) return []
  
  return predictions.map((prediction: any) => {
    const structuredFormatting = prediction.structured_formatting || {}
    const mainText = structuredFormatting.main_text || ''
    const secondaryText = structuredFormatting.secondary_text || ''
    
    // Parse city and state from structured formatting
    const cityStateParts = secondaryText.split(', ')
    const city = cityStateParts[0] || mainText
    const state = cityStateParts[1]?.split(' ')[0] || ''
    
    return {
      city: city || prediction.description?.split(',')[0] || '',
      state: state || '',
      fullAddress: prediction.description || prediction.formatted_address || '',
      placeId: prediction.place_id || '',
      coordinates: undefined
    }
  })
}

// Function to handle dynamic callback names like _xdc_._393iyu
export const handleDynamicCallback = (callbackName: string, response: any): CityOption[] => {
  console.log(`Handling dynamic callback: ${callbackName}`)
  return handleGoogleAutocompleteResponse(response)
}

// Function to handle the specific _xdc_._dz6919 format from the website
export const handleXdcResponse = (xdcFunction: any, input: string): CityOption[] => {
  try {
    // Call the _xdc_._dz6919 function with the input
    // The function expects an array with search parameters
    const result = xdcFunction([0, [input]])
    
    // Parse the result
    return parseGoogleAutocompleteData(result)
  } catch (error) {
    console.error('Error calling _xdc_ function:', error)
    return []
  }
}

// Example of how to use the _xdc_._dz6919 format
export const useXdcGooglePlaces = (xdcFunction: any) => {
  return {
    search: async (input: string): Promise<CityOption[]> => {
      if (!input.trim()) return []
      
      try {
        // Call the _xdc_ function with the input
        const result = xdcFunction([0, [input]])
        return parseGoogleAutocompleteData(result)
      } catch (error) {
        console.error('Error using _xdc_ function:', error)
        return []
      }
    }
  }
}

// Replicate the exact Google Places API request from the website
export const fetchPlacesWithWebsiteParams = async (input: string): Promise<CityOption[]> => {
  if (!input.trim()) return []
  
  try {
    // Use the basic Google Places API that was working initially
    const response = await fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=AIzaSyBVh5anaF4M3aW7ZE8rvoRX2Zf3hmYUxss`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    
    // Convert the response to our format
    if (data.predictions && Array.isArray(data.predictions)) {
      return data.predictions.map((prediction: any) => ({
        city: prediction.structured_formatting?.main_text?.split(',')[0] || prediction.description.split(',')[0],
        state: prediction.structured_formatting?.secondary_text?.split(',')[0]?.trim() || '',
        fullAddress: prediction.description,
        placeId: prediction.place_id,
        coordinates: undefined
      }))
    }
    
    return []
  } catch (error) {
    console.error('Error fetching places with website params:', error)
    return []
  }
}

// Alternative method using JSONP to replicate the exact callback behavior
export const fetchPlacesWithJSONP = async (input: string): Promise<CityOption[]> => {
  if (!input.trim()) return []
  
  console.log('Attempting JSONP search for:', input)
  
  return new Promise((resolve) => {
    // Create a unique callback name similar to the website's pattern
    // The website uses patterns like _xdc_._dz6919, _xdc_._393iyu, etc.
    const randomId = Math.random().toString(36).substring(2, 8)
    const callbackName: string = `_xdc_._${randomId}`
    
    console.log('Generated callback name:', callbackName)
    
    // Set up timeout to fallback to regular API if JSONP fails
    const timeoutId = setTimeout(() => {
      console.log('JSONP timeout, falling back to regular API')
      delete (window as any)[callbackName]
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
      // Fallback to regular Google Places API
      fetchPlaces(input).then(resolve).catch(() => resolve([]))
    }, 5000) // 5 second timeout
    
    // Use the basic Google Places API endpoint that was working initially
    const fullUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=AIzaSyBVh5anaF4M3aW7ZE8rvoRX2Zf3hmYUxss&callback=${callbackName}`
    console.log('JSONP URL:', fullUrl)
    
    // Set up the global callback
    (window as any)[callbackName] = (data: any) => {
      console.log('JSONP callback received:', callbackName, data)
      clearTimeout(timeoutId)
      try {
        // Handle both response formats
        let results: CityOption[] = []
        
        if (data && typeof data === 'object' && data.predictions) {
          // Handle JSON object format: {"predictions": [], "status": "ZERO_RESULTS"}
          console.log('Handling JSON object format with predictions array')
          console.log('Status:', data.status)
          console.log('Predictions count:', data.predictions?.length || 0)
          
          if (data.status === 'ZERO_RESULTS') {
            console.log('API returned ZERO_RESULTS, trying fallback method')
            // Try fallback to regular Google Places API
            fetchPlaces(input).then(resolve).catch(() => resolve([]))
            return
          }
          
          results = convertPredictionsToCityOptions(data.predictions)
        } else if (Array.isArray(data)) {
          // Handle array format: [0, [["City, State, USA", ...]]]
          console.log('Handling array format')
          results = parseGoogleAutocompleteData(data)
        } else {
          console.log('Unknown response format:', typeof data, data)
          results = []
        }
        
        console.log('JSONP parsed results:', results)
        resolve(results)
      } catch (error) {
        console.error('Error parsing JSONP response:', error)
        // Fallback to regular API
        fetchPlaces(input).then(resolve).catch(() => resolve([]))
      } finally {
        // Clean up
        delete (window as any)[callbackName]
        if (script.parentNode) {
          script.parentNode.removeChild(script)
        }
      }
    }
    
    // Create and inject the script tag
    const script = document.createElement('script')
    script.src = fullUrl
    script.async = true
    
    script.onerror = (error) => {
      console.error('Failed to load JSONP script:', error)
      clearTimeout(timeoutId)
      delete (window as any)[callbackName]
      // Fallback to regular API
      fetchPlaces(input).then(resolve).catch(() => resolve([]))
    }
    
    document.head.appendChild(script)
  })
}

// Function to analyze the website's request parameters
export const analyzeWebsiteRequest = () => {
  return {
    baseUrl: 'https://maps.googleapis.com/maps/api/place/autocomplete/json',
    parameters: {
      '4sen-GB': 'Language parameter (empty)',
      '7scountry': 'Country restriction (us)',
      '9sgeocode': 'Geocode parameter (empty)',
      '15e3': 'Additional parameter (empty)',
      '20sBB24EB38B4CB42599D3EF032A1D3647A5gib': 'Session token (empty)',
      '21m1': 'Additional parameter (empty)',
      '2e1': 'Additional parameter (empty)',
      'r_url': 'Referrer URL (https://mypieceofcakemove.com/)',
      'callback': 'JSONP callback function (_xdc_._dz6919)',
      'key': 'Google Maps API key (AIzaSyAU138ZldfzhJDUeC4uiepjYa9DNLok6bQ)',
      'token': 'Request token (9728)',
      'input': 'Search input (dynamic)'
    },
    method: 'JSONP',
    note: 'The website uses JSONP with a specific callback function to get around CORS restrictions'
  }
}
