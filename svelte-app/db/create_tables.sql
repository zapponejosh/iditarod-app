-- Drop tables if they exist
DROP TABLE IF EXISTS Checkpoints;
DROP TABLE IF EXISTS Race_Data;
DROP TABLE IF EXISTS Mushers;
DROP TABLE IF EXISTS User_Picks;
DROP TABLE IF EXISTS User_Pool;
DROP TABLE IF EXISTS Competition_Pools;
-- Create profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL PRIMARY KEY,
  updated_at TIMESTAMP WITH TIME ZONE,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  CONSTRAINT username_length CHECK (char_length(username) >= 3)
);
-- Create Mushers table
CREATE TABLE Mushers (
  musher_id SERIAL PRIMARY KEY,
  bio TEXT,
  avatar_url VARCHAR(255),
  name VARCHAR(100),
  website VARCHAR(255),
  rookie BOOLEAN,
  profile_link VARCHAR(255)
);
-- Create Competition Pools table
CREATE TABLE Competition_Pools (
  pool_id SERIAL PRIMARY KEY,
  standings INTEGER [] DEFAULT ARRAY []::INTEGER [],
  status VARCHAR(50)
);
-- Create User-Competition Pool Relationship table
CREATE TABLE User_Pool (
  user_pool_id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  pool_id INTEGER REFERENCES Competition_Pools(pool_id)
);
-- Create User Picks table
CREATE TABLE User_Picks (
  user_pick_id SERIAL PRIMARY KEY,
  user_pool_id INTEGER REFERENCES User_Pool(user_pool_id),
  musher_picks INTEGER [] DEFAULT ARRAY []::INTEGER [],
  rookie_pick INTEGER
);
-- Create Race Data table
CREATE TABLE Race_Data (
  race_id SERIAL PRIMARY KEY,
  mushers JSONB CHECK (
    jsonb_valid(mushers)
    AND jsonb_check(
      mushers,
      '{
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "musher_id": {"type": "integer"},
            "name": {"type": "string"},
            "position": {"type": "integer"},
            "last_updated": {"type": "string", "format": "date-time"},
            "bib": {"type": "integer"},
            "latest_checkpoint": {"type": "string"},
            "speed": {"type": "number"},
            "status": {"type": "string"},
            "24_hr": {"type": "boolean"},
            "8_hr": {"type": "boolean"}
          },
          "required": ["musher_id", "name", "position", "last_updated", "bib", "latest_checkpoint", "speed", "status", "24_hr", "8_hr"]
        }
      }'
    )
  ),
  year INTEGER,
  duration INTERVAL,
  updated_at TIMESTAMP,
  participant_count INTEGER,
  active_racer_count INTEGER,
  race_start TIMESTAMP
);
-- Create Checkpoints table
CREATE TABLE Checkpoints (
  checkpoint_id SERIAL PRIMARY KEY,
  race_id INTEGER REFERENCES Race_Data(race_id),
  name VARCHAR(100),
  race_mile INTEGER,
  description TEXT,
  order INTEGER
);
-- Create a trigger function to update duration
CREATE OR REPLACE FUNCTION update_duration_function() RETURNS TRIGGER AS $$ BEGIN NEW.duration := NOW() - NEW.race_start;
RETURN NEW;
END;
$$ LANGUAGE plpgsql;
-- Create a trigger to call the update_duration_function
CREATE TRIGGER update_duration_trigger BEFORE
UPDATE ON Race_Data FOR EACH ROW
  WHEN (
    OLD.mushers IS DISTINCT
    FROM NEW.mushers
  ) EXECUTE FUNCTION update_duration_function();
-- Create or replace the update_updated_at_function
CREATE OR REPLACE FUNCTION update_updated_at_function() RETURNS TRIGGER AS $$ BEGIN NEW.updated_at := NOW();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;
-- Create a trigger to call the update_updated_at_function
CREATE TRIGGER update_updated_at_trigger BEFORE
INSERT
  OR
UPDATE ON Race_Data FOR EACH ROW EXECUTE FUNCTION update_updated_at_function();