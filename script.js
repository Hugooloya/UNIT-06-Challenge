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
      document.querySelector('.city').innerText = name;
      document.querySelector('.icon').src = "https://openweathermap.org/img/wn/" + icon +"@2x.png";
      document.querySelector('.description').innerText = description;
      document.querySelector('.temp').innerText = temp + "°F";
      document.querySelector('.humidity').innerText = humidity;
      document.querySelector('.speed').innerText = speed;


    },
  };
  