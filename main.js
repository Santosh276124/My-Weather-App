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
      // const city = search.value || 'Delhi';
        
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
    //  https://openweathermap.org/img/wn/API_RESPONSE_DATA@2x.png
    icon.src = `https://openweathermap.org/img/wn/${data[0].weather[0].icon}@2x.png`
  
    // Description of the Current Weather
    conditionOutput.innerHTML = data[0].weather[0].main
  
    // Wind Speed
    windOutput.innerHTML = data[0].wind.speed.toFixed(1) + "km/h"

    // name output
    nameOutput.innerHTML = data[0].name
  
    
    // Humidity
    humidityOutput.innerHTML = data[0].main.humidity + "%"
  
   
  
    // Get the location of the user from the API (When you type, it's probably not formatted)
    nameOutput.innerHTML = data[0].name
  
  
    // Get and format Current Date
    dateOutput.innerText = new Date(Date.now()).toLocaleString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  
   
// call the getTime function to show current tiem ac to searched city
   getTime(data[0].timezone);


  //  weather conditions and icons


  // get corresponding icon url for the weather and extract a part of it
  const iconId = data[0].weather[0].icon;
  let timeOfDay_lastchar = iconId.charAt(iconId.length-1);
  console.log(timeOfDay_lastchar);
  console.log(iconId);

  // .substr(
  //   "//cdn.weatherapi.com/weather/64x64/".length );
   // reformat icon url to ur own local folder path add it to the page
  //  icon.src = "./icons/" + iconId;

       
   // set default time of day
   let timeOfDay = "day";

   // get unique id for each weather condition
   const code = data[0].weather[0].id;

   // change to night if its night time inthe city
   if(timeOfDay_lastchar == 'n'){
       timeOfDay = "night";
   }

   
   // clear
   if(code == 800){
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
      code == 801 ||
      code == 802 ||
      code == 803 ||
      code == 804 ||
      code == 200 ||
      code == 201 ||
      code == 202 ||
      code == 210 || 
      code == 211 ||
      code == 212 ||
      code == 221 ||
      code == 230 ||
      code == 231 ||
      code == 232 ||
      code == 751 ||
      code == 761 || 
      code == 762 ||
      code == 771 ||
      code == 781 
  ) {
      app.style.backgroundImage = `url(./images/${timeOfDay}/cloudy.jpg)`;
      btn.style.background = "#fa6d1b";

      if(timeOfDay == "night") {
          btn.style.background = "#181e27";
      }
    
  }

  // foggy, mist, smoke, haze, dust
  else if(
    code == 701 ||
    code == 711 ||
    code == 721 ||
    code == 731 ||
    code == 741  
) {
    app.style.backgroundImage = `url(./images/${timeOfDay}/foggy.jpg)`;
    btn.style.background = "#565454";

    if(timeOfDay == "night") {
        btn.style.background = "#444445";
    }
  
}

  // rainy
  else if(
      code == 500 ||
      code == 501 ||
      code == 502 ||
      code == 503 ||
      code == 504 ||
      code == 511 ||
      code == 520 ||
      code == 521 ||
      code == 522 ||
      code == 531 ||
      code == 300 ||
      code == 301 ||
      code == 302 ||
      code == 310 ||
      code == 311 ||
      code == 312 ||
      code == 313 ||
      code == 314 ||
      code == 321 
  ) {
      app.style.backgroundImage = `url(./images/${timeOfDay}/rainy.jpg)`;
      btn.style.background = "#647d75";

      if(timeOfDay == "night"){
          btn.style.background = "#325c80";
      }
  }

  // snowy
  else {
      app.style.backgroundImage = `url(./images/${timeOfDay}/snowy.jpg)`;
      btn.style.background = "#4d72aa";

      if(timeOfDay == "night") {
          btn.style.background = "#1b1b1b";
      }
  }

  }
  
  // getTime AC to timeZone avilable in data[0]
  const getTime = (timezone) => {
    const localTime = new Date().getTime()
    const localOffset = new Date().getTimezoneOffset() * 60000
    const currentUtcTime = localOffset + localTime
    const cityOffset = currentUtcTime + 1000 * timezone
    const cityTime = new Date(cityOffset).toTimeString().split(' ')
    const cityDate = new Date(cityOffset).toDateString().split(' ')
    // console.log(formatTime(cityTime[0]));
    timeOutput.innerText = formatTime(cityTime[0]);

    // console.log(cityDate);
  }

  // Format time with AM AND PM
  function formatTime(timeString) {
    const [hourString, minute] = timeString.split(":");
    const hour = +hourString % 24;
    return (hour % 12 || 12) + ":" + minute + (hour < 12 ? " AM" : " PM");
}
  
  
  // Call the getWeatherData function
  getWeatherData()


  // app.style.opacity = "0";
   

    