var uid;
var entries = new Array();
var role;

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

$.subscribe('dataready/ready',function() {  
    if ( $.fn.DataTable.isDataTable('#TABLE') ) {
  $('#TABLE').DataTable().destroy();
  $('#TABLE').DataTable().empty();
}

    if(role=="superuser"){
        console.log("i am in set timeout 1");
        $('#TABLE').DataTable( {
            data: entries,
            columns: [
                { title: "#" },
                { title: "User ID" },
                { title: "Type" },
                { title: "Location" },
                { title: "Appointment Date" },
                { title: "Time" },
                { title: "Remarks" },
                { title: "Booking Date" },
                { title: "Booking ID" },
                { title: "Status" }
            ]
        } );
    }else{
        console.log("i am in set timeout 2");
        $('#TABLE').DataTable( {
            data: entries,
            columns: [
                { title: "#" },
                { title: "Type" },
                { title: "Location" },
                { title: "Appointment Date" },
                { title: "Time" },
                { title: "Remarks" },
                { title: "Booking Date" },
                { title: "Booking ID" },
                { title: "Status" }
            ]
        } );
    }
});

        function getAppointments(role) {
          
if ( $.fn.DataTable.isDataTable('#TABLE') ) {
  $('#TABLE').DataTable().destroy();
   $('#TABLE').DataTable().empty();
}
            console.log(uid);
            var db = firebase.database();
            var appointmentsRef = db.ref("appointments");

            var count = 0; //To keep track of the array and also for index

            var myTableDiv = document.getElementById("container");
            var table = document.getElementById('TABLE');
            var tableBody = document.getElementById('TBODY');
            var tableHead = document.getElementById('THEAD');

            table.border = '1'
            table.appendChild(tableBody);

           

            var tr = document.createElement('tr');
           

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

            console.log(today);
              if(role=="superuser"){
                var ref3 = appointmentsRef.orderByKey().on("value", function(snapshot) {
                console.log(snapshot.numChildren());
                console.log(snapshot.val());
                snapshot.forEach(function(data) {
                    var id = data.key;
                    data.forEach(function(childData) {
                        //childData.val().status!="Cancelled"
                        if(childData.val().date < today || childData.val().status!="Confirmed"){
                            console.log(childData.val().remarks);
                        entries[count] = new Array(count + 1, id ,childData.val().type, childData.val().location, childData.val().date, childData.val().time, childData.val().remarks, childData.val().bookingdate, childData.getKey(), childData.val().status);
                        console.log(entries[count]);
                        count++;
                    }
                    });
                    for (i = 0; i < entries.length; i++) {
                        var tr = document.createElement('tr');
                        
                        tr.id = "row" + i;

                        for (j = 0; j < entries[i].length; j++) {
                            var td = document.createElement('td');
                            td.appendChild(document.createTextNode(entries[i][j]));
                            tr.appendChild(td)
                        }
                        tableBody.appendChild(tr);
                    }
                    myTableDiv.appendChild(table)

                });
                $.publish('dataready/ready'); //publish observer
            });
               
          }else{
                var ref3 = appointmentsRef.orderByKey().equalTo(uid).on("value", function(snapshot) {
                console.log(snapshot.numChildren());
                console.log(snapshot.val());
                snapshot.forEach(function(data) {
                    data.forEach(function(childData) {
                        //childData.val().status!="Cancelled"
                        if(childData.val().date < today || childData.val().status!="Confirmed"){
                            console.log(childData.val().remarks);
                        entries[count] = new Array(count + 1, childData.val().type, childData.val().location, childData.val().date, childData.val().time, childData.val().remarks, childData.val().bookingdate, childData.getKey(), childData.val().status);
                        console.log(entries[count]);
                        count++;
                    }
                    });
                    for (i = 0; i < entries.length; i++) {
                        var tr = document.createElement('tr');
                        
                        tr.id = "row" + i;

                        for (j = 0; j < entries[i].length; j++) {
                            var td = document.createElement('td');
                            td.appendChild(document.createTextNode(entries[i][j]));
                            tr.appendChild(td)
                        }
                        tableBody.appendChild(tr);
                    }
                    myTableDiv.appendChild(table)
                });
                $.publish('dataready/ready'); //publish
            });
              }
        }

        function initApp() {
            var logoutbtn = document.getElementById('logoutbtn');
            var db = firebase.database();
            var usersRef = db.ref("users");
           
         
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    uid = user.uid;
                    var ref3 =usersRef.orderByKey().once("value", function(snapshot) {
                         snapshot.forEach(function(data) {
                            console.log(role + " inside snapshot initapp");
                            if(uid == data.key){
                                role = data.val().role;
                                console.log(role + " inside initapp")
                                if(role!="superuser")
                                    $(".manager-only").hide();
                                else
                                    $(".user-only").hide();
                                getAppointments(role);
                            }
                         });
                     });
                    
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
            console.log("inside window on load");
            initApp();


        };