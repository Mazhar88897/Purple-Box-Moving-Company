const usStateCities = {
  "Alabama": ["Montgomery", "Birmingham", "Huntsville", "Mobile"],
  "Alaska": ["Juneau", "Anchorage", "Fairbanks"],
  "Arizona": ["Phoenix", "Tucson", "Mesa", "Flagstaff"],
  "Arkansas": ["Little Rock", "Fayetteville", "Fort Smith"],
  "California": ["Sacramento", "Los Angeles", "San Diego", "San Francisco", "San Jose"],
  "Colorado": ["Denver", "Colorado Springs", "Aurora", "Boulder"],
  "Connecticut": ["Hartford", "Bridgeport", "Stamford", "New Haven"],
  "Delaware": ["Dover", "Wilmington", "Newark"],
  "Florida": ["Tallahassee", "Jacksonville", "Miami", "Tampa", "Orlando"],
  "Georgia": ["Atlanta", "Augusta", "Columbus", "Savannah"],
  "Hawaii": ["Honolulu", "Pearl City", "Hilo"],
  "Idaho": ["Boise", "Meridian", "Nampa", "Idaho Falls"],
  "Illinois": ["Springfield", "Chicago", "Aurora", "Joliet"],
  "Indiana": ["Indianapolis", "Fort Wayne", "Evansville", "South Bend"],
  "Iowa": ["Des Moines", "Cedar Rapids", "Davenport", "Sioux City"],
  "Kansas": ["Topeka", "Wichita", "Overland Park", "Kansas City"],
  "Kentucky": ["Frankfort", "Louisville", "Lexington", "Bowling Green"],
  "Louisiana": ["Baton Rouge", "New Orleans", "Shreveport", "Lafayette"],
  "Maine": ["Augusta", "Portland", "Lewiston", "Bangor"],
  "Maryland": ["Annapolis", "Baltimore", "Frederick", "Rockville"],
  "Massachusetts": ["Boston", "Worcester", "Springfield", "Cambridge"],
  "Michigan": ["Lansing", "Detroit", "Grand Rapids", "Warren"],
  "Minnesota": ["Saint Paul", "Minneapolis", "Rochester", "Duluth"],
  "Mississippi": ["Jackson", "Gulfport", "Southaven", "Hattiesburg"],
  "Missouri": ["Jefferson City", "Kansas City", "St. Louis", "Springfield"],
  "Montana": ["Helena", "Billings", "Missoula", "Great Falls"],
  "Nebraska": ["Lincoln", "Omaha", "Bellevue"],
  "Nevada": ["Carson City", "Las Vegas", "Henderson", "Reno"],
  "New Hampshire": ["Concord", "Manchester", "Nashua"],
  "New Jersey": ["Trenton", "Newark", "Jersey City", "Paterson"],
  "New Mexico": ["Santa Fe", "Albuquerque", "Las Cruces", "Rio Rancho"],
  "New York": ["Albany", "New York City", "Buffalo", "Rochester"],
  "North Carolina": ["Raleigh", "Charlotte", "Greensboro", "Durham"],
  "North Dakota": ["Bismarck", "Fargo", "Grand Forks"],
  "Ohio": ["Columbus", "Cleveland", "Cincinnati", "Toledo"],
  "Oklahoma": ["Oklahoma City", "Tulsa", "Norman"],
  "Oregon": ["Salem", "Portland", "Eugene", "Gresham"],
  "Pennsylvania": ["Harrisburg", "Philadelphia", "Pittsburgh", "Allentown"],
  "Rhode Island": ["Providence", "Warwick", "Cranston"],
  "South Carolina": ["Columbia", "Charleston", "North Charleston"],
  "South Dakota": ["Pierre", "Sioux Falls", "Rapid City"],
  "Tennessee": ["Nashville", "Memphis", "Knoxville", "Chattanooga"],
  "Texas": ["Austin", "Houston", "Dallas", "San Antonio", "Fort Worth"],
  "Utah": ["Salt Lake City", "West Valley City", "Provo"],
  "Vermont": ["Montpelier", "Burlington", "Rutland"],
  "Virginia": ["Richmond", "Virginia Beach", "Norfolk", "Chesapeake"],
  "Washington": ["Olympia", "Seattle", "Spokane", "Tacoma"],
  "West Virginia": ["Charleston", "Huntington", "Morgantown"],
  "Wisconsin": ["Madison", "Milwaukee", "Green Bay"],
  "Wyoming": ["Cheyenne", "Casper", "Laramie"]
};

// State abbreviations mapping
const stateAbbreviations: { [key: string]: string } = {
  "Alabama": "AL",
  "Alaska": "AK",
  "Arizona": "AZ",
  "Arkansas": "AR",
  "California": "CA",
  "Colorado": "CO",
  "Connecticut": "CT",
  "Delaware": "DE",
  "Florida": "FL",
  "Georgia": "GA",
  "Hawaii": "HI",
  "Idaho": "ID",
  "Illinois": "IL",
  "Indiana": "IN",
  "Iowa": "IA",
  "Kansas": "KS",
  "Kentucky": "KY",
  "Louisiana": "LA",
  "Maine": "ME",
  "Maryland": "MD",
  "Massachusetts": "MA",
  "Michigan": "MI",
  "Minnesota": "MN",
  "Mississippi": "MS",
  "Missouri": "MO",
  "Montana": "MT",
  "Nebraska": "NE",
  "Nevada": "NV",
  "New Hampshire": "NH",
  "New Jersey": "NJ",
  "New Mexico": "NM",
  "New York": "NY",
  "North Carolina": "NC",
  "North Dakota": "ND",
  "Ohio": "OH",
  "Oklahoma": "OK",
  "Oregon": "OR",
  "Pennsylvania": "PA",
  "Rhode Island": "RI",
  "South Carolina": "SC",
  "South Dakota": "SD",
  "Tennessee": "TN",
  "Texas": "TX",
  "Utah": "UT",
  "Vermont": "VT",
  "Virginia": "VA",
  "Washington": "WA",
  "West Virginia": "WV",
  "Wisconsin": "WI",
  "Wyoming": "WY"
};

export interface CityOption {
  city: string
  state: string
  fullAddress: string
}

// Convert the state cities data into an array of CityOption objects
export const getAllCityOptions = (): CityOption[] => {
  const options: CityOption[] = []
  
  Object.entries(usStateCities).forEach(([state, cities]) => {
    const stateAbbr = stateAbbreviations[state] || state
    cities.forEach(city => {
      options.push({
        city,
        state: stateAbbr,
        fullAddress: `${city}, ${stateAbbr}, USA`
      })
    })
  })
  
  return options
}

export { usStateCities, stateAbbreviations }
