const express = require('express');
const path = require('path');
const ejs = require('ejs');
const bodyparser = require('body-parser')
const sql = require('mssql');
const app = express();

// set views file
app.set('views', path.join(__dirname,'views'));

// set view engine
app.set('view engine','ejs');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

app.get('/', async(req,res)=>{
const config = {
    user : 'admin',
    password :'A@Zmet@l!!123',
    server:'72.255.34.95',
    database : 'tile', 
    options:  {
          encrypt : false
        }
    }
    
  try {
      // make sure that any items are correctly URL encoded in the connection string
      let pool = await sql.connect(config);
     // console.log('db connected');
      const result = await pool.request().query("select * from qstockbalancemobile where itemcode like '%MUL%' ");
     //sql.query("INSERT INTO customers (name, address) VALUES ('alaah hukber', 'Highway 37')")
     
      // console.log('query executed');
     // console.log(result);
      res.render('stockbal',{
      title: 'Items Balance Inquiry', itemsData:result.recordset });
      pool.close();
      sql.close();
     // console.log('db connection closed');
    } catch (err) {
       console.log(err);
                    }
  }); 
  
  app.post('/partsearch', async(req,res)=>{
    const config = {
        user : 'admin',
        password :'A@Zmet@l!!123',
        server:'72.255.34.95',
        database : 'tile', 
        options:  {
              encrypt : false
            }
        }
        const  vpart = req.body.partno.toUpperCase();
        const sqlquery = "select * from qstockbalancemobile where itemcode like '%"+vpart+"%'" ;
      try {
          // make sure that any items are correctly URL encoded in the connection string
          let pool = await sql.connect(config);
         // console.log('db connected');
          const result = await pool.request().query(sqlquery);
         // console.log('query executed');
         // console.log(result);
          res.render('stockbal',{
          title: 'Items Balance Inquiry', itemsData:result.recordset });
          pool.close();
          sql.close();
         // console.log('db connection closed');
        } catch (err) {
           console.log(err);
                        }
      });   
  // create web server
  const  webserver = app.listen(process.env.PORT||5005, function(){
    console.log('Node web server is running');
  });
  
