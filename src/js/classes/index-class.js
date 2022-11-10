class index
{
    constructor()
    {
      //this._obj=obj
    }

    get name()
    {
        return this.constructor._obj;
    }

    set name(newObj)
    {
        //this._obj = newObj;
        this.constructor._obj = newObj;
    } 

   loodAllSounds()
   {
    try{
        if( window.plugins && window.plugins.NativeAudio ) 
        {    
    //( id, assetPath, volume, voices, delay, successCallback, errorCallback)
            
              window.plugins.NativeAudio.preloadComplex( 'phone1', 'static/sound/android1.mp3', 1, 1, 0, null,null);    
               
              window.plugins.NativeAudio.preloadComplex( 'phone2', 'static/sound/phone.mp3', 1, 1, 0, null,null); 
           
               window.plugins.NativeAudio.preloadComplex( 'notify1', 'static/sound/notify1.mp3', 1, 1, 0, null,null);
               window.plugins.NativeAudio.preloadComplex( 'notify', 'static/sound/notify.mp3', 1, 1, 0, null,null);
               window.plugins.NativeAudio.preloadComplex( 'alarm1', 'static/sound/alarm1.mp3', 1, 1, 0, null,null);
               window.plugins.NativeAudio.preloadComplex( 'btnklik', 'static/sound/btnklik.mp3', 1, 1, 0, null,null);
          
                
           
            }
           }catch(err)
           {
               
           }  
   } 

    playNativeSound (keyid)
	{
     window.plugins.NativeAudio.play(keyid);
     //let str = this.constructor._obj.jsonp.demo();
    // this.showToast('play : ' +keyid+','+str,'long','bottom')	
    	//alert(keyid)
    }
    
    stopNativeSound (keyid)
    {
        window.plugins.NativeAudio.stop(keyid);
    }

    playNativeSoundLoop (keyid)
    {
        window.plugins.NativeAudio.loop(keyid);
    }

    showToast (msg,durasi,posisi)
    {
        window.plugins.toast.showWithOptions(
            {
              message: msg,
              duration: durasi, // which is 2000 ms. "long" is 4000. Or specify the nr of ms yourself.
              position: posisi,
              addPixelsY: -40  // added a negative value to move it up a bit (default 0)
            },
            null, // optional
           null    // optional
          );

    }

    keluarProgram()
    {
        
    }

    putInfo (data)
    {
       // alert('put info')
        var htmlstr = ''
        
                       htmlstr +='<tr>\
                                <td class="label-cell">Identitas Sponsor</td>\
                                <td class="numeric-cell">'+data.referedby+'</td>\
                                </tr>'
                              
                        htmlstr +='<tr> \
                                   <td class="label-cell">Identitas Upline</td>\
                                   <td class="numeric-cell">'+data.referedby2+'</td>\
                                   </tr>'
                        htmlstr +='<tr> \
                                   <td class="label-cell">Bergabung pada </td>\
                                   <td class="numeric-cell">'+data.doj+'</td>\
                                   </tr>'
               if(data.prestasi_lengkap != null) 
               { 
                  var pp = data.prestasi_lengkap.split('~');
                 if(pp.length == 3){
                         var pp_prestasi = parseFloat(pp[0]).toFixed(2)    
                         var pp_level = parseFloat(pp[1]).toFixed(2) 
                         var investasi_awal = parseFloat(pp[2]).toFixed(2)  
                         var total_pp = parseFloat(data.prestasi_total).toFixed(2)  
                        htmlstr +='<tr> \
                                   <td class="label-cell">PP Prestasi </td>\
                                   <td class="numeric-cell">'+pp_prestasi+'</td>\
                                   </tr>'
                        htmlstr +='<tr> \
                                   <td class="label-cell">PP Level </td>\
                                   <td class="numeric-cell">'+pp_level+'</td>\
                                   </tr>'
                        htmlstr +='<tr> \
                                   <td class="label-cell">Total PP </td>\
                                   <td class="numeric-cell">'+total_pp+'</td>\
                                   </tr>' 
                        htmlstr +='<tr> \
                                   <td class="label-cell">Investasi Awal </td>\
                                   <td class="numeric-cell">'+investasi_awal+'</td>\
                                   </tr>' 
                   }
        
                  }
        return htmlstr;
    }

   validEmail(email) { // see:
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(email);
      }
      ///
      
     validTelp(telp) { // see:
        var re = /^\+([0-9][\s()+-]*){6,20}$/;
        return re.test(telp);
      }


      belipoin_init(app)
      {

        var jq = app.data.JQ;
        var jsonpObj = app.data.jsonpObj;
        var indexObj = app.data.indexObj;
        var dom7 = app.data.dom7;
       
        var username = app.data.user.username;
        var dataString = 'username='+username;
       
          jsonpObj.getTarget2(app,'daftar_belipoin.php',dataString,function(data)
          {

              if(data.status == "ok")
              {
                 var bank = JSON.parse(data.bank)  
                 //alert(bank)
                 var bankstr = ''
                 for(var i in bank)
                 {
                     bankstr += '<div class="card">\
                                <div class="card-content card-content-padding">\
                                 Nama : '+bank[i].nama+'<br>\
                                 Pemilik : '+bank[i].pemilik+'<br>\
                                 Rekening : '+bank[i].nomor+'\
                                 </div>\
                                </div>'
                 }
                 
                 jq('.bank').html(bankstr)

               //////////////////////////////////////
                var daftar = JSON.parse(data.daftar)
                var daftarstr = ''
                var rstatus=''
                if(daftar.length > 0)
                {
                  jq('.daftar tbody').html('') 
                    for(var i in daftar)
                    {
                       if(parseInt(daftar[i].payment_status) == 1)
                                rstatus = '<span class="bg-color-green text-color-white">Disetujui ('+daftar[i].payment_type+')</span>'
                        else
                                rstatus = '<span class="bg-color-orange text-color-white">menunggu ('+daftar[i].payment_type+')</span>'        

                    /*
                    <label class="radio">
                    <input type="radio" name="demo-radio-inline">
                    <i class="icon-radio"></i>
                    </label> 
                    */  

                       daftarstr = '<tr>\
                                     <td class="checkbox-cell">\
                                     <label class="radio">\
                                     <input type="radio" name="pilih" value="'+daftar[i].id+'" >\
                                     <i class="icon-radio"></i>\
                                     </label>\
                                     </td>\
                                     <td >'+daftar[i].createdtime+'</td>\
                                     <td >'+rstatus+'</td>\
                                     <td >'+ daftar[i].comment +'</td>\
                                     </tr>'                                   
                                    

                         jq('.daftar tbody').append(daftarstr)               
                    }
                    
                jq('input[type=radio]').each(function(){
                  var objVal = jq(this).attr('value')
                  jq(this).on('click',function(){
                      //alert(objVal)

                      app.dialog.create({
                        title: 'Edit',
                        text: '',
                        buttons: [
                          {
                            text: 'Konfirm', 
                            color:'green',
                            onClick : function(){
                             // alert('konfirm '+objVal)
                             var dataString = 'id='+objVal+'&username='+username
                              jsonpObj.getTarget(app,'konfirmasi_belipoin.php',dataString,function(st,pesan){
                                if(st == "ok")
                                {
                                  indexObj.belipoin_init(app);
                                  app.dialog.alert(pesan)
                                }else
                                {
                                  app.dialog.alert('Konfirmasi gagal dikirimkan, mohon kontak Admin!')
                                }

                            })

                            },                           
                          },
                          {
                            text: 'Delete',
                            color:'red',
                            onClick : function(){
                              //alert('delete '+objVal)
                              var dataString = 'id='+objVal+'&username='+username
                              jsonpObj.getTarget(app,'delete_belipoin.php',dataString,function(st,pesan){
                                  if(st == "ok")
                                  {
                                    indexObj.belipoin_init(app);
                                    app.dialog.alert(pesan)
                                  }else
                                  {
                                    app.dialog.alert('Rekaman gagal dihapus!')
                                  }

                              })



                            },
                          },
                          {
                            text: 'Cancel',
                            color:'orange',
                            onClick : function(){
                               
                            },
                          },
                        ],
                        verticalButtons: false,
                        destroyOnClose:true,
                      }).open();
                      

                  })

                })


                }

              
               

              }

           });

      } 

      showRiwayat(app,dataString)
      {
           var jq=app.data.JQ
           var jsonpObj = app.data.jsonpObj
            var  jriwayat=[]
            var htmlstr=''
           jsonpObj.getTarget(app,'riwayat.php',dataString,function(st,pesan)
           {
            
           // alert(pesan)
            if(st == "ok")
            {
              
               jriwayat  = JSON.parse(pesan) 
               
               if(jriwayat.length > 0)
               {
                  for(var i in jriwayat)
                  {
                    var Dm=''
                    var Km=''
                    if(jriwayat[i].payment_type == 'plus')
                    {
                        Dm = parseFloat(jriwayat[i].payment_amount).toFixed(2)
                        Km = ''
                    }else if(jriwayat[i].payment_type == 'min')
                    {
                        Km = parseFloat(jriwayat[i].payment_amount).toFixed(2)
                        Dm = ''
                    }


                   htmlstr +='<tr>\
                            <td class="text-label">'+jriwayat[i].kode+'</td>\
                            <td class="text-label">'+jriwayat[i].createdtime+'</td>\
                            <td class="text-label">'+jriwayat[i].comment+'</td>\
                            <td class="text-label">'+Dm+'</td>\
                            <td class="text-label">'+Km+'</td>\
                            <td class="text-label">'+parseFloat(jriwayat[i].saldo).toFixed(2)+'</td>\
                            </tr>'                         
                           
                  }
                
                   // alert(htmlstr)
                   jq('.daftar table tbody').html(htmlstr)
            }
                

            }

           })
      }


  showDiagram(indexObj,data,level)
  {

      
  var arr=[];
  var sp ='';
  var step=level;
  for(var i=0;i < level;i++)
  {
    sp  += '--';
	
  }
 //console.log(sp)
  level ++;
  var key=Object.keys(data)
    //console.log(sp + key[0]);
	
	arr.push({html:'<div>' + key[0] + '</div>',level:sp,step:step,uname:key[0]}) 
	
	if(data[key].length > 0)
     {	 
	 //console.log(key[0]+ '<ul></li>\n');
	 
	 
			  for (var i in data[key])
			  {
					
					//console.log(`${key}: ${value}`);			
					if(typeof data[key][i] != 'object')
					{
					   //console.log('-'+ sp + data[key][i]);
						arr.push({html:'<div>'+ data[key][i] + '</div>',level:'-'+sp,step:step + 1,uname:data[key][i]})
						
					   // console.log('<li>'+data[key][i]+'</li>\n');
											
					}
					else
					{
					   //console.log('<li>\n');
					   var tmp=[];
					   var obj2 =data[key][i]
					   tmp= indexObj.showDiagram(indexObj,obj2,level)
					   //console.log('</li>\n');
					   for(var t in tmp)
					   {
					      arr.push(tmp[t])
					   }
					  
					}
					
			  }
			  
		    //console.log('</li></ul>\n');
					
	  
	  }
  
 return arr
  
 
  }

 showMap(app,latcenter,loncenter,parent){

    var map;
    var div = document.getElementById("map_canvas2");
    map = plugin.google.maps.Map.getMap(div);
    app.data.MapObj = map;
    var self = this
    var induk=parent
    map.one(plugin.google.maps.event.MAP_READY, function() {

            map.animateCamera({
            target: {lat: latcenter, lng: loncenter},
            zoom: 12,
            tilt: 0,
            bearing: 0,
            duration: 1000
            }, function() {

               var marker = map.addMarker({
                position: {lat: latcenter, lng: loncenter},
                title: "Posisi Anda",
                'icon': {
                  'url': 'static/icons/freemarker.png'
                 },
                snippet: "["+latcenter+","+loncenter+"]",
                draggable: true
                }, function(marker) 
                {                      
                    marker.showInfoWindow();
                    app.data.UserMarker=marker;
                }); 
            
                self.getAlamat(app,latcenter,loncenter,'.alamat')

                marker.addEventListener(plugin.google.maps.event.MARKER_DRAG_END, function(position) 
                {
                 // marker.setTitle(position.toUrlValue());
                   var pos = JSON.parse(position.toUrlValue())
                   app.data.pos.latitude = pos.lat;
                   app.data.pos.longitude = pos.lng;
                   marker.setSnippet("["+pos.lat+','+pos.lng+"]")
                   var jq = app.data.JQ;
                  // jq('#posisi').html(pos.lat+','+pos.lng)
                   self.getAlamat(app,pos.lat,pos.lng,'.alamat')
                  // marker.showInfoWindow();
                   
                  if(app.data.AgenMarker.length > 0)
                  for(var a in app.data.AgenMarker)
                  {
                     app.data.AgenMarker[a].remove()
                  }
                    app.data.AgenMarker=[]  //reset

                   
                    
                   induk.getAgens(app)

                 

                });

                

            });

            

    })


  }

  showMapping(app,jmitra,latcenter,loncenter)
  {
     // var jq = app.data.JQ
     // var polyline = app.data.Polyline
     // var test='pr_s@{ip~TiDEyAEiCQcCU}Dk@gD_@kDc@sASkFw@qDi@sDu@{HiCuCq@cAKaBOyDWoCOKAY^Cx@AbAErGMxAIbAWC]Aq@CqAGyDWwBQiD]iEo@{AOkCUa@EOBs@Jk@?{ACWC[Ki@OgAAcAOs@W[Au@@cF?wABoEGmHSwACCJ'
      /*{
    position: {lng: -122.1180187, lat: 37.3960513},
    title: "Ardis G Egan Intermediate School"
    -8.4815674,115.1581629
  } */

     


    var map;
    var div = document.getElementById("map_canvas2");
    map = plugin.google.maps.Map.getMap(div);

    map.one(plugin.google.maps.event.MAP_READY, function() {


      map.animateCamera({
        target: {lat: latcenter, lng: loncenter},
        zoom: 10,
        tilt: 0,
        bearing: 0,
        duration: 2000
        }, function() {
        
          map.addMarker({
            position: {lat: latcenter, lng: loncenter},
            title: 'Posisi Anda',
            'icon': {
              'url': 'static/images/icons/icon_poin.png'
             }
            },function(marker) 
            {                      
                marker.showInfoWindow();
            }); 


          for(var i in jmitra)
          {
            var pos = jmitra[i].koordinat.split(',') 
            
            var img=''
            if(jmitra[i].p_kategori == "depo")
            {
               img ='static/images/icons/icon_depo.png'
            }else if(jmitra[i].p_kategori == "agen")
            {
              img ='static/images/icons/icon_agen2.png'
            }else if(jmitra[i].p_kategori == "pelanggan")
            {
              img ='static/images/icons/icon_pelanggan.png'
            }  

             var marker = map.addMarker({
              position: {lat: parseFloat(pos[0]), lng: parseFloat(pos[1])},
              title: jmitra[i].fname,
              'icon': {
                'url': img
               }
              },function(marker) 
              {                      
                  //marker.showInfoWindow();
              }); 

              
          } 
            

        /*  var arrplot = polyline.decode(test)

          map.addPolyline({
            'points':arrplot,
            'color' : '#AA00FF',
            'width': 10,
            'geodesic': true
          });
*/

        })



      app.data.MapObj = map;

    })


  }

  reMapContent(map,jmitra,latcenter,loncenter)
  {

    map.addMarker({
      position: {lat: latcenter, lng: loncenter},
      title: 'Posisi Anda',
      'icon': {
        'url': 'static/images/icons/icon_poin.png'
       }
      },function(marker) 
      {                      
          marker.showInfoWindow();
      }); 

    for(var i in jmitra)
          {
            var pos = jmitra[i].koordinat.split(',') 
            
            var img=''
            if(jmitra[i].p_kategori == "depo")
            {
               img ='static/images/icons/icon_depo.png'
            }else if(jmitra[i].p_kategori == "agen")
            {
              img ='static/images/icons/icon_agen2.png'
            }else if(jmitra[i].p_kategori == "pelanggan")
            {
              img ='static/images/icons/icon_pelanggan.png'
            }  

             map.addMarker({
              position: {lat: parseFloat(pos[0]), lng: parseFloat(pos[1])},
              title: jmitra[i].fname,
              'icon': {
                'url': img
               }
              },function(marker) 
              {                      
                  //marker.showInfoWindow();
              }); 

              
          } 

  }

  getSaldoPoin(app,callback)
  {
    //var jq = app.data.JQ;
    var obj =app.data.jsonpObj;
    var username = app.data.user.username
    var password = app.data.user.password
    var dataString = 'uname='+username+'&upass='+password
    obj.login(app,dataString,function(st,pesan,info)
    {
      if(st == "ok")
      {
        var json = JSON.parse(info)
         callback('ok',json.tamount)
      }else
      {
        callback('no',0)
      }
    })



  }

  refreshInfo(app){
    
    var jq = app.data.JQ;
    app.data.indexObj.playNativeSound('btnklik')
    app.data.nsObj.getData("AKUNNAME",function(akuns)
       {
         let akun = JSON.parse(akuns)
         let username = akun.username;
         let password = akun.password;

         
        
         /////////////////////////////
         var dataString = 'uname='+username+'&upass='+password
           var obj =app.data.jsonpObj;
           //alert(dataString)
            obj.login(app,dataString,function(st,pesan,info)
              {
                  
                if(st == "ok")
                {
                    var data = JSON.parse(info)
                    //console.log(data)
                  //app.dialog.alert("Welcome " + data.fname)
                     //this.methods.putInfo(data)
                     jq('.namaAnggota').html('') 
                     jq('.saldopoin').html('') 
                    // jq('.info-anggota').html('') 
                    // jq('.keanggotaan').html('') 
                    // var htmlstr = app.data.indexObj.putInfo(data)
                     jq('.namaAnggota').html(data.fname)                        
                     jq('.saldopoin').html('<h1>'+parseFloat(data.tamount).toFixed(2)+'</h1>')                          
                    // jq('.info-anggota').html(htmlstr)
                     /*var keanggotaan='Paket : '+data.namapaket+'<br>\
                                    Keterangan : '+data.detilpaket+'<br>\
                                    Email : '+data.email+'<br>\
                                    Mobile : '+data.mobile+'<br>\
                                    Alamat : '+data.address+'\   
                                    */                           
                                    
                  // jq('.keanggotaan').html(keanggotaan)  
                    app.data.userinfo = data;
                    app.data.bukaAPP = 2;
                }
        
              })  

           
         ////////////////////////

       })

  }


  cekRiwayat(app,dataString)
  {
    var jq = app.data.JQ;
    var jsonpObj = app.data.jsonpObj;
    var indexObj = app.data.indexObj;
    //var username = app.data.user.username;
    //var appmode = app.data.user.appmode;
    var tunggu = parseInt(app.data.waktu.tunggu);
    var delay = parseInt(app.data.waktu.delay);
    var cnt = app.data.hitung

     jsonpObj.getTarget3(app,'cek_riwayat.php',dataString,function(st,pesan){

        if(st == "ok")
        {
          //jq('.laporan').hide()
           var dat = JSON.parse(pesan)


           if(parseInt(dat.status) == 0 && dat.pesan_cb == 'PROCESS')
           {
            jq('.laporan').show()
            jq('.loading').show()
            if(cnt < tunggu)
            {
            cnt ++;
            setTimeout(function(){
              indexObj.cekRiwayat(app,dataString)
            },delay)

            }else
            {
              app.dialog.alert('Maaf, waktu tunggu normal habis, dalam 1 x 24 kami akan memberikan informasi tentang  '+dataString+tunggu+cnt,'Informasi') 
              cnt = 0
              jq('.laporan').show()
              jq('.loading').hide()
            }
              


           }else if(parseInt(dat.status) == 1)
           {
            cnt = 0
            indexObj.playNativeSound('notify1')
            var arrpesan=[]
           
            
            if(dat.pesan != '')
            {
               arrpesan=dat.pesan.split('~')               
             }

            app.dialog.alert('Selamat, Pesanan Anda berhasil di Proses!','Informasi')
            jq('.laporan').show()
            jq('.info').html('<div>Selamat, Pesanan Anda berhasil di Proses!</div><h3>Status / SN(Token)</h3><div>['+arrpesan[0]+']<br>'+arrpesan[1]+'</div>')
            jq('.loading').hide()

           }else if(parseInt(dat.status) == 2)
           {
            cnt = 0
            indexObj.playNativeSound('notify')

            app.dialog.alert('Maaf, Pesanan Anda gagal di Proses!','Informasi')
            jq('.laporan').show()
            jq('.info').html('Maaf, Pesanan Anda gagal di Proses!','Informasi')
            jq('.loading').hide()

           }

           app.data.hitung = cnt

        }

     })


  }


  cekStatusPost(app,dataString)
  {
    var jq = app.data.JQ;
    var jsonpObj = app.data.jsonpObj;
    var indexObj = app.data.indexObj;
    //var username = app.data.user.username;
    //var appmode = app.data.user.appmode;
    var tunggu = parseInt(app.data.waktu.tunggu);
    var delay = parseInt(app.data.waktu.delay);
    var cnt = app.data.hitung

     jsonpObj.getTarget3(app,'cek_status.php',dataString,function(st,pesan){

      
          //jq('.laporan').hide()
          


           if(st == 'pending')
           {
            jq('.laporan').show()
            jq('.loading').show()
            if(cnt < tunggu)
            {
            cnt ++;
            setTimeout(function(){
              indexObj.cekStatusPost(app,dataString)
            },delay)

            }else
            {
              cnt = 0
              app.dialog.alert('Maaf, waktu tunggu normal habis, dalam 1 x 24 kami akan memberikan informasi tentang  ','Informasi') 
              jq('.laporan').show()
              jq('.loading').hide()
            }
              


           }else if(st == 'ok')
           {
            cnt = 0
            indexObj.playNativeSound('notify1')
            
             var json = JSON.parse(pesan)
             var code = json.data.code
            var  tr_name= json.data.tr_name
            var period = json.data.period

            var arrperiod= period.split(',')
                 var strperiod=[]
                 if(arrperiod.length > 0)
                     for(var p in arrperiod)
                     {
                          strperiod.push(arrperiod[p].substring(4,6)+'/'+arrperiod[p].substring(0,4))
                     }
                   
                  var period2 = strperiod.join('-') 

            
            jq('.laporan').show()
            jq('.info').html('<div class="block">\
            <div class="row">\
           <div class="col-50">Kode :</div>\
           <div class="col-50">'+code+'</div>\
           </div>\
           <div class="row">\
           <div class="col-50">Nama Pelanggan :</div>\
           <div class="col-50">'+tr_name+'</div>\
           </div>\
           <div class="row">\
           <div class="col-50">Untuk Perioda :</div>\
           <div class="col-50">'+period2+'</div>\
           </div>\
           <div class="row">\
           <div class="col-100 text-align-center text-color-green"><h3>Telah dilunasi!</h3></div>\
           </div>\
           </div>')

            jq('.loading').hide()

           }else 
           {
            cnt = 0
            indexObj.playNativeSound('notify')

            app.dialog.alert('Maaf, Pesanan Anda gagal di Proses!','Informasi')
            jq('.laporan').show()
            jq('.info').html('Maaf, Pesanan Anda gagal di Proses!','Informasi')
            jq('.loading').hide()

           }

           app.data.hitung = cnt

      

     })


  }


  pilihPaket(jq,obj,arrobj)
  {
    //alert('test')
    
    for(var i in arrobj)
    {
      if(obj == arrobj[i])
      {
        jq(obj).addClass("bg-color-green text-color-white")
      }else
      {
        jq(obj).removeClass("bg-color-green text-color-white")
      }
    }
    
  }

  buatQrcode(jq,param)
  {

    let options = {
      width: 256,
      height: 256,
      colorDark: "#000000",
      colorLight: "#ffffff",
  };
 var data=param.url+'~'+param.username+'~'+param.mobile+'~'+param.email;
  // var data=param.url+'~muliarta~'+param.mobile+'~'+param.email;
  cordova.plugins.qrcodejs.encode('TEXT_TYPE', data, (base64EncodedQRImage) => {
      console.info('QRCodeJS response is ' + base64EncodedQRImage);
    //TODO: use your base64EncodedQRImage
        //alert(base64EncodedQRImage)
        jq('#qrcode_img').show()
        jq('#qrcode_img').attr('src',base64EncodedQRImage)
  }, (err) => {
      //console.error('QRCodeJS error is ' + JSON.stringify(err));
        jq('#qrcode_img').hide()
  }, options);
    

  }

  buatQrcode2(data,callback)
  {

    let options = {
      width: 256,
      height: 256,
      colorDark: "#000000",
      colorLight: "#ffffff",
  };
 //var data=param.url+'~'+param.username+'~'+param.mobile+'~'+param.email;
  // var data=param.url+'~muliarta~'+param.mobile+'~'+param.email;
  cordova.plugins.qrcodejs.encode('TEXT_TYPE', data, (base64EncodedQRImage) => {
      //console.info('QRCodeJS response is ' + base64EncodedQRImage);
    //TODO: use your base64EncodedQRImage
        //alert(base64EncodedQRImage)
       // jq(el).show()
        //jq(el).attr('src',base64EncodedQRImage)
        callback(base64EncodedQRImage)
  }, (err) => {
      //console.error('QRCodeJS error is ' + JSON.stringify(err));
        callback('no')
  }, options);
    

  }

  aturanHarga(price,std,mid,top)
  {
    /*
    Ada 3 range untuk fee:
    1. 1.000 - 30.000 fee = 150
    2. 30.000 - 100.000 fee = 300
    3. 100.000 keatas = 500 rupiah
    */
   var fee=0;
   let return_val= [];
   if(price > 0 && price <= 30000)
   {
     fee = price + std;
     return_val[0]=fee;
     return_val[1]=std;
   }else if(price > 30000 && price <= 100000)
   {
     fee = price + mid;
     return_val[0]=fee;
     return_val[1]=mid;
   }else
   {
     fee = price + top;
     return_val[0]=fee;
     return_val[1]=top;
   }

   return return_val;

  }

  //fungsi mendapatkan key berdasarkan id :kolom
  getArrayKey(keykol,keynil,arr)
  {
   let rsl= -1
     for(var i in arr)
     {
        if(parseInt(arr[i][keykol]) === parseInt(keynil))
        {
          rsl = i
          break
        }
     }

     return rsl
  }

  getItemByKey(arr,keykol,keynil)
  {
    let rsl=[]
    for(var i in arr)
     {
       if(parseInt(arr[i][keykol]) === parseInt(keynil))
        {
          rsl = arr[i]
          break
        }
     }

     return rsl
  }

  printBasket(app)
  {
     var jq = app.data.JQ;
      var basket = app.data.basket
       
        if(basket.length > 0)
        {


            let jum = 0;
            for(var i in basket)
            {
                jum += parseInt(basket[i].qty)
                //jum ++
            }

            jq('.basket-indikator').show()
            jq('.basket-indikator').html(jum)

        }else
        {
          jq('.basket-indikator').hide()
        }
        
     
  }

  addBasket(app,id,qty,page)
  {
     
      var lproduct = app.data.localProduct;
      var key = this.getArrayKey("id",id,app.data.basket)
      if(key == -1) //tidak ada
      {
        var item = this.getItemByKey(lproduct,"id",id)
        item.qty = parseInt(qty)
        app.data.basket.push(item)
       // console.log(app.data.basket)
       return item.name;
      }else
      {
        var item = this.getItemByKey(app.data.basket,"id",id)
        if(typeof page != 'undefined')
        {
        item.qty = parseInt(qty)
        }else
        {
          item.qty = parseInt(item.qty) + parseInt(qty) 
        }
        
        return item.name;
      }
       

  }

  updateBasket(app,id,qty)
  {
    
    var key = this.getArrayKey("id",id,app.data.basket);
    if(key > -1)
    {
      app.data.basket[key].qty = parseInt(qty)
    }
    return app.data.basket
  }

  deleteBasket(app,id)
  {
    var key = this.getArrayKey("id",id,app.data.basket);
    if(key > -1)
    {      
      app.data.basket.splice(key, 1);
    }
    //return app.data.basket
  }

  getDistanceFromLatLng(lat1, lng1, lat2, lng2, miles) { // miles optional
    if (typeof miles === "undefined"){miles=false;}
    function deg2rad(deg){return deg * (Math.PI/180);}
    function square(x){return Math.pow(x, 2);}
    var r=6371; // radius of the earth in km
    lat1=deg2rad(lat1);
    lat2=deg2rad(lat2);
    var lat_dif=lat2-lat1;
    var lng_dif=deg2rad(lng2-lng1);
    var a=square(Math.sin(lat_dif/2))+Math.cos(lat1)*Math.cos(lat2)*square(Math.sin(lng_dif/2));
    var d=2*r*Math.asin(Math.sqrt(a));
    if (miles){return (d * 0.621371).toFixed(2);} //return miles
    else{return d.toFixed(2);} //return km
  }

  compare(a,b) 
  {
    // Use toUpperCase() to ignore character casing
    //const bandA = a.band.toUpperCase();
    //const bandB = b.band.toUpperCase();
    const bandA = a.jarak.jarak_val;
    const bandB = b.jarak.jarak_val;

    let comparison = 0;
    if (bandA > bandB) {
      comparison = 1;
    } else if (bandA < bandB) {
      comparison = -1;
    }
    return comparison;
    }

    getAlamat(app,lat,lon,el)
    {
      var latlon=lat+','+lon
      var jq=app.data.JQ
      var jsonpObj = app.data.jsonpObj
      var url = 'getAddressFromLat.php'
      var dataString = 'latlon='+latlon
      jsonpObj.getTarget(app,url,dataString,function(st,pesan){
          if(st == "ok")
          {

             jq(el).html('<i class="icon f7-icons if-not-md text-color-black">map_pin_ellipse</i><i>Lokasi Anda</i><br>'+pesan)

          }

      })

    }

    getAlamatCall(app,latlon,callback)
    {
     
      
      var jsonpObj = app.data.jsonpObj
      var url = 'getAddressFromLat.php'
      var dataString = 'latlon='+latlon
      jsonpObj.getTarget(app,url,dataString,function(st,pesan){
          if(st == "ok")
          {

             //jq(el).html('<i>'+latlon+'</i><br>'+pesan)
             callback(pesan)

          }else
          {
            callback('no')
          }

      })
    }

    setMemberTipe(app,paket)
    {
      if(parseInt(paket) == 2 || parseInt(paket) == 3)
      {
        app.data.membertipe = 'agen'
      }else
      {
        app.data.membertipe = 'user'
      }
    }

    useAturan(app,curberat,curjarak)
    {
      var berat=app.data.aturan_berat;
      var jarak=app.data.aturan_jarak;
      var biayaberat=0 
      var biayajarak=0;
      var biayatotal=0;
      var last_berat= parseFloat(berat[berat.length - 1].batas_akhir);
      var last_berat_basecost = parseFloat(berat[berat.length - 1].base_cost);
      var last_berat_runcost = parseFloat(berat[berat.length - 1].run_cost);

      var last_jarak=parseFloat(jarak[jarak.length - 1].batas_akhir);
      var last_jarak_basecost=parseFloat(jarak[jarak.length - 1].base_cost);
      var last_jarak_runcost = parseFloat(jarak[jarak.length - 1].run_cost);

    if(curberat > last_berat)
    {
          biayaberat = parseFloat(last_berat_basecost) + (curberat - last_berat) * last_berat_runcost;
    }else
    {
      for(var i in berat)
      {
         if (curberat >= parseFloat(berat[i].batas_awal) && curberat < parseFloat(berat[i].batas_akhir))
         {
            biayaberat = parseFloat(curberat) * parseFloat(berat[i].base_cost);
             break;
         }

      }
    }//end berat



    if(curjarak > last_jarak)
    {
          biayajarak = parseFloat(last_jarak_basecost) + (curjarak - last_jarak) * last_jarak_runcost;
    }else
    {
      for(var i in jarak)
      {
         if (curjarak >= parseFloat(jarak[i].batas_awal) && curjarak < parseFloat(jarak[i].batas_akhir))
         {
            biayajarak = parseFloat(curjarak) * parseFloat(jarak[i].base_cost);
             break;
         }

      }
    }//end jarak
    biayatotal = biayaberat + biayajarak
    return biayatotal

    }


    resetIndikator(app)
    {
      //reset all container home->badge_riwayat
      //terima.terima-kirim,terimasampai jum_invno
        var jq = app.data.JQ
        jq('.badge_riwayat').hide()
        var inv=[]
        inv=app.data.invoiceList
        if(inv.length > 0)
            for(var i in inv)
            {
              jq('.jum_'+inv[i]).hide()
            }


    }

    date_get() { // get current date
      let return_obj = {};

      let date_now = new Date();
      let dd = date_now.getDate();

      let mm = date_now.getMonth()+1; 
      let mtm = mm;
      let yyyy = date_now.getFullYear();
      let hh = date_now.getHours()+1; 
      let mnt = date_now.getMinutes()+1;
      let sec = date_now.getSeconds()+1;
      let mm_string=date_now.toLocaleString('default', { month: 'long' });

      hh = (hh+24-2)%24;
      let mid='am';
      if(hh==0){ //At 00 hours we need to show 12 am
        hh=12;
        }
      else if(hh>12)
        {
        hh=hh%12;
        mid='pm';
        }

      if(dd<10) 
        {
            dd='0'+dd;
        } 
      if(mm<10) 
        {
            mm='0'+mm;
        } 
      if(hh<10) 
        {
            hh='0'+hh;
        }
      if(mnt<10) 
        {
            mnt='0'+mnt;
        }
      if(sec<10) 
        {
            sec='0'+sec;
        }
      return_obj.dd=dd;
      return_obj.mm=mm;
      return_obj.yyyy=yyyy;
      return_obj.hh=hh;
      return_obj.mnt=mnt;
      return_obj.sec=sec;
      return_obj.mm_string=mm_string;
      return_obj.mid=mid;
      return_obj.mtm=mtm;
      return return_obj;
    }

    date_custome_get(dmy,adj_type,adj) {       
      let return_obj = {};
      let date_now = "";
      if(dmy == 'undefined' || dmy ==''){
        date_now = new Date();
      }else{
        date_now = new Date(dmy);
      }
      if(adj_type=='d'){
        date_now.setMonth(date_now.getMonth() + adj);
      }
      if(adj_type=='m'){
        date_now.setMonth(date_now.getMonth() + adj);
      }
      if(adj_type=='Y'){
        date_now.setMonth(date_now.getMonth() + adj);
      }
            
      let dd = date_now.getDate();
      let mm = date_now.getMonth()+1;
      let mtm = mm; 
      let yyyy = date_now.getFullYear();
      let hh = date_now.getHours(); 
      let mnt = date_now.getMinutes();
      let sec = date_now.getSeconds();
      let mm_string=date_now.toLocaleString('default', { month: 'long' });

      hh = (hh+24)%24;
      let mid='am';
      if(hh==0){ //At 00 hours we need to show 12 am
        hh=12;
        }
      else if(hh>12)
        {
        hh=hh%12;
        mid='pm';
        }

      if(dd<10) 
        {
            dd='0'+dd;
        } 
      if(mm<10) 
        {
            mm='0'+mm;
        } 
      if(hh<10) 
        {
            hh='0'+hh;
        }
      if(mnt<10) 
        {
            mnt='0'+mnt;
        }
      if(sec<10) 
        {
            sec='0'+sec;
        }
      return_obj.dd=dd;
      return_obj.mm=mm;
      return_obj.yyyy=yyyy;
      return_obj.hh=hh;
      return_obj.mnt=mnt;
      return_obj.sec=sec;
      return_obj.mm_string=mm_string;
      return_obj.mid=mid;
      return_obj.mtm=mtm;
      return return_obj;
    }

    date_custome_getserver(app,Ymd,adj,adj_type) { 
      var jsonpObj = app.data.jsonpObj
      let return_obj = {}
      var jcari = []
      var dataString = 'Ymd='+Ymd+'&adj='+adj+'&adj_type='+adj_type
      jsonpObj.getTarget(app, 'getdateserver.php', dataString, function (st, pesan) {  
        alert(st+';'+pesan)
        if (st == "ok") {
          jcari = JSON.parse(pesan)
          return_obj.dd=jcari.dd
          return_obj.mm=jcari.mm
          return_obj.yyyy=jcari.yyyy
          return_obj.hh=jcari.hh
          return_obj.mnt=jcari.mnt
          return_obj.sec=jcari.sec
          return_obj.mm_string=jcari.mm_string
          return_obj.mid=jcari.mid
          return_obj.mtm=jcari.mtm
          
        }
        return return_obj
      })      
    }

    showCari(app, dataString) {
      var jq = app.data.JQ
      var jsonpObj = app.data.jsonpObj
      var jcari = []
      var htmlstr = ''
      //alert('klk')
      var dataString_arr = dataString.split("&")
      var yy_arr=dataString_arr[2].split("=")
      var mm_arr=dataString_arr[4].split("=")
      jsonpObj.getTarget(app, 'getListPemakaian.php', dataString, function (st, pesan) {
  
        //alert(st+';'+pesan)
        if (st == "ok") {
  
          jcari = JSON.parse(pesan)
          //var jcarlength = jcari.length
          //alert(jcarlength+';'+jcari)
          if (jcari.length > 0) {
            for (var i in jcari) {
              
              htmlstr += '<li>\
              <a href="/pd_pagepelanggandetil/'+jcari[i].nomorrekening+'" class="item-link item-content">\
                <div class="item-media"><i class="icon icon-f7"></i></div>\
                <div class="item-inner">\
                  <div class="item-title">\
                    <div class="item-header"><strong>'+ jcari[i].nomorrekening + '</strong></div>'+ jcari[i].namapelanggan + '<br>'+ jcari[i].alamat + '<br>Pemakaian Terakhir '+mm_arr[1]+'/'+yy_arr[1]+': <strong>'+ jcari[i].pencatatanmeter + '</strong> ('+ jcari[i].pemakaianair + 'm3)</div>\
                  <div class="item-after">Buka</div>\
                </div>\
              </a>\
            </li>'
  
            }
  
            //alert(htmlstr)
            jq('ul.listresult').html(htmlstr)
          }
  
  
        }
  
      })
    }

    listTagihan(app, dataString) {
      var jq = app.data.JQ
      var jsonpObj = app.data.jsonpObj
      var jcari = []
      var htmlstr = ''
      //alert('klk')
      jsonpObj.getTarget(app, 'getListPelanggan.php', dataString, function (st, pesan) {
  
        //alert(st+';'+pesan)
        if (st == "ok") {
  
          jcari = JSON.parse(pesan)
          //var jcarlength = jcari.length
          //alert(jcarlength+';'+jcari)
          if (jcari.length > 0) {
            for (var i in jcari) {
              
              htmlstr += '<li>\
              <a href="/pd_pagetagihandetil/'+jcari[i].nomorrekening+'" class="item-link item-content">\
                <div class="item-media"><i class="icon icon-f7"></i></div>\
                <div class="item-inner">\
                  <div class="item-title">\
                    <div class="item-header">'+ jcari[i].nomorrekening + '</div>'+ jcari[i].namapelanggan + '</div>\
                  <div class="item-after">Buka</div>\
                </div>\
              </a>\
            </li>'
  
            }
  
            //alert(htmlstr)
            jq('ul.listtagihan').html(htmlstr)
          }
  
  
        }
  
      })
    }

    showTagihan(app, dataString) {
      var jq = app.data.JQ
      var jsonpObj = app.data.jsonpObj
      var jcari = []
      var htmlstr = ''
      //alert('klk')
      jsonpObj.getTarget(app, 'getListPelanggan.php', dataString, function (st, pesan) {
  
        //alert(st+';'+pesan)
        if (st == "ok") {
  
          jcari = JSON.parse(pesan)
          //var jcarlength = jcari.length
          //alert(jcarlength+';'+jcari)
          if (jcari.length > 0) {
            for (var i in jcari) {
              
              htmlstr += '<li>\
              <a href="/pd_pagetagihandetil/'+jcari[i].nomorrekening+'" class="item-link item-content">\
                <div class="item-media"><i class="icon icon-f7"></i></div>\
                <div class="item-inner">\
                  <div class="item-title">\
                    <div class="item-header">'+ jcari[i].nomorrekening + '</div>'+ jcari[i].namapelanggan + '</div>\
                  <div class="item-after">Buka</div>\
                </div>\
              </a>\
            </li>'
  
            }
  
            //alert(htmlstr)
            jq('ul.listtagihan').html(htmlstr)
          }
  
  
        }
  
      })
    }

    showHistory(app, dataString) {
      var jq = app.data.JQ
      var jsonpObj = app.data.jsonpObj
      var jcari = []
      var htmlstr = ''
      //alert('klk')
      var dataString_arr = dataString.split("&")
      var yy_arr=dataString_arr[3].split("=")
      var mm_arr=dataString_arr[5].split("=")
      jsonpObj.getTarget(app, 'getHistorygambarmetersms.php', dataString, function (st, pesan) {
  
        //alert(st+';'+pesan)
        if (st == "ok") {
  
          jcari = JSON.parse(pesan)
          //var jcarlength = jcari.length
          //alert(jcarlength+';'+jcari)
          if (jcari.length > 0) {
            for (var i in jcari) {
              if(jcari[i].idgambar == null){
                jcari[i].idgambar='<span class="red">Belum</span>';
                var link = '/pd_pagepelanggandetil/'+jcari[i].nomorrekening;
                var label_link = 'Baca Meter';
                var txt_pakai = '';
              }else{
                jcari[i].idgambar='Sudah';
                var link = '/pd_pagetagihandetil/'+jcari[i].nomorrekening+':'+mm_arr[1]+':'+yy_arr[1];
                var label_link = 'Info Tagihan';
                var txt_pakai = '<br>Pemakaian Bulan '+mm_arr[1]+'/'+yy_arr[1]+': <strong>'+ jcari[i].pencatatanmeter + '</strong> ('+ jcari[i].pemakaianair + 'm3)';
              }
              htmlstr += '<li>\
              <a href="'+link+'" class="item-link item-content">\
                <div class="item-media"><i class="icon icon-f7"></i></div>\
                <div class="item-inner">\
                  <div class="item-title">\
                    <div class="item-header"><strong>'+ jcari[i].nomorrekening + '</strong></div>'+ jcari[i].namapelanggan + '<br>'+ jcari[i].alamat + '<br>Status Pencatatan '+mm_arr[1]+'/'+yy_arr[1]+': <strong>'+ jcari[i].idgambar + '</strong>'+txt_pakai+'</div>\
                  <div class="item-after">'+label_link+'</div>\
                </div>\
              </a>\
            </li>'
  
            }
  
            //alert(htmlstr)
            jq('ul.historyresult').html(htmlstr)
          }
  
  
        }
  
      })
    }

    cekInternet()
    {
      
	  console.log(navigator.connection.type)
     
      if(navigator.connection.type === 'none') 
      {
       return false
       }else
       {
         return true   
       }
    }

    
}


export default new index();