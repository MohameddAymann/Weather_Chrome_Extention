const container1 = document.querySelector(".container");
const container2 = document.querySelector(".container2");
const input = document.querySelector(".container2 input");
const button = document.querySelector(".container2 button");
const statusParagraph = document.querySelector(".container2 p");
const arrowIcon = document.querySelector(".container .arrowIcon");
const img = document.querySelector(".container .img_deg img");
const tempDegree = document.querySelector(".container .img_deg p");
const weatherstatus  = document.querySelector(".container .des_loc .description");
const locationInfo  = document.querySelector(".container .des_loc .location");
const feelsLike = document.querySelector(".container .properies .left .des .deg");
const humidityPer  = document.querySelector(".container .properies .right .des .deg");

let Api;

input.addEventListener("keyup", (event) => {
  if (event.key == "Enter" && input.value != "") {
    Api = `https://api.openweathermap.org/data/2.5/weather?q=${
      input.value
    }&units=metric&appid=${"c6eff4fe92d04fe68e5241f00a8a1258"}`;
    fetchData();
  }
});

button.addEventListener("click", (event) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    statusParagraph.innerText = "Your browser not support geolocation";
    statusParagraph.classList.add("error");
});

function success(position) {
  const { latitude, longitude } = position.coords;
  Api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${"c6eff4fe92d04fe68e5241f00a8a1258"}`;
  fetchData();
});

function error(error) {
  statusParagraph.innerText = error.message;
  statusParagraph.classList.add("error");
});

arrowIcon.addEventListener("click", (event)=>{
  container1.classList.add("hide");
  container2.classList.remove("hide");
});

function fetchData(){
  statusParagraph.innerText = "Getting weather details...";
  statusParagraph.classList.add("pending");
  fetch(Api)
  .then((res) => {
    return res.json()
  }).then((data) => {
      console.log(data)
      weatherDisplay(data)
  }).catch((error) =>{
      statusParagraph.innerText = error.message;
      statusParagraph.classList.replace("pending", "error");
  });
};

function weatherDisplay(data){
  if(data.cod == "404"){
    statusParagraph.classList.replace("pending", "error");
    statusParagraph.innerText = `${input.value} is not a valid city name`;
  }else{
    const city = data.name;
    const country = data.sys.country;
    const {description, id} = data.weather[0];
    const {temp, feels_like, humidity} = data.main;

    if(id == 800){
        img.src = "images/clear.svg";
    }else if(id >= 200 && id <= 232){
        img.src = "images/storm.svg";  
    }else if(id >= 600 && id <= 622){
        img.src = "images/snow.svg";
    }else if(id >= 701 && id <= 781){
        img.src = "images/haze.svg";
    }else if(id >= 801 && id <= 804){
        img.src = "images/cloud.svg";
    }else if((id >= 500 && id <= 531) || (id >= 300 && id <= 321)){
        img.src = "images/rain.svg";
    }

    tempDegree.innerText = `${Math.floor(temp)}°C`;
    weatherstatus.innerText = description;
    locationInfo.innerText = `${city}, ${country}`;
    feelsLike.innerText = `${Math.floor(feels_like)}°C`;
    humidityPer.innerText = `${humidity}%`;
    statusParagraph.classList.remove("pending", "error");
    statusParagraph.innerText = "";
    input.value = "";
    container2.classList.add("hide");
    container1.classList.remove("hide");
  };
};
=======

