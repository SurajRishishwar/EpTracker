const express= require("express");
const port=8000||process.env.port;
const cors=require("cors");
const bodyParser=require("body-parser");
const app=express();
const mysql = require("mysql2");

app.use(cors());
// parse application/json
app.use(bodyParser.json());

const mysqlconnection=mysql.createPool({
    host : "sql.freedb.tech",   
    port : 3306,
    database : "freedb_EpTracker",
    user : "freedb_access-suraj-to",
    password : "7bSAC*@xbpTuf*U",
    connectionLimit: 20,
    multipleStatements:true
});

mysqlconnection.getConnection((err)=>{
    if(err){
        console.log('Not Connected',err);
    }
    else{
        console.log('Connection Established');
    }
});

app.get('/expense_of_0310_testing',(req,res)=>{
    let sql="select * from expense_of_user";
    let query=mysqlconnection.query(sql,(err,results)=>{
        if(err){
            console.log(err);
        }else{
            res.status(200).send(results);
        }
    })
})

app.listen(port,()=>{
    console.log("server is up at : "+port);
});