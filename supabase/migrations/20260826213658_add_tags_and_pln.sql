-- Add PLN price to camps
alter table camps add column price_per_person_pln numeric(10,2) default 0.00;

-- Add tag groups to camps
alter table camps add column tags_top_left text;
alter table camps add column tags_image_bottom text;
alter table camps add column tags_body_top text;

-- Add tag groups to packages
alter table packages add column tags_top_left text;
alter table packages add column tags_image_bottom text;
alter table packages add column tags_body_top text;
