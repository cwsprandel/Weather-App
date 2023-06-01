const img = document.querySelector('img');

async function getWeather(location, units) {
    //check if a location was passed in
    //if no location, default to auto:ip which uses the current location of ip address
    if (location) {
        locationString = location;     
    } else {
        locationString = 'auto:ip';
    }
    //create fetch string for api call
    let fetchString = `https://api.weatherapi.com/v1/forecast.json?key=dfaaf2e6c86e418fa46122345231105&q=${locationString}&days=3&aqi=yes&alerts=yes`;
    const response = await fetch(fetchString, {mode: 'cors'});

    //THIS IS THE WEATHER DATA OBJECT 
    const weatherData = await response.json();

    //clear the weather container before adding more stuff
    if (weatherData) {
        weatherContainer.innerHTML = "";
    }
    console.log(weatherData);

    for (let index = 0; index < weatherData.forecast.forecastday.length; index++) {
        let element = weatherData.forecast.forecastday[index];
        
        if (units === 'f') {
            highTemp = element.day.maxtemp_f;
            lowTemp = element.day.mintemp_f;
            tempSymbol = "F"
        } else if(units === 'c') {
            highTemp = element.day.maxtemp_c;
            lowTemp = element.day.mintemp_c;
            tempSymbol = "C"
        } else {
            highTemp = element.day.maxtemp_f;
            lowTemp = element.day.mintemp_f;
            tempSymbol = "F"
        }

        createWeatherCard(element, lowTemp, highTemp, tempSymbol);
    }
};

getWeather(77396, 'f')

//global variables for the location input and temperature selector 
const weatherLocationElement = document.getElementById("weatherLocation");
const temperatureSelector = document.getElementById("temperatureSelector");
//weather Container for all of the weather cards
const weatherContainer = document.getElementById("weatherContainer");

//code to run when the refresh button is clicked. 
//MAY GET RID OF THIS!?!?!?!?!?!?!?!?!?!?!?!?!?!?!?!?!?!?!?!?!?!?!?!?!?!?!?!?!?!?!
const refreshButton = document.getElementById("refreshData");
refreshButton.addEventListener("click", () => {
    getInputs();
})

function getInputs() {
    let weatherLocation = weatherLocationElement.value;
    let weatherUnits = temperatureSelector.value;

    getWeather(weatherLocation, weatherUnits);
}

function createWeatherCard(weatherObject, lowTempVal, highTempVal, tempSymbol) {
    const weatherDataItem = document.createElement("div");
    weatherDataItem.setAttribute("class", "weatherDataItem");

    const weatherDate = document.createElement("h2");
    weatherDate.setAttribute("class", "weatherDate");
    weatherDate.textContent = weatherObject.date;

    const weatherIcon = document.createElement("img");
    weatherIcon.setAttribute("class", "weatherIcon");
    weatherIcon.src = weatherObject.day.condition.icon;

    const lowTempLabel = document.createElement("h2");
    lowTempLabel.setAttribute("class", "lowTempLabel");
    lowTempLabel.textContent = "Low";

    const highTempLabel = document.createElement("h2");
    highTempLabel.setAttribute("class", "highTempLabel");
    highTempLabel.textContent = "High";

    const lowTemp = document.createElement("h2");
    lowTemp.setAttribute("class", "lowTemp");
    lowTemp.textContent = lowTempVal + "\u00B0" + tempSymbol;

    const highTemp = document.createElement("h2");
    highTemp.setAttribute("class", "highTemp");
    highTemp.textContent = highTempVal + "\u00B0" + tempSymbol;

    const humidity = document.createElement("p");
    humidity.setAttribute("class", "humidity");
    humidity.textContent = "Humidity: " + weatherObject.day.avghumidity + "%";

    const rain = document.createElement("p");
    rain.setAttribute("class", "rain");
    rain.textContent = "Rain: " + weatherObject.day.daily_chance_of_rain + "%";

    weatherDataItem.appendChild(weatherDate);
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
