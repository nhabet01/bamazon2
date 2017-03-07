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

//Fxn that displays all items for sale at intitiation in node js.
var showItems = function(){
    connection.query("SELECT id, product_name, price FROM products", function(err,res){
        console.log("Products for Sale:");
        console.table(res);
    });
     //call fxn prompting user to select item   
    // promptUser();
};//end fxn showItems


//Fxn that asks the user if he/she would like to purchas an item
var promptUser = function(){
    inquirer.prompt({
        type: "confirm",
        message: "Would you like to purchase an item?",
        name: "purchase"
    }).then(function(response){
        if (response.purchase === true){
                selectItem();
        }else{
            console.log("Have fun browsing!");
            connection.end();
        }

    });
};//end promptUser

//Fxn that prompts user to select an item and quantity to purchase:
var selectItem = function(){
    inquirer.prompt([{
        type: "input",
        name: "choice",
        message: "Enter the ID of the item you would like to purchase: "
    },
    {
        type: "input",
        name: "quantity",
        message: "How many would you like?",
        validate: function(value){
            if (isNaN(value)===false){
                return true;
            }
            return false;
        }
    }]).then(function(answer){
        connection.query("SELECT * FROM products", function(err,res){
            var chosenProduct;
            if(answer.choice > res.length){
                console.log("That product doesn't exist, please enter a valid id.");
                connection.end();
            }else {
                for (var i=0; i<res.length; i++){//for1
                    if (res[i].id === parseInt(answer.choice)){ //  need parseInt?
                        chosenProduct = res[i];
                    }
                   
                }//for1
                if (chosenProduct.stock_quantity- parseInt(answer.quantity) >= 0){
                    console.log("name:"+ chosenProduct.product_name + " price: "+chosenProduct.price);
                    var new_quantity = chosenProduct.stock_quantity - parseInt(answer.quantity);

                    var yourPrice = parseInt(answer.quantity)*chosenProduct.price;
                    console.log("new Quantity: " + new_quantity);//remove after debug
                    connection.query("UPDATE products SET ? Where ?", [{
                        stock_quantity: new_quantity
                    },{
                        id: chosenProduct.id
                    }], function(err,res){
                        console.log("Your total cost = $"+yourPrice.toFixed(2));
                        connection.end();
                        

                    });
                }else{
                    console.log("insufficient quantity!")
                    connection.end();
                }

            }
             
        });//query
        
    });//end inquirer.prompt
        
};//end fxn selectItem


// var promise = showItems();
// promise.then(promptUser);


showItems();
promptUser();