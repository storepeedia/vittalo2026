-- Add priority column to camps
alter table camps add column priority int;

-- Add priority column to packages
alter table packages add column priority int;
