class websqlSD {
  constructor() {
    //this._obj=obj
    this.db = null
  }

  get name() {
    return this.constructor._obj;
  }

  set name(newObj) {
    //this._obj = newObj;
    this.constructor._obj = newObj;
  }

  createDB(app) {
    var dbSize = 200 * 1024 * 1024; // 150MB
    console.log("try to create pdam db")
    var db = openDatabase("pdam", "", "Todo manager", dbSize, function () {
      console.log('db successfully opened or created');
    });
    app.data.OPENDB = db
    this.db = db
  }

  checkOneTable(tbname, db) {
    var sql2 = "SELECT * FROM " + tbname

    db.transaction(function (tx2) {
      tx2.executeSql(sql2, [],
        function (transaction2, result2) {
          console.log(result2)
        },
        function (transaction2, error2) {
          console.log(error2)
        })
    })
  }
  checkTable(tbname, db, callback) {
    //SELECT DISTINCT tbl_name FROM sqlite_master WHERE tbl_name = '"+tbname+"'
    //SELECT name FROM sqlite_master WHERE type='table' AND name='"+tbname+"'
    var db_ = db
    var tbname_ = tbname

    var sql = "SELECT DISTINCT tbl_name FROM sqlite_master WHERE tbl_name = '" + tbname + "'"
    db.transaction(function (tx) {
      tx.executeSql(sql, [],
        function (transaction, result) {
          if (result.rows.length > 0) {
            //   callback('ok')
            var sql2 = "SELECT * FROM " + tbname_

            db_.transaction(function (tx2) {
              tx2.executeSql(sql2, [],
                function (transaction2, result2) {
                  if (result2.rows.length > 0) {
                    callback('ok', result2.rows.length)
                  } else {
                    callback('no', '0')
                  }
                },
                function (transaction2, error2) {
                  callback('no')
                })

            })


          } else {
            callback('no')
          }
        },
        function (transaction, error) {
          callback('no')
        });
    });
  }

  createTable(sql, db, callback) {
    //"CREATE TABLE IF NOT EXISTS todo(ID INTEGER PRIMARY KEY ASC, todo TEXT, added_on TEXT)"
    db.transaction(function (tx) {
      tx.executeSql(sql, [],
        function (transaction, result) {
          console.log(result)
          callback("ok")

        },
        function (transaction, error) {
          console.log(error)
          callback("no")
        });
    });

  }

