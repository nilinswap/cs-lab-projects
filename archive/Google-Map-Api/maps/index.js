var map = L.map("map").setView([12.884409867033956, 77.70994971835172], 13);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);


var marker = L.marker([12.884409867033956, 77.70994971835172]).addTo(map);

// var circle = L.circle([12.884409867033956, 77.70994971835172], {
//   color: "red",
//   fillColor: "#f03",
//   fillOpacity: 0.5,
//   radius: 700,
// }).addTo(map);

var popup = L.popup();

function onMapClick(e) {
  popup
    .setLatLng(e.latlng)
    .setContent("You clicked the map at " + e.latlng.toString())
    .openOn(map);
}

map.on("click", onMapClick);


var bicycleRental = {
  type: "Feature",
  properties: {
    popupContent: "Coors Field",
  },
  geometry: {
    type: "Point",
    coordinates: [12.886083254115144, 78.70889829252276],
  },
};


const baseballIcon = L.icon({
  iconUrl: "baseball-marker.png",
  iconSize: [32, 37],
  iconAnchor: [16, 37],
  popupAnchor: [0, -28],
});

function onEachFeature(feature, layer) {
  let popupContent = `<p>I started out as a GeoJSON ${feature.geometry.type}, but now I'm a Leaflet vector!</p>`;

  if (feature.properties && feature.properties.popupContent) {
    popupContent += feature.properties.popupContent;
  }

  layer.bindPopup(popupContent);
}

const coorsLayer = L.geoJSON(bicycleRental, {
  pointToLayer(feature, latlng) {
    return L.marker(latlng, { icon: baseballIcon });
  },

  onEachFeature,
}).addTo(map);