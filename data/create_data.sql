/* Création des tables pour la tea n' toast */
BEGIN;

DROP TABLE IF EXISTS  "app_user", "category", "sub_category", "product", "basket", "sale", "session";

-- app_user
CREATE TABLE IF NOT EXISTS "app_user" (
    "id" SERIAL PRIMARY KEY,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "logged" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NULL
);

-- category (pop culture, medecine...)
CREATE TABLE IF NOT EXISTS "category" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "color" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NULL
);

-- sub_category (mugs, tshirt, black tea, green tea...)
CREATE TABLE IF NOT EXISTS "sub_category" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "type" VARCHAR(255) NOT NULL,
    "color" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NULL
);


-- product
CREATE TABLE IF NOT EXISTS "product" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "price" FLOAT NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT 'true',
    "picture" VARCHAR(255),
    "quantity" INT NOT NULL DEFAULT '1',
    "category_id" INT REFERENCES "category"("id") ON DELETE CASCADE,
    "type" VARCHAR(255) NOT NULL DEFAULT 'tea', -- can be a goodie
    "sub_category_id" INT REFERENCES "sub_category"("id") ON DELETE CASCADE,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NULL
);

-- basket
CREATE TABLE IF NOT EXISTS "basket" (
    "id" SERIAL PRIMARY KEY,
    "app_user_id" INT REFERENCES "app_user"("id") ON DELETE CASCADE,
    "product_id" INT REFERENCES "product"("id") ON DELETE CASCADE,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NULL
);

-- sale
CREATE TABLE IF NOT EXISTS "sale" (
    "id" SERIAL PRIMARY KEY,
    "value" FLOAT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "city" VARCHAR(255) NOT NULL,
    "zipCode" VARCHAR(255) NOT NULL,
    "basket_id" INT REFERENCES "basket"("id") ON DELETE CASCADE,
    "app_user_id" INT REFERENCES "app_user"("id") ON DELETE CASCADE,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NULL
);



CREATE TABLE IF NOT EXISTS "session" (
  "sid" VARCHAR(255) PRIMARY KEY,
  "expires" DATE,
  "data" TEXT,
  "userId" INT,
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NULL
);


COMMIT;