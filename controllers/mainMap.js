document.write('script type="text/javascript" src="../public/assets/global/js/firebase.js" ></script>');
document.write('script type="text/javascript" src="../public/assets/pages/js/gmaps.js" ></script>');


$('#central').hide();
$('#southeast').hide();
$('#southwest').hide();
$('#northeast').hide();
$('#northwest').hide();


(function ( $ ){
    var o = $({});

    $.each({
        trigger: 'publish',
        on: 'subscribe',
        off: 'unsubscribe'
    },function(key, val){
        jQuery[val] = function(){
            o[key].apply(o, arguments);
        };
    })
})( jQuery );

var userLocationIcon = '../public/assets/themes/img/bluecircle.png';
var dengueIcon = '../public/assets/themes/img/dengue.png';
var zikaIcon = '../public/assets/themes/img/zika.png';
var chasIcon = '../public/assets/themes/img/chas.png';
var polyclinicIcon = '../public/assets/themes/img/polyclinic.png';
var breastIcon = '../public/assets/themes/img/breast.png';
var bloodIcon = '../public/assets/themes/img/blood.png';
var quitIcon = '../public/assets/themes/img/quit.png';
var userReported = '../public/assets/themes/img/userReported.png';
var name;
var type;
var table = firebase.database().ref('/locations/bloodbank');
var count = 0;
table.on('value', function(snapshot) {

    snapshot.forEach(function() {
        count++;
    });
    //count is now safe to use.

});



var table = firebase.database().ref('/locations/breastscreening');
var breastcount = 0;
table.on('value', function(snapshot) {

    snapshot.forEach(function() {
        breastcount++;
    });
    //count is now safe to use.

});


var table = firebase.database().ref('/locations/chas');
var chascount = 0;
table.on('value', function(snapshot) {

    snapshot.forEach(function() {
        chascount++;
    });
    //count is now safe to use.

});

var table = firebase.database().ref('/locations/quitcentres');
var quitcount = 0;
table.on('value', function(snapshot) {

    snapshot.forEach(function() {
        quitcount++;
    });
    //count is now safe to use.

});

var table = firebase.database().ref('/locations/cervicalscreening');
var cliniccount = 0;
table.on('value', function(snapshot) {

    snapshot.forEach(function() {
        cliniccount++;
    });
    //count is now safe to use.
});

var table = firebase.database().ref('/DengueCases/Central');
var DCcount = 0;
table.on('value', function(snapshot) {

    snapshot.forEach(function() {
        DCcount++;
    });
    //count is now safe to use.

});

var table = firebase.database().ref('/DengueCases/Northeast');
var DNEcount = 0;
table.on('value', function(snapshot) {

    snapshot.forEach(function() {
        DNEcount++;
    });
    //count is now safe to use.

});

var table = firebase.database().ref('/DengueCases/Northwest');
var DNWcount = 0;
table.on('value', function(snapshot) {

    snapshot.forEach(function() {
        DNWcount++;
    });
    //count is now safe to use.

});


var table = firebase.database().ref('/DengueCases/Southeast');
var DSEcount = 0;
table.on('value', function(snapshot) {

    snapshot.forEach(function() {
        DSEcount++;
    });
    //count is now safe to use.

});


var table = firebase.database().ref('/DengueCases/Southwest');
var DSWcount = 0;
table.on('value', function(snapshot) {

    snapshot.forEach(function() {
        DSWcount++;
    });
    //count is now safe to use.

});

var table = firebase.database().ref('/ZIKACases/ZIKA');
var ZIKAcount = 0;
table.on('value', function(snapshot) {
    snapshot.forEach(function() {
        ZIKAcount++;
   });
    //count is now safe to use.
});


var table = firebase.database().ref('/DengueCases/UserCases');
var userDengueCount = 0;
table.on('value', function(snapshot) {
    snapshot.forEach(function() {
        userDengueCount++;
    });
    //count is now safe to use.
});


map = new GMaps({
    div: '#map',
    lat: 1.3017,
    lng: 103.8382,
    zoom: 16
});



GMaps.geolocate({
    success: function(position) {
        map.setCenter(position.coords.latitude, position.coords.longitude);
        map.addMarker({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            icon: userLocationIcon,
            title: "Current Location",
            infoWindow: {
                content: "You are here."
            }
        });
    },
    error: function(error) {
        alert('Geolocation failed: ' + error.message);
    },
    not_supported: function() {
        alert("Your browser does not support geolocation");
    },

});

