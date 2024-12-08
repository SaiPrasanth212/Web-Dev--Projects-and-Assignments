const express=require('express');
const app=express();
const mysql=require("mysql");


const connection =mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Prasanth",
    database:"companydata"

});
connection.connect((error)=>{
    if(error) throw error;
    console.log(" connection is successful" );
})

app.get("/",(req,res)=>{
    console.log("Hello");
    res.send('app running successfully');

});
app.listen(3000);
