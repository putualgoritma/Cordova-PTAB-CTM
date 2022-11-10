class nstorage
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


    saveData(skey,svalue)
    {
    NativeStorage.setItem(skey,svalue,null,null);	
    }

    removeData(skey)
    {
        NativeStorage.remove(skey,null,null);	
    }


     getData(skey,callback)
        {
            NativeStorage.getItem(skey, success, error);
            function success(rsl)
            {
                callback(rsl);
            }
            
            function error(err)
            {
                callback('undefined');
            }
            
        }


        setInitData(skey,svalue,callback)
        {
                        this.getData(skey,sukses);
                                function sukses(data)
                                {
                                    if(data == 'undefined')
                                      this.saveData(skey,svalue);
                                    
                                callback("ok",data);	
                                }
            
        }

}

export default new nstorage()