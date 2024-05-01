import dotenv from "dotenv";

dotenv.config();


const baseUrl = "https://api.mapbox.com/search/geocode/v6/reverse?";
export const getNearbyLocations =  async (lat: string, lon: string) => {
    const nearbyLocations = await fetch(`${baseUrl}longitude=${lon}&latitude=${lat}&language=es&access_token=${process.env.TOKEN_MAPBOX}`)
    return nearbyLocations.json();
}