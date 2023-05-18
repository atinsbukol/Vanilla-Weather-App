
function formatDate(timestamp) {
    let date = new Date(timestamp)
    let hours = date.getHours()
    if (hours < 10) {
        hours = `0${hours}`
    }
    let minutes = date.getMinutes()
    if (minutes <10) {
        minutes = `0${minutes}`

    }
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let day = date.getDay()
    let dayWeek = days[day]

    return `${dayWeek} ${hours}: ${minutes}`

}


function formatDay(timestamp) {
  let date = new Date(timestamp*1000)
  let day = date.getDay()
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"]


  return days[day]

}


function displayForecast(response) {
  //console.log(response.data.daily)

  let forecast = response.data.daily
    let forecastElement = document.querySelector("#forecast")

    let forecastHTML = `<div class="row">`;

  
    forecast.forEach(function(forecastDay, index) {
      if (index < 6) {

      forecastHTML =

    forecastHTML + `
              <div class="col-2">
                <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
                <img
                  src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
                  alt=""
                  width="35"
                />
                <div class="weather-forecast-temperatures">
                  <span class="weather-forecast-temperature-max">${Math.round(forecastDay.temp.max)}°</span>
                  <span class="weather-forecast-temperature-min">${Math.round(forecastDay.temp.min)}°</span>
                </div>
              </div>`;
      }

    })

forecastHTML = forecastHTML + `</div>`
forecastElement.innerHTML = forecastHTML
}

function getforecast(coordinate) {

  let apiKey = "6ce66d083b4d6dddb74ba02266495c46"
  

  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinate.lat}&lon=${coordinate.lon}&appid=${apiKey}&units=metric`
  axios.get(apiUrl).then(displayForecast)

}

function displayTemperature(response) {

    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");

    celciusTemperature =response.data.main.temp
    
    temperatureElement.innerHTML = Math.round(celciusTemperature)

    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.dt *1000);
    iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);


    getforecast(response.data.coord)
}

function search(city) {
let apiKey = "6ce66d083b4d6dddb74ba02266495c46"


let apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature)
}

function handlesubmit(event) {
    event.preventDefault()
    let cityInputElement = document.querySelector("#city-input")
    search(cityInputElement.value)
    console.log(cityInputElement.value)
}

function displayFahrenheitTemperature(event) {
    event.preventDefault()
    let temperatureElement = document.querySelector("#temperature")
    // add the actice class from celcius link
    celciusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    

    let FahrenheitTemperature = (celciusTemperature * 9/5) + 32
    
    temperatureElement.innerHTML = Math.round(FahrenheitTemperature)

}

function displayCelsiusTemperature(event) {
    event.preventDefault()
    let temperatureElement = document.querySelector("#temperature")
    temperatureElement.innerHTML = Math.round(celciusTemperature)
    celciusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");

}

let celciusTemperature = null


search("Abeokuta")

let form = document.querySelector("#search-form");
form.addEventListener("submit", handlesubmit)


let  fahrenheitLink = document.querySelector("#fahrenheit-link")
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature)

let  celciusLink = document.querySelector("#celsius-link")
celciusLink.addEventListener("click", displayCelsiusTemperature)