// Initialize Firebase
var config = {
  apiKey: "AIzaSyCeXpDI14LUrp8t0CcvUINEI3lwKdUxYYI",
  authDomain: "thediscoverers-99fb8.firebaseapp.com",
  databaseURL: "https://thediscoverers-99fb8.firebaseio.com",
  storageBucket: "",
  messagingSenderId: "207543800231"
};
firebase.initializeApp(config);

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



// function getArray(){





//  for(i=0 ; i< 2 ; i++)
//   {
//   // var starCountRef = firebase.database().ref('/testuser/' + i);
//   // starCountRef.on('value', function(snapshot) {
//   // ar[i] = snapshot.val().name;
// }
// });




//Refer to https://firebase.google.com/docs/database/web/read-and-write for more real-time DB functions
