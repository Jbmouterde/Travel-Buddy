// document.addEventListener(
//   "DOMContentLoaded",
//   () => {
//     console.log("IronGenerator JS imported successfully!");
//   },
//   false
// );
// alert();

//////

//////

const mapDiv = document.querySelector(".my-map");

const map = new google.maps.Map(mapDiv, {
  zoom: 13,
  center: {
    lat: 48.866667,
    lng: 2.333333
  }
  
});

new google.maps.Marker({
  position: {
    lat: 48.866667,
    lng: 2.333333
  },
  map: map,
  title: "Paris, France",
  animation: google.maps.Animation.DROP,
  // animation: google.maps.Animation.BOUNCE

});

// new google.maps.Marker({
//   position: {
//     lat: 49.866667,
//     lng: 2.333333
//   },
//   map: map,
//   title: "Paris, France",
//   animation: google.maps.Animation.DROP,
//   // animation: google.maps.Animation.BOUNCE

// });

navigator.geolocation.getCurrentPosition(result => {
  const { latitude, longitude } = result.coords;

  map.setCenter({ lat: latitude, lng: longitude });
  new google.maps.Marker({
    position: { lat: latitude, lng: longitude },
    map: map,
    title: "Your Location",
    animation: google.maps.Animation.DROP,
  });
});

// retrieve restaurant data from our backend
axios
  .get("/act/data")
  .then(response => {
    const activityList = response.data;
    console.log("tata");
    activityList.forEach(oneActivity => {
      console.log(oneActivity)
      const [lat, lng] = oneActivity.nameOfActivity.coordinates;
      new google.maps.Marker({
        position: { lat, lng },
        map: map,
        
        animation: google.maps.Animation.DROP,

        
      });

    });
  })
  .catch(err => {
    alert("Something went wrong! 💩");
  });



const locationInput = document.querySelector(".location-input");
const latInput = document.querySelector(".lat-input");
const lngInput = document.querySelector(".lng-input");

const autocomplete = new google.maps.places.Autocomplete(locationInput);

autocomplete.addListener("place_changed", () => {
  const place = autocomplete.getPlace();
  const loc = place.geometry.location;

  latInput.value = loc.lat();
  lngInput.value = loc.lng();
});
