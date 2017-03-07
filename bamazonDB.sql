-- Create the Bamazon_db database:--
CREATE DATABASE Bamazon_db;

-- Assign code to act on Bamazon_db--
USE Bamazon_db;

-- Create the products table to host all the products--
 CREATE TABLE products(
    id INTEGER(20) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(80) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    -- we can't insure items woth more than a million bucks...--
    price DECIMAL(8,2) NOT NULL,
    -- UNSIGNED disallows negative values
    stock_quantity DECIMAL(20,0) UNSIGNED NOT NULL,
    PRIMARY KEY( id)
);
-- Create rows of data to include in the products table--
 INSERT INTO products(product_name,department_name,price,stock_quantity)
 VALUES ("Floor Mats","Automotive", 105.99, 4);

 INSERT INTO products(product_name,department_name,price,stock_quantity)
 VALUES ("Volcano Simulator","STEM Toys", 19.99, 20);

 INSERT INTO products(product_name,department_name,price,stock_quantity)
 VALUES ("Ultimate koozie","Man Cave", 15.25, 3);

 INSERT INTO products(product_name,department_name,price,stock_quantity)
 VALUES ("Solid Tonneau Cover","Automotive", 899.99, 4);

 INSERT INTO products(product_name,department_name,price,stock_quantity)
 VALUES ("Shop Vac","Tools & Equipment", 54.49, 100);

 INSERT INTO products(product_name,department_name,price,stock_quantity)
 VALUES ("Hanging Bottle Opener","Man Cave", 10.5, 25);

 INSERT INTO products(product_name,department_name,price,stock_quantity)
 VALUES ("Kitchen Science Kit","Stem Toys", 10.95, 11);

 INSERT INTO products(product_name,department_name,price,stock_quantity)
 VALUES ("Snap Circuits","STEM Toys", 43.97, 50);

 INSERT INTO products(product_name,department_name,price,stock_quantity)
 VALUES ("Oil Filter","Automotive", 7.99, 1020);

 INSERT INTO products(product_name,department_name,price,stock_quantity)
 VALUES ("Grout Float","Tools & Equipment", 11.32, 50);

 INSERT INTO products(product_name,department_name,price,stock_quantity)
 VALUES ("Beer Tap Handle","Man Cave", 20.00, 10);

 INSERT INTO products(product_name,department_name,price,stock_quantity)
 VALUES ("Cordless Drill","Tools & Equipment", 199.99, 5);