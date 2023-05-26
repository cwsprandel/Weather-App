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

getWeather('f', 3, 77396)

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
}

function createWeatherCard() {
    const weatherDataItem = document.createElement("div");
    weatherDataItem.setAttribute("class", "weatherDataItem");

    const weatherIcon = document.createElement("img");
    weatherIcon.setAttribute("class", "weatherIcon");

    const lowTempLabel = document.createElement("h2");
    lowTempLabel.setAttribute("class", "lowTempLabel");

    const highTempLabel = document.createElement("h2");
    highTempLabel.setAttribute("class", "highTempLabel");

    const lowTemp = document.createElement("h1");
    lowTemp.setAttribute("class", "lowTemp");

    const highTemp = document.createElement("h1");
    highTemp.setAttribute("class", "highTemp");

    const humidity = document.createElement("p");
    humidity.setAttribute("class", "humidity");

    const rain = document.createElement("p");
    rain.setAttribute("class", "rain");
}

// the code below can print out from an async function. may not need this??
// (async () => {
//     console.log((await getWeather()).weatherData.current.temp_f)
// })()
