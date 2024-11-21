function displayTime() {
  let dayHour = document.querySelector("span.day-and-hour");
  let now = new Date();
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let hour = now.getHours();
  let minutes = now.getMinutes();

  if (hour < 10) {
    hour = `0${hour}`;
  } else {
    hour = hour;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  } else {
    minutes = minutes;
  }

  dayHour.innerHTML = `${weekDays[now.getDay()]} ${hour}:${minutes}`;
}

function updateCity(event) {
  event.preventDefault();

  let searchField = document.querySelector(".search-field").value.trim();
  let formattedCity =
    searchField.charAt(0).toUpperCase() + searchField.slice(1).toLowerCase();

  let cityText = document.querySelector(".current-city");
  cityText.innerHTML = formattedCity;

  const apiKey = "c49ed490tce5aa3a51c741aaobee84ef";
  const tempUnit = "metric";
  let weatherApiUrl = `https://api.shecodes.io/weather/v1/current?query=${formattedCity}&key=${apiKey}&unit=${tempUnit}`;

  axios
    .get(weatherApiUrl)
    .then((response) => updateTemperature(response))
    .catch((error) => {
      console.error("Error fetching the weather data:", error);
      alert(
        `Could not retrieve weather data for '${searchField}'. Please try again.`
      );
    });
}

function updateTemperature(response) {
  let currentTemp = Math.round(response.data.temperature.current);
  let temperature = document.querySelector(".current-temp-value");
  temperature.innerHTML = currentTemp;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", updateCity);

displayTime();
