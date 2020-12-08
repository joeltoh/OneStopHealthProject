 /**
     * Handles the sign in when button press.
     */
    function toggleSignIn() {
      if (firebase.auth().currentUser) {
        // [START signout]
        firebase.auth().signOut();
        // [END signout]
      } else {
        var email = document.getElementById('email').value; //gets the text from email field
        var password = document.getElementById('password').value; //gets the password from password field
        if (email.length < 4) { //checks if email is longer than 4 chars
          alert('Please enter an email address.'); //else prompt an alert
          return;
        }
        if (password.length < 4) { //prompt is password is longer than 4 chars 
          alert('Please enter a password.'); //else prompts an alert
          return;
        }
        // Sign in with email and pass.
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // [START_EXCLUDE]
          if (errorCode === 'auth/wrong-password') {
            alert('Either Email or Password is invalid. Please try again. ');
          } else {
            alert('Either Email or Password is invalid. Please try again. ');
          }
          console.log(error);
          document.getElementById('quickstart-sign-in').disabled = false;
          // [END_EXCLUDE]
        });
        // [END authwithemail]
      }
      document.getElementById('quickstart-sign-in').disabled = true;
    }

    //Main function
    function initApp() {

      firebase.auth().onAuthStateChanged(function(user) {
        if (user) { // User is signed in.
          window.location = "map.html" //redirect to map.html
        } 
      });
      document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
    }

    window.onload = function() {
      initApp();
    };