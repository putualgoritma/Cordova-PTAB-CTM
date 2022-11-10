//import daftar_produk from '../../pages/edaftar_produk_f7.html'
class mysocket
{

    constructor()
    {
      this.server = 'https://b3st.co.id:3000'
      this.domain = 'https://b3st.co.id/integrasi/'
      this.pageObj = null
      this.pageName = ''
    
    }

    test()
    {
       this.pageObj.testAkses(this.pageName)
    }

   setCurPage(obj)
   {
         this.pageObj = obj
         //this.pageName = name 
   }

   setCurPageName(name)
   {
        this.pageName = name 
   }


    startSocket(app,username,usertipe)
    {
     var app_ =app
     var indexObj = app.data.indexObj
     var jsonpObj = app.data.jsonpObj
     var jq = app.data.JQ
     var socketObj = app.data.socketObj

     const socket = app.data.IO(this.server, {      
        transports: ['websocket'], 
        jsonp: false,
        upgrade:false
       });   
        socket.connect(); 
    
       socket.once('connect', () => { 
       console.log('connected to socket server new implemented!'); 
      
        }); 
    
        socket.on('getuname', () => { 
              socket.emit("change_userid",{userid: username,usertipe:usertipe}); 
        }); 

      //untuk user
       socket.on('agenrespond', (data) => { 
        
        var router = this.pageObj.$f7router;
        if(data.topik == "agen_terima")
        {
          app.data.popcall.close()
          app.data.popcall.destroy()
          indexObj.stopNativeSound('phone2') 
          app.dialog.alert("Pesanan Anda Sudah diterima!",function(){
            app.data.basket=[];
            indexObj.stopNativeSound('phone2') 
            router.navigate('/terima/')
          })

        }else if(data.topik == "agen_tolak")
        {
          if(this.pageName == 'checkout')
          {
            app.data.popcall.close()
            app.data.popcall.destroy()
            indexObj.stopNativeSound('phone2') 
            if(this.pageObj.indexAgens < this.pageObj.selectedAgens.length - 1)
            {
              var newindex = this.pageObj.indexAgens + 1
              this.pageObj.$setState({indexAgens : newindex })
              this.pageObj.reKalkulasiShipping(app)
              this.pageObj.callAgen()
            }else
            {
              this.pageObj.$setState({indexAgens : 0})
              app.dialog.alert('Maaf, Semua Agen Masih melayani pelanggan lain,mohon menunggu sebentar untuk mencoba panggilan ulang!')
            }  
         }

        }else if(data.topik == "agen_kemas")
        {
          indexObj.showToast('Pesanan anda sedang dikemas','long','top')	
          if(this.pageName == 'terima')
              this.pageObj.loadProdukStatus2()

        }else if(data.topik == "agen_kirim")
        {
          indexObj.showToast('Pesanan anda sudah diantarkan','long','top')	
          if(this.pageName == 'terima')
               this.pageObj.loadProdukStatus2()

        }else if(data.topik == "agen_sampai")
        {
          indexObj.showToast('Pesanan anda tiba ditempat','long','top')	
          if(this.pageName == 'terima')
             this.pageObj.loadProdukStatus2()

        }else if(data.topik == "agen_refund")
        {
          indexObj.showToast('Pesanan anda dikembalikan','long','top')	
          if(this.pageName == 'terima')
               this.pageObj.loadProdukStatus2()

        }




        }); 


        //untuk agen
        socket.on('userrespond', (data) => { 
          
        var router = this.pageObj.$f7router;
        var self=this

        if(app.data.membertipe == "agen")
        {
              if(data.topik == "panggil")
              {
                if(this.pageName != 'terima')
                {
                  console.log('open terima')
                  router.navigate('/terima/')
                 
                  setTimeout(function(){
                    console.log('setimeout run')
                    self.pageObj.agendiPanggil(app,data)
                  },1000)

                }else
                {
                  this.pageObj.agendiPanggil(app,data)

                }
              }else if(data.topik == "batal")
              {

                indexObj.stopNativeSound('phone2') 
                app.data.popcall.close()
                app.data.popcall.destroy()
                app.dialog.alert('Maaf, Pesanan dibatalkan Pelanggan terlalu lama menunggu!')
              }else if(data.topik == "feedback")
              {
                 
                app.toast.show({
                  icon: '<i class="icon f7-icons if-not-md text-color-white">info</i>',
                  text: 'Anda mendapat Feedback atas Pesanan : '+ data.orderid,
                  position: 'bottom',
                  cssClass: 'toast-round bg-color-orange',
                  closeTimeout:1500          
                });

              }
        }

          }); 

          socket.on('getPosKurir', (data) => { 
            var self = this
            var pos= data.split(",")
            console.log(data)
              if(this.pageName == "emapping")
              {
               try{ 
                self.pageObj.markerKurir.setPosition({
                  lat: pos[0],
                  lng: pos[1]
                });
              }catch(err){}


              }
          

         })


          socket.on('getMsgStatus', (data) => { 
             //reset all container home->badge_riwayat
             //terima.terima-kirim,terimasampai jum_invno
           indexObj.resetIndikator(app)
           var total=0
          // console.log('getmsg st1')
           if(typeof data[0].jum != 'undefined')
           {
            //console.log(data)
              for(var i in data)
              {
                if(parseInt(data[i].jum) > 0)
                {
                 // console.log('.jum_'+data[i].trid+'='+data[i].jum)
                   jq('.jum_'+data[i].trid).show().html(data[i].jum) 
                   total += parseInt(data[i].jum)
                }
              }

              jq('.badge_riwayat').show().html(total) 
            }


          })
    

   socket.on('getMessage',(data)=>{
//{pengirim:userfrom,penerima:userto,pesan:pesan,photo:photo,waktu:waktu,namapengirim:namapengirim,mode:mode,trid:trid,cid:nid}
  indexObj.playNativeSound('notify1')  

if(this.pageName == 'chat')
      {
        var imgserver = app.data.config.imageServer
        var photo= imgserver + '/users/nouser.jpg'
        if(data.photo != null || data.photo != "")
        {
           photo = imgserver + '/users/'+data.photo
        }

          this.pageObj.msgObj.addMessage({
            text:data.pesan,
            type : 'received',
            name : data.namapengirim,
            avatar : photo,
            textFooter:data.waktu
          })
          
            this.sendMessage(app,'set2read',{cid:data.cid,trid:data.trid,pengirim:data.penerima,penerima:data.pengirim});
      }else
      {
        app.toast.show({
					icon: '<i class="icon f7-icons if-not-md text-color-white">info</i>',
					text: 'Pesan Baru dari '+ data.namapengirim,
					position: 'bottom',
          cssClass: 'toast-round bg-color-orange',
          closeTimeout:1500          
        });

        socketObj.sendMessage(app,'requestMsgStatus',{username:app.data.userinfo.username,membertipe:app.data.membertipe})


      }


   })

   socket.on('readed',(data)=>{
      //{pengirim:data.pengirim,penerima:data.penerima,trid:data.trid,cid:data.cid}
      if(this.pageName == 'chat')
      {
        indexObj.playNativeSound('notify')
      }
  })


   socket.on('getHistory',(datum)=>{
    var userfrom = app.data.userinfo.username;
    var imgserver = app.data.config.imageServer;
    //userfromname,userfromto,photo_userto,id,userfrom,userto,messages,type,status,mode,groupid,created_at,updated_at,hs_id
    /*arrmsg.push(
  {text:'ada yg bisa dibantu?',
  type : 'received',
  name : 'widia2',
  avatar : 'https://cdn.framework7.io/placeholder/people-100x100-7.jpg'
})

arrmsg.push(
  {text:'Ya , saya mau order',
  type : 'sent',
})*/
    if(this.pageName == "chat")
    {
    var arrmsg=[];
    var data = datum.sejarah
    for(var i in data)
    {
      if(userfrom == data[i].userfrom)
      {
        //tipe sent
        arrmsg.push(
          {
          text:data[i].messages,
          type : 'sent',          
          textFooter:data[i].created_at
        })
      }else
      {
        //tipe received
        var avatarurl=''
        if(data[i].photo_userto != null || data[i].photo_userto != "")
        {
            avatarurl = imgserver +'users/'+data[i].photo_userto
        }else
        {
             avatarurl = imgserver +'users/nouser.jpg'
        }
        arrmsg.push(
          {text:data[i].messages,
          type : 'received',
          name : data[i].userfromname,
          avatar : avatarurl,
          textFooter:data[i].created_at
        })

      }

    }

 // console.log(data)

     this.pageObj.msgObj.addMessages(arrmsg)
  }
     

})

socket.on('USERINFO',(data)=>{
  console.log('refresh user info')
  if(this.pageName == 'home')
  {
    jq('.namaAnggota').html(data.fname)
     app.data.userinfo.tamount = data.tamount           
    var saldo_label=new Intl.NumberFormat().format(data.tamount)
    saldo_label = saldo_label.replace(',','.')
    jq('.saldopoin').html('<h3> ' +saldo_label + '</h3>')
  }
})



       app.data.OPENSOCKET = socket 
    
    }



    sendMessage(app,topik,params)
    {
        if(app.data.OPENSOCKET.connected)
        {
          console.log('send class')
          app.data.OPENSOCKET.emit(topik,params); 
        }

    }
}

export default new mysocket();