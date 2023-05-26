const img = document.querySelector('img');


async function getForecast(units, days, location) {
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

    if (units === 'f') {
        currentTemp = currentWeather.temp_f;
    } else if(units === 'c') {
        currentTemp = currentWeather.temp_c;
    } else {
        console.log('please enter a correct unit');
    }
    
    img.src = currentWeather.condition.icon;
    console.log(currentTemp);
};

// the code below can print out from an async function. may not need this??
// (async () => {
//     console.log((await getWeather()).weatherData.current.temp_f)
// })()

getForecast('f', 3, 'Houston');