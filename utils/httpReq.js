import { showModal } from "./modal.js";

 const key= "7acc6202ee5a7554605001ae47ae9b37";
const base_url = `https://api.openweathermap.org/data/2.5/`;

const getWeatherData = async (type , resp)=>{
let url = null;
if(type==="current"){
    if(typeof resp === "string"){
        //داده شهری که جستجو میکنید
        url =`${base_url}/weather?q=${resp}&appid=${key}&units=metric`;
    }
    else{
        //داده ای که موقعیت فعلی را نمایش میدهد
        url = `${base_url}/weather?lat=${resp.latitude}&lon=${resp.longitude}&appid=${key}&units=metric`;
    }
}
else if(type === "forecast"){
    if(typeof resp === "string"){
        //داده ای که موقیعت 5 روز اینده شهری که جستجو کرده اید را نشان میده 
        url = `${base_url}/forecast?q=${resp}&appid=${key}&units=metric`;
    }
    else{
        //داده ای که موقعیت فعلی و 5 روز انده را نشان میدهد را نمایش میدهد
        url = `${base_url}/forecast?lat=${resp.latitude}&lon=${resp.longitude}&appid=${key}&units=metric`;
    }
}
try{
    const response = await fetch(url);
    const json = await response.json(); 
    if(+json.cod === 200)
     return json;
    else{
        showModal("city not found")
    }
}
catch(error){
    showModal(error.message)
}


}

export default getWeatherData;