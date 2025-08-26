CREATE DATABASE test_wilffren_malecon;

USE test_wilffren_malecon;

CREATE TABLE organics (
    id_organic INT AUTO_INCREMENT PRIMARY KEY,
    abbreviation VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


CREATE TABLE products (
    id_product INT AUTO_INCREMENT PRIMARY KEY,
    ground_type VARCHAR(255) NOT NULL,
    irrigation_system VARCHAR(255) NOT NULL,
    used_fertilizer VARCHAR(255) NOT NULL,
    id_organic INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_organic) REFERENCES organics(id_organic)
);


CREATE TABLE crops (
    id_corp INT AUTO_INCREMENT PRIMARY KEY,
    variety_corp VARCHAR(255) NOT NULL,
    type_corp VARCHAR(255) NOT NULL,
    value DECIMAL(10,2) NOT NULL,
    production INT(10) NOT NULL,
    date_time DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE sensors (
    id_sensor INT AUTO_INCREMENT PRIMARY KEY,
    id_of_sensor VARCHAR(255) NOT NULL UNIQUE,
    type_sensor VARCHAR(255) NOT NULL,
    estate_sensor VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


CREATE TABLE technicians (
    id_technician INT AUTO_INCREMENT PRIMARY KEY,
    technician VARCHAR(255) NOT NULL,
    date_maintenance DATE NOT NULL,
    id_sensor INT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_sensor) REFERENCES sensors(id_sensor)
);


CREATE TABLE farms (
    id_farm INT AUTO_INCREMENT PRIMARY KEY,
    name_farm VARCHAR(255) NOT NULL,
    region VARCHAR(255) NOT NULL,
    id_corp INT,
    id_sensor INT,
    id_product INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_corp) REFERENCES crops(id_corp),
    FOREIGN KEY (id_sensor) REFERENCES sensors(id_sensor),
    FOREIGN KEY (id_product) REFERENCES products(id_product)
);
