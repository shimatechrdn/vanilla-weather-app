function displayTemperature(response) {
    console.log(response.data);
    let temperatureElement= document.querySelector("#temperature");
    temperatureElement.innerHTML=Math.round(response.data.main.temp);
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


let apiKey="8c48afa47a9a9c24f3500c7039d50aaa"
let apiUrl="https://api.openweathermap.org/data/2.5/weather?q=New%20York&appid=8c48afa47a9a9c24f3500c7039d50aaa&units=metric"

axios.get(apiUrl).then(displayTemperature);
