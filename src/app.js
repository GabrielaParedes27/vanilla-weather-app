function formatHours(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    return `${hours}:${minutes}`
}

function formatDate(timestamp) {
    let date = new Date(timestamp);
    let dayNumber = date.getDate();
    let year = date.getFullYear();
    let days = [
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ];
    let day = days[date.getDay()];
    let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Agust",
    "September",
    "October",
    "November",
    "December"
];
let month = months[date.getMonth()];

return `${day}, ${month} ${dayNumber} ${year} | ${formatHours(timestamp)}`;
}

function displayTemp(response) {
    document.querySelector("#city").innerHTML = response.data.name + ", " + response.data.sys.country;

    celsiusTemp = response.data.main.temp;

    document.querySelector("#temp-element").innerHTML = Math.round(celsiusTemp) + "°";
    document.querySelector("#description").innerHTML = response.data.weather[0].description;
    document.querySelector("#date").innerHTML = formatDate(response.data.dt*1000);
    document.querySelector("#precipitation").innerHTML = "Precipitation: " + response.data.clouds.all + "%";
    document.querySelector("#humidity").innerHTML = "Humidity: " + response.data.main.humidity + "%";
    document.querySelector("#wind").innerHTML = "Wind: " + Math.round(response.data.wind.speed) + "km/hr";
    document.querySelector("#feels-like").innerHTML = "Feels like: " + Math.round(response.data.main.feels_like) + "°C";
    let newIcon = document.querySelector("#icon");
    newIcon.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    newIcon.setAttribute("alt", response.data.weather[0].description);
}

function displayForecast(response) {
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = null;
    let forecast = null;
    
    for (let index = 0; index < 5; index++){
        forecast = response.data.list[index];
        forecastElement.innerHTML+=`
    <div class="col">
             <div class=card-day id="day-1">
                 <div class="card-body">
                     <h5>
                         ${formatHours(forecast.dt * 1000)}
                     </h5>
                     <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png">
                     <div class="forecast-temp">
                         <strong>${Math.round(forecast.main.temp_max)}°</strong> | 
                         ${Math.round(forecast.main.temp_min)}°
                     </div>
                 </div>
             </div>
         </div>`
    } 
}

function search(city){
let apiKey = "816a63a33af440332c05784e3d9896ea";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemp);

apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#search-bar");
    search(cityInputElement.value);
}

function searchLocation(position) {
    let apiKey = "816a63a33af440332c05784e3d9896ea";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemp);
    
    apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}

function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocation = document.querySelector("#current-button");
currentLocation.addEventListener("click", getCurrentLocation);


function displayFahrenheit(event) {
    event.preventDefault();
    let tempElement = document.querySelector("#temp-element");
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
    tempElement.innerHTML = Math.round(fahrenheitTemp) + "°";
}

function displayCelsius(event) {
    event.preventDefault();
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let tempElement = document.querySelector("#temp-element");
    tempElement.innerHTML = Math.round(celsiusTemp) + "°";
}

let celsiusTemp = null;

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsius);

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("New York");
