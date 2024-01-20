import { useEffect, useState } from "react";

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
}

/**
 * This component retrieves the user's location based on their IP and uses an API fetch to display location information.
 * The API can return ambiguos location names for city as either 'city' or 'town', and this component tries both.
 * Users can customize the displayed location information by providing a different path to the desired place in the response.
 * For example, to display the user's state, set it to 'data.address.state' and remove the "else if" statement if there is no ambiguity in the location name.
 */
export const LocationPin =({ defaultLocation = 'Unknown location', errorMessage = 'Unknown location', loadingMessage = 'Searching location...' }: LocationPinProps) => {

  const [location, setLocation] = useState<string | null >(null)

  useEffect(() => {
    async function getUserLocation() {
      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject)=>{
          navigator.geolocation.getCurrentPosition(resolve, reject)
        })
   
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude

        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
        )

        const data = await response.json()
          
            if (data.address.city) {
              setLocation(data.address.city)
            } else if (data.address.town) {
              setLocation(data.address.town)
            } else {
              setLocation(defaultLocation)
            }
          }
           catch (error) {
            console.error(error)
            setLocation(errorMessage)
          }
      }
    getUserLocation()
  }, [defaultLocation, errorMessage])
  return(
  <div>
    {location === null ? loadingMessage : location}
  </div>
)
};
