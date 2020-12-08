var uid;
var entries = new Array();

$(document).ready(function() {
    setTimeout(function () {
        console.log("i am in set timeout");
        $('#TABLE').DataTable( {
            data: entries,
            columns: [
                { title: "#" },
                { title: "Latitude" },
                { title: "Longitude" },
                { title: "Types" },
                { title: "Remarks" },
                { title: "Status" },
                { title: "Cases ID" },
                { title: "Actions" }
            ]
        } );
    },2500);
        
        console.log(entries.length + " entries length");

        
} );

$('#TABLE').on('draw.dt', function() {
            if(entries.length >0){
                 console.log("i am in page change");
        var table = document.getElementById('TABLE');
        for (var r = 1, n = table.rows.length; r < n; r++) {
            for (var c = 0, m = table.rows[r].cells.length; c < m; c++) {
                if(c==(table.rows[r].cells.length-1)){   
                table.rows[r].cells[c].innerHTML = '<div class="btn-group"><button class="btn btn-xs green dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false"> Actions <i class="fa fa-angle-down"></i></button>'+
                                '<ul class="dropdown-menu" role="menu"><li><a href="javascript:;"><a onclick="clicked2(this.parentNode.parentNode.parentNode.parentNode.parentNode);"><i onclick="clicked2(this);"<i class="icon-docs"></i> Approve </a></li><li><a onclick="clicked(this.parentNode.parentNode.parentNode.parentNode.parentNode);"><i onclick="clicked2(this);" class="icon-tag"></i> Cancel Cases </a></li></ul></div>';
                }
            }
        }
            }
        });

    var count25 = 0;
 var table3 = firebase.database().ref('/ZIKACases/ZIKA');
                     
                        table3.on('value', function(snapshot) {

                        snapshot.forEach(function() {
                        count25++;
                    });
                     });


    function clicked(evt) {
            var tbody = document.getElementById('TBODY');
            var casesid;
            casesid = evt.cells[6].innerHTML;
               console.log(casesid);
            //sessionStorage.setItem('bookingid', bookingid);
          //  window.location = "appointment_cancel.html"
                    var db2 = firebase.database();
                    var cases2Ref = db2.ref("Cases");
                     cases2Ref.child(uid).child(casesid).update({status: "Cancelled"});
                     alert("The case has been cancelled!");
                     window.location.reload();
                     


        }

 function clicked2(evt) {


            var tbody = document.getElementById('TBODY');
            var count = 0;
            var casesid;
            casesid = evt.cells[6].innerHTML;
            var type = evt.cells[3].innerHTML;
            var latitude;
            latitude = evt.cells[1].innerHTML;
            var longitude;
            longitude = evt.cells[2].innerHTML;
               console.log(casesid);
            //sessionStorage.setItem('bookingid', bookingid);
          //  window.location = "appointment_cancel.html"
                    var db2 = firebase.database();
                    var dengues2Ref = db2.ref("ZikaCases");
                     var cases2Ref = db2.ref("Cases");
                 
                     if (type == 'Zika'){

                     cases2Ref.child(uid).child(casesid).update({status: "Approved"});
                     alert("The case has been Approved!");
                   

                    


                   firebase.database().ref('/ZIKACases/ZIKA/' + (count25+1)).set({
        
                  latitude: latitude,
                    longitude: longitude,
                    name : 'User Reported Cases'
                  }); 

                    window.location.reload();
         }

         else if (type == 'Dengue'){
             window.location = "cases_validate.html";
             sessionStorage.setItem('casesid', casesid);
             sessionStorage.setItem('type', type);
}
  //});


  /*var newPostKey = firebase.database().ref().child('DengueCases').push().key;
   var updates = {};
  updates['/DengueCases/UserCases' + count + '/' + newPostKey] = postData;

 

  return firebase.database().ref().update(updates);*/





        }






    function getCases()
    {

            console.log(uid);
            var db = firebase.database();
            var CasesRef = db.ref("Cases");
             //To store the appointment entries
            var count = 0; //To keep track of the array and also for index

            var myTableDiv = document.getElementById("container");
            var table = document.getElementById('TABLE');
            var tableBody = document.getElementById('TBODY');
            var tableHead = document.getElementById('THEAD');
            console.log("i am in getCases after table declaration")
            
            table.border = '1'
            table.appendChild(tableBody);

            var tr = document.createElement('tr');

            var ref3 = CasesRef.orderByKey().equalTo(uid).on("value", function(snapshot) {
                console.log(snapshot.numChildren());
                console.log(snapshot.val());
                snapshot.forEach(function(data) {
                    data.forEach(function(childData) {
                        //childData.val().status!="Cancelled"

                        if(childData.val().status=="Pending"){
                        entries[count] = new Array(count + 1, childData.val().coordinaresX, childData.val().coordinaresY, childData.val().type, childData.val().remarks, childData.val().status,childData.getKey(),"");
                        count++;
                    }
                    });
                    for (i = 0; i < entries.length; i++) {
                        var tr = document.createElement('tr');
                        
                        tr.id = "row" + i;
                        //tr.addEventListener("click", clicked);
                        //mouseclic.addEventListener("click", clicked);

                        for (j = 0; j < entries[i].length; j++) {
                            var td = document.createElement('td');
                            td.appendChild(document.createTextNode(entries[i][j]));
                            tr.appendChild(td);
                            //if(j==entries[i].length-1){   
                                //console.log("I am in innerHTML");
  
                                 //td.innerHTML = '<div class="btn-group"><button class="btn btn-xs green dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false"> Actions <i class="fa fa-angle-down"></i></button>'+
                                 //                       '<ul class="dropdown-menu" role="menu"><li><a href="javascript:;"><i class="icon-docs"></i> Edit </a></li><li><a onclick="clicked(this.parentNode.parentNode.parentNode.parentNode.parentNode);"><i onclick="clicked(this);" class="icon-tag"></i> Cancel Appointment </a></li></ul></div>';
                                
                               // tr.appendChild(document.createTextNode("hello"));
                            //}
                        }
                        tableBody.appendChild(tr);
                    }
                    myTableDiv.appendChild(table)
                });


                console.log(entries.length + "entries length");

            });




    };


    function initApp() {
            var role;
            var db = firebase.database();
            var usersRef = db.ref("users");
            var logoutbtn = document.getElementById('logoutbtn2');
            
            firebase.auth().onAuthStateChanged(function(user) {
  
                if (user) {
                    uid = user.uid;
                    console.log("I am in initApp")
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
                    getCases();
                    logoutbtn.addEventListener('click', function() {
                        firebase.auth().signOut();
                        window.location = "cases_manage.html"
                    });

                } else {
                    window.location = "index.html";
                }
            });
        }

        window.onload = function() {
            initApp();
        };