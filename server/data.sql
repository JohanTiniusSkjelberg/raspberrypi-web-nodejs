CREATE DATABASE mealprepp;

CREATE TABLE meals ( 
    id VARCHAR(255) PRIMARY KEY,
    user_email VARCHAR(255),
    title VARCHAR(255)
    );
CREATE TABLE users ( 
    email VARCHAR(255) PRIMARY KEY,
    hased_password VARCHAR(255)
);