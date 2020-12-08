 document.write('script type="text/javascript" src="../public/assets/global/js/firebase.js" ></script>');
       document.write('script type="text/javascript" src="../public/assets/pages/js/gmaps.js" ></script>');





                  GMaps.geolocate({
                success: function(position){
                  map.setCenter(position.coords.latitude, position.coords.longitude);
                  map.addMarker({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                    title: "Current Location",
                    infoWindow: {
                      content : "You are here."
                    }
                  });
                },
                error: function(error){
                  alert('Geolocation failed: '+error.message);
                },
                not_supported: function(){
                  alert("Your browser does not support geolocation");
                },

              });

        var count = 0;
        var markIndex = 1;

        // Update position


function updatePos()
{
var $index = markIndex;

  $lat = 0;
  $lng = 0;


 

  // Update form values
 

  map.markers[$index].setPosition(new google.maps.LatLng($lat, $lng));


  $marker = $('#markers-with-coordinates').find('li').eq(0).find('a');
  $marker.data('marker-lat', $lat);
  $marker.data('marker-lng', $lng);

  count = 0;
  markIndex ++;
 

}


        $(document).ready(function(){

          map = new GMaps({
            div: '#map',
            lat: 1.3017,
            lng: 103.8382,
            zoom : 18
          });




          GMaps.on('click', map.map, function(event) {
            var index = map.markers.length;
            var lat = event.latLng.lat();
            var lng = event.latLng.lng();

            var template = $('#edit_marker_template').text();

            var content = template.replace(/{{index}}/g, index).replace(/{{lat}}/g, lat).replace(/{{lng}}/g, lng);

if(count > 0)
{
 
  updatePos();
  
  addMarker(lat , lng);
 
}
else {
  map.addMarker({
    lat: lat,
    lng: lng,
    infoWindow: {
      content : "Selected location"
    }
  });
  document.getElementById("latitude").value = lat;
  document.getElementById("longitude").value = lng;
  count++;
}

          });



function addMarker(lat1 , lng1)
{

            

  map.addMarker({
    lat: lat1,
    lng: lng1,
    infoWindow: {
      content : "Selected location"
    }
   
  });
  document.getElementById("latitude").value = lat1;
  document.getElementById("longitude").value = lng1;
  count++;

}


// function logout() {
//   var logoutbtn = document.getElementById('logoutbtn2');
//   var uid;
//  firebase.auth().onAuthStateChanged(function(user) {
//     if (user) {
//       uid = user.uid;
//       console.log("inside the logout auth")
//         logoutbtn.addEventListener('click', function() {
//             firebase.auth().signOut();
//             window.location = "map.html"
//             });
//       } else {
//         window.location = "index.html";
        

//       }
//     });
//   }
  
//  window.onload = function() {   
//  console.log("inside the onload");     
//       logout();
// }

        });

