const express = require("express");
const bodyParser = require("body-parser")



const app = express()

var newItem = "";

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {


var today  = new Date();

var options = {
  weekday: "long",
  day: "numeric",
  month: "long"
};

var day = today.toLocaleDateString("en-US", options)

  res.render("list", {kindOfDay: day, newListItem: newItem});
});


app.post ("/", (req, res) => {
  newItem = req.body.newItem
  
  res.redirect("/")
})




app.listen(3000, () => {
  console.log("Andre 3k on the Server!")
})

