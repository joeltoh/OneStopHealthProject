var cronJob = require('cron').CronJob;
var entries = new Array();
var count = 0;
var nodemailer = require('nodemailer');
var mailTransport = nodemailer.createTransport('smtps://thediscoverersjoel%40gmail.com:'+"thediscoverers@"+'@smtp.gmail.com');
var firebase = require("firebase");

var strVar="";
strVar += "<!DOCTYPE html PUBLIC \"-\/\/W3C\/\/DTD XHTML 1.0 Strict\/\/EN\" \"http:\/\/www.w3.org\/TR\/xhtml1\/DTD\/xhtml1-strict.dtd\">";
strVar += "<html";
strVar += " xmlns=\"http:\/\/www.w3.org\/1999\/xhtml\">";
strVar += " <head>";
strVar += "   <meta http-equiv=\"Content-Type\" content=\"text\/html; charset=utf-8\" \/>";
strVar += "   <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"\/>";
strVar += "   <title>Simples-Minimalistic Responsive Template<\/title>";
strVar += "   <style type=\"text\/css\">";
strVar += "         \/* Client-specific Styles *\/";
strVar += "         #outlook a {padding:0;} \/* Force Outlook to provide a \"view in browser\" menu link. *\/";
strVar += "         body{width:100% !important; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; margin:0; padding:0;}";
strVar += "         \/* Prevent Webkit and Windows Mobile platforms from changing default font sizes, while not breaking desktop design. *\/";
strVar += "         .ExternalClass {width:100%;} \/* Force Hotmail to display emails at full width *\/";
strVar += "         .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {line-height: 100%;} \/* Force Hotmail to display normal line spacing.*\/";
strVar += "         #backgroundTable {margin:0; padding:0; width:100% !important; line-height: 100% !important;}";
strVar += "         img {outline:none; text-decoration:none;border:none; -ms-interpolation-mode: bicubic;}";
strVar += "         a img {border:none;}";
strVar += "         .image_fix {display:block;}";
strVar += "         p {margin: 0px 0px !important;}";
strVar += "         table td {border-collapse: collapse;}";
strVar += "         table { border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; }";
strVar += "         a {color: #0a8cce;text-decoration: none;text-decoration:none!important;}";
strVar += "         \/*STYLES*\/";
strVar += "         table[class=full] { width: 100%; clear: both; }";
strVar += "         \/*IPAD STYLES*\/";
strVar += "         @media only screen and (max-width: 640px) {";
strVar += "         a[href^=\"tel\"], a[href^=\"sms\"] {";
strVar += "         text-decoration: none;";
strVar += "         color: #0a8cce; \/* or whatever your want *\/";
strVar += "         pointer-events: none;";
strVar += "         cursor: default;";
strVar += "         }";
strVar += "         .mobile_link a[href^=\"tel\"], .mobile_link a[href^=\"sms\"] {";
strVar += "         text-decoration: default;";
strVar += "         color: #0a8cce !important;";
strVar += "         pointer-events: auto;";
strVar += "         cursor: default;";
strVar += "         }";
strVar += "         table[class=devicewidth] {width: 440px!important;text-align:center!important;}";
strVar += "         table[class=devicewidthinner] {width: 420px!important;text-align:center!important;}";
strVar += "         img[class=banner] {width: 440px!important;height:220px!important;}";
strVar += "         img[class=colimg2] {width: 440px!important;height:220px!important;}";
strVar += "         ";
strVar += "         ";
strVar += "         }";
strVar += "         \/*IPHONE STYLES*\/";
strVar += "         @media only screen and (max-width: 480px) {";
strVar += "         a[href^=\"tel\"], a[href^=\"sms\"] {";
strVar += "         text-decoration: none;";
strVar += "         color: #0a8cce; \/* or whatever your want *\/";
strVar += "         pointer-events: none;";
strVar += "         cursor: default;";
strVar += "         }";
strVar += "         .mobile_link a[href^=\"tel\"], .mobile_link a[href^=\"sms\"] {";
strVar += "         text-decoration: default;";
strVar += "         color: #0a8cce !important; ";
strVar += "         pointer-events: auto;";
strVar += "         cursor: default;";
strVar += "         }";
strVar += "         table[class=devicewidth] {width: 280px!important;text-align:center!important;}";
strVar += "         table[class=devicewidthinner] {width: 260px!important;text-align:center!important;}";
strVar += "         img[class=banner] {width: 280px!important;height:140px!important;}";
strVar += "         img[class=colimg2] {width: 280px!important;height:140px!important;}";
strVar += "         td[class=mobile-hide]{display:none!important;}";
strVar += "         td[class=\"padding-bottom25\"]{padding-bottom:25px!important;}";
strVar += "        ";
strVar += "         }";
strVar += "      <\/style>";
strVar += " <\/head>";
strVar += " <body>";
strVar += "   <!-- Start of preheader -->";
strVar += "   <table width=\"100%\" bgcolor=\"#ffffff\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" id=\"backgroundTable\" st-sortable=\"preheader\" >";
strVar += "     <tbody>";
strVar += "       <tr>";
strVar += "         <td>";
strVar += "           <table width=\"600\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\" class=\"devicewidth\">";
strVar += "             <tbody>";
strVar += "               <tr>";
strVar += "                 <td width=\"100%\">";
strVar += "                   <table width=\"600\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\" class=\"devicewidth\">";
strVar += "                     <tbody>";
strVar += "                       <!-- Spacing -->";
strVar += "                       <tr>";
strVar += "                         <td width=\"100%\" height=\"10\"><\/td>";
strVar += "                       <\/tr>";
strVar += "                       <!-- Spacing -->";
strVar += "                       <tr>";
strVar += "                         <td>";
strVar += "                           <table width=\"100\" align=\"left\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">";
strVar += "                             <tbody>";
strVar += "                               <tr>";
strVar += "                                 <td align=\"left\" valign=\"middle\" style=\"font-family: Helvetica, arial, sans-serif; font-size: 14px;color: #666666\" st-content=\"viewonline\" class=\"mobile-hide\"><\/td>";
strVar += "                               <\/tr>";
strVar += "                             <\/tbody>";
strVar += "                           <\/table>";
strVar += "                           <table width=\"100\" align=\"right\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"devicewidth\">";
strVar += "                             <tbody>";
strVar += "                               <tr>";
strVar += "                                 <td width=\"30\" height=\"30\" align=\"right\">";
strVar += "                                   <div class=\"imgpop\">";
strVar += "                                     <a target=\"_blank\" href=\"#\"><\/a>";
strVar += "                                   <\/div>";
strVar += "                                 <\/td>";
strVar += "                                 <td align=\"left\" width=\"20\" style=\"font-size:1px; line-height:1px;\">&nbsp;<\/td>";
strVar += "                                 <td width=\"30\" height=\"30\" align=\"center\">";
strVar += "                                   <div class=\"imgpop\">";
strVar += "                                     <a target=\"_blank\" href=\"#\"><\/a>";
strVar += "                                   <\/div>";
strVar += "                                 <\/td>";
strVar += "                                 <td align=\"left\" width=\"20\" style=\"font-size:1px; line-height:1px;\">&nbsp;<\/td>";
strVar += "                                 <td width=\"30\" height=\"30\" align=\"center\">";
strVar += "                                   <div class=\"imgpop\">";
strVar += "                                     <a target=\"_blank\" href=\"#\"><\/a>";
strVar += "                                   <\/div>";
strVar += "                                 <\/td>";
strVar += "                               <\/tr>";
strVar += "                             <\/tbody>";
strVar += "                           <\/table>";
strVar += "                         <\/td>";
strVar += "                       <\/tr>";
strVar += "                       <!-- Spacing -->";
strVar += "                       <tr>";
strVar += "                         <td width=\"100%\" height=\"10\"><\/td>";
strVar += "                       <\/tr>";
strVar += "                       <!-- Spacing -->";
strVar += "                     <\/tbody>";
strVar += "                   <\/table>";
strVar += "                 <\/td>";
strVar += "               <\/tr>";
strVar += "             <\/tbody>";
strVar += "           <\/table>";
strVar += "         <\/td>";
strVar += "       <\/tr>";
strVar += "     <\/tbody>";
strVar += "   <\/table>";
strVar += "   <!-- End of preheader -->";
strVar += "   <!-- Start of header -->";
strVar += "   <table width=\"100%\" bgcolor=\"#ffffff\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" id=\"backgroundTable\" st-sortable=\"header\">";
strVar += "     <tbody>";
strVar += "       <tr>";
strVar += "         <td>";
strVar += "           <table width=\"600\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\" class=\"devicewidth\">";
strVar += "             <tbody>";
strVar += "               <tr>";
strVar += "                 <td width=\"100%\">";
strVar += "                   <table width=\"600\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\" class=\"devicewidth\">";
strVar += "                     <tbody>";
strVar += "                       <!-- Spacing -->";
strVar += "                       <tr>";
strVar += "                         <td height=\"20\" style=\"font-size:1px; line-height:1px; mso-line-height-rule: exactly;\">&nbsp;<\/td>";
strVar += "                       <\/tr>";
strVar += "                       <!-- Spacing -->";
strVar += "                       <tr>";
strVar += "                         <td>";
strVar += "                           <!-- logo -->";
strVar += "                           <table width=\"140\" align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"devicewidth\">";
strVar += "                             <tbody>";
strVar += "                               <tr>";
strVar += "                                 <td width=\"169\" height=\"45\" align=\"center\">";
strVar += "                                   <div class=\"imgpop\">";
strVar += "                                     <a target=\"_blank\" href=\"#\">";
strVar += "                                       <img src=\"https:\/\/ibin.co\/2z0fsVpOxZJj.png\" alt=\"\" border=\"0\" width=\"169\" height=\"45\" style=\"display:block; border:none; outline:none; text-decoration:none;\">";
strVar += "                                       <\/a>";
strVar += "                                     <\/div>";
strVar += "                                   <\/td>";
strVar += "                                 <\/tr>";
strVar += "                               <\/tbody>";
strVar += "                             <\/table>";
strVar += "                             <!-- end of logo -->";
strVar += "                           <\/td>";
strVar += "                         <\/tr>";
strVar += "                         <!-- Spacing -->";
strVar += "                         <tr>";
strVar += "                           <td height=\"20\" style=\"font-size:1px; line-height:1px; mso-line-height-rule: exactly;\">&nbsp;<\/td>";
strVar += "                         <\/tr>";
strVar += "                         <!-- Spacing -->";
strVar += "                       <\/tbody>";
strVar += "                     <\/table>";
strVar += "                   <\/td>";
strVar += "                 <\/tr>";
strVar += "               <\/tbody>";
strVar += "             <\/table>";
strVar += "           <\/td>";
strVar += "         <\/tr>";
strVar += "       <\/tbody>";
strVar += "     <\/table>";
strVar += "     <!-- End of Header -->";
strVar += "     <!-- Start of main-banner -->";
strVar += "     <table width=\"100%\" bgcolor=\"#ffffff\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" id=\"backgroundTable\" st-sortable=\"banner\">";
strVar += "       <tbody>";
strVar += "         <tr>";
strVar += "           <td>";
strVar += "             <table width=\"600\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\" class=\"devicewidth\">";
strVar += "               <tbody>";
strVar += "                 <tr>";
strVar += "                   <td width=\"100%\">";
strVar += "                     <table width=\"600\" align=\"center\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" class=\"devicewidth\">";
strVar += "                       <tbody>";
strVar += "                         <tr>";
strVar += "                           <!-- start of image -->";
strVar += "                           <td align=\"center\" st-image=\"banner-image\">";
strVar += "                             <div class=\"imgpop\">";
strVar += "                               <!--Image goes here-->";
strVar += "                             <\/div>";
strVar += "                           <\/td>";
strVar += "                         <\/tr>";
strVar += "                       <\/tbody>";
strVar += "                     <\/table>";
strVar += "                     <!-- end of image -->";
strVar += "                   <\/td>";
strVar += "                 <\/tr>";
strVar += "               <\/tbody>";
strVar += "             <\/table>";
strVar += "           <\/td>";
strVar += "         <\/tr>";
strVar += "       <\/tbody>";
strVar += "     <\/table>";
strVar += "     <!-- End of main-banner -->";
strVar += "     <!-- Start of seperator -->";
strVar += "     <table width=\"100%\" bgcolor=\"#ffffff\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" id=\"backgroundTable\" st-sortable=\"seperator\">";
strVar += "       <tbody>";
strVar += "         <tr>";
strVar += "           <td>";
strVar += "             <table width=\"600\" align=\"center\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" class=\"devicewidth\">";
strVar += "               <tbody>";
strVar += "                 <tr>";
strVar += "                   <td align=\"center\" height=\"20\" style=\"font-size:1px; line-height:1px;\">&nbsp;<\/td>";
strVar += "                 <\/tr>";
strVar += "               <\/tbody>";
strVar += "             <\/table>";
strVar += "           <\/td>";
strVar += "         <\/tr>";
strVar += "       <\/tbody>";
strVar += "     <\/table>";
strVar += "     <!-- End of seperator -->";
strVar += "     <!-- Start Full Text -->";
strVar += "     <table width=\"100%\" bgcolor=\"#ffffff\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" id=\"backgroundTable\" st-sortable=\"full-text\">";
strVar += "       <tbody>";
strVar += "         <tr>";
strVar += "           <td>";
strVar += "             <table width=\"600\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\" class=\"devicewidth\">";
strVar += "               <tbody>";
strVar += "                 <tr>";
strVar += "                   <td width=\"100%\">";
strVar += "                     <table width=\"600\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\" class=\"devicewidth\">";
strVar += "                       <tbody>";
strVar += "                         <!-- Spacing -->";
strVar += "                         <tr>";
strVar += "                           <td height=\"20\" style=\"font-size:1px; line-height:1px; mso-line-height-rule: exactly;\">&nbsp;<\/td>";
strVar += "                         <\/tr>";
strVar += "                         <!-- Spacing -->";
strVar += "                         <tr>";
strVar += "                           <td>";
strVar += "                             <table width=\"560\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"devicewidthinner\">";
strVar += "                               <tbody>";
strVar += "                                 <!-- Title -->";
strVar += "                                 <tr>";
strVar += "                                   <td style=\"font-family: Helvetica, arial, sans-serif; font-size: 30px; color: #333333; text-align:center; line-height: 30px;\" st-title=\"fulltext-heading\">";
strVar += "                                                Appointment Reminder";
strVar += "                                             <\/td>";
strVar += "                                 <\/tr>";
strVar += "                                 <!-- End of Title -->";
strVar += "                                 <!-- spacing -->";
strVar += "                                 <tr>";
strVar += "                                   <td width=\"100%\" height=\"20\" style=\"font-size:1px; line-height:1px; mso-line-height-rule: exactly;\">&nbsp;<\/td>";
strVar += "                                 <\/tr>";
strVar += "                                 <!-- End of spacing -->";
strVar += "                                 <!-- content -->";
strVar += "                                 <tr>";
strVar += "                                   <td style=\"font-family: Helvetica, arial, sans-serif; font-size: 16px; color: #666666; text-align:center; line-height: 30px;\" st-content=\"fulltext-content\">You have ";
var singular=" appointment ";
var plural = " appointments ";
var starVar3="";
starVar3 += " today. Please proceed to our website to view/manage your appointments."; 
starVar3 += "                                     <br>";
starVar3 += "                                     <\/td>";
starVar3 += "                                   <\/tr>";
starVar3 += "                                   <!-- End of content -->";
starVar3 += "                                 <\/tbody>";
starVar3 += "                               <\/table>";
starVar3 += "                             <\/td>";
starVar3 += "                           <\/tr>";
starVar3 += "                           <!-- Spacing -->";
starVar3 += "                           <tr>";
starVar3 += "                             <td height=\"20\" style=\"font-size:1px; line-height:1px; mso-line-height-rule: exactly;\">&nbsp;<\/td>";
starVar3 += "                           <\/tr>";
starVar3 += "                           <!-- Spacing -->";
starVar3 += "                         <\/tbody>";
starVar3 += "                       <\/table>";
starVar3 += "                     <\/td>";
starVar3 += "                   <\/tr>";
starVar3 += "                 <\/tbody>";
starVar3 += "               <\/table>";
starVar3 += "             <\/td>";
starVar3 += "           <\/tr>";
starVar3 += "         <\/tbody>";
starVar3 += "       <\/table>";
starVar3 += "       <!-- end of full text -->";
starVar3 += "       <!-- Start of Postfooter -->";
starVar3 += "     <\/body>";
starVar3 += "   <\/html>";



