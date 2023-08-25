const apiKey = '351db7d80cbf2a3105ea63d048543c3b';


var citySearchFormEl = document.querySelector("#city-search-form");
var cityInputEl = document.querySelector('#city');


var weatherContainerEl = document.querySelector('#weather-container');
var weatherSearchTerm = document.querySelector('#weather-search-term');

var cityNameEl = $('#city-name');

var weatherData = $('#weather-data');

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

//This function takes a city input and gets the relavent latitude and longitude information
//Afterwards, it calls displayWeatherData with the information
//The formatting of this function avoids async/await by using .then() instead
//Promises are very useful for clean code, but can sometimes lead to harder logical understanding
function getCityWeather(city){
    var apiUrl = "https://api.openweathermap.org/geo/1.0/direct?q="+city+"&limit=5&appid="+apiKey;
    console.log(apiUrl);
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function (data){
                var city=  data[0];
                var apiUrl2 = 'https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat='+city.lat+'&lon='+city.lon+'&appid='+apiKey;
                console.log(apiUrl2);
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

//This code displays the weather data from getCityWeather.
//Should only be called from getCityWeather
function displayWeatherData(data){
    cityNameEl.html(data.city.name);
    console.log("HELLO?????"+ cityNameEl.text());
    weatherData.html("");
    var htmlString = "";
    var day = 0;
    var dayData = null;
    for (var i = 7; i < 47; i += 8) {
        dayData = data.list[i];
        day++;

        htmlString += `
        <h3 class='card-header text-uppercase weather-day'>
        Day `+day+`
        </h3>
        <div class='card-body'>
        <div class='form-label'>Date&Time: `+dayData.sys.dt_txt+`</div>
        <div class='form-label'>Weather: `+dayData.weather[0].main+`</div>
        <div class='form-label'>Temp: `+dayData.main.temp+`</div>
        <div class='form-label'>`+1+`</div>
        <div class='form-label'>`+1+`</div>
        </div>
        `;
    }
    weatherData.html(htmlString);
}

citySearchFormEl.addEventListener('submit', formSubmitHandler);