-- Table Schema Template:
CREATE TABLE "students" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(500) NOT NULL,
  "attendance" VARCHAR(500)
  );

-- Seed Data Template:
INSERT INTO "students"
  ("name")
  VALUES
  ('Aman'),
  ('Ayan'),
  ('Amira'),
  ('Aaliyah');

-- get
SELECT * FROM "students"
	ORDER BY "id";

-- post
INSERT INTO "students" ("name")
  VALUES ($1);

-- delete
DELETE FROM "students"
  WHERE "id"=$1;

-- put
UPDATE "students"
  SET "attendance"=$1
  WHERE "id"=$2;

-- put
UPDATE "students"
  SET "attendance"=$1