-- CREATE TABLE `users` (
--     `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
--     `email` VARCHAR(255) NOT NULL,
--     `hashedPassword` VARCHAR(255) NOT NULL
-- );
-- CREATE TABLE `products` (
--     `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
--     `picture` TEXT NOT NULL,
--     `name` VARCHAR(255) NOT NULL,
--     `origin` VARCHAR(255) NOT NULL,
--     `description` VARCHAR(500),
--     `price` DECIMAL(10, 2) NOT NULL
-- );
-- CREATE TABLE `users_products_items` (
--     `user_id` INT,
--     `product_id` INT,
--     `item_id` INT
-- );
-- CREATE TABLE `items` (
--     `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
--     `quantity` INT,
--     `total` DECIMAL(10, 2)
-- );
-- ALTER TABLE
--     users_products_items
-- ADD
--     CONSTRAINT pu_users_products_items_users FOREIGN KEY (user_id) REFERENCES users(id);
-- ALTER TABLE
--     users_products_items
-- ADD
--     CONSTRAINT pp_users_products_items_products FOREIGN KEY (product_id) REFERENCES products(id);
-- ALTER TABLE
--     users_products_items
-- ADD
--     CONSTRAINT pi_users_products_items_items FOREIGN KEY (item_id) REFERENCES items(id) ON UPDATE CASCADE;
-- INSERT INTO
--     users (email, hashedPassword)
-- VALUES
--     ('user1@example.com', 'password1'),
--     ('user2@example.com', 'password2'),
--     ('user3@example.com', 'password3');
-- INSERT INTO
--     products (picture, name, origin, description, price)
-- VALUES
--     ("https://firebasestorage.googleapis.com/v0/b/fir-c9cc8.appspot.com/o/imageCP4%2Fcafe1.jpg?alt=media&token=a5ece020-6220-4a16-a958-efb1108e1063", 'café noir', 'colombie', 'intense', 9.99),
--     ("https://firebasestorage.googleapis.com/v0/b/fir-c9cc8.appspot.com/o/imageCP4%2Fcafe2.jpg?alt=media&token=5c46ba59-554c-4633-8430-bf95c1a4bcb6", 'café basic', 'france', 'à éviter', 12.99),
--     ("https://firebasestorage.googleapis.com/v0/b/fir-c9cc8.appspot.com/o/imageCP4%2Fcafe3.jpg?alt=media&token=3478e321-b098-41a2-a3af-ec4d0f72f87a", 'café', 'Inconnue', 'grain de café', 7.99),
--     ("https://firebasestorage.googleapis.com/v0/b/fir-c9cc8.appspot.com/o/imageCP4%2Fcafe4.jpg?alt=media&token=feb763a3-e25b-43a0-9586-f359e70301eb", 'café chantilly', 'maison', 'café avec rajout de chantilly', 15.99),
--     ("https://firebasestorage.googleapis.com/v0/b/fir-c9cc8.appspot.com/o/imageCP4%2Fcafe5.jpg?alt=media&token=bc4f1f29-017c-4d30-b281-cb164cdc9db1", 'café clair', 'campagne', 'belle photo', 10.75),
--     ("https://firebasestorage.googleapis.com/v0/b/fir-c9cc8.appspot.com/o/imageCP4%2Fthe2.jpg?alt=media&token=ed5ae096-5cb6-48cc-9d82-3ed6fe888e41", 'the vert', 'inde', '...', 8.75),
--     ("https://firebasestorage.googleapis.com/v0/b/fir-c9cc8.appspot.com/o/imageCP4%2Fthe3.jpg?alt=media&token=4f14de30-dbe2-414c-aec3-0a4af1aa916e", 'the grey', 'france', 'salon de the', 4.50),
--     ("https://firebasestorage.googleapis.com/v0/b/fir-c9cc8.appspot.com/o/imageCP4%2Fthe4.jpg?alt=media&token=8e07c5a3-00a8-4d44-9d3f-d54af36368fe", 'the menthe', 'espagne', 'doux et agréable', 15),
--     ("https://firebasestorage.googleapis.com/v0/b/fir-c9cc8.appspot.com/o/imageCP4%2Fthe5.jpg?alt=media&token=4ddbf337-b7d7-42f4-b0fa-67f90fc8a097", 'the noir', 'angleterre', 'fort en bouche', 20.22);
-- INSERT INTO items (quantity, total)
-- VALUES (1, 9.99)
-- ON DUPLICATE KEY UPDATE
--     quantity = quantity + VALUES(quantity),
--     total = total + VALUES(total);
-- INSERT INTO users_products_items (user_id, product_id, item_id)
-- VALUES (1, 1, LAST_INSERT_ID())
-- ON DUPLICATE KEY UPDATE
--     item_id = LAST_INSERT_ID(),
--     user_id = VALUES(user_id),
--     product_id = VALUES(product_id);
-- INSERT INTO items (quantity, total)
-- VALUES
-- (2, (SELECT price FROM products WHERE id = 1) * quantity),
-- (1, (SELECT price FROM products WHERE id = 1) * quantity),
-- (3, (SELECT price FROM products WHERE id = 3) * quantity),
-- (2, (SELECT price FROM products WHERE id = 2) * quantity);
-- INSERT INTO
-- users_products_items (user_id, product_id, item_id)
-- VALUES
-- (1, 1, 1),
-- (1, 1, 2),
-- (1, 3, 3),
-- (2, 2, 4);
--
/*----------------- autre configuration   ------------------*/
CREATE TABLE `users` (
    `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `hashedPassword` VARCHAR(255) NOT NULL
);

