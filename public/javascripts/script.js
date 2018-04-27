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
      console.log(oneActivity);
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

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

$("body > div.wrapper-final-message > div > div:nth-child(1) > button").click(function(){
  $(".culture1").slideToggle(1500)
});

$("body > div.wrapper-final-message > div > div.restaurant > button").click(function(){
  $(".restaurant1").slideToggle(1500)
});

$("body > div.wrapper-final-message > div > div.sport > button").click(function(){
  $(".sport1").slideToggle(1500)
});

$("body > div.wrapper-final-message > div > div.hotel > button").click(function(){
  $(".hotel1").slideToggle(1500)
});


$("body > div.wrapper-final-message > div > form > button:nth-child(1)").click(function(){
  $(".form").slideToggle(1500)
});

// LINK MARKER 


function initialize() {
  var styles = {
      'monTheme': [
      {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{'visibility': 'simplified'}]
      }, {
          featureType: 'road.arterial',
          stylers: [
              {hue: 149},
              {saturation: -78},
              {lightness: 0}
          ]
      }, {
          featureType: 'road.highway',
          stylers: [
              {hue: -31},
              {saturation: -40},
              {lightness: 2.8}
          ]
      }, {
          featureType: 'poi',
          elementType: 'label',
          stylers: [{'visibility': 'off'}]
      }, {
          featureType: 'landscape',
          stylers: [
              {hue: 163},
              {saturation: -26},
              {lightness: -1.1}
          ]
      }, {
          featureType: 'transit',
          stylers: [{'visibility': 'off'}]
      }, {
          featureType: 'water',
          stylers: [
              {hue: 3},
              {saturation: -24.24},
              {lightness: -38.57}
          ]
      }
  ]};

  var mapOptions = {
      zoom: 6,
      center: new google.maps.LatLng(48,2),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true,
      mapTypeId: 'monTheme'
  }
  var map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
  var styledMapType = new google.maps.StyledMapType(styles['monTheme'], {name: 'monTheme'});
  map.mapTypes.set('monTheme', styledMapType);

  var myLatLng = new google.maps.LatLng(48.583148,7.747882);
  var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      icon: 'star.png',
      title: 'Strasbourg'
  });

  var myLatLng2 = new google.maps.LatLng(47.218371,-1.553621);
  var marker2 = new google.maps.Marker({
      position: myLatLng2,
      map: map,
      icon: 'flag.png',
      title: 'Nantes'
  });

  var directionsService = new google.maps.DirectionsService();
  var directionsDisplay = new google.maps.DirectionsRenderer({ 'map': map });
  var request = {
      origin : myLatLng,
      destination: myLatLng2,
      travelMode : google.maps.DirectionsTravelMode.DRIVING,
      unitSystem: google.maps.DirectionsUnitSystem.METRIC
  };
  directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
          directionsDisplay.setOptions({'suppressMarkers':true});
      }
  });
}