const searchBtn = document.querySelector(".searchBtn");
const searchBar = document.querySelector("#cityName");
const citiesList = document.querySelector(".citieslist");
const formEl = document.querySelector("#earch-form");
let cities = [];
const weather = {
  apiKey: "6e488f3637f1e65cabedb26e8fc39da1",

  // Function to fetch API data
  fetchWeather(city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
        city +
        "&cnt=80&appid=" +
        this.apiKey +
        "&units=imperial"
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
      console.log(this);
  },

  // Function to create variables and prints data in weather cards
  displayWeather(data) {
    const { name } = data.city;
    const CurrentDay = moment.unix(data.list[0].dt).utc().format("M/DD/YYYY");
    const { icon } = data.list[0].weather[0];
    const { temp, humidity } = data.list[0].main;
    const { speed } = data.list[0].wind;
    document.querySelector(".city").innerText = name;
    document.querySelector(".date").innerText = CurrentDay;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".temp").innerText =
      "Temp: " + Math.floor(temp) + "°F";
    document.querySelector(".humidity").innerText =
      "Humidity " + humidity + "%";
    document.querySelector(".speed").innerText = "Wind: " + speed + "MPH";
    let j = 1;
    for (let i = 1; i < data.list.length; i++) {
      const hour = moment.unix(data.list[i].dt).utc().format("HH");
      if (hour == 12) {
        const followingDays = moment
          .unix(data.list[i].dt)
          .utc()
          .format("M/DD/YYYY");
        const { icon } = data.list[i].weather[0];
        const { temp, humidity } = data.list[i].main;
        const { speed } = data.list[i].wind;
        document.querySelectorAll(".date")[j].innerText = followingDays;
        document.querySelectorAll(".icon")[j].src =
          "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelectorAll(".temp")[j].innerText =
          "Temp: " + Math.floor(temp) + "°F";
        document.querySelectorAll(".humidity")[j].innerText =
          "Humidity " + humidity + "%";
        document.querySelectorAll(".speed")[j].innerText =
          "Wind: " + speed + "MPH";
        j++;
      }
    }
  },
  // Function to update what is typed in input element
  search() {
    this.fetchWeather(searchBar.value);
    var  cityText = searchBar.value.trim();
  if (cityText === "") {
    return;
  }
  cities.push(cityText);
  searchBar.value = "";
  },
  
  // Function renders items in a todo list as <li> elements
  renderCities() {
    citiesList.innerHTML = "";
    for (var c = 0; c < cities.length; c++) {
      const cita = cities[c];
      const button = document.createElement("button");
      button.classList.add("pastBtn");
      button.textContent = cita;
      button.setAttribute("data-index", c);
      citiesList.appendChild(button);
    }
  },

  // Function that loads when page is load
  init() {
    const storedCities = JSON.parse(localStorage.getItem("cities"));
    if (storedCities !== null) {
      cities = storedCities;
    }
    this.renderCities();
  },  

  // Function to store searched city in Local Storage
  saveLastCity() {
    localStorage.setItem("cities", JSON.stringify(cities));
  },
};

// Event listener for the search button
searchBtn.addEventListener("click", (event) => {
  event.preventDefault();
  weather.search();
  weather.saveLastCity();
  weather.renderCities();
});

// Add click event to citiesList element
citiesList.addEventListener("click", function (event) {
  const element = event.target;
  if (element.matches("button") === true) {
    let index = element.innerHTML;
    fetch(
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
        index +
        "&cnt=80&appid=6e488f3637f1e65cabedb26e8fc39da1&units=imperial"
    )
      .then((response) => response.json())
      .then((data) => weather.displayWeather(data));  
    // Store updated todos in localStorage, re-render the list
    // weather.saveLastCity();
    // weather.renderCities();
  }
});

weather.init();
