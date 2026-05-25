const strbtn=document.querySelector("#start-btn");
const search=document.querySelector("#city-input");
const searchicon=document.querySelector(".search-icon");
const temp=document.querySelector("#temp");
const cityname=document.querySelector("#city-name");
const icon=document.querySelector(".weather-info ");
const wind=document.querySelector("#wind-speed");
const humidity=document.querySelector("#humidity");
const desc=document.querySelector(".description");
const errorcontainer=document.querySelector("#error-container");
const backbtn=document.querySelector("#back-btn");
const container1=document.querySelector(".container1");
const container2=document.querySelector(".container2");
const container3=document.querySelector(".container3");

strbtn.addEventListener("click",()=>{
    container1.classList.add("inactive");
    container2.classList.remove("inactive");
})

function changeIcon(weatherMain){
    let icons={
       "clear": '<img src="sun.png" alt="Weather Icon">',
       "clouds": '<img src="cloud.png" alt="Weather Icon">',
       "rain": '<img src="rain.png" alt="Weather Icon">',     
       "snow": '<img src="snow.png" alt="Weather Icon">', 
       "thunderstorm": '<img src="thunderstorm.png" alt="Weather Icon">',
       "drizzle": '<img src="drizzle.png" alt="Weather Icon">',
       "mist": '<img src="mist.png" alt="Weather Icon">',
       "haze": '<img src="haze.png" alt="Weather Icon">',
       "fog": '<img src="fog.png" alt="Weather Icon">',
       "smoke": '<img src="smoke.png" alt="Weather Icon">',
       "dust": '<img src="dust.png" alt="Weather Icon">',
       "ash": '<img src="ash.png" alt="Weather Icon">',

    };
   icon.className="weather-info";
}

const url="https://api.openweathermap.org/data/2.5/weather?";
const apikey="&appid="YOUR_API_KEY_HERE";

async function getweatherdata(cityname){
    let finalurl=`${url}q=${cityname}${apikey}`;
    let weatherdata=await fetch(finalurl).then(response=>response.json());
    console.log(weatherdata);

    
if(weatherdata.cod== 404){
    container2.classList.add("inactive");
    container3.classList.remove("inactive");
    desc.innerText="Description";
    temp.innerText= "0°C";
    cityname.innerText=weatherdata.name;
    wind.innerText="Wind Speed: " + " 0km/h";
    humidity.innerText="Humidity: " + "0%";
    search.value="";
    icon.className="weather-info";
}
    
desc.innerText=weatherdata.weather[0].description;
temp.innerText=Math.round(weatherdata.main.temp-273.15)+"°C";
cityname.innerText=weatherdata.name;
wind.innerText=weatherdata.wind.speed+" km/h";
humidity.innerText=weatherdata.main.humidity+"%";

changeIcon(weatherdata.weather[0].main);
}

searchicon.addEventListener("click",()=>{
    getweatherdata(search.value);
})

search.addEventListener("keypress",(event)=>{
    if(event.key=="Enter"){
        getweatherdata(search.value);
    }
})

backbtn.addEventListener("click",()=>{
    container3.classList.add("inactive");
    container1.classList.remove("inactive");
})
