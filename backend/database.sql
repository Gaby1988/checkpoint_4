CREATE TABLE users (
     id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE coffeeMachines (
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    brand VARCHAR(255) NOT NULL,
    model VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE coffee (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    origin VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE tea (
   id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    origin VARCHAR(255) NOT NULL,
    type VARCHAR(50),
    price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE basket (
    id INT PRIMARY KEY,
    utilisateur_id INT,
    produit_id INT,
    quantite INT,
    type_produit ENUM('cafe', 'the', 'machine'),
    FOREIGN KEY (utilisateur_id) REFERENCES Utilisateurs(id),
    FOREIGN KEY (produit_id) REFERENCES Cafe(id) -- Référence à la table "Cafe"
        ON DELETE CASCADE,
    FOREIGN KEY (produit_id) REFERENCES The(id) -- Référence à la table "The"
        ON DELETE CASCADE,
    FOREIGN KEY (produit_id) REFERENCES MachinesCafe(id) -- Référence à la table "MachinesCafe"
        ON DELETE CASCADE
);




/*-------------             SEPARATION               -----------*/


CREATE TABLE users (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE coffeeMachines (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    brand VARCHAR(255) NOT NULL,
    model VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE coffee (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    origin VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE tea (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    origin VARCHAR(255) NOT NULL,
    type VARCHAR(50),
    price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE basket (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    date DATETIME NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE shoppingCartItems (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    basket_id INT NOT NULL,
    product_id INT NOT NULL,
    product_type ENUM('coffee', 'tea', 'machine') NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (basket_id) REFERENCES basket (id),
    FOREIGN KEY (product_id) REFERENCES coffeeMachines (id)
);

