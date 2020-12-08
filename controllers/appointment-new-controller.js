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

$.subscribe('dataready/ready',function(e, uid) {
    
     console.log(uid + " uid inside retrieveinfo");
    var name = sessionStorage.getItem('name');
    var type = sessionStorage.getItem('type');
    var typeddl = document.getElementById('type');
    var location = document.getElementById('location');
    var submitbtn = document.getElementById('submitbtn');
    var el = document.createElement("option");
   var date;
   var time;
   var time2;
   var remarks;
   var currentdate;
   var type2;
   var location2;

console.log("name is " + name + " type is " + type);
    sessionStorage.clear();
    var optiontype;
    if(name!=null && type!=null){
        if(type=="Blood Bank"){
            optiontype=4;
            typeddl.options[optiontype].selected = true;
            el.textContent = name;
            el.value = name;
            location.appendChild(el);
            location.options[1].selected = true;
            
          
        }else if(type=="Breast Screening"){
            optiontype=3;
            typeddl.options[optiontype].selected = true;
            el.textContent = name;
            el.value = name;
            location.appendChild(el);
            location.options[1].selected = true;
        }else if(type=="CHAS"){
            optiontype=2;
            typeddl.options[optiontype].selected = true;
            el.textContent = name;
            el.value = name;
            location.appendChild(el);
            location.options[1].selected = true;
        }else if(type=="Quit"){
             optiontype=5;
            typeddl.options[optiontype].selected = true;
            el.textContent = name;
            el.value = name;
            location.appendChild(el);
            location.options[1].selected = true;
        }else if(type=="Polyclinics"){
            console.log("inside polyclinic")
             optiontype=1;
            typeddl.options[optiontype].selected = true;
            el.textContent = name;
            el.value = name;
            location.appendChild(el);
            location.options[1].selected = true;
        }
         submitbtn.addEventListener('click', function() {
            date = document.getElementById('date').value;
            time = document.getElementById('time');
            time2 = time.options[time.selectedIndex].text;
            remarks = document.getElementById('remarks').value;
             currentdate = new Date(); 
            writeNewAppointment(uid, typeddl.options[optiontype].text, location.options[1].text, date, time2, remarks, currentdate);
         
             console.log("success");
             setTimeout(function () {
            window.location = "appointment_manage.html";
            },2000);
        });
       
    }else{
    
      
      
        
     
         submitbtn.addEventListener('click', function() {
            type2 = typeddl.options[typeddl.selectedIndex].text;
            location2 = location.options[location.selectedIndex].text;
            date = document.getElementById('date').value;
            time = document.getElementById('time');
            time2 = time.options[time.selectedIndex].text;
            remarks = document.getElementById('remarks').value;
        writeNewAppointment(uid, type2, location2, date, time2, remarks, currentdate);
        console.log("success");
        window.location = "appointment_manage.html";
        
    });
        
    }


});

function writeNewAppointment(uid, type, location, date, time, remarks, bookingdate) {
  // A post entry.
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

  var postData = {
    type: type,
    location: location,
    date: date,
    time: time,
    remarks: remarks,
    bookingdate: today,
    status: "Confirmed"
  };

  // Get a key for a new Post.
  var newPostKey = firebase.database().ref().child('appointments').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/appointments/' + uid + '/' + newPostKey] = postData;

   
  return firebase.database().ref().update(updates);


}

function onSelect(){


        
        var db = firebase.database();
        var locationsRef = db.ref("locations");
        var submitbtn = document.getElementById('submitbtn');
        var type = document.getElementById('type');
        var type2 = type.options[type.selectedIndex].value;
        var location = document.getElementById('location');

         var i;
    for(i = location.options.length - 1 ; i >= 1 ; i--)
    {
        location.remove(i);
    }



                            var ref3 = locationsRef.child(type2).orderByChild("name").on("value", function(snapshot) {
                    snapshot.forEach(function (child) {
                        console.log(child.val().name);

                        var el = document.createElement("option");
                        el.textContent = child.val().name;
                        el.value = child.val().name;
                        location.appendChild(el);
                    });
                });
}



   window.onload = function() {
    var uid;
    var role;
    var db = firebase.database();
    var usersRef = db.ref("users");
    var logoutbtn = document.getElementById('logoutbtn');
 
    firebase.auth().onAuthStateChanged(function(user) {
        if(user){
            uid = user.uid;
            console.log(uid);
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
            $.publish('dataready/ready', uid);
            logoutbtn.addEventListener('click', function() {
                        firebase.auth().signOut();
                        window.location = "index.html"
                    });
        }else {
                    window.location = "index.html";
                }
    });

     
   //setTimeout(function () {
    //    retrieveInfo(uid);
   // },2000);

};