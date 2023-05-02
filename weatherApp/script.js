function setWeather(res) {
  fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${res.lat}&longitude=${res.long}&current_weather=true&forecast_days=1&timezone=auto`
  )
    .then((res) => res.json())
    .then((res) => {
      console.log("res", res);

      document.getElementById("temperature").innerHTML =
        res.current_weather.temperature;
      document.getElementById("windSpeed").innerHTML =
        res.current_weather.windspeed;
      document.getElementById("windDirection").innerHTML =
        res.current_weather.winddirection;
      document.getElementById("elevation").innerHTML = res.elevation;
      return res;
    });
}
function initMap() {
  const input = document.getElementById("pac-input");

  const autocomplete = new google.maps.places.Autocomplete(input, {
    types: ["(cities)"],
  });

  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();
    console.log(place.geometry.location.lat(), place.geometry.location.lng());
    setWeather({
      lat: place.geometry.location.lat(),
      long: place.geometry.location.lng(),
    });

    if (!place.geometry || !place.geometry.location) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }
  });
}

window.initMap = initMap;
