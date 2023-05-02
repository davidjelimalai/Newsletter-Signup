const express=require("express");
const bodyParser= require("body-parser");
// const request =require("request");
const https = require("https");
const app=express();
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
   res.sendFile(__dirname+"/signup.html")
})

app.post("/", function(req, res){
  
    const firsName=req.body.Fname;
    const lastName=req.body.Lname;
    const email=req.body.Ename;

    const data = {

        members: [
        {
            email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME:firsName,
                LNAME: lastName
            }
        }
        ]
    };

    const jsonData= JSON.stringify(data);

    const url = "https://us17.api.mailchimp.com/3.0/lists/9ba8b5c8b5";
    const options= {
              method: "POST",
              auth:"david:a0684547fe8d17e6771a4569dd99a208-us15"
    };  

    const request = https.request(url, options, function(response){

        if(response.statusCode ===200){

            res.sendFile(__dirname+"/succes.html")
        }else{
            res.sendFile(__dirname+"/failure.html")
        }
 
        response.on('data', function(data){
            console.log(JSON.parse(data));
        });

    }); 
    request.write(jsonData);
    request.end();

})

app.post("/failure", function(req, res){

    res.redirect("/")
});


app.listen(3000, function(){
console.log("Server running at port 3000");
});


// https://usX.api.mailchimp.com/3.0/campaigns?count=10&offset=10 