  createPDAM(db) {
    var tblpelanggan = "CREATE TABLE IF NOT EXISTS tblpelanggan (nomorrekening TEXT NOT NULL UNIQUE,namapelanggan TEXT NULL,alamat TEXT NULL,dusun TEXT NULL,desa TEXT NULL,kecamatan TEXT NULL,idgol TEXT NULL,idareal TEXT NULL,tglterdaftar TEXT NULL,tgltersambung TEXT NULL,sbg TEXT NULL,status INTEGER NULL,idurut INTEGER NULL,idurutcode TEXT NULL,tipe TEXT NULL,idbiro TEXT NULL,idstatusdenda TEXT NULL,nomorhp TEXT NULL,nomorsurat TEXT NULL,tmplahir TEXT NULL,tgllahir TEXT NULL,alamat_detail TEXT NULL,alamat_ktp TEXT NULL,telp TEXT NULL,pekerjaan TEXT NULL,flagpendaftaran INTEGER NULL,tglentry TEXT NULL,tglrab TEXT NULL,norab TEXT NULL,tglpanggil TEXT NULL,biayainstalasi REAL NULL,cicilan INTEGER NULL,flaginstalasi INTEGER NULL,tglbap TEXT NULL,nobap TEXT NULL,tglberlakubap TEXT NULL,wmnomor TEXT NULL,wmmerek TEXT NULL,wmukuran INTEGER NULL,wmstandmeter INTEGER NULL,wmpetugas TEXT NULL,totalbayar REAL NULL,status_posting TEXT NULL,flag_bayar TEXT NULL,sono INTEGER NULL,sms TEXT NULL,rupiah_meter REAL NULL,last_opp TEXT NULL,last_update TEXT NULL,file_wm TEXT NULL,file_denah TEXT NULL)"



    var tblpemakaianair = "CREATE TABLE IF NOT EXISTS tblpemakaianair (nomorrekening TEXT NOT NULL,tahunrekening INTEGER NULL,pencatatanmeter1 INTEGER NULL,pemakaianair1 INTEGER NULL,pencatatanmeter2 INTEGER NULL,pemakaianair2 INTEGER NULL,pencatatanmeter3 INTEGER NULL,pemakaianair3 INTEGER NULL,pencatatanmeter4 INTEGER NULL,pemakaianair4 INTEGER NULL,pencatatanmeter5 INTEGER NULL,pemakaianair5 INTEGER NULL,pencatatanmeter6 INTEGER NULL,pemakaianair6 INTEGER NULL,pencatatanmeter7 INTEGER NULL,pemakaianair7 INTEGER NULL,pencatatanmeter8 INTEGER NULL,pemakaianair8 INTEGER NULL,pencatatanmeter9 INTEGER NULL,pemakaianair9 INTEGER NULL,pencatatanmeter10 INTEGER NULL,pemakaianair10 INTEGER NULL,pencatatanmeter11 INTEGER NULL,pemakaianair11 INTEGER NULL,pencatatanmeter12 INTEGER NULL,pemakaianair12 INTEGER NULL,tglupdate TEXT NULL,operator TEXT NULL)"

    var tbljenispelanggan = "CREATE TABLE IF NOT EXISTS tbljenispelanggan(id TEXT NOT NULL UNIQUE,jenispelanggan TEXT NULL,deskripsi TEXT NULL,beban INTEGER,	tarif01 INTEGER,tarif02 INTEGER,tarif03 INTEGER,tarif04 INTEGER,tarif05 INTEGER,tarif06 INTEGER,danameter INTEGER,danaadministrasi INTEGER,batastarif1 INTEGER,batastarif2 INTEGER,batastarif3 INTEGER,batastarif4 INTEGER,batastarif5 INTEGER,batastarif6 INTEGER,jaminanpelanggan INTEGER)"

    var tblopp = "CREATE TABLE IF NOT EXISTS tblopp (nomorrekening TEXT NOT NULL UNIQUE,operator TEXT NULL,status INTEGER NULL,tanggalmulai TEXT NULL)"

    var pbk = "CREATE TABLE IF NOT EXISTS pbk (GroupID INTEGER NULL,Name TEXT NULL,Number TEXT NOT NULL UNIQUE,Password TEXT NULL)"

    var tblstatuswm = "CREATE TABLE IF NOT EXISTS tblstatuswm (id TEXT NOT NULL UNIQUE,NamaStatus TEXT NULL,smsstatus TEXT NULL)"

    var nonair_m_kec = "CREATE TABLE IF NOT EXISTS nonair_m_kec (idkec INTEGER NOT NULL,kec TEXT NULL)"

    var nonair_m_desa = "CREATE TABLE IF NOT EXISTS nonair_m_desa (iddesa INTEGER NOT NULL,        namadesa TEXT NULL,idkec INTEGER NULL)"

    var nonair_m_dusun = "CREATE TABLE IF NOT EXISTS nonair_m_dusun (iddusun TEXT NOT NULL,namadusun TEXT NULL,idkec INTEGER NULL,iddesa INTEGER NULL)"

    var map_koordinatpelanggan = "CREATE TABLE IF NOT EXISTS map_koordinatpelanggan (idkoordinat INTEGER NOT NULL,nomorrekening TEXT NULL,qrcode TEXT NULL,rumah_foto TEXT NULL,wm_foto TEXT NULL,lat DOUBLE NULL,lng DOUBLE NULL,n_jarak DOUBLE NULL,n_foto TEXT NULL,n_keterangan TEXT NULL,ne_jarak DOUBLE NULL,ne_foto TEXT NULL,ne_keterangan TEXT NULL,e_jarak DOUBLE NULL,e_foto TEXT NULL,e_keterangan TEXT NULL,se_jarak DOUBLE NULL,se_foto TEXT NULL,se_keterangan TEXT NULL,s_jarak DOUBLE NULL,s_foto TEXT NULL,s_keterangan TEXT NULL,sw_jarak DOUBLE NULL,sw_foto TEXT NULL,sw_keterangan TEXT NULL,w_jarak DOUBLE NULL,w_foto TEXT NULL,w_keterangan TEXT NULL,nw_jarak DOUBLE NULL,nw_foto TEXT NULL,nw_keterangan TEXT NULL,accuracy DOUBLE NULL,datetime TEXT NULL)"

    var tblstatussmpelanggan = "CREATE TABLE IF NOT EXISTS tblstatussmpelanggan (nomorrekening TEXT NOT NULL,bulan INTEGER NULL,tahun INTEGER NULL,statussm TEXT NULL,operator TEXT NULL)"
    //1
    db.transaction(function (tx) {
      tx.executeSql(tblpelanggan, [],
        function (transaction, result) {
          console.log("tbl pelanggan OK")
        },
        function (transaction, error) {
          console.log("tbl pelanggan NO")
        });
    });

    //2
    db.transaction(function (tx) {
      tx.executeSql(tblpemakaianair, [],
        function (transaction, result) {
          console.log("tbl pemakaianair OK")
        },
        function (transaction, error) {
          console.log("tbl pemakaianair NO")
        });
    });

    //3
    db.transaction(function (tx) {
      tx.executeSql(tbljenispelanggan, [],
        function (transaction, result) {
          console.log("tbl jenispelanggan OK")
        },
        function (transaction, error) {
          console.log("tbl jenispelanggan NO")
        });
    });


    //4
    db.transaction(function (tx) {
      tx.executeSql(tblopp, [],
        function (transaction, result) {
          console.log("tbl opp OK")
        },
        function (transaction, error) {
          console.log("tbl opp NO")
        });
    });

    //5
    db.transaction(function (tx) {
      tx.executeSql(pbk, [],
        function (transaction, result) {
          console.log("tbl pbk OK")
        },
        function (transaction, error) {
          console.log("tbl pbk NO")
        });
    });


    //6
    db.transaction(function (tx) {
      tx.executeSql(tblstatuswm, [],
        function (transaction, result) {
          console.log("tbl statuswm OK")
        },
        function (transaction, error) {
          console.log("tbl statuswm NO")
        });
    });
    //7
    db.transaction(function (tx) {
      tx.executeSql(nonair_m_kec, [],
        function (transaction, result) {
          console.log("tbl nonair_m_kec OK")
        },
        function (transaction, error) {
          console.log("tbl nonair_m_kec NO")
        });
    });
    //8
    db.transaction(function (tx) {
      tx.executeSql(nonair_m_desa, [],
        function (transaction, result) {
          console.log("tbl nonair_m_desa OK")
        },
        function (transaction, error) {
          console.log("tbl nonair_m_desa NO")
        });
    });
    //9
    db.transaction(function (tx) {
      tx.executeSql(nonair_m_dusun, [],
        function (transaction, result) {
          console.log("tbl nonair_m_dusun OK")
        },
        function (transaction, error) {
          console.log("tbl nonair_m_dusun NO")
        });
    });
    //10
    db.transaction(function (tx) {
      tx.executeSql(map_koordinatpelanggan, [],
        function (transaction, result) {
          console.log("tbl map_koordinatpelanggan OK")
        },
        function (transaction, error) {
          console.log("tbl map_koordinatpelanggan NO")
        });
    });
    //11
    db.transaction(function (tx) {
      tx.executeSql(tblstatussmpelanggan, [],
        function (transaction, result) {
          console.log("tbl tblstatussmpelanggan OK")
        },
        function (transaction, error) {
          console.log("tbl tblstatussmpelanggan NO")
        });
    });


  } //end create PDAM

