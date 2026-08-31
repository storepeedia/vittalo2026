-- Add chosen_date to camp_bookings to track the specific date a user selected for a camp
alter table camp_bookings add column chosen_date text;
