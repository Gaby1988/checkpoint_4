CREATE TABLE `users` (
    `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `hashedPassword` VARCHAR(255) NOT NULL
);

CREATE TABLE `products` (
    `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `origin` VARCHAR(255) NOT NULL,
    `description` VARCHAR(500),
    `price` DECIMAL(10, 2) NOT NULL
);

CREATE TABLE `users_products_items` (
    `user_id` INT,
    `product_id` INT,
    `item_id` INT
);

CREATE TABLE `items` (
    `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `quantity` INT,
    `total` DECIMAL(10, 2)
);

ALTER TABLE
    users_products_items
ADD
    CONSTRAINT pu_users_products_items_users FOREIGN KEY (user_id) REFERENCES users(id);

ALTER TABLE
    users_products_items
ADD
    CONSTRAINT pp_users_products_items_products FOREIGN KEY (product_id) REFERENCES products(id);

ALTER TABLE
    users_products_items
ADD
    CONSTRAINT pi_users_products_items_items FOREIGN KEY (item_id) REFERENCES items(id);

INSERT INTO
    users (email, hashedPassword)
VALUES
    ('user1@example.com', 'password1'),
    ('user2@example.com', 'password2'),
    ('user3@example.com', 'password3');

INSERT INTO
    products (name, origin, description, price)
VALUES
    ('Coffee1', 'Origin1', 'Description1', 9.99),
    ('Coffee2', 'Origin2', 'Description2', 12.99),
    ('Tea1', 'Origin3', 'Description3', 7.99),
    ('Tea2', 'Origin4', 'Description4', 8.99);

INSERT INTO items (quantity, total)
VALUES
    (2, (SELECT price FROM products WHERE id = 1) * quantity),
    (1, (SELECT price FROM products WHERE id = 1) * quantity),
    (3, (SELECT price FROM products WHERE id = 3) * quantity),
    (2, (SELECT price FROM products WHERE id = 2) * quantity);
INSERT INTO
    users_products_items (user_id, product_id, item_id)
VALUES
    (1, 1, 1),
    (1, 1, 2),
    (1, 3, 3),
    (2, 2, 4);