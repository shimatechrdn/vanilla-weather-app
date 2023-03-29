function displayTemperature(response) {
    let temperatureElement= document.querySelector("#temperature");
    temperatureElement.innerHTML=Math.round(celsiusTemperature);
    let cityElement= document.querySelector("#cuty");
    cityElement.innerHTML= response.data.name
    let descriptionElement= document.querySelector("#description");
    descriptionElement.innerHTML= response.data.weather[0].description;
    let humidityElement=document.querySelector("#humidity");
    humidityElement.innerHTML= response.data.main.humidity;
    let windElement=document.querySelector("#wind");
    windElement.innerHTML=Math.round(response.data.wind.speed);
    let dateElement=document.querySelector("#date");
    dateElement.innerHTML=formatDate(response.data.dt*1000);
    let iconElement=document.querySelector("#icon");
    iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt",response.data.weather[0].description)
    celsiusTemperature= response.data.main.temp;

    getForecast(response.data.coord);    

}
function formatDate(timestamp){
    let date= new Date(timestamp);
    let hours= date.getHours();
    if(hours<10){
        hours=`0${hours}`;
    }
    let minutes=date.getMinutes();
    if (minutes<10){
        minutes=`0${minutes}`;
    }
    let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    let day=days[date.getDay()];
    return `${day} ${hours}:${minutes}`;


}

function displayForecast(response){
    console.log(response.data.daily);
    let forecastElement= document.querySelector("#forecast")

    
    let forecastHTML= `<div class="row">`;
    let days= ["Thu","Fri","Sat","Sun"];
    days.forEach(function (day){
        forecastHTML= forecastHTML+`<div class="c0l-2">
                        <div class="weather-forecast-date">
                            ${day}
                        </div>
                        <img src="http://openweather.org/img/wn/s0d@2x.png" alt="" width="42" />
                        <div class="weather-forecast-temperature">
                            <span class="weather-forecast-temperature-max">
                                18°
                            </span>
                            <span class="weather-forecast-temperature-min">
                                12°
                            </span>
                        </div>
                         </div>`;

    });
    forecastHTML= forecastHTML +`</div>`;
    forecastElement.innerHTML= forecastHTML;               
}


function getForecast(coordinates){
    
let apiKey="0a521eaf234a3a56f45252fac3c737ad"
let apiUrl=`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`

axios.get(apiUrl).then(displayForecast);
}



function search(city){
let apiKey="0a521eaf234a3a56f45252fac3c737ad"
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

axios.get(apiUrl).then(displayTemperature);
}
function handleSubmit(event){
    event.preventDefault();
    cityInputElement=document.querySelector("#city-input");
    search(cityInputElement.value)
    
}

function displayFahrenheitTemperature(event){
    event.preventDefault();
    let fahrenheitTemperature= (celsiusTemperature*9)/5+32;
    let temperatureElement=document.querySelector("#temperature");
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    temperatureElement.innerHTML=Math.round(fahrenheitTemperature);
}
function displayCelsiusTemperature(event){
    event.preventDefault();
    let temperatureElement=document.querySelector("#temperature");
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    temperatureElement.innerHTML=Math.round(celsiusTemperature);


}



let celsiusTemperature= null;

let form=document.querySelector("#search-form");
form.addEventListener("submit",handleSubmit)

let fahrenheitLink=document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click",displayFahrenheitTemperature);

let celsiusLink=document.querySelector("#celsius-link");
celsiusLink.addEventListener("click",displayCelsiusTemperature);

search("New York");



