import express  from "express";
import { db } from "./db/db.conf.js";
import { employee } from "./models/employee.model.js";
import bodyParser from "body-parser";
import path from 'path';

import session from "express-session";

import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(express.static(__dirname + '/public/css/'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret:'secret',
    resave: true,
    saveUninitialized: true
}))
app.set("view engine", "ejs");

const pathName = path.join(__dirname+'/public/')

app.get('/',(req,res)=>{
    res.sendFile(pathName + 'loginpage.html');
    
})

app.post('/auth', (req,res)=>{
    employee.emp.find({name:req.body.username,password:req.body.password},(err,result)=>{
       
        if(err) throw err;
        if(result.length>0){
            req.session.username = req.body.username;
            req.session.loggedIn = true;
            res.redirect('/welcome')
        }
        else{
            res.send('hello')
        }
    })
    
})

app.get('/welcome',(req,res)=>{
    if(req.session.loggedIn){
        console.log(req.session.username)
        res.sendFile(pathName + 'welcome.html',{name:req.session.username});
    }
    else{
        res.redirect('/');
    }

})

app.get('/logout',(req,res)=>{
    req.session.loggedIn = false;
    req.session.username = '';
    res.redirect('/');
})

app.listen(3000,()=>{
    console.log('running')
})