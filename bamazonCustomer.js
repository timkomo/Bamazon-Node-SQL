require('dotenv').config();

var inquirer = require('inquirer');
var mysql = require('mysql');
var figlet = require('figlet');


var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: process.env.DB_pass,
    database: 'Bamazon'
});


// Code for super cool ASCII Greeting & Calling display Products Function! 
figlet('Welcome to Bamazon!', function (err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
    console.log("Please wait while we gather today's products ...")
    setTimeout(function(){displayProdcuts();}, 3000);
});


// Function for connecting to database and pulling product info.
function displayProdcuts() {
    var query = "SELECT * FROM products";
    connection.query(query, function (err, data) {
        if (err) throw err;

        console.log("\nTODAY'S PRODUCTS: ");
        console.log("\n----------------------------------------------------------\n");

        var productInfo = '';
        for (var i = 0; i < data.length; i++) {
            productInfo = '';
            productInfo += 'Item ID: ' + data[i].item_id + '  ||  ';
            productInfo += 'Product Name: ' + data[i].product_name + '  ||  ';
            productInfo += 'Department: ' + data[i].department_name + '  ||  ';
            productInfo += 'Quantity: ' + data[i].stock_quantity + '  ||  ';
            productInfo += 'Price: $' + data[i].price + '\n';

            console.log(productInfo);
        }
        console.log("\n----------------------------------------------------------\n");
        buyProduct();
    });
}

function buyProduct() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "item_id",
                message: "What would you like to buy? Please enter the 'Item ID' to begin purchase.",
                validate: validateNumber,
                filter: Number
            },
            {
                type: 'input',
                name: 'quantity',
                message: 'How many would you like to buy?',
                validate: validateNumber,
                filter: Number
            }
        ]).then(function (input) {

            var item = input.item_id;
            var quantity = input.quantity;
            var query = 'SELECT * FROM products WHERE ?';

            connection.query(query, { item_id: item }, function (err, data) {
                var product = data[0];
                if (err) throw err;
                // console.log(product.stock_quantity);
                if (quantity <= product.stock_quantity) {
                    console.log("Making purchase please wait ... ")

                    connection.query('UPDATE products SET stock_quantity = ' + (product.stock_quantity - quantity) + ' WHERE item_id = ' + item, function () {
                        console.log("__________________________________________________________________________\n")
                        console.log("Your purchase has been made! Your total is $ " + product.price * quantity);
                        console.log("\n---------------------------------------------------------------------\n");
                        console.log("Please wait while we return you to the store..."); 

                    setTimeout(function(){displayProdcuts();}, 5000);

                    })
                } else {
                    console.log("\n---------------------------------------------------------------------\n");
                    console.log("We do not have enough of that item in stock for your purchase");
                    console.log("We only have " + product.stock_quantity + " left.");
                    console.log("Please wait while we return you to the store..."); 
                    console.log("\n---------------------------------------------------------------------\n");

                    setTimeout(function(){displayProdcuts();}, 3000);
                }
            })
        })
}



// Validate that user number inputs are whole non-negative numbers. 
function validateNumber(value) {
    if (value % 1 === 0 && value > 0) {
        return true;
    } else {
        console.log("  **** Please enter a whole number above zero. ****");
    }
}


