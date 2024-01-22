const API_key = "7b11b94c0ce3383e9a3fbe2fac8c135c";
const searchInput = document.querySelector("#search-input");
const history = document.getElementById("history");
const today = document.getElementById("today");
const forecast = document.getElementById("forecast");
const searchForm = document.getElementById("search-form");

let searchHistory = JSON.parse(localStorage.getItem("search")) || [];

function startPage() {

    function getWeather(cityName) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_key}`;

        // Make API request
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                // Process and display current weather
                displayCurrentWeather(data);

                // Fetch and display 5-day forecast
                return fetch(
                    `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${API_key}`
                );
            })
            .then((response) => response.json())
            .then((data) => {
                // Process and display 5-day forecast
                displayFiveDayForecast(data);
            })
            .catch((error) => {
                console.error("Error fetching weather data:", error);
            });
    }
    function displayCurrentWeather(data) {
        today.innerHTML = ""; // Clear previous content
        today.classList.remove("hidden");
        const cityName = data.name;
        const date = new Date(data.dt * 1000);
        const temperature = data.main.temp;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;
        const weatherIcon = data.weather[0].icon;

        // Create and append HTML elements
        const currentWeatherHTML = `
            <h2>${cityName} (${dayjs(date).format("MM/DD/YYYY")})</h2>
            <img src="https://openweathermap.org/img/wn/${weatherIcon}.png" alt="${data.weather[0].description
            }">
            <p>Temperature: ${temperature} &#176;C</p>
            <p>Humidity: ${humidity}%</p>
            <p>Wind Speed: ${windSpeed} m/s</p>
          `;

        today.innerHTML = currentWeatherHTML;
    }
    function displayFiveDayForecast(data) {
        forecast.innerHTML = ""; // Clear previous content
        forecast.classList.remove("hidden");
        const forecastList = data.list;
        for (let i = 4; i < forecastList.length; i += 8) {
            const forecastData = forecastList[i];
            const date = new Date(forecastData.dt * 1000);
            const temperature = forecastData.main.temp;
            const humidity = forecastData.main.humidity;
            const weatherIcon = forecastData.weather[0].icon;

            // Create and append HTML elements for each forecast day
            const forecastHTML = `
              <div class="col-md-2 new">
                <p>Date: ${dayjs(date).format("MM/DD/YYYY")}</p>
                <img src="https://openweathermap.org/img/wn/${weatherIcon}.png" alt="${forecastData.weather[0].description
                }">
                <p>Temperature: ${temperature} &#176;C</p>
                <p>Humidity: ${humidity}%</p>
              </div>
            `;

            forecast.innerHTML += forecastHTML;
        }
    }
    today.classList.add("hidden");
    forecast.classList.add("hidden");
  searchForm.reset();


    searchForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const cityName = searchInput.value.trim();
        if (cityName) {
            getWeather(cityName);
            let duplicate = searchHistory.every(function (name) {
                return name !== cityName;
            });
            if (duplicate) {
                searchHistory.push(cityName);
            }
            localStorage.setItem("search", JSON.stringify(searchHistory));
            renderSearchHistory();
        }
    });
    history.addEventListener("click", function (event) {
        if (event.target.classList.contains("history")) {
            const cityName = event.target.textContent;
            getWeather(cityName);
        }
    });
    history.addEventListener("click", function (event) {
        if (event.target.innerText === "clear") {
            searchHistory = [];
            today.innerText = "";
            forecast.innerText = "";
            today.classList.add("hidden");
            forecast.classList.add("hidden");
            searchForm.reset();
            localStorage.setItem("search", JSON.stringify(searchHistory));
            renderSearchHistory();
        }
    });
    function renderSearchHistory() {
        history.innerHTML = ""; // Clear previous content
    
        for (let i = 0; i < searchHistory.length; i++) {
          const historyItem = document.createElement("button");
          historyItem.classList.add(
            "list-group-item",
            "list-group-item-action",
            "history"
          );
          historyItem.innerText = searchHistory[i];
          history.appendChild(historyItem);
        }
        const clearitems = document.createElement("button");
        clearitems.innerText = "clear";
        clearitems.classList.add("btn", "btn-info");
        history.appendChild(clearitems);
      }
    
      // Initial rendering of search history
      renderSearchHistory();


}
startPage();
