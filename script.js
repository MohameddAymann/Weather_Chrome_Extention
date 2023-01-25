const container1 = document.querySelector(".container");
const container2 = document.querySelector(".container2");
const input = document.querySelector(".container2 input");
const button = document.querySelector(".container2 button");
const statusParagraph = document.querySelector(".container2 p");

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
  }
});

function success(position) {
  const { latitude, longitude } = position.coords;
  Api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${"c6eff4fe92d04fe68e5241f00a8a1258"}`;
  fetchData();
}

function error(error) {
  statusParagraph.innerText = error.message;
  statusParagraph.classList.add("error");
}
function fetchData() {}
