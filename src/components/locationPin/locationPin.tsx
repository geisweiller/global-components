import { useEffect, useState } from "react";

export enum LocationType {
  CITY = "city",
  STATE = "state",
  COUNTRY = "country",
  STREET = "street",
  NEIGHBOURHOOD = "neighbourhood"
}

interface LocationPinProps {
  /**
   * User can set a loading message. If not provided, the message will be 'Searching location...'
   */
  loadingMessage?: string
  /**
   * User can set an error message through props. If not provided, the message will be 'Unknown location'
   */
  errorMessage?: string
  /**
   * User can set a default location message to be displayed through props. If not provided, the message will be 'Unknown location'
   */
  defaultLocation?: string;
  /**
   * User can choose one or multiple location type for the component to show, if not chosen the default will be city.
   */
  locationType?: LocationType[];
}

/**
 * This component retrieves the user's location based on their IP and uses an API fetch to display location information.
 * The API can return ambiguos location names for the same location types and this component tries multiplus name in order of best match.
 * * Users can customize the displayed location information by selecting one or several locationTypes when the component is called.
 * For example, to display the user's city and state, call the component passing city and state in an array: <LocationPin locationType={[LocationType.CITY, LocationType.STATE]} />
 */
export const LocationPin =({ defaultLocation = 'Unknown location', errorMessage = 'Unknown location', loadingMessage = 'Searching location...', locationType = [LocationType.CITY] }: LocationPinProps) => {

  const [location, setLocation] = useState<string | null >(null)

  useEffect(() => {
    async function getUserLocation() {
      try {
        //get latitude and longitude
        const position = await new Promise<GeolocationPosition>((resolve, reject)=>{
          navigator.geolocation.getCurrentPosition(resolve, reject)
        })
   
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude

        // fetch location details using latitude and longitude
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
        )

        const data = await response.json()

        // since the locations details can have multiple names for informations that can be interpreted for the same propose, we map it, going from best match to worst.
        const locationFieldsMap = {
          [LocationType.CITY]: ['city', 'town', 'village', 'municipality'],
          [LocationType.STATE]: ['state', 'county', 'state_district'],
          [LocationType.COUNTRY]: ['country'],
          [LocationType.NEIGHBOURHOOD]: ['neighbourhood', 'suburb', 'borough', 'district', 'city_district', 'quarter', 'city_block'],
          [LocationType.STREET]: ['road'],
        }
          
        // match the location types we want with the response from API, or default location if it didn't macth
        const locationResults = []

          for (const type of locationType) {
            const possibleFields = locationFieldsMap[type]
            for (const field of possibleFields) {
             if (data.address[field]) {
              locationResults.push(data.address[field])
             break
          }
        }
      }

      if(locationResults.length === 0) {
        locationResults.push(defaultLocation)
      }

       setLocation(locationResults.join(", "))

          }
           catch (error) {
            console.error(error)
            setLocation(errorMessage)
          }
      }
    getUserLocation()
  }, [defaultLocation, errorMessage, locationType])
  return(
  <div>
    {location === null ? loadingMessage : location}
  </div>
)
};
