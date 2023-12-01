export default async function getWeather(){

    let w = await fetch("https://api.weather.gov/gridpoints/PBZ/82,67/forecast").then((r) => r.json())
    // console.log(w.properties.periods[0].detailedForecast)
    return w.properties.periods[0].shortForecast
}

// https://api.weather.gov/points/%7B40.45287803953374%7D,%7B-79.85972402988722%7D

// 40.45291769745013, -79.85973445329346

// https://api.weather.gov/points/40.45291769745013,-79.85973445329346

// https://api.weather.gov/gridpoints/PBZ/82,67/forecast
// https://www.weather.gov/documentation/services-web-api