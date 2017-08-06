var mysql = require('mysql');
var inquirer = require('inquirer');

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
    console.log("Welcome to Bamazon! The following are a list of items available for purchase:");
    for (var i = 0; i<res.length; i++){
      console.log("===============" + "\nProduct: " + res[i].product_name);
    };
    
  });
});