map.addControl({
    position: 'top_right',
    content: 'Show current location',
    style: {
        margin: '5px',
        padding: '1px 6px',
        border: 'solid 1px #717B87',
        background: '#fff'
    },
    events: {
        click: function() {
            GMaps.geolocate({
                success: function(position) {
                    map.setCenter(position.coords.latitude, position.coords.longitude);
                },
                error: function(error) {
                    alert('Geolocation failed: ' + error.message);
                },
                not_supported: function() {
                    alert("Your browser does not support geolocation");
                }
            });
        }
    }
});



function locate() {



    GMaps.geolocate({
        success: function(position) {
            map.setCenter(position.coords.latitude, position.coords.longitude);


            map.addMarker({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                icon: userLocationIcon,
                title: "Current Location",
                infoWindow: {
                    content: "You are here."
                }
            });

        },
        error: function(error) {
            alert('Geolocation failed: ' + error.message);
        },
        not_supported: function() {
            alert("Your browser does not support geolocation");
        },

    });

    map.setZoom(16);

}

function panOut() {

    map = new GMaps({
        div: '#map',
        lat: 1.3521,
        lng: 103.8198,
        zoom: 12
    });


    map.setCenter('1.3521', '103.8198');
    map.addControl({
        position: 'top_right',
        content: 'Show current location ',
        style: {
            margin: '5px',
            padding: '1px 6px',
            border: 'solid 1px #717B87',
            background: '#fff'
        },
        events: {
            click: function() {
                locate();
            }
        }
    });


}
//fill up this part with database data///////

///////////////////////////

 function clicked(names) {   
            sessionStorage.clear();            
            sessionStorage.setItem('name', names);
            sessionStorage.setItem('type', type);
            console.log("inside clicked name is " + names + " type is " + type);
            window.location = "appointment_new.html"
}


function bloodbank() {
    hideall();

    panOut();


    var i;
    for (i = 0; i < count; i++) {
        var starCountRef = firebase.database().ref('/locations/bloodbank/' + i);
        starCountRef.on('value', function(snapshot) {
            name = snapshot.val().name;
             type = "Blood Bank";

            map.addMarker({
                lat: snapshot.val().latitude,
                lng: snapshot.val().longitude,
                icon: bloodIcon,
                title: 'Dengue1',
                infoWindow: {
                    content: '<p>' + snapshot.val().name + '</p>'+
                '<button onclick="clicked(\''+snapshot.val().name+'\');">Book Appointment</button>'


                }
            });
        });
    }
}


function breastscreening() {
hideall();
    panOut();


    var i;
    for (i = 0; i < breastcount; i++) {
        var starCountRef = firebase.database().ref('/locations/breastscreening/' + i);
        starCountRef.on('value', function(snapshot) {
            name = snapshot.val().name;
            type = "Breast Screening";
            map.addMarker({
                lat: snapshot.val().latitude,
                lng: snapshot.val().longitude,
                icon: breastIcon,
                title: 'Breasts Screening',
                infoWindow: {
                   content: '<p>' + snapshot.val().name + '</p>'+
                '<button onclick="clicked(\''+snapshot.val().name+'\');">Book Appointment</button>'

                }
            });
        });
    }
}



function chas() {
    hideall();
    panOut();


    var i;
    for (i = 0; i < chascount; i++) {
        var starCountRef = firebase.database().ref('/locations/chas/' + i);
        starCountRef.on('value', function(snapshot) {
            name = snapshot.val().name;
            type = "CHAS";
            map.addMarker({
                lat: snapshot.val().latitude,
                lng: snapshot.val().longitude,
                icon: chasIcon,
                title: 'CHAS',
                infoWindow: {
                   content: '<p>' + snapshot.val().name + '</p>'+
                '<button onclick="clicked(\''+snapshot.val().name+'\');">Book Appointment</button>'


                }
            });
        });
    }

}

function quitCentre() {
    hideall();
    panOut();


    var i;
    for (i = 0; i < quitcount; i++) {
        var starCountRef = firebase.database().ref('/locations/quitcentres/' + i);
        starCountRef.on('value', function(snapshot) {
            name = snapshot.val().name;
            type = "Quit";
            map.addMarker({
                lat: snapshot.val().latitude,
                lng: snapshot.val().longitude,
                icon: quitIcon,
                title: 'Quit Centres',
                infoWindow: {
                   content: '<p>' + snapshot.val().name + '</p>'+
                '<button onclick="clicked(\''+snapshot.val().name+'\');">Book Appointment</button>'


                }
            });
        });
    }
}


