import $$ from 'dom7';
import Framework7 from 'framework7/framework7.esm.bundle.js';

// Import F7 Styles
import 'framework7/css/framework7.bundle.css';

// Import Icons and App Custom Styles
import '../css/icons.css';
import '../css/app.less';
// Import Cordova APIs
import cordovaApp from './cordova-app.js';
// Import Routes
import routes from './routes.js';
import jsonp from './classes/json-class.js';
import index from './classes/index-class.js';
import nstorage from './classes/nstorage-class.js';
import mysocket from './classes/mysocket-class';
import websqlsd from './classes/websql-class';

// Import js from vendor
import $ from 'jquery'
import Moment from 'moment';
import Moment2 from 'moment-timezone';
import Polyline from 'google-polyline';
//import Qrcode from ''

import IO from 'socket.io-client';
import md5 from 'md5'




//data
//var fn = require('./function');
import pbkObj from '../data/tb_pbk'
import wmstatusObj from '../data/tb_wmstatus'


var app = new Framework7({
  root: '#app', // App root element  
  id: 'com.s2team.pdam', // App bundle ID
  name: 'PERUMDA', // App name
  theme: 'aurora', // Automatic theme detection
  data : function(){
    return {
      user: {
        username: '',
        password: '',
        appmode: 'prod', //dev atau prod
        freememberblock: 0
      },
      pos:{
        latitude:'',
        longitude:'',
      },
      // Login screen demo data
      loginfo :{},
      userinfo :{},
      pinfo:{},
      wminfo:{},
      gambarinfo:null,
      sendinfo:[],
      tawal_cek:'',
      takhir_cek:'',
      jeda_cek:5,//dalam menit
      membertipe:'user',
      idkec_glob:null,
      iddesa_glob:null,
      iddusun_glob:null,
      operator_glob:null,
      status_catat_glob:null,
      per_page_min:10,
      per_page:100,
      total_page:0,
      current_page:0,
      prev_page:0,
      next_page:0,
      bukaAPP : 0,
      fee_pulsa : {std:0,mid:0,top:0},
      waktu:{tunggu:0,delay:0},
      poin:1,//add
      hitung:0,
      JQ : $,
      dom7:$$,
      Polyline:Polyline,
      md5 : md5,
      MapObj:null,
      UserMarker:null,
      AgenMarker:[],
      AgenTerpilih:[],
      jmitra:[],
      Moment : Moment,
      Moment2 : Moment2,
      IO:IO,
      OPENSOCKET:null,
      jsonpObj:jsonp,
      indexObj:index,
      nsObj:nstorage,
      socketObj:mysocket,
      webObj:websqlsd, 
      locationgmap:{},
      datelog:{},      
      config :{
      mainServer: 'https://ptab-vps.com/pdam-test/integrasi/',
      imageServer:'https://ptab-vps.com/pdam-test',
      pulsaServer: 'https://ptab-vps.com/pdam-test/mobilepulsa/',
      offdataServer: 'https://ptab-vps.com/pdam-test/data/', 
       },
       scanStatus:false,
       localProduct:[], 
       basket:[],
       agens:[],
       aturan_berat:[],
       aturan_jarak:[],
       range_1:3,
       range_2:5,
       popCall:null,
       calltimeout:20, //detik
       dist_tolerancy:0,
       invoiceList:[],
       watchID:0,
       watchID2:0,
       table:{
         pbkObj:pbkObj,
         wmstatusObj:wmstatusObj
       },
       OPENDB:null     
    }

  },
  methods: {
    helloWorld: function () {
      
      let domain = this.data.config.mainServer
      let test = this.data.jsonpObj.demo()
      app.dialog.alert(domain + ':' + test);
    },
    playSound : function(key)
    {
      //this.indexObj.playNativeSound(key)
      this.data.indexObj.playNativeSound(key)
    },
  },
  // App routes
  routes: routes,


  // Input settings
  input: {
    scrollIntoViewOnFocus: Framework7.device.cordova && !Framework7.device.electron,
    scrollIntoViewCentered: Framework7.device.cordova && !Framework7.device.electron,
  },
  // Cordova Statusbar settings
  statusbar: {
    iosOverlaysWebView: true,
    androidOverlaysWebView: false,
  },
  on: {
    init: function () {
      var f7 = this;
           
      var obj={index:index,jsonp:jsonp,nstorage:nstorage}//instance
      this.data.jsonpObj.name = obj
      this.data.indexObj.name = obj
      this.data.nsObj.name = obj

      if (f7.device.cordova) {
        // Init cordova APIs (see cordova-app.js)
        cordovaApp.init(f7);
        this.data.indexObj.loodAllSounds();
        //init data for all variable
       
        //prepare Scanner status
        
       


      }
    },
  },
});

if (app.device.android) {
  // app.dialog.alert("this android device")
 }
 // Login Screen Demo
 //var mainView = app.views.create('.view-main');

 $$('#my-login-screen .login-button').on('click',function(){

  var username = $$('#uname').val();
  var password = $$('#upass').val();

 // alert(username +',' + password)

  
if(username == "" || password == "")
{
    
app.dialog.alert("Maaf, Mohon isi Nama Pengguna dan Kata Sandi!",'Best')

}else
{   
//app.dialog.alert('mulai')
//var str=app.data.config.mainServer;
//app.dialog.alert(str)
//app.dialog.alert(app.data.jsonpObj.demo())

//alert(this.$app.data.config.mainServer)
var dataString = 'uname='+username+'&upass='+password
//app.loginScreen.close('#my-login-screen');
//app.data.jsonpObj.demo();
var jsonpObj = app.data.jsonpObj
jsonpObj.login(app,dataString,function(st,pesan,info)
{
    
 if(st == "ok")
 {
     var data = JSON.parse(info)
     //console.log(data)
    // app.dialog.alert(data.username+','+data.password)
     app.data.userinfo = data;
     var akunname_data = JSON.stringify({username:username,password:password});
     app.data.nsObj.saveData("AKUNNAME",akunname_data)
     app.data.nsObj.saveData("LOGIN","true")
     app.data.user.username = username;
     app.data.user.password = password;
     app.loginScreen.close('#my-login-screen');
     var indexObj = app.data.indexObj
     
     indexObj.refreshInfo(app);


 }else
 {
   app.data.nsObj.saveData("LOGIN","false")
   app.dialog.alert('Salah Nama Pengguna/Kata Sandi!','Best')
 }

})


}//else

 })


 
 $$(document).on('page:init', function (e, page) {
     
  //index.showToast(page.name,'long','bottom')
  
  var indexObj =app.data.indexObj
  //var obj=$$('.page[data-name="'+page.name+'"]')[0]
  
  //cegah sound lebihfrafra
  indexObj.stopNativeSound('phone2')
  if(page.name != "emapping")
  {

       clearTimeout(app.data.watchID)
       clearTimeout(app.data.watchID2)
       //stop watching proses and kurir action
  }


 });

 $$(document).on('deviceready', function () {
  // Enable to debug issues.
  /*window.plugins.OneSignal.setLogLevel({logLevel: 6, visualLevel: 0});
  
  var notificationOpenedCallback = function(jsonData) {
    console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
  };

  window.plugins.OneSignal
    .startInit("57c04565-8c70-4752-9c56-6f969d2d538f")
    .handleNotificationOpened(notificationOpenedCallback)
    .endInit();
*/

    var indexObj = app.data.indexObj
    indexObj.loodAllSounds();
    var webObj = app.data.webObj
    webObj.createDB(app)//set data OPENDB

    webObj.createPDAM(webObj.db)


}, false);