  clearData(db, sql, callback) {
    db.transaction(function (tx) {
      tx.executeSql(sql, [],
        function (transaction, result) {
          callback('ok')
        },
        function (transaction, error) {
          callback('no',error)
        });
    });
  }

  insertData(db, sql, index, data, filename, callback) {
    var index = index
    var data = data
    var filename = filename
    db.transaction(function (tx) {
      tx.executeSql(sql, [],
        function (transaction, result) {
          console.log(result)
          callback('ok', index, data, filename)
        },
        function (transaction, error) {
          console.log(error)
          callback('no', index, data, filename)
        });
    });
  }


  rebuildTable(db, tbname, sql) {
    var self = this
    var db_ = db
    var sql_ = sql
    var sql2 = "DROP table " + tbname
    db.transaction(function (tx) {
      tx.executeSql(sql2, [],
        function (transaction, result) {
          console.log(result)
          self.createTable(sql_, db_, function (st) {
            console.log(st)

          })
        },
        function (transaction, error) {
          console.log(error)

        });
    });
  }

  selectQuery(db, sql, callback) {
    var sql2 = sql
    try {
      db.transaction(function (tx) {
        tx.executeSql(sql2, [],
          function (transaction, result) {
            //console.log(result) 
            if (result.rows[0] != "undefined" && result.rows.length > 0) {
              callback('ok', result.rows[0])
            } else {
              callback('no', 'error')
            }

          })
      },
        function (transaction, error) {
          console.log(error)
          callback('no', error)

        });
    } catch (err) {

      callback('no', error)
    }

  }

  selectQuery2(db, sql, callback) {
    var sql2 = sql
    try {
      db.transaction(function (tx) {
        tx.executeSql(sql2, [],
          function (transaction, result) {
            //console.log(result) 
            if (result.rows[0] != "undefined" && result.rows.length > 0) {
              callback('ok', result.rows)
            } else {
              callback('no', 'error')
            }

          })
      },
        function (transaction, error) {
          console.log(error)
          callback('no', error)

        });
    } catch (err) {

      callback('no', error)
    }

  }

  selectQuerytest(db, sql, callback) {
    var sql2 = sql
    try {
      db.transaction(function (tx) {
        tx.executeSql(sql2, [],
          function (transaction, result) {
            //console.log(result) 
            if (result.rows[0] != "undefined" && result.rows.length > 0) {
              callback('ok', result.rows[0])
            } else {
              callback('no', 'error')
            }
            //callback('no',result.rows[0])
            //callback('no','Bagus '+result.rows.length+' - '+result.rows[0].Name)
          })
      },
        function (transaction, error) {
          console.log(error)
          callback('no', error)

        });
    } catch (err) {

      callback('no', error)
    }

  }

  pdam_select_avg(db, sql, mtm, callback) {
    var sql2 = sql
    try {
      db.transaction(function (tx) {
        tx.executeSql(sql2, [],
          function (transaction, result) {
            //console.log(result) 
            if (result.rows[0] != "undefined" && result.rows.length > 0) {
              callback('ok', mtm, result.rows[0])
            } else {
              callback('no', mtm, 'error')
            }

          })
      },
        function (transaction, error) {
          console.log(error)
          callback('no', mtm, error)

        });
    } catch (err) {

      callback('no', mtm, error)
    }

  }



}

export default new websqlSD()