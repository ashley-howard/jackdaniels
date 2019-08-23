const appKey = "6a42348f3f2db5f744296408f0807ef2";
let weatherLocation = "London"; // or you could take it from the innerHTML on the homepage?
let weatherIcon = document.getElementById("weather-icon");

let api = "https://api.openweathermap.org/data/2.5/weather?q=" + weatherLocation + "&appid=" + appKey;

function findWeatherDetails() {
    api;
    httpRequestAsync(searchLink, theResponse);
}

function theResponse(response) {
    let jsonObject = JSON.parse(response);
    cityName.innerHTML = jsonObject.name;
    icon.src = "http://openweathermap.org/img/w/" + jsonObject.weather[0].icon + ".png";
    temperature.innerHTML = parseInt(jsonObject.main.temp - 273) + "°";
    humidity.innerHTML = jsonObject.main.humidity + "%";
}

function httpRequestAsync(url, callback) {
    console.log("hello");
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState == 4 && httpRequest.status == 200)
            callback(httpRequest.responseText);
    }
    httpRequest.open("GET", url, true); // true for asynchronous 
    httpRequest.send();
}

const homeScreen = document.getElementById("home");
const contactScreen = document.getElementById("contact");
const screenButton = document.getElementById("screenbutton");

function changeScreen(screen) {
    if (screen === "contact") {
        homeScreen.style.display = "none";
        contactScreen.style.display = "block";
        contactScreen.style.WebkitTransition = "all 2s"; // Code for Safari 3.1 to 6.0
        contactScreen.style.transition = "all 2s";     // Standard syntax
    }
}

