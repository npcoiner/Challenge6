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
    var apiUrl = "https://api.openweathermap.org/geo/1.0/direct?q="+city+"&limit=5&appid="+apiKey;
    console.log(apiUrl);
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function (data){
                var city=  data[0];
                var apiUrl2 = 'https://api.openweathermap.org/data/2.5/forecast?lat='+city.lat+'&lon='+city.lon+'&appid='+apiKey;
                fetch(apiUrl2).then(function(nestedResponse){
                    if (nestedResponse.ok) {
                        nestedResponse.json().then(function (data2){
                            displayWeatherData(data2);
                        })
                      } else {
                        alert('Error: ' + nestedResponse.statusText);
                      }
                })
            })
          } else {
            alert('Error: ' + response.statusText);
          }
    })
}   


function displayWeatherData(city){
    
}

citySearchFormEl.addEventListener('submit', formSubmitHandler);