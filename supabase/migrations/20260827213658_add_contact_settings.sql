create table contact_settings (
  id int primary key check (id = 1),
  email text not null default 'info@nnavittalo.com',
  phone text not null default '+48512647444',
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

insert into contact_settings (id, email, phone) values (1, 'info@nnavittalo.com', '+48512647444');

alter table contact_settings enable row level security;

create policy "allow public read contact settings" on contact_settings for select using (true);
create policy "allow authenticated update contact settings" on contact_settings for update using (auth.role() = 'authenticated');
