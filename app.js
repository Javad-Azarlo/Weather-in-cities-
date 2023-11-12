import getWeatherData from "./utils/httpReq.js";
import {showModal} from "./utils/modal.js";

const days = ["SunDay" , "MonDay" , "TuesDay" , "WednsDay" , "ThursDay" , "FriDay" , "SaturDay" ]
const serach_input = document.querySelector("input");
const search_btn = document.querySelector("button");
const weather_container = document.getElementById("weather");
const location_container = document.getElementById("location");
const forecast_container = document.getElementById("forecast");


const renderCurrent =(data)=>{
    if(!data) return;
    const weather_jsx = `
    <h1>${data.name} | ${data.sys.country}</h1>
    <div id="main">
        <img alt="weather icon" src="https://api.openweathermap.org/img/w/${data.weather[0].icon}.png">
        <span>${data.weather[0].main}</span>
        <p>${Math.round(data.main.temp)} °C</p>
    </div>
    <div id="info">
        <p>Humidity : <span>${data.main.humidity} %</span></p>
        <p>Speed : <span>${data.wind.speed} m/s</span></p>
    </div>
    `;
    weather_container.innerHTML = weather_jsx;
}
const weekDay= (data)=>{
    return days[new Date(data * 1000).getDay()];
}
const renderForecast = (data)=>{
    if(!data) return;
    forecast_container.innerHTML = "";
    const data_obj = data.list.filter(obj => obj.dt_txt.endsWith("12:00:00"));
        console.log(data_obj);
    data_obj.forEach(item => {
        const forecast_jsx = `
        <div>
          <img alt="weather icon" src="https://api.openweathermap.org/img/w/${item.weather[0].icon}.png">
          <h3>${weekDay(item.dt)}</h3>
          <p>${Math.round(item.main.temp)}</p>
          <span>${item.weather[0].main} °C</span>
        </div> 
        `;
        forecast_container.innerHTML += forecast_jsx;
    })
}
const searchBtn = async() => {
    weather_container.innerHTML = `<span id="loader"></span>`;
    const city_name = serach_input.value;
    // if(!city_name){
        // showModal("لطفا نام شهر را وارد کنید")
    // }
    const current = await getWeatherData("current" , city_name);
    renderCurrent(current);
    const forecast_data = await getWeatherData("forecast" , city_name)
    renderForecast(forecast_data)
}
const postionCalback =async (postion)=>{
    const current_data = await getWeatherData("current", postion.coords);
    const forecast_data = await getWeatherData("forecast" , postion.coords)
    renderCurrent(current_data);
    renderForecast(forecast_data);
    console.log(current_data)
 }
const errorCalbavk = (a)=>{
    showModal(a.message)
}
const locationContainer = () =>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(postionCalback , errorCalbavk);
        weather_container.innerHTML = `<span id="loader"></span>`;
    }
    else{
        showModal("not fond")
    }
}
const loaderFunction = async ()=>{
    const current = await getWeatherData("current" , "Qom");
renderCurrent(current);
const forecast_data = await getWeatherData("forecast" , "Qom")
renderForecast(forecast_data)
}
search_btn.addEventListener("click" , searchBtn);
location_container.addEventListener("click" ,locationContainer);
document.addEventListener("DOMContentLoaded" , loaderFunction)