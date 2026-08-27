-- Run this in your Supabase SQL Editor

-- 1. Drop the old table if it exists (WARNING: This will delete existing booking data)
DROP TABLE IF EXISTS public.bookings;

-- 2. Create the new table
CREATE TABLE public.bookings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    booking_no TEXT NOT NULL,
    event_id TEXT,
    event_name TEXT,
    customer_name TEXT NOT NULL,
    mobile_no TEXT,
    dob DATE,
    guests INTEGER, -- Only populated for the main booker
    total_price_pln NUMERIC, -- Only populated for the main booker
    total_price_eur NUMERIC, -- Only populated for the main booker
    is_main_booker BOOLEAN DEFAULT false,
    chosen_trip_date TEXT,
    booking_date DATE DEFAULT CURRENT_DATE,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 3. Enable RLS (Row Level Security) - required for frontend inserts
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- 4. Create a policy to allow anyone (anon) to insert data
CREATE POLICY "Allow public inserts" ON public.bookings
    FOR INSERT
    WITH CHECK (true);

-- (Optional) Policy to allow public reading if needed for a "My Bookings" page later
CREATE POLICY "Allow public select" ON public.bookings
    FOR SELECT
    USING (true);
