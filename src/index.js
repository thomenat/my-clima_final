function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let countryElement = document.querySelector("#country");
  let weatherDescriptionElement = document.querySelector("#weather-description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#weather-icon");
  let weatherDescriptionElementResponseData = response.data.condition.description;

  cityElement.innerHTML = response.data.city;
  countryElement.innerHTML = response.data.country;
  temperatureElement.innerHTML = Math.round(temperature);
  weatherDescriptionElement.innerHTML = weatherDescriptionElementResponseData[0].toUpperCase() + weatherDescriptionElementResponseData.slice(1);
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed} km/h`;
  timeElement.innerHTML = formatDate(date);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
  
    getForecast(response.data.city);

}

function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
    
    if (minutes < 10) {
        minutes = `0${minutes}`;
        }
return `${day}, ${hours}:${minutes}`;

    }


function searchCity(city) {
    let apiKey = "deabbt600bd7ofd44dbd308802faa2f2";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(refreshWeather);
    
}

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
    return days[date.getDay()];    

}

function getForecast(city) {
    let apiKey = "deabbt600bd7ofd44dbd308802faa2f2";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
    
}


function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
   
    searchCity(searchInput.value);
}


function displayForecast(response) {
    
    console.log(response.data);
    
    let forecastHtml = "";

    response.data.daily.forEach(function (day, index) {
        if (index < 5) {
    forecastHtml = 
    forecastHtml +
    `
    <div class="weather-forecast-day">
    <div class="weather-forecast-date">${formatDay(day.time)}</div>
    <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
    <div class="weather-forecast-temperatures">
    <span class="weather-forecast-temperature-max">
    <strong>${Math.round(day.temperature.maximum)}º</strong>
    </span>
    <span class="weather-forecast-temperature-min">${Math.round(day.temperature.minimum)}º</span>
    </div>
    </div>`;
}});
let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHtml;

}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Goiânia");
getForecast();


