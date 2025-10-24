# Website Parameters Integration Guide

This guide shows how to replicate the exact Google Places API request parameters from the website you're cloning.

## Website Request Analysis

The website you're cloning makes requests to Google's Places API with these exact parameters:

```
https://maps.googleapis.com/maps/api/place/autocomplete/json?
4sen-GB=&
7scountry=us&
9sgeocode=&
15e3=&
20sBB24EB38B4CB42599D3EF032A1D3647A5gib=&
21m1=&
2e1=&
r_url=https://mypieceofcakemove.com/&
callback=_xdc_._dz6919&
key=AIzaSyAU138ZldfzhJDUeC4uiepjYa9DNLok6bQ&
token=9728&
input=SEARCH_TERM
```

## Parameter Breakdown

| Parameter | Value | Purpose |
|-----------|-------|---------|
| `4sen-GB` | (empty) | Language parameter |
| `7scountry` | `us` | Country restriction |
| `9sgeocode` | (empty) | Geocode parameter |
| `15e3` | (empty) | Additional parameter |
| `20sBB24EB38B4CB42599D3EF032A1D3647A5gib` | (empty) | Session token |
| `21m1` | (empty) | Additional parameter |
| `2e1` | (empty) | Additional parameter |
| `r_url` | `https://mypieceofcakemove.com/` | Referrer URL |
| `callback` | `_xdc_._dz6919` | JSONP callback function |
| `key` | `AIzaSyAU138ZldfzhJDUeC4uiepjYa9DNLok6bQ` | Google Maps API key |
| `token` | `9728` | Request token |
| `input` | `SEARCH_TERM` | Search input (dynamic) |

## Implementation Methods

### 1. Website Parameters Method

Uses the exact same parameters as the website:

```typescript
import { fetchPlacesWithWebsiteParams } from '@/lib/googlePlaces'

const results = await fetchPlacesWithWebsiteParams('hunt')
```

### 2. JSONP Method

Replicates the exact JSONP callback behavior:

```typescript
import { fetchPlacesWithJSONP } from '@/lib/googlePlaces'

const results = await fetchPlacesWithJSONP('hunt')
```

### 3. Autocomplete Component Integration

Use in your autocomplete component:

```tsx
// Website parameters method
<Autocomplete
  placeholder="Search addresses..."
  value={inputValue}
  onChange={setInputValue}
  onSelect={handleSelect}
  useWebsiteParams={true}
/>

// JSONP method
<Autocomplete
  placeholder="Search addresses..."
  value={inputValue}
  onChange={setInputValue}
  onSelect={handleSelect}
  useJSONP={true}
/>
```

## Response Format

The website returns data in this specific format:

```javascript
_xdc_._dz6919([0, [
  ["Huntsville, AL, USA", null, ["geocode", "locality", "political"], "ChIJjYmizWdrYogRa1YEyIl-LJo", null, [["Huntsville", 0], ["AL", 12], ["USA", 16]], [[0, 2]], null, "ChIJjYmizWdrYogRa1YEyIl-LJo", ["Huntsville", "AL, USA", [[0, 2]]]],
  // ... more results
]])
```

## Data Parsing

The `parseGoogleAutocompleteData` function extracts:

- **City**: From address parts where position = 0
- **State**: From address parts where position = 12
- **Full Address**: From the first element of each place array
- **Place ID**: From the 4th element (index 3) of each place array

## Testing

Visit these pages to test the implementation:

1. `/test-google-format` - Comprehensive demo with all methods
2. `/test-website-params` - Focused test of website parameters

## Key Features

- **Exact Parameter Replication**: Uses the same parameters as the website
- **JSONP Support**: Bypasses CORS restrictions like the website
- **Data Format Compatibility**: Handles the specific array format
- **Multiple Methods**: Choose between different implementation approaches
- **Error Handling**: Robust error handling and fallbacks

## Security Notes

- The website's API key is exposed in the request
- Consider using your own API key for production
- The JSONP method is necessary due to CORS restrictions
- All parameters are sent in the URL (not secure for sensitive data)

## Usage Examples

### Basic Usage

```typescript
import { fetchPlacesWithWebsiteParams, parseGoogleAutocompleteData } from '@/lib/googlePlaces'

// Fetch places using website parameters
const results = await fetchPlacesWithWebsiteParams('hunt')

// Parse the response data
const options = parseGoogleAutocompleteData(responseData)
```

### Advanced Usage

```typescript
import { useXdcGooglePlaces } from '@/lib/googlePlaces'

// Create a places service
const places = useXdcGooglePlaces(_xdc_._dz6919)

// Search for places
const results = await places.search('hunt')
```

This implementation allows you to replicate the exact behavior of the website you're cloning while maintaining compatibility with your existing codebase.

