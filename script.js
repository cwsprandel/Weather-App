const img = document.querySelector('img');

async function getWeather(units, days, location, type) {
    if (location) {
        locationString = location;     
    } else {
        locationString = 'auto:ip';
    }
    let forecastInt = days;
    let fetchString = `http://api.weatherapi.com/v1/forecast.json?key=dfaaf2e6c86e418fa46122345231105&q=${locationString}&days=${forecastInt}&aqi=yes&alerts=yes`;
    const response = await fetch(fetchString, {mode: 'cors'});
    const weatherData = await response.json();
    const currentWeather = weatherData.current;
    console.log(weatherData);
    console.log(units);
    //console.log(fetchString);

    if (units === 'f') {
        currentTemp = currentWeather.temp_f;
    } else if(units === 'c') {
        currentTemp = currentWeather.temp_c;
    } else {
        currentTemp = currentWeather.temp_f;
    }
    
    img.src = currentWeather.condition.icon;
};


const weatherTypeElement = document.getElementById("weatherType");
const weatherDaysElement = document.getElementById("weatherDays");
const weatherLocationElement = document.getElementById("weatherLocation");
const temperatureSelector = document.getElementById("temperatureSelector");

const refreshButton = document.getElementById("refreshData");
refreshButton.addEventListener("click", () => {
    getInputs();
})

function getInputs() {
    let weatherType = weatherTypeElement.value;
    let weatherDays = weatherDaysElement.value;
    let weatherLocation = weatherLocationElement.value;
    console.log("type: " + weatherType + " - days: " + weatherDays + " - location: " + weatherLocation);
}



// the code below can print out from an async function. may not need this??
// (async () => {
//     console.log((await getWeather()).weatherData.current.temp_f)
// })()
