-- Drop the NOT NULL constraint on price_per_person
ALTER TABLE camps ALTER COLUMN price_per_person DROP NOT NULL;

-- Drop the default value and NOT NULL constraint (if it exists) on price_per_person_pln
ALTER TABLE camps ALTER COLUMN price_per_person_pln DROP NOT NULL;
ALTER TABLE camps ALTER COLUMN price_per_person_pln DROP DEFAULT;
