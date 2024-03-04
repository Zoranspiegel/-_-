alter table posts add column banned boolean default false;
alter table posts add column banned_at timestamp;
