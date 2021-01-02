/* Création des tables pour la tea n' toast */
BEGIN;

DROP TABLE IF EXISTS  "tea", "category", "variety", "sale", "app_user", "basket";

-- app_user
CREATE TABLE IF NOT EXISTS "app_user" (
    "id" SERIAL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "BasketId" INT,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NULL
);

-- category (pop culture...)
CREATE TABLE IF NOT EXISTS "category" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NULL
);

-- variety (tea type)
CREATE TABLE IF NOT EXISTS "variety" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NULL
);

-- tea
CREATE TABLE IF NOT EXISTS "tea" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" FLOAT NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT 'true',
    "picturePath" TEXT,
    "pictureName" TEXT,
    "category_id" INT REFERENCES "category"("id") ON DELETE CASCADE,
    "variety_id" INT REFERENCES "variety"("id") ON DELETE CASCADE,
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
    "teas" INT ARRAY, --tea id
    "app_user_id" INT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NULL
);

-- basket
CREATE TABLE IF NOT EXISTS "basket" (
    "id" SERIAL PRIMARY KEY,
    "UserId" INT REFERENCES "app_user"("id") ON DELETE CASCADE,
    "teas" INT ARRAY,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NULL
);


COMMIT;