-- 1. Create the admin user in auth.users
-- (Note: you must have pgcrypto extension enabled, which is default on Supabase)

INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    recovery_sent_at,
    last_sign_in_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
)
VALUES (
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    'nnavittalo@gmail.com',
    crypt('12345678', gen_salt('bf')),
    now(),
    now(),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{}',
    now(),
    now(),
    '',
    '',
    '',
    ''
);

-- Seed Camps
INSERT INTO camps (title, activity_type, start_date, end_date, total_spots, available_spots, price_per_person, image_url, description, inclusions, is_active)
VALUES
('Tatra Mountain Summit Trek', 'Trekking', '2024-06-15', '2024-06-20', 15, 12, 450.00, 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop', 'A challenging but rewarding trek to the peaks of the Tatra Mountains.', ARRAY['Guide', 'Accommodation', 'Meals', 'Permits'], true),
('Crystal Waters Kayak Expedition', 'Kayaking', '2024-07-10', '2024-07-14', 20, 8, 320.00, 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070&auto=format&fit=crop', 'Paddle through crystal clear turquoise waters and explore hidden coves.', ARRAY['Kayak Rental', 'Life Jacket', 'Lunch', 'Instructor'], true),
('Alpine Downhill Ski Adventure', 'Skiing', '2024-01-20', '2024-01-27', 25, 25, 850.00, 'https://images.unsplash.com/photo-1551524164-687a55dd1126?q=80&w=1925&auto=format&fit=crop', 'Experience the thrill of downhill skiing on pristine alpine slopes.', ARRAY['Ski Pass', 'Equipment Rental', 'Hotel', 'Breakfast'], true),
('Cozy Alpine Cabin Staycation', 'Staycation', '2024-12-22', '2024-12-27', 10, 2, 599.00, 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?q=80&w=2070&auto=format&fit=crop', 'Relax and unwind in a picturesque A-frame cabin surrounded by snow-covered pines.', ARRAY['Cabin Stay', 'Firewood', 'Welcome Basket'], true);


-- Seed Europe Packages
INSERT INTO packages (title, duration_days, duration_nights, route, starting_price, image_url, description, itinerary, is_active)
VALUES
('Swiss Alps Explorer', 7, 6, 'Zurich – Interlaken – Zermatt – Geneva', 1299.00, 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=2070&auto=format&fit=crop', 'Discover the magic of the Swiss Alps, from charming villages to towering peaks.', '[{"day": 1, "description": "Arrival in Zurich"}, {"day": 2, "description": "Train to Interlaken"}, {"day": 3, "description": "Explore Interlaken"}, {"day": 4, "description": "Travel to Zermatt (Matterhorn)"}, {"day": 5, "description": "Zermatt free day"}, {"day": 6, "description": "Train to Geneva"}, {"day": 7, "description": "Departure"}]', true),
('Central Europe Highlights', 10, 9, 'Prague – Vienna – Budapest', 999.00, 'https://images.unsplash.com/photo-1513807016779-d51c0c026263?q=80&w=2070&auto=format&fit=crop', 'Immerse yourself in the rich history and culture of Central Europe.', '[{"day": 1, "description": "Arrival in Prague"}, {"day": 2, "description": "Prague Castle Tour"}, {"day": 3, "description": "Travel to Vienna"}, {"day": 4, "description": "Vienna City Tour"}, {"day": 5, "description": "Travel to Budapest"}, {"day": 6, "description": "Budapest Thermal Baths"}, {"day": 7, "description": "Departure"}]', true),
('Iberian Sun Tour', 8, 7, 'Lisbon – Porto – Madrid', 1150.00, 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=80&w=2070&auto=format&fit=crop', 'Experience the vibrant life, stunning architecture, and amazing food of the Iberian peninsula.', '[{"day": 1, "description": "Arrival in Lisbon"}, {"day": 2, "description": "Lisbon Walking Tour"}, {"day": 3, "description": "Train to Porto"}, {"day": 4, "description": "Porto Wine Tasting"}, {"day": 5, "description": "Flight to Madrid"}, {"day": 6, "description": "Madrid Prado Museum"}, {"day": 7, "description": "Departure"}]', true);
