-- table definitions
--checkpoints table
create table public.checkpoints (
  checkpoint_id serial,
  name character varying(100) null,
  race_mile integer null,
  description text null,
  checkpoint_link text null,
  image text null,
  race_id integer null,
  constraint checkpoints_pkey primary key (checkpoint_id),
  constraint checkpoints_race_id_fkey foreign key (race_id) references race_data (race_id)
) tablespace pg_default;
--competition pool table
create table public.competition_pools (
  pool_id serial,
  standings integer [] null default array []::integer [],
  status public.competition_status null,
  code character varying(50) not null,
  constraint competition_pools_pkey primary key (pool_id)
) tablespace pg_default;
--musher standings table
create table public.musher_standings (
  standings_id serial,
  musher_id integer null,
  position integer null,
  last_updated timestamp without time zone null,
  bib integer null,
  latest_checkpoint_id integer null,
  speed numeric null,
  status character varying(50) null,
  twenty_four_hour boolean null default false,
  eight_hour boolean null default false,
  dogs_in integer null,
  dogs_out integer null,
  constraint musher_standings_pkey primary key (standings_id),
  constraint musher_standings_latest_checkpoint_id_fkey foreign key (latest_checkpoint_id) references checkpoints (checkpoint_id),
  constraint musher_standings_musher_id_fkey foreign key (musher_id) references mushers (musher_id)
) tablespace pg_default;
--mushers table
create table public.mushers (
  musher_id serial,
  bio text null,
  avatar_url character varying(255) null,
  name character varying(100) null,
  website character varying(255) null,
  rookie boolean null,
  profile_link character varying(255) null,
  hometown text null,
  constraint mushers_pkey primary key (musher_id)
) tablespace pg_default;
-- user/profiles table
create table public.profiles (
  id uuid not null,
  updated_at timestamp with time zone null,
  username text null,
  full_name text null,
  avatar_url text null,
  constraint profiles_pkey primary key (id),
  constraint profiles_username_key unique (username),
  constraint profiles_id_fkey foreign key (id) references auth.users (id) on delete cascade,
  constraint username_length check ((char_length(username) >= 3))
) tablespace pg_default;
create trigger before_profile_changes before delete
or
update of avatar_url on profiles for each row execute function delete_old_avatar ();
--race data table
create table public.race_data (
  race_id serial,
  year integer null,
  duration interval null,
  updated_at timestamp without time zone null,
  participant_count integer null,
  active_racer_count integer null,
  race_start timestamp without time zone null,
  constraint race_data_pkey primary key (race_id)
) tablespace pg_default;
--user picks table
create table public.user_picks (
  user_pick_id serial,
  user_pool_id integer null,
  musher_picks integer [] null default array []::integer [],
  rookie_pick integer null,
  constraint user_picks_pkey primary key (user_pick_id),
  constraint user_picks_user_pool_id_fkey foreign key (user_pool_id) references user_pool (user_pool_id)
) tablespace pg_default;
create trigger validate_and_insert_user_picks_trigger before
insert
  or
update on user_picks for each row execute function validate_and_insert_user_picks ();
--user-competition pool junction table
create table public.user_pool (
  user_pool_id serial,
  user_id uuid null,
  pool_id integer null,
  constraint user_pool_pkey primary key (user_pool_id),
  constraint user_pool_pool_id_fkey foreign key (pool_id) references competition_pools (pool_id),
  constraint user_pool_user_id_fkey foreign key (user_id) references profiles (id)
) tablespace pg_default;