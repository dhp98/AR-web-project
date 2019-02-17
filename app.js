const express= require("express"),
      mongoose = require("mongoose"),
      router = express.Router(),
      path = require('path');

app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
//connect Mongoose
mongoose.connect("mongodb://localhost:27017/ARapp");
//Schema
var appSchema = new mongoose.Schema({
    key: String, //for item no
    value: String , // for text,image,video to display
//  created : { type:Date , default : Date.now} //date of creation   
}); 
 //mongoose/Model


var  Item= mongoose.model("Item", appSchema);
//items to be stored in items collections 
Item.create({
  key:"item1",
  value:"text"
},function(err){
  if(err){
    console.log("Error in creating");
  }
});

Item.create({
  key:"item2",
  value:""
},function(err){
  if(err){
    console.log("Error in creating");
  }
});

Item.create({
  key:"item3",
  value:"video"
},function(err){
  if(err){
    console.log("Error in creating");
  }
});


//ROUTES
router.get("/",function(req,res){
    
    res.redirect("/home");
});

router.get("/home",function(req,res){
    res.sendFile(path.join(__dirname+'/index.html'));
});

router.get("/home/AR-web-app",function(req,res){
        res.sendFile(path.join(__dirname+'/AR-web-app.html'));
    
});

//set values for the input in index.html markers, data from mongodb,using mongoose
const data =  Item.find();
app.use('/', router);
app.set('port', process.env.PORT || 3000)
//initiate server
 app.listen(app.get('port'), function () {
        console.log('AR-web-app listening ' + app.get('port'));
    });