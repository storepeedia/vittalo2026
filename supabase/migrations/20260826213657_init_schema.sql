-- 1. CAMPS TABLE
create table camps (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  activity_type text not null, -- Trekking, Kayaking, Skiing, Staycation, etc.
  start_date date not null,
  end_date date not null,
  total_spots int not null default 30,
  available_spots int not null default 30,
  price_per_person numeric(10,2) not null,
  image_url text not null,
  description text,
  inclusions text[], -- Array of inclusions/activities
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 2. EUROPE PACKAGES TABLE
create table packages (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  duration_days int not null,
  duration_nights int not null,
  route text not null, -- e.g. "Zurich – Interlaken – Paris"
  starting_price numeric(10,2) not null,
  image_url text not null,
  description text,
  itinerary jsonb, -- Detailed day-by-day itinerary
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 3. CAMP BOOKINGS TABLE
create table camp_bookings (
  id uuid primary key default gen_random_uuid(),
  camp_id uuid references camps(id) on delete cascade,
  full_name text not null,
  email text not null,
  phone text not null,
  spots_booked int not null default 1,
  total_price numeric(10,2) not null,
  booking_status text default 'pending', -- pending, confirmed, cancelled
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 4. PACKAGE BOOKINGS TABLE
create table package_bookings (
  id uuid primary key default gen_random_uuid(),
  package_id uuid references packages(id) on delete cascade,
  full_name text not null,
  email text not null,
  phone text not null,
  number_of_travelers int not null default 1,
  custom_requests text,
  total_price numeric(10,2) not null,
  booking_status text default 'pending', -- pending, confirmed, cancelled
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Enable RLS
alter table camps enable row level security;
alter table packages enable row level security;
alter table camp_bookings enable row level security;
alter table package_bookings enable row level security;

-- Setup basic policies

-- public read for camps and packages
create policy "allow public read camps" on camps for select using (true);
create policy "allow public read packages" on packages for select using (true);

-- public insert for bookings
create policy "allow public insert camp bookings" on camp_bookings for insert with check (true);
create policy "allow public insert package bookings" on package_bookings for insert with check (true);

-- Admin full access for all (using authenticated role and checking if user is the admin)
-- (In a real setup we'd check roles, but checking if they are auth'd is fine for single admin here)
create policy "allow authenticated all camps" on camps for all using (auth.role() = 'authenticated');
create policy "allow authenticated all packages" on packages for all using (auth.role() = 'authenticated');
create policy "allow authenticated all camp bookings" on camp_bookings for all using (auth.role() = 'authenticated');
create policy "allow authenticated all package bookings" on package_bookings for all using (auth.role() = 'authenticated');
