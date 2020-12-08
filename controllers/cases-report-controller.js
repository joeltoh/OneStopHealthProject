// $('#latitude').hide();
// $('#longitude').hide();


// Initialize Firebase

/*var config = {
  apiKey: "AIzaSyCeXpDI14LUrp8t0CcvUINEI3lwKdUxYYI",
  authDomain: "thediscoverers-99fb8.firebaseapp.com",
  databaseURL: "https://thediscoverers-99fb8.firebaseio.com",
  storageBucket: "",
  messagingSenderId: "207543800231"
};
firebase.initializeApp(config); */

var title = document.getElementById("omg");
var mainText = document.getElementById("text123");
var submitBtn = document.getElementById("button123");

// To write and modiify
function writeUserData(userId, name, email, imageUrl) {
  firebase.database().ref('users/customer/' + userId).set({
    username: name,
    email: email,
    profile_picture : imageUrl
  });
}

        



function writeCasesData(uid, coordinatesX, coordinatesY, types, remarks2)
{
  console.log(uid);
  /*
  var table = firebase.database().ref('/Cases/PendingCases');
  var count = 0;
  table.on('value', function(snapshot) {

         snapshot.forEach(function() {
           count++;
         });
  });
*/
/*
  var clusters = document.getElementById('cluster');
  var cluster2 =  clusters.options[clusters.selectedIndex].text;
  var coordinatesX = document.getElementById('lat').value;
  var coordinatesY = document.getElementById('long').value;
  var types = document.getElementById('case').value;
  var remarks2 = document.getElementById('remarks').value;
*/
  //alert(count);

  //firebase.database().ref('/Cases/PendingCases/' + (count+1)).set({
   var postData = {
    coordinaresX: coordinatesX,
    coordinaresY: coordinatesY,
    type: types,
    remarks: remarks2,
    status: 'Pending'
  };
  //});


  var newPostKey = firebase.database().ref().child('Cases').push().key;
   var updates = {};
  updates['/Cases/' + uid + '/' + newPostKey] = postData;

 

  return firebase.database().ref().update(updates);
   

}

 window.onload = function() {
    var uid;
    firebase.auth().onAuthStateChanged(function(user) {
        if(user){
            uid = user.uid;
            console.log(uid);
        }
    });

var submitbtn = document.getElementById('submitbtn');

submitbtn.addEventListener('click', function() {
  var coordinatesX = document.getElementById('latitude').value;
  var coordinatesY = document.getElementById('longitude').value;
  var type = document.getElementById('types');
  var types =  type.options[type.selectedIndex].text;
  console.log (types);
  var remarks2 = document.getElementById('remarks').value;
  console.log(uid+"line92");
  writeCasesData(uid, coordinatesX, coordinatesY, types, remarks2);
  //alert("This case has been reported.");
  console.log("success");
 
  // NEED TO FIND A WAY TO PUT ----- window.location = "map.html"



  setTimeout(function () {
            window.location = "map.html";
            },2000);
 

});



};


// To read: On (Listen for value events)
function usernameOn(){
  var i;
  for(i=1; i < 4 ; i++)
  {
  var starCountRef = firebase.database().ref('/users/customer/000' + i);
  starCountRef.on('value', function(snapshot) {
    document.getElementById("L" + i).innerHTML = snapshot.val().username;
  });

}
}

// To read: Once (Read data once)
function useremailOnce(){
  return firebase.database().ref('/users/customer/0001').once('value').then(function(snapshot) {
    document.getElementById("omg").innerHTML = snapshot.val().email;
    //window.alert(snapshot.val().email);
  });
}


function logout() {
  var logoutbtn = document.getElementById('logoutbtn2');
  var submitbtn = document.getElementById('submitbtn');
  var uid;
 firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      uid = user.uid;
      submitbtn.addEventListener('click', function() {
  var clusters = document.getElementById('cluster');
  var cluster2 =  clusters.options[clusters.selectedIndex].text;
  var coordinatesX = document.getElementById('latitude').value;
  var coordinatesY = document.getElementById('longitude').value;
  var types = document.getElementById('case').value;
  var remarks2 = document.getElementById('remarks').value;
  console.log(uid+"line92");
  writeCasesData(uid, cluster2, coordinatesX, coordinatesY, types, remarks2);
  console.log("success");

});
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


// function getArray(){





//  for(i=0 ; i< 2 ; i++)
//   {
//   // var starCountRef = firebase.database().ref('/testuser/' + i);
//   // starCountRef.on('value', function(snapshot) {
//   // ar[i] = snapshot.val().name;
// }
// });




//Refer to https://firebase.google.com/docs/database/web/read-and-write for more real-time DB functions
