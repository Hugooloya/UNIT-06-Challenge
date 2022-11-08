let weather = {
    apiKey: "6e488f3637f1e65cabedb26e8fc39da1",
    fetchWeather: function (city) {
      fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&cnt=6&appid=" + this.apiKey + "&units=imperial")
        .then((response) => response.json())
        .then((data) => this.displayWeather(data))
    },
    displayWeather: function(data) {
      const { name } = data.city;
      const { icon, description } = data.list[0].weather[0];    
      const { temp, humidity } = data.list[0].main;    
      const { speed } = data.list[0].wind;  
      console.log(data);  
  },
  };
  



//   var cityForm = document.querySelector('#search-form');

//   function searchCityForm(event) {
//       event.preventDefault();
      
//       var citySearchVal = document.querySelector('#cityName').value;
      
      
//       if (!citySearchVal) {
//           console.error('Please enter a city');
//           return;
//       }
  
//       var cityCoords = "http://api.openweathermap.org/geo/1.0/direct?q="
//       + citySearchVal
//       + '&limit=1&appid=6e488f3637f1e65cabedb26e8fc39da1'
  
//       fetch(cityCoords)
//       .then(function (response) {
//           return response.json();
//       })
//       .then(function (data) {
//           latitude = data[0].lat
//           longitude = data[0].lon
//                     console.log(latitude);
  
//     //       var fullApi = "api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=6e488f3637f1e65cabedb26e8fc39da1"
  
//     //       fetch(fullApi)
//     //       .then(function (response) {
//     //           return response.json();
//     //       })
//     //       .then(function (data) {
//     //       })
//       })      
//   } 
  
//   cityForm.addEventListener('submit', searchCityForm);