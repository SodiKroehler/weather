
export async function getDetailsByLatLong(lat, long){
    
    const queryString = "https://api.weather.gov/points/" + lat + "," + long
    console.log(queryString)

    let w = await fetch(queryString).then((r) => r.json())
    // console.log(w.properties.periods[0].detailedForecast)
    return {"office": w.properties.cwa, "points": w.properties.gridX + "," + w.properties.gridY}
}

export default async function getWeather(office, points){
    
    const queryString = "https://api.weather.gov/gridpoints/" + office + "/" + points + "/forecast"

    let w = await fetch(queryString).then((r) => r.json())
    // console.log(w.properties.periods[0].detailedForecast)
    return w.properties.periods[0].shortForecast
}

// https://api.weather.gov/points/%7B40.45287803953374%7D,%7B-79.85972402988722%7D

// 40.45291769745013, -79.85973445329346

// https://api.weather.gov/points/40.45291769745013,-79.85973445329346

// https://api.weather.gov/gridpoints/PBZ/82,67/forecast
// https://www.weather.gov/documentation/services-web-api