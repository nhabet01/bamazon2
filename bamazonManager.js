// Add dependencies for required packages:
var table = require("console.table");
var mysql = require ("mysql");
var inquirer = require ("inquirer");

//Set up connection params:
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

   // Enter username
  user: "root",

  // Enter password
  password: "",
  database: "Bamazon_db"
});

//To actually connect:
connection.connect(function(err) {
  if (err) throw err;
  //write to console as a check that you are connected
  console.log("connected as id " + connection.threadId);
});



//Fxn that allows manager to view all items
var viewProducts = function(){
    connection.query("SELECT id, product_name, price, stock_quantity FROM products", function(err,res){
        console.log("Products for Sale:");
        console.table(res);
    });
    connection.end();     
};//end fxn viewProducts

//Fxn that allows manager to view items with low inventory:
var viewLowI = function(){
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(err,res){
        console.log("Products with low inventory:");
        console.table(res);
    });
    connection.end();
};//end fxn viewLowI

//Fxn that allows manager to add to the inventory:
var updateInventory = function(){
  connection.query("SELECT * FROM products", function(err,res){
        inquirer.prompt([{
        type: "input",
        name: "itemID",
        message: "Enter the id of the product you would like to update: ",
        validate: function(value){
                if (isNaN(value)===false){
                    return true;
                }
                return false;
            }
      },
      {
        type: "input",
        name: "num2Add",
        message: "How many of this product would you like to add to the inventory?: ",
        validate: function(value){
                if (isNaN(value)===false){
                    return true;
                }
                return false;
            }
      }]).then(function(answers){
          if (answers.itemID > res.length){
            console.log("Invalid ID")
            connection.end();
          }else{
              for(var i = 0; i < res.length; i++){
                  if(res[i].id === parseInt(answers.itemID)){
                      var chosenProd = res[i];
                      var newQuantity = chosenProd.stock_quantity + parseInt(answers.num2Add);
                      if(newQuantity < 0){
                        newQuantity = 0;
                      }else{
                        connection.query("UPDATE products SET ? WHERE ?", [{
                        stock_quantity: newQuantity
                        },{
                        id: chosenProd.id
                        }], function(err, res){
                        console.log("Inventory Updated!");
                        connection.end();
                        });//query update
                      }
                    
                  }//if exists
              }//for length of table
          }

      });//.prompt

  });//query select *
  
};//end fxn updateInventory

//Fxn that allows manager to add a new product to the 
var addNew = function(){
  inquirer.prompt([{
    name: "deptName",
    type: "input",
    message: "What department are you adding to? Create a new one or choose from: 'Tools & Equipment', 'Automotive', 'Man Cave', 'STEM Toys': "
  },{
    name: "prodName",
    type: "input",
    message: "Enter the product name: "
  },{
    name: "prodPrice",
    type: "input",
    message: "What is the sale price per item? "
  },{
    name: "quantity",
    type: "input",
    message: "How many are you adding to the inventory? ",
    validate: function(value){
                if (isNaN(value)===false){
                    return true;
                }
                return false;
            }
  }]).then(function(answers){
    connection.query("INSERT INTO products SET ?",{
      product_name: answers.prodName,
      department_name: answers.deptName,
      price: answers.prodPrice,
      stock_quantity: answers.quantity
    }, function(err,res){
      console.log("Your entry was successfully added");
      connection.end();
    });

  });
}//end addNew

//Fxn that propmpts Manager at initiation
var welcomePage = function(){
  console.log("Welcome");
  inquirer.prompt({
    type: "list",
    name: "action",
    message: "What would you like to do?",
    choices: ["View Products", "View Low Inventory", "Update Inventory","Add New Product"]

  }).then(function(selection){
    var action = selection.action;
    switch (action){
      case "View Products":
      viewProducts();
      break;

      case "View Low Inventory":
      viewLowI();
      break;

      case "Update Inventory":
      updateInventory();
      break;
      
      case "Add New Product":
      addNew();
      break;

    }
  });
};//end fxn welcomePage

welcomePage();