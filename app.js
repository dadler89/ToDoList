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

  const item= new Item ({
    name: itemName
  });
    item.save();

    res.redirect("/");
  }
)


app.get("/:customListName", function(req, res) {
  const customListName = req.params.customListName;

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






 app.post("/delete", (req,res) => {
   const checkedItemId = req.body.checkbox;

   Item.findByIdAndRemove(checkedItemId, function(err){
     if (!err) {
       console.log ("You have deleted checked Item")
       res.redirect("/");
     } 
   })
 });





app.get("/about", (req, res) => {
  res.render("about")
})



app.listen(3000, () => {
  console.log("Andre 3k on the Server!")
})

