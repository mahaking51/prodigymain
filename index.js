var express=require('express');
var app=require('express')();
var http= require('http').Server(app);
const bodyParser= require('body-parser');
const ejs=require('ejs');
const nodemailer=require('nodemailer');
const { log } = require('console');
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({
    extended:true
}))
const transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"prodigymailer2022@gmail.com",
        pass:"1234prodigy"
    }
});

app.use(express.static(__dirname+'/public'));

app.get('/',function(req,res){
    res.render('home');
})
app.get('/about_us',function(req,res){
    res.render('aboutUs');
})
app.get('/contact',function(req,res){
    res.render('contact');
})
app.get('/schedule',function(req,res){
    res.render('schedule');
})
app.post('/mail',function(req,res){
    var options={
        from:"prodigymailer2022@gmail.com",
        to:"maharajannitt23@gmail.com",
        subject:req.body.subject,
        text:req.body.message+"  -This message is sent by "+req.body.name+"  email:"+req.body.email
    }
    transporter.sendMail(options,function(err,info){
        if(err){
            console.log(err);
            res.redirect('/contact');
        }
        else{
            console.log("Sent:"+info.response);
            res.redirect('/contact');
        }
    })
    
})
app.get('/gallery',function(req,res){
    res.render('gallery');
})
http.listen(3000,function(){
    console.log('listening on*:3000');
})