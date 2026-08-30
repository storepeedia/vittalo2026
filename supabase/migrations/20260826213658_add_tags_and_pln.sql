ALTER TABLE camps
DROP COLUMN IF EXISTS start_date,
DROP COLUMN IF EXISTS end_date,
ADD COLUMN IF NOT EXISTS camp_dates text,
ADD COLUMN IF NOT EXISTS itinerary text,
ADD COLUMN IF NOT EXISTS price_per_person_pln numeric(10,2);

-- Note: The table `camp_bookings` does not seem to exist in production based on your migrations / local setup mismatch.
-- But the code uses `camp_bookings`. Let's create it if it doesn't exist just to be safe, or alter it if it does.
DO $$
BEGIN
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename  = 'camp_bookings') THEN
        ALTER TABLE camp_bookings ADD COLUMN IF NOT EXISTS chosen_date text;
    END IF;
END $$;
