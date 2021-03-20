function formatDate(timestamp) {
    let date = new Date(timestamp);
    let dayNumber = date.getDate();
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
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

return `${day}, ${month} ${dayNumber} ${year} | ${hours}:${minutes}`;
}


function displayTemp(response) {
    document.querySelector("#city").innerHTML = response.data.name + ", " + response.data.sys.country;
    document.querySelector("#temp-element").innerHTML = Math.round(response.data.main.temp) + "°";
    document.querySelector("#description").innerHTML = response.data.weather[0].description;
    document.querySelector("#date").innerHTML = formatDate(response.data.dt*1000);
    document.querySelector("#precipitation").innerHTML = "Precipitation: " + response.data.clouds.all + "%";
    document.querySelector("#humidity").innerHTML = "Humidity: " + response.data.main.humidity + "%";
    document.querySelector("#wind").innerHTML = "Wind: " + Math.round(response.data.wind.speed) + "km/hr";
    let newIcon = document.querySelector("#icon");
    newIcon.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    newIcon.setAttribute("alt", response.data.weather[0].description);
}

function search(city){
let apiKey = "816a63a33af440332c05784e3d9896ea";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemp);
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#search-bar");
    search(cityInputElement.value);
}

search("New York");

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);