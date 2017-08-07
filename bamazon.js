var mysql = require('mysql');
var inquirer = require('inquirer');
//var Shop = require('Shop');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "",
  database: "bamazon_DB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log("Welcome to Bamazon! The following are a list of items available for purchase: \n");
    for (let i = 0; i<res.length; i++){
      console.log("===============" + "\nProduct: " + res[i].product_name + "\nItem Id: " + res[i].item_id + "\nPrice: " + res[i].price);
    };
    shop();
    
  });
});

var shop = function(){
  connection.query("SELECT * FROM products", function(err, results){
    if (err) throw err;
    inquirer.prompt([{
      name: "shopId",
      type: "input",
      message: "Which item (use Item Id) would you like to purchase?"
    },
    {
      name: "quantity",
      type: "input",
      message: "How many would you like to buy?"
    }]).then(function(answers){
      //console.log(answers.quantity);
      var chosenItem;
      var available;
      var requestQauntity = parseInt(answers.quantity);

      for (let i = 0; i < results.length; i++){
        if (answers.shopId == results[i].item_id){
          chosenItem = results[i];
          available = parseInt(chosenItem.stock_quantity);
          }
        }
        console.log("There are " + available + " available of this item.");
        if (available > requestQauntity){
          depleteInventory();
        } else {
          console.log("Insufficient inventory to support your request.");
          shop();
        }
      }
    )
  })
};

var depleteInventory = function(available, requestQauntity){
  var updatedInventory = available - requestQauntity;
  console.log(updatedInventory);

};