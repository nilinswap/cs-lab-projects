const unhide = function (id) {
  document.getElementById(id).className = "";
};
export var hello = function () {
  unhide("hello");
  responsiveVoice.speak("Hello this is Swapnil, How are you doing today?");
};

export var helloFunction = function (name) {
  responsiveVoice.speak("Hello " + name + ", How are you doing today?");
};

export var showFlickr = function (tag) {
  unhide("flickrGallery");
  // TODO: do a loader
  fetch(
    `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=a828a6571bb4f0ff8890f7a386d61975&sort=interestingness-desc&per_page=9&format=json&nojsoncallback=1&tags=${tag}`
  )
    .then((res) => res.json())
    .then((res) => jsonFlickrApi(res));
};

var jsonFlickrApi = function (results) {
  var photos = results.photos.photo;
  console.log(photos, "photos");
  photos.forEach((photo) => {
    var newImage = document.createElement("img");
    newImage.src = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_s.jpg`;
    newImage.className = "flickrGallery";
    flickrGallery.appendChild(newImage);
  });
};
