const express = require("express");
const bodyParser = require("body-parser")



const app = express()

let items = ["Drink Coffee", "Eat Breakfast", "Code on Project"];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"))

app.get("/", (req, res) => {


let today  = new Date();

let options = {
  weekday: "long",
  day: "numeric",

  month: "long"
};

let day = today.toLocaleDateString("en-US", options)

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