firebase.initializeApp({
  serviceAccount: {
    project_id: "thediscoverers-99fb8",
    client_email: "joeltest@thediscoverers-99fb8.iam.gserviceaccount.com",
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCxkkxYel3Vo0bP\nDieg18NczsyFv9eKGttAUFBmVH9ghzzG19J70vbNBGuSZJf3U/F08Fex46qrqKVZ\nTX1m37a7m22KGrN+9QX3CjtYG0EKPVoWdXfWORmqCD7p4lKTfnr/4LKep9e6lzTD\noGXbDRIQRwSEhyhnE3+I7WvB+nR0uyBNzyPPWVzh7aLpcE9qM75B4Vuh1kWqtqhX\nA6EBL5BWdo1JI/jJdcYvkI33xSB1Xj5VKobgblouUjNSvHZlZkUA+EIJYPJRYONr\noPGxnT3YDliwVYG86U2PSXuGcHA0selbX8T/LzffWidDvnM8p5yMOxj1FjLnoKm1\ncGYluZHBAgMBAAECggEAQ4G92okysSxwl/jmoeRFFjxcTqC/PXa2Ub32wuBuyHDB\nb0rPb1mlkA2VI8NwbouQKQfSHwPRd48WxVuLSBfWrX4KZ8183dAi42cVZop98Hmg\njRc9ZsiwdA7MdDghcodMFYkD/wMKJZqkaZbKAjv22Q9WrVeAyacE/jZcmBMyQMnd\nAWS4rmK8kcC5gl5TrnK/jtVODq4vYKfqQSl8HHGwCh5T2XgRX6JqCNQ5Vh0zYSBT\nHEGJuBRtMukbgtTyug9Rb7P9Onn6RXJmL9Zbs2rfP9abOzthOY8J2D5xApyjwsJI\nm5ZQ2P6FtU6NeEeoXQ3h+AV6xLG64q4pN2+LQmyAAQKBgQDWiYyQyL7Ia+hhU4E4\n9nRiBf1OURWdbjmbL7r8v9oMjrA4A50DXlSIBeJ3Xyk8blvOfUQ6DgiQ6DLm0nAR\nuMZ/NK7x1XGB4y4vYmOmbKS2kNt17USUhTbkpSYVLOcZ99nZWTK/V6PxdemzB3s4\nV5Wv8ghuORD7NTNj2ZOOWzEuAQKBgQDT49PUjuglV8SiamvYb1htCasZY33Ws4AC\n8Hrc2awbYPXAkye4z0glqjTfh37jyaaQ9rpf/7LDX2U8aUcgctujvIKOP5hh2zKt\nG70uPBkAKmuPxeKsqSkKQk33W/7rXS3DEjSe/pGmCDxXhMgj1z9pP6FJ/oEd9t4i\nQqUyb9vjwQKBgQDFBUj75f+fW8nrJ57yyxMSumFoPPrWu1VX+TuFxkLfaWLX7imR\n4F1NFepmqhPalZbmSRARKLYhLb0hUXzuKXzRcXaATP6SxCm0Bm1xdzDFIL8Ky71B\nkB1bWXdh1vzdUkrUWiBKrJe4tgrLCUHV+klTbbjkULARo0fwmO3zvDesAQKBgQC9\nklXRFFIqJs4sKV53c5b/ZukHe/X4AvyCpLinoq/ShvsX4hBlzj3UROWtH0KtdZpq\nk/PHM7OyDEU8uUwDgf90DJIZxlgFJOG/8tNc7DPJ7Cnzpa3ZoDaxkQTETDBUTzdE\nEaO2pDeW/kNOYePV/Rwkg+M/mk3WiynOKSY3a9ClgQKBgBif+9EeC+VmK8Az4zmj\nEFPNCRiDEi9VwWSUL7vqJrw+0aR2q6MqvPeRcpy1ohHv+WJxGnFk8jB/nBqQKSkI\neGEdA7VGALx9dgMrkF7ljAvInzIXK4s1AOGYnFls9b8X1v9AVHdMszlJlm//cif1\nv3ekF4Fzd0iEPaMyOTyXofNh\n-----END PRIVATE KEY-----\n"
  },
  databaseURL: "https://thediscoverers-99fb8.firebaseio.com"
});

