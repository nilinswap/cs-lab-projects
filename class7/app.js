function initMap() {
  // Map option

  var options = {
    center: { lat: 12.88, lng: 77.709 },
    zoom: 8,
  };

  //New Map
  map = new google.maps.Map(document.getElementById("map"), options);

  //Add Markers to Array
  let MarkerArray = [
    {
      location: { lat: 12.935337364373487, lng: 77.61693035107422 },

      imageIcon: "https://img.icons8.com/nolan/1x/marker.png",
      content: `<h2>KoraMangala</h2>`,
    },

    {
      location: { lat: 12.901367913243961, lng: 77.7073176552484 },
      content: `<h2>Decathlon</h2>`,
    },
  ];

  // loop through marker
  for (let i = 0; i < MarkerArray.length; i++) {
    addMarker(MarkerArray[i]);
  }


  // Current location marker - 
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      var marker = new google.maps.Marker({
        position: pos,
        map: map,
      });

      map.setCenter(pos);
    });
  }

  // Add Marker

  function addMarker(property) {
    const marker = new google.maps.Marker({
      position: property.location,
      map: map,
      //icon: property.imageIcon
    });

    // Check for custom Icon

    if (property.imageIcon) {
      // set image icon
      marker.setIcon(property.imageIcon);
    }

    if (property.content) {
      const detailWindow = new google.maps.InfoWindow({
        content: property.content,
      });

      marker.addListener("mouseover", () => {
        detailWindow.open(map, marker);
        setTimeout(function () {
          detailWindow.close();
        }, 2000);
      });
    }
  }

  //listen for click on map location
  google.maps.event.addListener(map, "click", (event) => {
    //add Marker
    console.log("ev latlng", event.latLng.lat(), event.latLng.lng());
    addMarker({
      location: event.latLng,
      content: `<h2> ${event.latLng.lat()}, ${event.latLng.lng()}</h2>`,
    });
  });
}




/*
1. add marker to a lat long
2. add marker to current location
3. add marker with description and different icon


*/