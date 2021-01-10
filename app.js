const express = require("express");
const bodyParser = require("body-parser")



const app = express()

var items = ["Drink Coffee", "Eat Breakfast", "Code on Project"];

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

  res.render("list", {kindOfDay: day, newListItems: items});
});


app.post ("/", (req, res) => {
  newItems = req.body.newItem
  
  items.push(newItems);

  res.redirect("/")
})




app.listen(3000, () => {
  console.log("Andre 3k on the Server!")
})

