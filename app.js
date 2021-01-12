const express = require("express");
const bodyParser = require("body-parser")
const date = require(__dirname + "/date.js")


const app = express()

const items = ["Drink Coffee", "Eat Breakfast", "Code on Project"];
const workItems = []

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"))

app.get("/", (req, res) => {


  const day = date.getDate()

  res.render("list", {listTitle: day, newListItems: items});
});


app.post ("/", (req, res) => {

  const newItems = req.body.newItem

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

