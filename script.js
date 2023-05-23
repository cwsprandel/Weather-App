async function getWeather() {
    const response = await fetch('http://api.weatherapi.com/v1/forecast.json?key=dfaaf2e6c86e418fa46122345231105&q=Houston&days=5&aqi=yes&alerts=yes', {mode: 'cors'});
    const weatherData = await response.json();
    console.log(weatherData.forecast);
}
getWeather();
// fetch('http://api.weatherapi.com/v1/forecast.json?key=dfaaf2e6c86e418fa46122345231105&q=Houston&days=5&aqi=yes&alerts=yes', {mode: 'cors'})
//     .then(function(response) {
//         console.log(response.json());
//         //return response.json();
//     });