const apiKey = '351db7d80cbf2a3105ea63d048543c3b';


var citySearchFormEl = document.querySelector("#city-search-form");
var cityInputEl = document.querySelector('#city');


var weatherContainerEl = document.querySelector('#weather-container');
var weatherSearchTerm = document.querySelector('#weather-search-term');


var formSubmitHandler = function (e) {
    e.preventDefault();

    var city = cityInputEl.value.trim();

    if(city){
        getCityWeather(city);

        cityInputEl.value = "";
        //weatherContainerEl.textContent = "";
    }
    else{
        alert("please enter a city")
    }
};

function getCityWeather(city){
    lat,lon = getLatLon(city);
    apiUrl = 'api.openweathermap.org/data/2.5/forecast?lat='+lat+'&'+lon+'={lon}&appid='+apiKey
};

function getLatLon(city){
    var apiUrl = "https://api.openweathermap.org/geo/1.0/direct?q="+city+"&limit=5&appid="+apiKey;
    var data = fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function (data){
                console.log(data);
            })
          } else {
            alert('Error: ' + response.statusText);
          }
    })
}   