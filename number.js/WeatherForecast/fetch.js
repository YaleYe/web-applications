
/*
 * The initial fetch returns a JSON response that has a
 * URL in properties.forecastOffice the response from which
 * has a "name" property that names the forecasting office.
 * The initial response has a properties.forecast URL
 * that returns a response with properties.periods array
 * of forecast period objects.  Each period object has
 *  name: Name of the time period (e.g., This Afternoon)
 *  startTime (e.g., 2018-02-16T14:00:00-06:00)
 *  endTime
 *  temperature
 *  windSpeed
 *  windDirection
 *  icon
 *  shortForecast
 *  detailedForecast
 *
 */

var button = document.querySelector("#clicker");
button.addEventListener("click", getData);

function getData() {  
  let lat = document.querySelector("#lat").value;
  let lon = document.querySelector("#lon").value;

/* This should get the immediate forecast for the specified lat/long.
   Site not working as of 2/21/18?  But the catch does work...
*/
  fetch("https://api.weather.gov/points/"+lat+","+lon)
    .then(response => response.json())
    .then(json => fetch(json.properties.forecast))
    .then(response => response.json())
    .then(json => {
      document.querySelector("#forecast").textContent = 
        json.properties.periods[0].detailedForecast;
     })
    .catch(ex => {
      console.log('failed: ', ex)
     });
/* Fall-back in case the above is not working.
  // Get the county for the specified lat/long
  fetch("https://api.weather.gov/points/"+lat+","+lon)
    .then(response => response.json())
    .then(json => fetch(json.properties.county))
    .then(response => response.json())
    .then(json => {
      document.querySelector("#forecast").textContent = 
        "County: " + 
        json.properties.name + ", " +
	json.properties.state;
     })
    .catch(ex => {
      console.log('failed: ', ex)
     });
*/
}