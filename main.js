// get all necessary elements from the DOM
const app = document.getElementById('weather-app');
const temp = document.getElementById('temp');
const dateOutput = document.getElementById('date');
const timeOutput = document.getElementById('time');
const conditionOutput = document.getElementById('condition');
const nameOutput = document.getElementById('name');
const icon = document.getElementById('icon');
const cloudOutput = document.getElementById('cloud');
const humidityOutput = document.getElementById('humidity');
const windOutput = document.getElementById('wind');
const form = document.getElementById('locationInput');
const search = document.getElementById('search');
const btn = document.getElementById('submit');
const cities = document.getElementsByClassName('city');



// default city when the page load
let cityInput = "Delhi";

// add event listener to each city in the panel
const citiesArray = [...cities];

citiesArray.forEach((city) => {
  city.addEventListener("click", function () {
    console.log(city.innerHTML);

    // change from default to clicked one
        cityInput = city.innerHTML;
        
        // fnction that fetch all data
        getWeatherData();
        
  });
});





// add submit event to the form
submit.addEventListener("click", (e) => {
    // console.log("kaise ho?");

    e.preventDefault();

    // if search bar is empty
    if(search.value == ""){
        alert('Please type a city name');
    }
    else{
        // change from default city to the typed one
        cityInput = search.value;
        // console.log(cityInput);

        // function that fetch all data from weather API
        getWeatherData();
        

        // remove all text from the input field
        search.value = "";
        // fade out the app
        // app.style.opacity = "0";
    }
});

// will use this function later
function dayOfTheWeek(day, month, year) {
    const weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    return weekday[new Date(`${day}/${month}/${year}`).getDay()];
};

// function that fetch and display the data from weather API

// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '7c9beea993msh1aa186731e3bbe7p105f7ejsn25cb1def6738',
// 		'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
// 	}
// };

// fetch('https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${cityInput}', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));
const getWeatherData = async () => {
    // Use the try-catch block to handle errors
    try {
      // Create a const that stores the user input from the searchbar or defaults back to 'Los Angeles' if left blank
      var city;
      if(search.value == "")
      {
        city = cityInput;
      }
      else
      {
        city = search.value;
      }
    //   const city = search.value || 'Delhi';
        
      // console.log(city);

      // Create 2 promises that call the APIs and pass in the city name
      // If the user haven't typed anything, use Los Angeles as default
      const currentWeather = new Promise(async (resolve, reject) => {
        try {
          const weatherApiData = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8109965e7254a469d08a746e8b210e1e&units=imperial`,
          )
  
          resolve(await weatherApiData.json())
        } catch (error) {
            console.log("error");
          reject()
        }
      })
  
      const forecast = new Promise(async (resolve, reject) => {
        try {
          const forecastApiData = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=8109965e7254a469d08a746e8b210e1e&units=imperial&cnt=10`,
          )
  
          resolve(await forecastApiData.json())
        } catch (error) {
          reject()
        }
      })
  
      // Using the Promise.all method, wait for both promises to resolve, and save the returned data in a variable
      const data = await Promise.all([currentWeather, forecast])
  
      // Now pass that data into the updateDom() function
      updateDom(data)
    } catch (error) {
      console.log(error)
    }
  }

  const updateDom = data => {
    console.log('🔥 updating', data)
    // Current temperature



    temp.innerHTML = Math.round(( data[0].main.temp.toFixed(1) - 32 )*(5/9)) + "&#176;";
  
    // Weather Icon
    // Use template literals to insert the in the below link, then set it as image source:
    // https://openweathermap.org/img/wn/API_RESPONSE_DATA@2x.png
    icon.src = `https://openweathermap.org/img/wn/${data[0].weather[0].icon}@2x.png`
  
    // Description of the Current Weather
    conditionOutput.innerHTML = data[0].weather[0].main
  
    // Wind Speed
    windOutput.innerHTML = data[0].wind.speed.toFixed(1) + "km/h"

    // name output
    nameOutput.innerHTML = data[0].name
  
    // Wind Direction (Use the getDirection function)
    // windDirection.innerText = getDirection(data[0].wind.deg)
  
    // Lowest Temperature of the Day
    // lowestToday.innerText = Math.round(data[0].main.temp_min)
  
    // Highest Temperature of the Day
    // highestToday.innerText = Math.round(data[0].main.temp_max)
  
    // Pressure
    // pressure.innerText = data[0].main.pressure
  
    // Humidity
    humidityOutput.innerHTML = data[0].main.humidity + "%"
  
    // Save both Sunrise and Sunset time in a variable as Milliseconds
    // Hint: the data from the API is in seconds
    // const sunriseTs = new Date(data[0].sys.sunrise * 1000)
    // const sunsetTs = new Date(data[0].sys.sunset * 1000)
  
    // Use the Sunrise Time in Milliseconds to get Sunrise Time
    // use the .toLocaleString() method to get the time in a readable format
    // sunrise.innerText = sunriseTs.toLocaleTimeString('en-US', {
    //   hour: 'numeric',
    //   minute: 'numeric',
    // })
  
    // // Do the same for Sunset
    // sunset.innerText = sunsetTs.toLocaleTimeString('en-US', {
    //   hour: 'numeric',
    //   minute: 'numeric',
    // })
  
    // Using timeago.js, create relative timestamps for both sunrise and sunset
    // sunriseRelative.innerText = timeago.format(sunriseTs)
    // sunsetRelative.innerText = timeago.format(sunsetTs)
  
    // Get the location of the user from the API (When you type, it's probably not formatted)
    nameOutput.innerHTML = data[0].name
  
    // Get and format Current Time
    timeOutput.innerText = new Date(Date.now()).toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
    })
  
    // Get and format Current Date
    dateOutput.innerText = new Date(Date.now()).toLocaleString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  
    // Call the renderChart function and pass in the list array of the 2nd object in the data array
    
  }
  
  // Create a function that renders the chart
  
  
  // Call the getWeatherData function
  getWeatherData()
