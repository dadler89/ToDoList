const express = require("express");
const bodyParser = require("body-parser")



const app = express()

let items = ["Drink Coffee", "Eat Breakfast", "Code on Project"];
let workItems = []

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

  res.render("list", {listTitle: day, newListItems: items});
});


app.post ("/", (req, res) => {

  let newItems = req.body.newItem

  if (req.body.list === "work") {
    workItems.push(newItems)
    res.redirect("/work")
  } else {  
  items.push(newItems);
  res.redirect("/")
  }
})

app.get("/work", (req, res) => {
res.render("list", {listTitle: "work List", newListItems: workItems})

})

app.get("/about", (req, res) => {
  res.render("about")
})



app.listen(3000, () => {
  console.log("Andre 3k on the Server!")
})

