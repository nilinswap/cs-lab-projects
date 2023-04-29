/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
function initMap() {
  const input = document.getElementById("pac-input");

  const autocomplete = new google.maps.places.Autocomplete(input, {
    types: ["(cities)"],
  });

  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();
    console.log(place.geometry.location.lat(), place.geometry.location.lng());

    if (!place.geometry || !place.geometry.location) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }
  });
}

window.initMap = initMap;
