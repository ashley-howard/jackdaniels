const appKey = "6a42348f3f2db5f744296408f0807ef2";
const weatherUnit = "&units=metric"; // or "imperial" for fahrenheit - if doesn't update, it's because localstorage needs clearing
let weatherLocation = document.getElementById("weather-location").innerHTML; // getting location from HTML
let weatherIcon = document.getElementById("weather-icon");
let temperature = document.getElementById("weather-temp");
let weatherUpdate = document.getElementById("update-weather")

let api = "https://api.openweathermap.org/data/2.5/weather?q=" + weatherLocation + "&appid=" + appKey + weatherUnit;

// https://openweathermap.org/weather-conditions
// clear <i class="fas fa-sun"></i>
// clouds <i class="fas fa-cloud"></i>
// rain <i class="fas fa-cloud-rain"></i>
// thunder <i class="fas fa-bolt"></i>
// snow <i class="fas fa-snowflake"></i>
// mist <i class="fas fa-smog"></i>

var userTime = new Date().getTime();
let getUserTime = localStorage.getItem('userTime');

// if userTime is not set, set it now and load weather details OR if userTime is more than 1 hour (3600000 ms) do this
if (!getUserTime || userTime > (Number(getUserTime) + 3600000)) {
    userTime = new Date().getTime();
    localStorage.setItem('userTime', userTime); // set time
    findWeatherDetails();
    setTimeout(function () {
        localStorage.setItem('weatherIcon', weatherIcon.className); // set icon
        localStorage.setItem('weatherTemp', temperature.innerText); // set temperature
    }, 3000); // do this after 3 seconds
}

// don't reload weather, only retrieve icon and temp
else {
    weatherIcon.className = localStorage.getItem('weatherIcon'); // retrieve icon 
    temperature.innerText = localStorage.getItem('weatherTemp'); // retrieve temp

    // time remaining until next update
    console.log(Math.trunc((3600000 - (userTime - Number(getUserTime))) / 60000) + " minute(s) until next weather update.")
}

function findWeatherDetails() {
    httpRequestAsync(api, theResponse);
}

function theResponse(response) {
    let jsonObject = JSON.parse(response);
    temperature.innerHTML = parseInt(jsonObject.main.temp) + "°";

    if (200 <= jsonObject.weather[0].id && jsonObject.weather[0].id <= 232) {
        weatherIcon.className = "fas fa-bolt";
    }
    else if (300 <= jsonObject.weather[0].id && jsonObject.weather[0].id <= 531) {
        weatherIcon.className = "fas fa-cloud-rain";
    }
    else if (600 <= jsonObject.weather[0].id && jsonObject.weather[0].id <= 622) {
        weatherIcon.className = "fas fa-snowflake";
    }
    else if (701 <= jsonObject.weather[0].id && jsonObject.weather[0].id <= 781) {
        weatherIcon.className = "fas fa-smog";
    }
    else if (jsonObject.weather[0].id && jsonObject.weather[0].id === 800) {
        weatherIcon.className = "fas fa-sun";
    }
    else if (801 <= jsonObject.weather[0].id && jsonObject.weather[0].id <= 804) {
        weatherIcon.className = "fas fa-cloud";
    }
    else {
        console.log("Icon error");
    }
}

function httpRequestAsync(url, callback) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState == 4 && httpRequest.status == 200)
            callback(httpRequest.responseText);
    }
    httpRequest.open("GET", url, true); // true for asynchronous 
    httpRequest.send();
}