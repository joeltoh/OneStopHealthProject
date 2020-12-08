 function getCases() {
            firebase.auth().onAuthStateChanged(function(user){
                if(user){
                    var uid = user.uid;
                    console.log(uid);
                    var db = firebase.database();
                    var type2 = sessionStorage.getItem('type');
                    if (type2 == 'Zika'){

                       // document.getElementById('cluster') = 

                    }
                    var CasesRef = db.ref("Cases");
                    var casesid = sessionStorage.getItem('casesid');
                    var ref3 = CasesRef.child(uid).child(casesid).on("value", function(snapshot) {
                         console.log(snapshot.val().type);

                         document.getElementById("casesid").textContent = casesid;
                         document.getElementById("latitude").textContent = snapshot.val().coordinaresX;
                         document.getElementById("longitude").textContent = snapshot.val().coordinaresY;
                         document.getElementById("type").textContent = snapshot.val().type;
                         document.getElementById("remarks").textContent = snapshot.val().remarks;
                    });
                }
            });
        }

        var zikacount = 0;
            var table1 = firebase.database().ref('/ZIKACases/ZIKA');
                     
                        table1.on('value', function(snapshot) {

                        snapshot.forEach(function() {
                        zikacount++;
                    });
                     });






            
          var centralcount = 0;
            var table3 = firebase.database().ref('/DengueCases/Central');
                     
                        table3.on('value', function(snapshot) {

                        snapshot.forEach(function() {
                        centralcount++;
                    });
                     });

            var northeastcount = 0;
            var table4 = firebase.database().ref('/DengueCases/Northeast');
                     
                        table4.on('value', function(snapshot) {

                        snapshot.forEach(function() {
                        northeastcount++;
                    });
                     });

                        var northwestcount = 0;
            var table5 = firebase.database().ref('/DengueCases/Northwest');
                     
                        table5.on('value', function(snapshot) {

                        snapshot.forEach(function() {
                        northwestcount++;
                    });
                     });

                        var southeastcount = 0;
            var table6 = firebase.database().ref('/DengueCases/Southeast');
                     
                        table6.on('value', function(snapshot) {

                        snapshot.forEach(function() {
                        southeastcount++;
                    });
                     });

                        var southwestcount = 0;
            var table7 = firebase.database().ref('/DengueCases/Southwest');
                     
                        table7.on('value', function(snapshot) {

                        snapshot.forEach(function() {
                        southwestcount++;
                    });
                     });




function approveCases(){
            firebase.auth().onAuthStateChanged(function(user){
                if(user){
                    var uid = user.uid;
                     var type = sessionStorage.getItem('type');
                    var cluster = document.getElementById('cluster');
                    var cluster2 =  cluster.options[cluster.selectedIndex].text;
                    console.log(cluster2);
                    var cases2id = sessionStorage.getItem('casesid');
                    console.log(uid);
                       var db2 = firebase.database();
                    var dengues2Ref = db2.ref("DengueCases");
                     var cases2Ref = db2.ref("Cases");
                    console.log("inside approveCases() method");
                   


                    if (type == 'Dengue'){

                   
                        if (cluster2 == 'Central'){
                   firebase.database().ref('/DengueCases/Central/' + (centralcount+1)).set({
        
                    latitude: document.getElementById("latitude").textContent,
                   longitude: document.getElementById("longitude").textContent,
                   name: 'User Reported Cases'
                 });    
                  
               }

               else if (cluster2 == 'North East'){
                    firebase.database().ref('/DengueCases/Northeast/' + (northeastcount+1)).set({
        
                    latitude: document.getElementById("latitude").textContent,
                   longitude: document.getElementById("longitude").textContent,
                   name: 'User Reported Cases'
                 });  
                        
               }

               else if (cluster2 == 'North West'){
                firebase.database().ref('/DengueCases/Northwest/' + (northwestcount+1)).set({
        
                    latitude: document.getElementById("latitude").textContent,
                   longitude: document.getElementById("longitude").textContent,
                   name: 'User Reported Cases'
                 });  
                
            }

                else if (cluster2 == 'South West'){

                   firebase.database().ref('/DengueCases/Southwest/' + (southwestcount+1)).set({
        
                    latitude: document.getElementById("latitude").textContent,
                   longitude: document.getElementById("longitude").textContent,
                   name: 'User Reported Cases'
                 });   
                  
                }
                else if (cluster2 == 'South East'){

                     firebase.database().ref('/DengueCases/Southeast/' + (southeastcount+1)).set({
        
                    latitude: document.getElementById("latitude").textContent,
                   longitude: document.getElementById("longitude").textContent,
                   name: 'User Reported Cases'
                 }); 

                }
            }

            else{

               
                firebase.database().ref('/ZIKACases/ZIKA' + (zikacount+1)).set({
        
                    latitude: document.getElementById("latitude").textContent,
                   longitude: document.getElementById("longitude").textContent,
                   name: 'User Reported Cases'
                 }); 



            }

               
                cases2Ref.child(uid).child(cases2id).update({status: "Approved"});
                    alert("This case has been approved.");

               }
            });
        }
















 function initApp() {
            var uid;
            var role;
            var db = firebase.database();
            var usersRef = db.ref("users");
            var logoutbtn = document.getElementById('logoutbtn2');
            var approvebtn = document.getElementById('approvebtn');

            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    uid = user.uid;
                    console.log("in initapp");
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
                    var scoresRef = db.ref("Cases");

                    approvebtn.addEventListener('click', function() {
                        approveCases();
                        console.log("inside approvelbtn event listener");
                        window.location = ("cases_manage.html")
                    });

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