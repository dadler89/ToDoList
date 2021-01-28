const express = require("express");
const bodyParser = require("body-parser")
const mongoose = require("mongoose");



const app = express()

mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true});

const itemsSchema = new mongoose.Schema({
  name: String
})

const Item = mongoose.model(
  "Item", itemsSchema
)


const drinkCoffee = new Item ({
  name: "Drink Coffee"
})

const eatBreakfast = new Item ({
  name: "Eat Breakfast"
})


const shower = new Item ({
  name: "Shower"
})


const defaultItems = [drinkCoffee, eatBreakfast, shower];


Item.insertMany(defaultItems, (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log("Items have been updated to you Database")
  }
})

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"))



app.get("/", (req, res) => {




  res.render("list", {listTitle: "Today", newListItems: items});
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