/*
function fetchWeatherData() {

    // fetch('https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${cityInput}', options)
	// .then(response => response.json())
	// .then(response => console.log(response))
	// .catch(err => console.error(err));

    // try {
    //     // Create a const that stores the user input from the searchbar or defaults back to 'Los Angeles' if left blank
    //     const city = searchInput.value || 'Los Angeles'
    
    //     // Create 2 promises that call the APIs and pass in the city name
    //     // If the user haven't typed anything, use Los Angeles as default
    //     const currentWeather = new Promise(async (resolve, reject) => {
    //       try {
    //         const weatherApiData = await fetch(
    //           `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8109965e7254a469d08a746e8b210e1e&units=imperial`,
    //         )
    
    //         resolve(await weatherApiData.json())
    //       } catch (error) {
    //         reject()
    //       }
    //     })

    // fetch(`http://api.weatherapi.com/v1/current.json?key=104bf291bab1463abf4120209230401=${cityInput}`)
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8109965e7254a469d08a746e8b210e1e&units=imperial`)

    .then(response => response.json())
    .then(data => {
        console.log(data);

        // add temperature and weather condition
        temp.innerHTML = data.current.temp_c + "&#176;";
        conditionOutput.innerHTML = data.current.condition.text;
    
        // get date and time
        const date = data.location.localtime;
        const y = parseInt(date.substr(0,4));
        const m = parseInt(date.substr(5,2));
        const d = parseInt(date.substr(8,2));
        const time = date.substr(11);
    
        // reformat this
        dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${d}, ${m}, ${y}`;
        timeOutput.innerHTML = time;
    
        // add name of city into page
        nameOutput.innerHTML = data.location.name;
    
        // get corresponding icon url for the weather and extract a part of it
        const iconId = data.current.condition.icon.substr(
            "//cdn.weatherapi.com/weather/64x64/".length );

        // reformat icon url to ur own local folder path add it to the page
        icon.src = "./icons/" + iconId;

        // add the weather details to the page
        cloudOutput.innerHTML = data.current.cloud + "%";
        humidityOutput.innerHTML = data.current.humidity + "%";
        windOutput.innerHTML = data.current.wind_kph + "km/h";

        // set default time of day
        let timeOfDay = "day";

        // get unique id for each weather condition
        const code = data.current.condition.code;

        // change to night if its night time inthe city
        if(!data.current.is_day){
            timeOfDay = "night";
        }

        if(code == 1000){
            // set background img to clear if weather is clear
            app.style.backgroundImage = `url(./images/${timeOfDay}/clear.jpg)`;

            // change the button bg color if its day or night
            btn.style.background = "#e5ba92";
            if(timeOfDay == "night"){
                btn.style.background = "#181e27";
            }
        }

        // same thing for cloudy weather
        else if(
            code == 1003 ||
            code == 1006 ||
            code == 1009 ||
            code == 1030 ||
            code == 1069 ||
            code == 1087 ||
            code == 1135 ||
            code == 1273 || 
            code == 1276 ||
            code == 1279 ||
            code == 1284
        ) {
            app.style.backgroundImage = `url(./images/${timeOfDay}/cloudy.jpg)`;
            btn.style.background = "#fa6d1b";

            if(timeOfDay == "night") {
                btn.style.background = "#181e27";
            }
           
        }
        else if(
            code == 1063 ||
            code == 1069 ||
            code == 1072 ||
            code == 1150 ||
            code == 1153 ||
            code == 1180 ||
            code == 1183 ||
            code == 1186 ||
            code == 1189 ||
            code == 1192 ||
            code == 1195 ||
            code == 1204 ||
            code == 1207 ||
            code == 1240 ||
            code == 1243 ||
            code == 1246 ||
            code == 1249 ||
            code == 1252 
        ) {
            app.style.backgroundImage = `url(./images/${timeOfDay}/rainy.jpg)`;
            btn.style.background = "#647d75";

            if(timeOfDay == "night"){
                btn.style.background = "#325c80";
            }
        }
        else {
            app.style.backgroundImage = `url(./images/${timeOfDay}/snowy.jpg)`;
            btn.style.background = "#4d72aa";

            if(timeOfDay == "night") {
                btn.style.background = "#1b1b1b";
            }
        }

        // fade in the page once all is done
        app.style.opacity = "1";
    })

    // if user types city that doesnt exist throw an alert
    .catch(() => {
        alert(`city not found, please try again`);
        app.style.opacity = "1";
    });

}

// call the function of page load
fetchWeatherData();

// fade in the page
app.style.opacity = "1";
*/




