/* Création des tables pour la tea n' toast */
BEGIN;

DROP TABLE IF EXISTS  "app_user", "tea_variety", "type", "category", "product", "basket", "sale", "session";

-- app_user
CREATE TABLE IF NOT EXISTS "app_user" (
    "id" SERIAL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "logged" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NULL
);


-- variety (tea type)
CREATE TABLE IF NOT EXISTS "tea_variety" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NULL
);



-- type (tea, goddies...)
CREATE TABLE IF NOT EXISTS "type" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NULL
);

-- category (pop culture, medecine...)
CREATE TABLE IF NOT EXISTS "category" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NULL
);




-- product
CREATE TABLE IF NOT EXISTS "product" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" FLOAT NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT 'true',
    "picture" TEXT,
    "category_id" INT REFERENCES "category"("id") ON DELETE CASCADE,
    "type_id" INT REFERENCES "type"("id") ON DELETE CASCADE,
    "tea_variety_id" INT REFERENCES "tea_variety"("id") ON DELETE CASCADE, -- if type === tea
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
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "basket_id" INT REFERENCES "basket"("id") ON DELETE CASCADE,
    "app_user_id" INT REFERENCES "app_user"("id") ON DELETE CASCADE,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NULL
);



CREATE TABLE IF NOT EXISTS "session" (
  "sid" TEXT PRIMARY KEY,
  "expires" DATE,
  "data" TEXT,
  "userId" INT,
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NULL
);


COMMIT;