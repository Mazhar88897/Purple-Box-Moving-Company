# Google Autocomplete Data Format Integration

This guide shows how to integrate with the specific Google autocomplete data format you're seeing from the website you're cloning.

## Data Format

The website you're cloning returns data in this format:

```javascript
_xdc_._dz6919 && _xdc_._dz6919([0, [["Huntsville, AL, USA", null, ["geocode", "locality", "political"], "ChIJjYmizWdrYogRa1YEyIl-LJo", null, [["Huntsville", 0], ["AL", 12], ["USA", 16]], [[0, 2]], null, "ChIJjYmizWdrYogRa1YEyIl-LJo", ["Huntsville", "AL, USA", [[0, 2]]]], ...]])
```

## Structure

Each place entry follows this pattern:
- `[0]`: Full address string
- `[1]`: null
- `[2]`: Array of types (e.g., ["geocode", "locality", "political"])
- `[3]`: Place ID
- `[4]`: null
- `[5]`: Address parts array: `[["City", 0], ["State", 12], ["Country", 16]]`
- `[6]`: Highlight ranges
- `[7]`: null
- `[8]`: Place ID (duplicate)
- `[9]`: Formatted address parts

## Usage Examples

### 1. Direct Data Parsing

```typescript
import { parseGoogleAutocompleteData } from '@/lib/googlePlaces'

const data = [0, [["Huntsville, AL, USA", null, ["geocode", "locality", "political"], "ChIJjYmizWdrYogRa1YEyIl-LJo", null, [["Huntsville", 0], ["AL", 12], ["USA", 16]], [[0, 2]], null, "ChIJjYmizWdrYogRa1YEyIl-LJo", ["Huntsville", "AL, USA", [[0, 2]]]]]

const options = parseGoogleAutocompleteData(data)
// Returns: [{ city: "Huntsville", state: "AL", fullAddress: "Huntsville, AL, USA", placeId: "ChIJjYmizWdrYogRa1YEyIl-LJo", coordinates: undefined }]
```

### 2. Using the _xdc_ Function

```typescript
import { handleXdcResponse } from '@/lib/googlePlaces'

// Assuming _xdc_._dz6919 is available globally
const options = handleXdcResponse(_xdc_._dz6919, "hunt")
```

### 3. Hook-Style Usage

```typescript
import { useXdcGooglePlaces } from '@/lib/googlePlaces'

const places = useXdcGooglePlaces(_xdc_._dz6919)
const options = await places.search("hunt")
```

### 4. In Your Autocomplete Component

```tsx
import Autocomplete from '@/components/ui/autocomplete'

// Using the target format
<Autocomplete
  placeholder="Search addresses..."
  value={inputValue}
  onChange={setInputValue}
  onSelect={handleSelect}
  useTargetFormat={true}
  externalData={yourGoogleData}
/>

// Or with the _xdc_ function
<Autocomplete
  placeholder="Search addresses..."
  value={inputValue}
  onChange={setInputValue}
  onSelect={handleSelect}
  useTargetFormat={true}
  externalData={_xdc_._dz6919}
/>
```

## Testing

Visit `/test-google-format` to see all examples in action:

1. **Standard Google Places API** - Uses the regular Google Places API
2. **Target Format** - Uses the same format as the website you're cloning
3. **Demo Components** - Interactive examples showing data parsing
4. **Integration Examples** - Shows how to use with _xdc_ functions

## Key Functions

- `parseGoogleAutocompleteData(data)` - Parses the array format to CityOption objects
- `handleGoogleAutocompleteResponse(response)` - Handles function-based responses
- `handleXdcResponse(xdcFunction, input)` - Calls _xdc_ functions with input
- `useXdcGooglePlaces(xdcFunction)` - Hook-style wrapper for _xdc_ functions

## Data Mapping

The parser extracts:
- **City**: From address parts where position = 0
- **State**: From address parts where position = 12  
- **Full Address**: From the first element of each place array
- **Place ID**: From the 4th element (index 3) of each place array
- **Coordinates**: Not available in this format (undefined)

This allows you to seamlessly integrate with the exact data format used by the website you're cloning while maintaining compatibility with your existing autocomplete component.

