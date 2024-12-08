const express=require('express');
const app=express();
const mysql=require("mysql");


const connection =mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"companydata"

});
connection.connect((error)=>{
    if(error) throw error;
    console.log(" connection is sucessfull" );
})

app.get("/",(req,res)=>{
    console.log("HEllo");
    res.send('app runnig sucess');

});
app.listen(3000);