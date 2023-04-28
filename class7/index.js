"use strict";

import "./geolocator.min.js";

var currentLocation;
const GMAP_API_KEY = "";

var currentLocation;

(function () {
  if (!GMAP_API_KEY) return;
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
    map: "map-canvas",
  };
  console.log("ran");
  geolocator.locate(options, function (err, location) {
    console.log("location", location);
    currentLocation = location;
  });
})();



