
import HomePage from '../pages/home.f7.html';
import NotFoundPage from '../pages/404.f7.html';

import LoginPage from '../pages/login.f7.html';

import PPelangganPage from '../pages/pd_pagepelanggan.f7.html'
import PPelanggandetilPage from '../pages/pd_pagepelanggandetil.f7.html'
import PPcarimanualPage from '../pages/pd_pagecarimanual.f7.html'
import PPhistorycatatPage from '../pages/pd_pagehistorycatat.f7.html'
import PTagihandetilPage from '../pages/pd_pagetagihandetil.f7.html'
import PPcaritagihanPage from '../pages/pd_pagecaritagihan.f7.html'
import PPbacameterPage from '../pages/pd_bacameter.f7.html'
import PPgambarPage from '../pages/pd_pagegambar.f7.html'
import PPkirimPage from '../pages/pd_pagekirim.f7.html'
import PPcaripelangganPage from '../pages/pd_pagecaripelanggan.f7.html'

import PSinkronisasiPage from '../pages/pd_sinkronisasi.f7.html'
import DownloadPage from '../pages/download.f7.html'
import PPhistoryofflinePage from '../pages/pd_pagehistoryoffline.f7.html'

var routes = [
  {
    path: '/',
    component: HomePage,
    name:'home',
  },{
    path: '/home/',
    component: HomePage,
    name:'home',
  },
  {
    path: '/login/',
    component: LoginPage,
    name:'login',
  },
  
 {
  path : '/pd_sinkronisasi/',
  component:PSinkronisasiPage
 },
 {
  path : '/download/',
  component: DownloadPage
},
  {
    path :'/logout/',
    async : function(routeTo, routeFrom, resolve, reject){
      var router = this;
      var app = router.app;

      //app.dialog.alert('logout')
      app.data.userinfo = [];
      var akunname_data = JSON.stringify({username:'',password:''});
      app.data.nsObj.saveData("AKUNNAME",akunname_data)
      app.data.nsObj.saveData("LOGIN","false")
      app.data.user.username = '';
      app.data.user.password = '';
      //app.loginScreen.open('#my-login-screen');
      navigator.app.exitApp();

    }
  }
  ,
  {
    path :'/keluar/',
    async : function(routeTo, routeFrom, resolve, reject){
      var router = this;
      var app = router.app;
      navigator.notification.confirm('',function(btnindex){

        if(btnindex == 1) {
          
          navigator.app.exitApp();
          } 

      }, 'Apakah anda mau Keluar dari aplikasi?');



    }
  }
  ,
  {
    path : '/pd_pagepelanggan/',
    component: PPelangganPage
  },
  {
    path : '/pd_pagepelanggandetil/:pid',
    component: PPelanggandetilPage
  },
  {
    path : '/pd_pagecaritagihan/',
    component: PPcaritagihanPage
  },
  {
    path : '/pd_pagetagihandetil/:pid',
    component: PTagihandetilPage
  },
  {
    path : '/pd_pagecarimanual/',
    component: PPcarimanualPage
  },
  {
    path : '/pd_pagehistorycatat/',
    component: PPhistorycatatPage
  },    
  {
    path : '/pd_pagehistoryoffline/',
    component: PPhistoryofflinePage
  }, 
  {
    path : '/pd_bacameter/',
    component: PPbacameterPage
  },
  {
    path : '/pd_pagegambar/',
    component: PPgambarPage
  },
  {
    path : '/pd_pagekirim/',
    component: PPkirimPage
  },
  {
    path : '/pd_pagecaripelanggan/',
    component: PPcaripelangganPage
  },  
  {
    path: '/request-and-load/user/:userId/',
    async: function (routeTo, routeFrom, resolve, reject) {
      // Router instance
      var router = this;

      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // User ID from request
      var userId = routeTo.params.userId;

      // Simulate Ajax Request
      setTimeout(function () {
        // We got user data from request
        var user = {
          firstName: 'Vladimir',
          lastName: 'Kharlampidi',
          about: 'Hello, i am creator of Framework7! Hope you like it!',
          links: [
            {
              title: 'Framework7 Website',
              url: 'http://framework7.io',
            },
            {
              title: 'Framework7 Forum',
              url: 'http://forum.framework7.io',
            },
          ]
        };
        // Hide Preloader
        app.preloader.hide();

        // Resolve route to load page
        resolve(
          {
            component: RequestAndLoad,
          },
          {
            context: {
              user: user,
            }
          }
        );
      }, 1000);
    },
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;