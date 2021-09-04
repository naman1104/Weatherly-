
const api = {
    key: "65d26fe6ebed59e04903ec0a6aac734f",
    base: "https://api.openweathermap.org/data/2.5/"
  }
  
  const searchbox = document.querySelector('.search-box');
  searchbox.addEventListener('keypress', setQuery);
  
  function setQuery(evt) {
    if (evt.keyCode == 13) {
      getResults(searchbox.value);
    }
  }
  
  
  function getResults (query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(weather => {
        return weather.json();
      }).then(displayResults)
      .catch( err=> alert("Please search for a valid city 😩"));
          
      ;
    
  }
  
  function displayResults(weather){
      console.log(weather);
      let city =document.querySelector('.location .city');
      city.innerText = `${weather.name}, ${weather.sys.country}`;
      let now = new Date();
      let date = document.querySelector('.location .date');
      date.innerText= dateBuilder(now);

      let temp = document.querySelector(' .current .temp');
      temp.innerHTML=`${Math.round(weather.main.temp)}<span>°C</span>`;

      var iconCode = weather.weather[0].icon;
      document.getElementById('image').src = 'http://openweathermap.org/img/w/' + iconCode + '.png';
     

      let weather_el =document.querySelector('.current .weather');
      weather_el.innerText=weather.weather[0].main;

      let hi_low= document.querySelector('.hilow');
      hi_low.innerText= `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`;

  }

  function dateBuilder(d){
      let months = ["January", "February","March","April","May","June","July","August"," September","October","November","December"];
      let days= ["Sunday","Monday","Tuesday","Wednesday", "Thursday", "Friday", "Saturday" ];
      let day=days[d.getDay()];
      let date =  d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();
      return `${day}, ${date} ${month} ${year}`;
  }