function clinic() {
    hideall();
    panOut();

    var i;
    for (i = 0; i < cliniccount; i++) {
        var starCountRef = firebase.database().ref('/locations/cervicalscreening/' + i);
        starCountRef.on('value', function(snapshot) {
            name = snapshot.val().name;
            type = "Polyclinics";
            map.addMarker({
                lat: snapshot.val().latitude,
                lng: snapshot.val().longitude,
                icon: polyclinicIcon,
                title: 'Clinic',
                infoWindow: {
                   content: '<p>' + snapshot.val().name + '</p>'+
                '<button onclick="clicked(\''+snapshot.val().name+'\');">Book Appointment</button>'

                }
            });
        });
    }
}



function dengueCentral() {
    panOut();

$('#central').show();
$('#southeast').hide();
$('#southwest').hide();
$('#northeast').hide();
$('#northwest').hide();
    var i;
    for (i = 0; i < DCcount + 1; i++) {
        var starCountRef = firebase.database().ref('/DengueCases/Central/' + i);
        starCountRef.on('value', function(snapshot) {


if(snapshot.val().name == "")
{
     map.addMarker({
                lat: snapshot.val().latitude,
                lng: snapshot.val().longitude,
                icon: dengueIcon,
                title: 'Clinic',
                infoWindow: {
                   content: "Retrived from data.gov.sg" 
                }
            });
}

else
{

      map.addMarker({
                lat: snapshot.val().latitude,
                lng: snapshot.val().longitude,
                icon: userReported,
                title: 'Clinic',
                infoWindow: {
                   content: snapshot.val().name 
                }

            });
}
           
        });
    }



}

function dengueNortheast() {
    $('#central').hide();
$('#southeast').hide();
$('#southwest').hide();
$('#northeast').show();
$('#northwest').hide();
    panOut();

    var i;
    for (i = 0; i < DNEcount + 1; i++) {
        var starCountRef = firebase.database().ref('/DengueCases/Northeast/' + i);
        starCountRef.on('value', function(snapshot) {

          if(snapshot.val().name == "")
{
     map.addMarker({
                lat: snapshot.val().latitude,
                lng: snapshot.val().longitude,
                icon: dengueIcon,
                title: 'Clinic',
                infoWindow: {
                   content: "Retrived from data.gov.sg" 
                }
            });
}

else
{

      map.addMarker({
                lat: snapshot.val().latitude,
                lng: snapshot.val().longitude,
                icon: userReported,
                title: 'Clinic',
                infoWindow: {
                   content: snapshot.val().name 
                }
            });
}
        });
    }



}


function dengueNorthwest() {
    $('#central').hide();
$('#southeast').hide();
$('#southwest').hide();
$('#northeast').hide();
$('#northwest').show();
    panOut();

    var i;
    for (i = 0; i < DNWcount + 1; i++) {
        var starCountRef = firebase.database().ref('/DengueCases/Northwest/' + i);
        starCountRef.on('value', function(snapshot) {

         if(snapshot.val().name == "")
{
     map.addMarker({
                lat: snapshot.val().latitude,
                lng: snapshot.val().longitude,
                icon: dengueIcon,
                title: 'Clinic',
                infoWindow: {
                   content: "Retrived from data.gov.sg" 
                }
            });
}

else
{

      map.addMarker({
                lat: snapshot.val().latitude,
                lng: snapshot.val().longitude,
                icon: userReported,
                title: 'Clinic',
                infoWindow: {
                   content: snapshot.val().name 
                }

            });
}
        });
    }

}


function dengueSoutheast() {
    $('#central').hide();
$('#southeast').show();
$('#southwest').hide();
$('#northeast').hide();
$('#northwest').hide();
    panOut();

    var i;
    for (i = 0; i < DSEcount + 1; i++) {
        var starCountRef = firebase.database().ref('/DengueCases/Southeast/' + i);
        starCountRef.on('value', function(snapshot) {


          if(snapshot.val().name == "")
{
     map.addMarker({
                lat: snapshot.val().latitude,
                lng: snapshot.val().longitude,
                icon: dengueIcon,
                title: 'Clinic',
                infoWindow: {
                   content: "Retrived from data.gov.sg" 
                }
            });
}

else
{

      map.addMarker({
                lat: snapshot.val().latitude,
                lng: snapshot.val().longitude,
                icon: userReported,
                title: 'Clinic',
                infoWindow: {
                   content: snapshot.val().name 
                }

            });
}
        });
    }

}


