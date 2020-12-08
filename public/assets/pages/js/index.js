function verifyUser() {
    var logoutbtn = document.getElementById('logoutbtn2');

    firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
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
        var uid = user.uid;
         var db = firebase.database();
         var count = 0;
   var appointmentsRef = db.ref("appointments");
    var ref3 =appointmentsRef.orderByKey().equalTo(uid).on("value", function(snapshot) {
         snapshot.forEach(function(data) {
                            data.forEach(function(childData) {
                                console.log(childData.val().date);
                                 if(childData.val().date == today && childData.val().status!="Cancelled"){
                                    count++;
                                 }
                            });
                        });
   });
          setTimeout(function () {
        console.log(count);

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
  },1550);
       


        logoutbtn.addEventListener('click', function() {
            firebase.auth().signOut();
            window.location = "index1.html"
            });
      } else {
        window.location = "index.html";
      }
    });

    
  }
  window.onload = function() {
      verifyUser();
    };