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

// export var findLocation = function (name) {
//     $.ajax({
//       url: "https://geolocation-db.com/jsonp",
//       jsonpCallback: "callback",
//       dataType: "jsonp",
//       success: function (location) {
//         $("#country").html(location.country_name);
//         $("#state").html(location.state);
//         $("#city").html(location.city);
//         $("#latitude").html(location.latitude);
//         $("#longitude").html(location.longitude);
//         $("#ip").html(location.IPv4);
//       },
//     });
// }

export var findLocation = function () {
  geolocator.config({
    language: "en",
    google: {
      version: "3",
      key: "",
    },
  });

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumWait: 10000, // max wait time for desired accuracy
    maximumAge: 0, // disable cache
    desiredAccuracy: 30, // meters
    fallbackToIP: true, // fallback to IP if Geolocation fails or rejected
    addressLookup: true, // requires Google API key if true
    timezone: true, // requires Google API key if true
    map: "map-canvas", // interactive map element id (or options object)
    staticMap: true, // get a static map image URL (boolean or options object)
  };
  geolocator.locate(options, function (err, location) {
    if (err) return console.log(err);
    console.log(location);
  });
};

export var weather = function (city) {
  $.ajax({
    url: "https://api.open-meteo.com/v1/forecast?latitude=20.74&longitude=78.60&current_weather=true&forecast_days=1&timezone=auto",
  });
};
