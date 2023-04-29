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

export var showFlickr = function (tag) {
  $("#flickrGallery").show();
  $("#flickrLoader p")
    .text("Searching for " + tag)
    .fadeIn("fast");
  fetch(
    `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=a828a6571bb4f0ff8890f7a386d61975&sort=interestingness-desc&per_page=9&format=json&nojsoncallback=1&tags=${tag}`
  )
    .then((res) => res.json())
    .then((res) => jsonFlickrApi(res));

  scrollTo("#section_image_search");
};

var jsonFlickrApi = function (results) {
  $("#flickrLoader p").fadeOut("slow");
  var photos = results.photos.photo;
  $.each(photos, function (index, photo) {
    $(document.createElement("img"))
      .attr({
        src:
          "//farm" +
          photo.farm +
          ".staticflickr.com/" +
          photo.server +
          "/" +
          photo.id +
          "_" +
          photo.secret +
          "_s.jpg",
      })
      .addClass("flickrGallery")
      .appendTo(flickrGallery);
  });
};
