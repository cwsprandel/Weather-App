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
    
    let weatherObject = {icon: currentWeather.condition.icon, lowTemperature: weatherData.forecast.forecastday[0].day.mintemp_f, highTemperature: weatherData.forecast.forecastday[0].day.maxtemp_f, humidity: currentWeather.humidity, chanceOfRain: weatherData.forecast.forecastday[0].day.daily_chance_of_rain}
    createWeatherCard(weatherObject);

    img.src = currentWeather.condition.icon;
};

getWeather('f', 3, 77396)

const weatherTypeElement = document.getElementById("weatherType");
const weatherDaysElement = document.getElementById("weatherDays");
const weatherLocationElement = document.getElementById("weatherLocation");
const temperatureSelector = document.getElementById("temperatureSelector");

const refreshButton = document.getElementById("refreshData");
refreshButton.addEventListener("click", () => {
    //getInputs();
    createWeatherCard();
})

function getInputs() {
    let weatherType = weatherTypeElement.value;
    let weatherDays = weatherDaysElement.value;
    let weatherLocation = weatherLocationElement.value;
}

function createWeatherCard(weatherObject) {
    const weatherContainer = document.getElementById("weatherContainer");

    const weatherDataItem = document.createElement("div");
    weatherDataItem.setAttribute("class", "weatherDataItem");

    const weatherIcon = document.createElement("img");
    weatherIcon.setAttribute("class", "weatherIcon");
    weatherIcon.src = weatherObject.icon;

    const lowTempLabel = document.createElement("h2");
    lowTempLabel.setAttribute("class", "lowTempLabel");
    lowTempLabel.textContent = "Low";

    const highTempLabel = document.createElement("h2");
    highTempLabel.setAttribute("class", "highTempLabel");
    highTempLabel.textContent = "High";

    const lowTemp = document.createElement("h2");
    lowTemp.setAttribute("class", "lowTemp");
    lowTemp.textContent = weatherObject.lowTemperature;

    const highTemp = document.createElement("h2");
    highTemp.setAttribute("class", "highTemp");
    highTemp.textContent = weatherObject.highTemperature;

    const humidity = document.createElement("p");
    humidity.setAttribute("class", "humidity");
    humidity.textContent = "Humidity: " + weatherObject.humidity + "%";

    const rain = document.createElement("p");
    rain.setAttribute("class", "rain");
    rain.textContent = "Rain: " + weatherObject.chanceOfRain + "%";

    weatherDataItem.appendChild(weatherIcon);
    weatherDataItem.appendChild(lowTempLabel);
    weatherDataItem.appendChild(highTempLabel);
    weatherDataItem.appendChild(lowTemp);
    weatherDataItem.appendChild(highTemp);
    weatherDataItem.appendChild(humidity);
    weatherDataItem.appendChild(rain);
    weatherContainer.appendChild(weatherDataItem);
}

// the code below can print out from an async function. may not need this??
// (async () => {
//     console.log((await getWeather()).weatherData.current.temp_f)
// })()