CREATE TABLE `products` (
    `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `picture` TEXT NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `origin` VARCHAR(255) NOT NULL,
    `description` VARCHAR(500),
    `price` DECIMAL(10, 2) NOT NULL
);

CREATE TABLE `items` (
    `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `user_id` INT,
    `product_id` INT,
    `quantity` INT,
    `total` DECIMAL(10, 2),
    FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

INSERT INTO
    users (email, hashedPassword)
VALUES
    ('Gaby@example.com', 'password1'),
    ('user2@example.com', 'password2'),
    ('user3@example.com', 'password3');

INSERT INTO
    products (picture, name, origin, description, price)
VALUES
    (
        "https://firebasestorage.googleapis.com/v0/b/fir-c9cc8.appspot.com/o/imageCP4%2Fcafe1.jpg?alt=media&token=a5ece020-6220-4a16-a958-efb1108e1063",
        'café noir',
        'colombie',
        'intense',
        9.99
    ),
    (
        "https://firebasestorage.googleapis.com/v0/b/fir-c9cc8.appspot.com/o/imageCP4%2Fcafe2.jpg?alt=media&token=5c46ba59-554c-4633-8430-bf95c1a4bcb6",
        'café basic',
        'france',
        'warning',
        12.99
    ),
    (
        "https://firebasestorage.googleapis.com/v0/b/fir-c9cc8.appspot.com/o/imageCP4%2Fcafe3.jpg?alt=media&token=3478e321-b098-41a2-a3af-ec4d0f72f87a",
        'café',
        'Inconnue',
        'grain',
        7.99
    ),
    (
        "https://firebasestorage.googleapis.com/v0/b/fir-c9cc8.appspot.com/o/imageCP4%2Fcafe5.jpg?alt=media&token=bc4f1f29-017c-4d30-b281-cb164cdc9db1",
        'café clair',
        'campagne',
        'fort',
        10.75
    ),
    (
        "https://firebasestorage.googleapis.com/v0/b/fir-c9cc8.appspot.com/o/imageCP4%2Fthe2.jpg?alt=media&token=ed5ae096-5cb6-48cc-9d82-3ed6fe888e41",
        'the vert',
        'inde',
        'savoureux',
        8.75
    ),
    (
        "https://firebasestorage.googleapis.com/v0/b/fir-c9cc8.appspot.com/o/imageCP4%2Fthe3.jpg?alt=media&token=4f14de30-dbe2-414c-aec3-0a4af1aa916e",
        'the grey',
        'france',
        'doux',
        4.50
    ),
    (
        "https://firebasestorage.googleapis.com/v0/b/fir-c9cc8.appspot.com/o/imageCP4%2Fthe4.jpg?alt=media&token=8e07c5a3-00a8-4d44-9d3f-d54af36368fe",
        'the menthe',
        'espagne',
        'agréable',
        15
    ),
    (
        "https://firebasestorage.googleapis.com/v0/b/fir-c9cc8.appspot.com/o/imageCP4%2Fthe5.jpg?alt=media&token=4ddbf337-b7d7-42f4-b0fa-67f90fc8a097",
        'the noir',
        'angleterre',
        'fort',
        20.22
    );

INSERT INTO
    items (user_id, product_id, quantity, total)
VALUES
(1, 1, 1, 9.99),
(1, 2, 1, 15),
(1, 3, 1, 10),
(1, 4, 1, 7.45);
