var uid;
var entries = new Array();
var role;

//observer pattern
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
                { title: "Status" },
                { title: "Actions" }
            ]
        } );
    }else{
  
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
                { title: "Status" },
                { title: "Actions" }
            ]
        } );
    }
});
  


        $('#TABLE').on('draw.dt', function() {
            if(entries.length >0){
                 console.log("i am in page change");
        var table = document.getElementById('TABLE');
        for (var r = 1, n = table.rows.length; r < n; r++) {
            for (var c = 0, m = table.rows[r].cells.length; c < m; c++) {
                if(c==(table.rows[r].cells.length-1)){   
                table.rows[r].cells[c].innerHTML = '<div class="btn-group"><button class="btn btn-xs green dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false"> Actions <i class="fa fa-angle-down"></i></button>'+
                                '<ul class="dropdown-menu" role="menu"><li><a href="javascript:;"><i class="icon-docs"></i> Edit </a></li><li><a onclick="clicked(this.parentNode.parentNode.parentNode.parentNode.parentNode);"><i onclick="clicked(this);" class="icon-tag"></i> Cancel Appointment </a></li></ul></div>';
                }
            }
        }
            }
        });
       


       function clicked(evt) {
            var bookingid;
            var userid;
            console.log(evt);
            if(role=="superuser"){
                 //console.log(evt.cells[1]);
                userid = evt.cells[1].innerHTML;
                console.log(userid + " inside superuser clicked event");
                bookingid = evt.cells[8].innerHTML;
                //console.log(evt.cells[8].innerHTML);
                //bookingid == evt.cells[8].innerHTML;
                
                console.log(bookingid + " bookingid");
            }else{
                bookingid = evt.cells[7].innerHTML;
                userid = uid;
                console.log(userid + " inside not superuser else clicked event");
            }
            //console.log(bookingid);
            sessionStorage.setItem('bookingid', bookingid);
            sessionStorage.setItem('userid', userid);
           window.location = "appointment_cancel.html"
        }



        function getCurrentAppointments(role) {
                if ( $.fn.DataTable.isDataTable('#TABLE') ) {
  $('#TABLE').DataTable().destroy();
  $('#TABLE').DataTable().empty();
}
            console.log(uid);
            
            var db = firebase.database();
            var appointmentsRef = db.ref("appointments");
             //To store the appointment entries
            var count = 0; //To keep track of the array and also for index

            var myTableDiv = document.getElementById("container");
            var table = document.getElementById('TABLE');
            var tableBody = document.getElementById('TBODY');
            var tableHead = document.getElementById('THEAD');
            console.log("i am in getCurrentAppointments after table declaration")

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
            if(role=="superuser"){
                console.log("i am in superuser");
                 var ref3 = appointmentsRef.orderByKey().on("value", function(snapshot) {
                snapshot.forEach(function(data) {
                     var id = data.key;
                    data.forEach(function(childData) {
                        if(childData.val().date >= today && childData.val().status!="Cancelled"){
                        entries[count] = new Array(count + 1, id ,childData.val().type, childData.val().location, childData.val().date, childData.val().time, childData.val().remarks, childData.val().bookingdate, childData.getKey(), childData.val().status,"");
                        count++;
                    }
                    });
                    for (i = 0; i < entries.length; i++) {
                        var tr = document.createElement('tr');
                        tr.id = "row" + i;
                        for (j = 0; j < entries[i].length; j++) {
                            var td = document.createElement('td');
                            td.appendChild(document.createTextNode(entries[i][j]));
                            tr.appendChild(td);
                        }
                        tableBody.appendChild(tr);
                    }
                    myTableDiv.appendChild(table)
                });
                 $.publish('dataready/ready'); //publish observer
            });
            }else{
                console.log("i am not in superuser");
                 var ref3 = appointmentsRef.orderByKey().equalTo(uid).on("value", function(snapshot) {
                snapshot.forEach(function(data) {
                    data.forEach(function(childData) {
                        if(childData.val().date >= today && childData.val().status!="Cancelled"){
                        entries[count] = new Array(count + 1, childData.val().type, childData.val().location, childData.val().date, childData.val().time, childData.val().remarks, childData.val().bookingdate, childData.getKey(), childData.val().status,"");
                        count++;
                    }
                    });
                    for (i = 0; i < entries.length; i++) {
                        var tr = document.createElement('tr');
                        tr.id = "row" + i;
                        for (j = 0; j < entries[i].length; j++) {
                            var td = document.createElement('td');
                            td.appendChild(document.createTextNode(entries[i][j]));
                            tr.appendChild(td);
                        }
                        tableBody.appendChild(tr);
                    }
                    myTableDiv.appendChild(table)
                });
                $.publish('dataready/ready'); //publish observer
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
                    console.log(uid + "<- uid");
                     var ref3 =usersRef.orderByKey().once("value", function(snapshot) {
                         snapshot.forEach(function(data) {
                            console.log(role + " inside snapshot initapp");
                            if(uid == data.key){
                                role = data.val().role;
                                if(role!="superuser")
                                    $(".manager-only").hide();
                                else
                                    $(".user-only").hide();
                                getCurrentAppointments(role);
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
            initApp();
        };