function sendNotificationEmail(email) {
	if(count>1){
		var mailOptions = {
    from: '"One Stop Health" <thediscoverersjoel@gmail.com>',
    to: email,
    subject: 'Appointment Reminder',
    //text: 'Hi there, you have ' + count + "appointments today.\n\n" + "Here are the details " + entries[1]
    html: strVar + count + plural + starVar3
    //html: strVar2
  };
  return mailTransport.sendMail(mailOptions).then(function() {
    console.log('New star email notification sent to: ' + email);
  });
	}else if(count===1){
		var mailOptions = {
    from: '"One Stop Health" <thediscoverersjoel@gmail.com>',
    to: email,
    subject: 'Appointment Reminder',
    //text: 'Hi there, you have ' + count + "appointments today.\n\n" + "Here are the details " + entries[1]
    html: strVar + count + singular + starVar3
    //html: strVar2
  };
  return mailTransport.sendMail(mailOptions).then(function() {
    console.log('New star email notification sent to: ' + email);
  });
	}
  
}

var textJob = new cronJob( '15 33 03 * * 1-7', function(){
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
 
     var db = firebase.database();
         
   var usersRef = db.ref("users");
   var appointmentsRef = db.ref("appointments");
 
    var ref3 =usersRef.orderByKey().on("value", function(snapshot) {
    	
    	
         snapshot.forEach(function(data) {
         	var uid = data.key;
            console.log(uid);
            console.log(data.val().email);
            var email = data.val().email;
            appointmentsRef.orderByKey().equalTo(uid).on("value", function(apptsnapshot) {  
            	count = 0;
            	apptsnapshot.forEach(function(apptdata) {
            		apptdata.forEach(function(childData) {
            			if(childData.val().date == today && childData.val().status=="Confirmed"){
            				entries[count] = new Array(count + 1, childData.val().type, childData.val().location, childData.val().date, childData.val().time, childData.val().remarks, childData.val().bookingdate, childData.getKey(), childData.val().status);
            				 count++;
            				
            			}
            			//console.log(email);
            		});
            		  
            	});
            sendNotificationEmail(email); 

            }); 
            
        });
   });

},  null, true);
 

