var Shop = function(){
  inquirer.prompt([{
    name: "shopId",
    type: "input",
    message: "What item (use Item Id) would you like to buy?"
  },
  {
    name: "quantity",
    type: "input",
    message: "How many would you like to buy?"
  }]).then(function(answers){
    console.log(answers);
  })
};

module.exports = Shop;