function dengueSouthwest() {
    $('#central').hide();
$('#southeast').hide();
$('#southwest').show();
$('#northeast').hide();
$('#northwest').hide();
    panOut();

    var i;
    for (i = 0; i < DSWcount + 1; i++) {
        var starCountRef = firebase.database().ref('/DengueCases/Southwest/' + i);
        starCountRef.on('value', function(snapshot) {


        if(snapshot.val().name == "")
{
     map.addMarker({
                lat: snapshot.val().latitude,
                lng: snapshot.val().longitude,
                icon: dengueIcon,
                title: 'Clinic',
                infoWindow: {
                   content: "Retrived from data.gov.sg" 
                }
            });
}

else
{

      map.addMarker({
                lat: snapshot.val().latitude,
                lng: snapshot.val().longitude,
                icon: userReported,
                title: 'Clinic',
                infoWindow: {
                   content: snapshot.val().name 
                }

            });
}
        });
    }

}


function zika()
{
    hideall();
  
   panOut();

    var i;
    for(i=0; i < ZIKAcount + 1; i++)
    {
    var starCountRef = firebase.database().ref('/ZIKACases/ZIKA/' + i);
    starCountRef.on('value', function(snapshot) {


     if(snapshot.val().name == "")
{
     map.addMarker({
                lat: snapshot.val().latitude,
                lng: snapshot.val().longitude,
                icon: zikaIcon,
                title: 'Clinic',
                infoWindow: {
                   content: "Retrived from data.gov.sg" 
                }
            });
}

else
{

      map.addMarker({
                lat: snapshot.val().latitude,
                lng: snapshot.val().longitude,
                icon: userReported,
                title: 'Clinic',
                infoWindow: {
                   content: snapshot.val().name 
                }

            });
}
                 });
               }

}


$.subscribe('dataready/ready2',function(e, count) {
  console.log("inside toastr" + count);
toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": false,
  "progressBar": false,
  "positionClass": "toast-top-right",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": 0,
  "extendedTimeOut": 0,
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut",
  "tapToDismiss": true
}
toastr.success('You have ' + count + " appointments today", "Reminder");    
});

function logout() {
  var logoutbtn = document.getElementById('logoutbtn2');
  var uid;
  var role;
  var db = firebase.database();
  var usersRef = db.ref("users");

 firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        var uid = user.uid;
        var ref3 =usersRef.orderByKey().once("value", function(snapshot) {
             snapshot.forEach(function(data) {
                console.log(role + " inside snapshot initapp");
                if(uid == data.key){
                    role = data.val().role;
                    if(role!="superuser")
                        $(".manager-only").hide();
                    else
                        $(".user-only").hide();
                }
             });
         });
        var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1; //January is 0!
            var yyyy = today.getFullYear();
            if(dd<10) {
                dd='0'+dd
            } 

            if(mm<10) {
                mm='0'+mm
            } 

            today = dd+'/'+mm+'/'+yyyy;
         var count = 0;
   var appointmentsRef = db.ref("appointments");
    var ref3 =appointmentsRef.orderByKey().equalTo(uid).on("value", function(snapshot) {
         snapshot.forEach(function(data) {
                            data.forEach(function(childData) {
                                console.log(childData.val().date);
                                console.log(today);
                                 if(childData.val().date == today && childData.val().status!="Cancelled"){
                                    count++;
                                    console.log(count + "inside the if loop");
                                 }
                            });
                        });
         $.publish('dataready/ready2', count);
        });


   
      uid = user.uid;
      console.log("inside the logout auth")
        logoutbtn.addEventListener('click', function() {
            firebase.auth().signOut();
            window.location = "index.html"
            });
      } else {
        window.location = "index.html";
        

      }
    });
  }
  
 window.onload = function() {   
 console.log("inside the onload");     
      logout();
}






function hideall()
{

$('#central').hide();
$('#southeast').hide();
$('#southwest').hide();
$('#northeast').hide();
$('#northwest').hide();
}