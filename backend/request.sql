SELECT users.email AS mail, products.name AS productName, items.quantity AS quantity, items.total AS totalPrice
FROM users_products_items
JOIN users ON users.id = users_products_items.user_id
JOIN items ON items.id = users_products_items.item_id
JOIN products ON products.id = users_products_items.product_id
WHERE users.id = 1;

SELECT users.email AS mail, products.name AS productName, items.quantity AS quantity, items.total AS totalPrice,
SUM(items.total * (products.id = users_products_items.product_id = users_products_items.user_id)) AS totalPanier
FROM users_products_items
JOIN users ON users.id = users_products_items.user_id
JOIN items ON items.id = users_products_items.item_id
JOIN products ON products.id = users_products_items.product_id
WHERE users.id = 1;

/* ------------------------------- récupérer par produit ------------------------------- */

SELECT users.email AS mail, products.name AS productName, items.quantity AS quantity, items.total AS totalPrice,
-- SUM(items.total * (products.id = users_products_items.product_id = users_products_items.user_id)) AS totalPanier
FROM users_products_items
JOIN users ON users.id = users_products_items.user_id
JOIN items ON items.id = users_products_items.item_id
JOIN products ON products.id = users_products_items.product_id
WHERE users.id = 1
GROUP BY products.name;

/* ------------------------------- récupérer par quantiter ------------------------------- */

SELECT users.email AS mail, products.name AS productName, items.quantity AS quantity, items.total AS totalPrice
FROM users_products_items
JOIN users ON users.id = users_products_items.user_id
JOIN items ON items.id = users_products_items.item_id
JOIN products ON products.id = users_products_items.product_id
WHERE users.id = 1
GROUP BY items.quantity;

/* ------------------------------- récupérer quantiter total et prix total ------------------------------- */

SELECT users.id AS userID, users.email AS mail,
SUM(items.quantity * (products.id = users_products_items.product_id = users_products_items.user_id)) AS totalQuantity,
SUM(items.total * (products.id = users_products_items.product_id = users_products_items.user_id)) AS totalPanier
FROM users_products_items
JOIN users ON users.id = users_products_items.user_id
JOIN items ON items.id = users_products_items.item_id
JOIN products ON products.id = users_products_items.product_id
WHERE users.id = 1;







/*  --- récuperer par pix et quantity par utilisateur --- */


SELECT users.email AS mail, products.name AS productName, items.quantity AS quantity, items.total AS totalPrice,
FROM items
JOIN users ON users.id = items.user_id
JOIN products ON products.id = items.product_id
WHERE users.id = 1
GROUP BY products.name;


/* -- total quantiter et total prix -- */

SELECT users.id AS userID, users.email AS mail,
SUM(items.quantity * (products.id = items.product_id = items.user_id)) AS totalQuantity,
SUM(items.total * (products.id = items.product_id = items.user_id)) AS totalPanier
FROM items
JOIN users ON users.id = items.user_id
JOIN products ON products.id = items.product_id
WHERE users.id = 1;
