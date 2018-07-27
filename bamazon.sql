
CREATE DATABASE Bamazon;
USE Bamazon;

CREATE TABLE products (
	item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(30) NOT NULL,
	department_name VARCHAR(20) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INTEGER(11) NOT NULL,
	PRIMARY KEY (item_id)
    
    );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES  ('Record Player', 'Electronics', 150.00, 50),
		('Speakers', 'Electronics', 75.50, 85),
		('Laptop', 'Electronics', 1000.00, 25),
		('Socks', 'Clothing', 3.25, 125),
		('Shoes', 'Clothing', 45.50, 125),
		('Beer', 'Grocery', 9.99, 225),
		('Eggs', 'Grocery', 3.45, 124),
		('Cheese', 'Grocery', 4.50, 350),
		('Tape', 'Home/Office', 2.75, 325),
		('Stapler', 'Home/Office', 11.99, 13),
		('Hiking Boots', 'Clothing', 59.49, 46),
		('Basketball', 'Sports', 45.00, 100),
		('Baseball Bat', 'Sports', 65.99, 89),
        ('Basketball Hoop', 'Sports', 250.00, 10);

