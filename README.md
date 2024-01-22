# Server-Side APIs: Weather Dashboard

## Overview

This Weather Dashboard is a web application that allows users to check the weather outlook for multiple cities. It provides current and future weather conditions, helping travelers plan their trips accordingly. The application utilizes the OpenWeatherMap 5 Day Weather Forecast API to retrieve weather data for cities.

## User Story

```text
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

## Acceptance Criteria

* Create a weather dashboard with form inputs.
  * When a user searches for a city they are presented with current and future conditions for that city and that city is added to the search history
  * When a user views the current weather conditions for that city they are presented with:
    * The city name
    * The date
    * An icon representation of weather conditions
    * The temperature
    * The humidity
    * The wind speed
  * When a user view future weather conditions for that city they are presented with a 5-day forecast that displays:
    * The date
    * An icon representation of weather conditions
    * The temperature
    * The humidity
  * When a user click on a city in the search history they are again presented with current and future conditions for that city

## Scrrenshot
<video src="./FinalOutput/8.mp4" controls title="Title"></video>

## Live Application URL
https://venkatamora.github.io/Bootcampuk2023-Portfolio-8-ServerAPIs-WeatherDashboard/
## Features
  1. Users can enter a city name to retrieve weather information.
  2. Clicking on "Search City" will display the weather data for that city in the
  right panel. If no match is found, an error message will be displayed.
  3. Displays a 5-day forecast for the searched city.
Date, weather icon, temperature, and humidity are shown.
4. Keeps a record of searched cities.
Clicking on a city in the history displays its weather conditions.

## Technologies Used

1. Html
2. CSS
3. JavaScript


## Deployment
To clone the Repositry, use the following command:
```
https://github.com/VenkataMora/Bootcampuk2023-Portfolio-8-ServerAPIs-WeatherDashboard
```