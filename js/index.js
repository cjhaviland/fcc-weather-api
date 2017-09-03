// https://fcc-weather-api.glitch.me/
// https://www.flickr.com/services/api/flickr.photos.search.html
/*
User Story: I can see the weather in my current location.

User Story: I can see a different icon or background image (e.g. snowy mountain, hot desert) depending on the weather.

User Story: I can push a button to toggle between Fahrenheit and Celsius.
*/
var temp = 0;
// https://www.w3schools.com/html/html5_geolocation.asp
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(savePosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// Pass lat and lon into the Weather API
function savePosition(position) {
    var weatherAPIURL = 'https://fcc-weather-api.glitch.me/api/current?';
  $.getJSON(weatherAPIURL, {
    lat: position.coords.latitude,
    lon: position.coords.longitude
  })
  .done(function(data){
    temp = Math.floor(data.main.temp);
    $('#weather-icon').attr('src', data.weather[0].icon);
    $('#temp').html(temp + '&deg;C');
    $('#location').html(data.name);
    console.log(data);
  }) 
}

function convertTemp(){
  
  // Get button text
  var btnScale = $('#convert-temp').text().split('');
  
  if(btnScale[1] == 'C'){ //celsius to fahrenheit
    $('#convert-temp').html('&deg;F');
    temp = (temp - 32) * .5556;
    return Math.floor(temp) + '&deg;C';
  }
  else{ //fahrenheit to celsius
    $('#convert-temp').html('&deg;C');
    temp = temp * 1.8 + 32
    return Math.floor(temp) + '&deg;F';
  }
}

$(function(){
  getLocation();
  
  $('#convert-temp').on('click', function(){
    
    $('#temp').html(convertTemp());
   
  });
})