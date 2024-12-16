const express=require("express");
const app=express();
const path=require("path");
const body_parser=require("body-parser");
var methodOverride = require('method-override')
const { v4: uuidv4 } = require('uuid');
const mysql = require('mysql2');
const { connect } = require("http2");


app.use(express.urlencoded({extended:true}));
app.use(body_parser.urlencoded({extended:true}));
app.use(methodOverride('_method'))
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));

//connectiom with the dataBase.
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'CMS',
    password:"Ankith@sql21"
  });

const port=1234;

//home route
app.get("/home",(req,res)=>{
    let q="SELECT * FROM details";
    try{
        connection.query(q,(err,result)=>{
            if(err)throw err;
            console.log(result);
            res.render("home.ejs",{result});
        });
    }catch(err){
        res.render("Error.");
    }
});

//view route.
app.get("/home/:id/view",(req,res)=>{
    let {id}=req.params;
    let q=`SELECT * FROM details WHERE id='${id}'`;
    try{
        connection.query(q,(err,result)=>{
            if(err)throw err;
            // console.log(result);
            res.render("views.ejs",{result});
        });
    }catch(err){
        res.send("Error Occured.");
    }
    
});

//form route
app.get("/home/form",(req,res)=>{
    res.render("form.ejs");
});
// let id=4;
app.post("/home",(req,res)=>{
    console.log(req.body);
    let id=uuidv4();
    let data={id};
    let info=req.body;
    let data2=info;
    Object.assign(data, data2); 

    let arr = Object.values(data);
    console.log(arr);
    // let {name,dob,age,department,gender,attendence,contact,email,address,city,country,father,mother,foccupation,moccupation}=req.body;
    // let data={id,name,dob,age,department,gender,attendence,contact,email,address,city,country,father,mother,foccupation,moccupation};
    // console.log(data);
    let q="INSERT INTO details (id,name,dob,age,department,gender,attendence,contact,email,address,city,country,father,mother,foccupation,moccupation) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    try{
        connection.query(q,arr,(err,result)=>{
            if(err)throw err;
            // console.log(result);
            res.redirect("/home");
        });
    }
    catch(err){
        res.send("Error Occured.");
    }
});


//Edit route.
app.get("/home/:id/edit",(req,res)=>{
    let {id}=req.params;
    let q=`SELECT * FROM details WHERE id='${id}'`;
    try{
        connection.query(q,(err,result)=>{
            if(err)throw err;
            console.log(result);
            let student=result[0];
            res.render("edit.ejs",{student,pass});
        });
    }
    catch(err){
        res.send("Error Occured.");
    }
});

let pass="ankithg";

//Update route.
app.patch("/home/:id",(req,res)=>{
    // res.send("Updated");
    let {id}=req.params;
    console.log(req.body);
    let {name:newName,age:newAge,department:newDepartment,attendence:newAttendence,contact:newContact,email:newEmail,address:newAddress,city:newCity,country:newCountry,password}=req.body;
    let passw=req.body.password;
    let q=`SELECT * FROM details WHERE id='${id}'`;
    try{
        connection.query(q,(err,result)=>{
            if(err)throw err;
            // console.log(result);
            let student=result[0];
            if(pass!=password){
                res.send("wrong Password");
            }
            else{
                try{
                    let q2=`UPDATE details SET name='${newName}',age='${newAge}',department='${newDepartment}',attendence='${newAttendence}',contact='${newContact}',email='${newEmail}',address='${newAddress}',city='${newCity}',country='${newCountry}' WHERE id='${id}'`;
                    connection.query(q2,(err,result)=>{
                    if(err)throw err;
                    res.redirect("/home");
                });
                }catch(err){
                    res.send("error Occured.");
                }
            }
        });
    }
    catch(err){
        res.send("Error Occured.");
    }
});


//Delete Route
app.delete("/home/:id",(req,res)=>{
    let {id}=req.params;
    let q=`DELETE FROM details WHERE id='${id}'`;
    try{
        connection.query(q,(err,result)=>{
            if(err)throw err;
            res.redirect("/home");
        });
    }
    catch(err){
        res.send("error Occured.");
    }
});

app.get("/welcome",(req,res)=>{
    res.render("welcome.ejs"); 
});

app.get("/course",(req,res)=>{
    res.render("course.ejs");
});

app.get("/faculty",(req,res)=>{
    res.render("faculty.ejs");
});

app.get("/login",(req,res)=>{
    res.render("login.ejs");
});

// app.post("/login",(req,res)=>{
//     let pass=req.body.password;
//     let user=req.body.email;
//     let q=`SELECT * FROM login WHERE email='${user}'`;
//     try{
//         connection.query(q,(err,result)=>{
//             if(err)throw err;
//             console.log(result);
//         })
//     }
//     catch(err){
//         res.send("error Occured.");
//     }
// });

app.get("/signup",(req,res)=>{
    res.render("signup.ejs");
});

app.get("/about",(req,res)=>{
    res.render("about.ejs");
});

app.listen(port,()=>{
    console.log(`server running at port ${port}.`);
});