const express = require("express");
const bodyParser = require("body-parser")
const mongoose = require("mongoose");
const _ = require("lodash");
require('dotenv').config()



const app = express()

mongoose.connect(`mongodb+srv://dadler90:${process.env.MONGOPASS}@cluster0.nlmuc.mongodb.net/todolistDB?retryWrites=true&w=majority`, {useNewUrlParser: true});

const itemsSchema = new mongoose.Schema({
  name: String
})

const Item = mongoose.model(
  "Item", itemsSchema
)

const listSchema = {
  name: String,
  items: [itemsSchema]
}

const List = mongoose.model("List", listSchema);


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



app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"))



app.get("/", (req, res) => {



Item.find({}, function(err, foundItems){
 
  if (foundItems.length === 0){
Item.insertMany(defaultItems, (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log("Items have been updated to you Database")
  }
});
res.redirect("/");
  } else {
    res.render("list", {listTitle: "Today", newListItems: foundItems});

  } 
})
});


app.post ("/", (req, res) => {

  const itemName = req.body.newItem;
  const listName = req.body.list;
  const item= new Item ({
    name: itemName
  });

  if (listName === "Today"){  
    item.save();
    res.redirect("/");
  } else {
 List.findOne({name: listName}, function(err, foundList){
   foundList.items.push(item);
   foundList.save();
   res.redirect("/" + listName);
 });
  }
});


app.get("/:customListName", function(req, res) {
  const customListName = _.capitalize(req.params.customListName);

  List.findOne({name: customListName}, function(err, foundList){
    if (!err) {
      if (!foundList) {
        //  Create New List
        const list = new List ({
          name: customListName,
          items: defaultItems
        });
        list.save()
      res.redirect("/" + customListName)
      } else {
        // Show existing List
        res.render("list", {listTitle: foundList.name, newListItems: foundList.items})
      }
    }
  })
});





//  This is where a List item gets deleted

 app.post("/delete", (req,res) => {
   const checkedItemId = req.body.checkbox;
   const listName = req.body.listName

  //  Script that checks what list item is in
  if (listName === "Today"){
   Item.findByIdAndRemove(checkedItemId, function(err){
     if (!err) {
       console.log ("You have deleted checked Item")
       res.redirect("/" + listName);
     }
      });

      // Dynamically checks list by View title and deletes item by id
    } else {

        List.findOneAndUpdate({name: listName}, {$pull: {items: {id: checkedItemId}}}, function (err, foundList){
          if (!err){
           res.redirect("/" + listName)
          }
        });
      }    
    });
 





app.get("/about", (req, res) => {
  res.render("about")
})

let port = process.env.port
if (port == null || port == ""){
  port = 3000
}

app.listen(port, function() {
  console.log("Andre 3k listening on the port")
})

