import "./geolocator.min.js";

var scrollTo = function (identifier, speed) {
  $("html, body").animate(
    {
      scrollTop: $(identifier).offset().top,
    },
    speed || 1000
  );
};

export var hello = function () {
  $("#hello").slideDown("slow");
  scrollTo("#section_hello");
  responsiveVoice.speak("Hello this is Swapnil, How are you doing today?");
};

export var helloFunction = function (name) {
  responsiveVoice.speak("Hello " + name + ", How are you doing today?");
};

var currentLocation;
const GMAP_API_KEY = "";

(function () {
    if (!GMAP_API_KEY)
    return
      geolocator.config({
        language: "en",
        google: {
          version: "3",
          key: GMAP_API_KEY,
        },
      });

  var options = {
    enableHighAccuracy: true,
    fallbackToIP: true, // fallback to IP if Geolocation fails or rejected
    addressLookup: true,
    // map: "map-canvas", // interactive map element id (or options object)
  };
  console.log("ran");
  geolocator.locate(options, function (err, location) {
    console.log("location", location);
    currentLocation = location;
    $("#country").html(location.address.country);
    $("#state").html(location.address.state);
    $("#city").html(location.address.city);
    $("#latitude").html(location.coords.latitude);
    $("#longitude").html(location.coords.longitude);
  });
})();

export var weatherHere = function () {
  $("#currentLocation").slideDown("slow");
  scrollTo("#section_hello");

  $("#weather").slideDown("slow");
  scrollTo("#section_hello");

  const lat = currentLocation.coords.latitude;
  const long = currentLocation.coords.longitude;
  setWeather({ lat, long });
};

function setWeather(res) {
  fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${res.lat}&longitude=${res.long}&current_weather=true&forecast_days=1&timezone=auto`
  )
    .then((res) => res.json())
    .then((res) => {
      $("#temperature").html(res.current_weather.temperature);
      $("#windSpeed").html(res.current_weather.windSpeed);
      $("#windDirection").html(res.current_weather.winddirection);
      $("#elevation").html(res.elevation);
      return res;
    });
}

function getLatLongOnCity(city) {
  return fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${GMAP_API_KEY}`
  )
    .then((res) => res.json())
    .then((res) => {
      console.log("latlong", res);

      return {
        lat: res.results[0].geometry.location.lat,
        long: res.results[0].geometry.location.lng,
      };
    });
}

export var weatherWhere = async function (city) {
  $("#inputtedCity").html(city);

  $("#weatherCity").html(city);

  $("#inputtedLocation").slideDown("slow");
  scrollTo("#section_hello");

  $("#weather").slideDown("slow");
  scrollTo("#section_hello");

  getLatLongOnCity(city).then((res) => setWeather(res));
};

export var findLocation = function () {
  $("#currentLocation").slideDown("slow");
  scrollTo("#section_hello");
  console.log(currentLocation);
  if (currentLocation === undefined)
    setTimeout(() => {
      responsiveVoice.speak(`you are in ` + currentLocation?.formattedAddress);
    }, 3000);
  else responsiveVoice.speak(`you are in ` + currentLocation.formattedAddress);
};
