class jsonp {
    
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
        this.constructor._obj = newObj;
    }

    demo()
    {
        return "ini demo jsonp"
    }

    
	login (app,dataString,callback)
	{
		
		var server=app.data.config.mainServer;
		//alert(server+','+dataString)
        var jq = app.data.JQ;
		jq.ajax({
		type: "POST",
		url:server + "login.php?callback=?",
		timeout:10000,
		data: dataString,
		crossDomain: true,
		cache: false,
		beforeSend: function(){			
			
			app.preloader.show();		
		},
		success: function(data){
			app.preloader.hide();
	     if(data.status == "ok")
		  {	
            
		    callback(data.status,data.pesan,data.info);			
		  }else
		  {			
			callback(data.status,data.pesan,data.info); 
		  }	  
		  
		},
		error : function(err)
		{
			app.preloader.hide();	
		  callback('no','error',"");
		},
		dataType:"jsonp"
		});
		
	
	}
	
	login2 (app,dataString,callback)
	{
		
		var server=app.data.config.mainServer;
		//alert(server+','+dataString)
        var jq = app.data.JQ;
		jq.ajax({
		type: "POST",
		url:server + "login.php?callback=?",
		timeout:10000,
		data: dataString,
		crossDomain: true,
		cache: false,
		beforeSend: function(){		
		},
		success: function(data){
			
	     if(data.status == "ok")
		  {	
            
		    callback(data.status,data.pesan,data.info);			
		  }else
		  {			
			callback(data.status,data.pesan,data.info); 
		  }	  
		  
		},
		error : function(err)
		{
		
		  callback('no','error',"");
		},
		dataType:"jsonp"
		});
		
	
    }
    
	autologin(app,dataString,callback)
	{
		var server=app.data.config.mainServer;
		//alert(server+','+dataString)
		var jq = app.data.JQ;
		jq.ajax({
		type: "POST",
		url:server + "login.php?callback=?",
		timeout:50000,
		data: dataString,
		crossDomain: true,
		cache: false,
		beforeSend: function(){			
			app.preloader.show();					
		},
		success: function(data){
			app.preloader.hide();
	     if(data.status == "ok")
		  {	
             
			callback(data.status,data.pesan,data.info);			
		  }else
		  {			
			callback(data.status,data.pesan,data.info); 
		  }	  
		  
		},
		error : function(err)
		{
			app.preloader.hide();
		  callback('no',"Terjadi kesalahan saat proses, mohon kontak admin","");
		},
		dataType:"jsonp"
		});
		
	
	}

	
	getDownline (app,dataString,callback)
	{
		
		var server=app.data.config.mainServer;
		//alert(server+','+dataString)
        var jq = app.data.JQ;
		jq.ajax({
		type: "POST",
		url:server + "getDownline.php?callback=?",
		timeout:10000,
		data: dataString,
		crossDomain: true,
		cache: false,
		beforeSend: function(){			
			
			app.preloader.show();		
		},
		success: function(data){
			app.preloader.hide();
	     if(data.status == "ok")
		  {	
            
		    callback(data.status,data.pesan);			
		  }else
		  {			
			callback(data.status,data.pesan); 
		  }	  
		  
		},
		error : function(err)
		{
			app.preloader.hide();	
		  callback('no','error');
		},
		dataType:"jsonp"
		});
		
	
	}
	

	getTarget(app,url,dataString,callback)
	{
		
		var server=app.data.config.mainServer;
			
		//alert(server+','+dataString)
        var jq = app.data.JQ;
		jq.ajax({
		type: "POST",
		url:server + url+"?callback=?",
		timeout:10000,
		data: dataString,
		crossDomain: true,
		cache: false,
		beforeSend: function(){			
			
			app.preloader.show();		
		},
		success: function(data){
			app.preloader.hide();
	   
			if(typeof data.pesan2 == 'undefined')
			{
				callback(data.status,data.pesan);
			}
			else
			{
				callback(data.status,data.pesan,data.pesan2);
			}

				
		   
		  
		},
		error : function(err)
		{
		   app.preloader.hide();	
		  callback('no',err,'error');
		},
		dataType:"jsonp"
		});
		
	
	}


	getTarget2(app,url,dataString,callback)
	{
		
		
		var server=app.data.config.mainServer;
			
		//alert(server+','+dataString)
        var jq = app.data.JQ;
		jq.ajax({
		type: "POST",
		url:server + url+"?callback=?",
		timeout:15000,
		data: dataString,
		crossDomain: true,
		cache: false,
		beforeSend: function(){			
			
			app.preloader.show();		
		},
		success: function(data){
			app.preloader.hide();
	     if(data.status == "ok")
		  {	
            
		    callback(data);			
		  }else
		  {			
			callback(data); 
		  }	  
		  
		},
		error : function(err)
		{
			app.preloader.hide();	
		  callback('no');
		},
		dataType:"jsonp"
		});
		
	
	}


	getTargetJson(app,url,dataString,callback)
	{
		
		
		var server=app.data.config.mainServer;
			
		//alert(server+','+dataString)
        var jq = app.data.JQ;
		jq.ajax({
		type: "POST",
		url:server + url,
		timeout:30000,
		data: dataString,
		crossDomain: true,
		cache: false,
		beforeSend: function(){			
			
			app.preloader.show();		
		},
		success: function(data){
			app.preloader.hide();
	     if(data.status == "ok")
		  {	
            
		    callback(data);			
		  }else
		  {			
			callback(data); 
		  }	  
		  
		},
		error : function(err)
		{
			app.preloader.hide();	
		    callback('no');
		},
		dataType:"json"
		});
		
	
	}


	getTarget3(app,url,dataString,callback)
	{
		
		var server=app.data.config.pulsaServer;
			
		//alert(server+','+dataString)
        var jq = app.data.JQ;
		jq.ajax({
		type: "POST",
		url:server + url+"?callback=?",
		timeout:10000,
		data: dataString,
		crossDomain: true,
		cache: false,
		beforeSend: function(){			
			
			app.preloader.show();		
		},
		success: function(data){
			app.preloader.hide();
	   
			if(typeof data.pesan2 == 'undefined')
			{
				callback(data.status,data.pesan);
			}
			else
			{
				callback(data.status,data.pesan);
			}

				
		   
		  
		},
		error : function(err)
		{
		   app.preloader.hide();	
		  callback('no','error');
		},
		dataType:"jsonp"
		});
		
	
	}

	getTarget4(app,url,dataString,callback)
	{
		
		
		var server=app.data.config.pulsaServer;
			
		//alert(server+','+dataString)
        var jq = app.data.JQ;
		jq.ajax({
		type: "POST",
		url:server + url+"?callback=?",
		timeout:10000,
		data: dataString,
		crossDomain: true,
		cache: false,
		beforeSend: function(){			
			
			app.preloader.show();		
		},
		success: function(data){
			app.preloader.hide();
	     if(data.status == "ok")
		  {	
            
		    callback(data);			
		  }else
		  {			
			callback(data); 
		  }	  
		  
		},
		error : function(err)
		{
			app.preloader.hide();	
		  callback('no');
		},
		dataType:"jsonp"
		});
		
	
	}
	
	pendaftaran(app,dataString,callback)
	{
		var server=app.data.config.mainServer;
		//alert(server+','+dataString)
        var jq = app.data.JQ;
		jq.ajax({
			type: "POST",
			url:server + "konfirmasi_pendaftaran.php?callback=?",
			timeout:10000,
			data: dataString,
			crossDomain: true,
			cache: false,
			beforeSend: function(){
				
				app.preloader.show();		
			},
			success: function(data){
			app.preloader.hide();
			 if(data.status == "ok")
			  {	
				
				callback(data.status,data.pesan);			
			  }else
			  {			
				callback(data.status,data.pesan); 
			  }	  
			  
			},
			error : function(err)
			{
				app.preloader.hide();	
			  callback('no','error');
			},
			dataType:"jsonp"
			});
	} 
	

	paketUpgrade (app,dataString,callback)
	{
		
		var server=app.data.config.mainServer;
		//alert(server+','+dataString)
        var jq = app.data.JQ;
		jq.ajax({
		type: "POST",
		url:server + "selectedPaket.php?callback=?",
		timeout:10000,
		data: dataString,
		crossDomain: true,
		cache: false,
		beforeSend: function(){			
			
			app.preloader.show();		
		},
		success: function(data)
		{
			app.preloader.hide();
	     if(data.status == "ok")
		  {	
            
		    callback(data.status,data.pesan,data.paket);			
		  }else
		  {			
			callback(data.status,data.pesan,data.paket); 
		  }	  
		  
		},
		error : function(err)
		{
			app.preloader.hide();	
		  callback('no','error','');
		},
		dataType:"jsonp"
		});
		
	
	}

	getInvoice(app)
	{
		var dataString={username:app.data.userinfo.username,membertipe:app.data.membertipe}
		var url="getInvoice.php";
		var socketObj = app.data.socketObj
		var indexObj = app.data.indexObj
		var app_=app
		this.getTargetJson(app,url,dataString,function(data){
			if(data.status == "ok")
			{
				app.data.invoiceList = data.pesan
				indexObj.resetIndikator(app)
				setTimeout(function(){
                    socketObj.sendMessage(app_,'requestMsgStatus',{username:app_.data.userinfo.username,membertipe:app_.data.membertipe})
                  },500)
			}

		})

	}

  }

  export default new jsonp();