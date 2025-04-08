/*
  # Create profiles table and security policies

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `first_name` (text)
      - `last_name` (text)
      - `age` (integer)
      - `phone_number` (text)
      - `parent_phone_number` (text)
      - `parent_email` (text)
      - `photo_url` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `profiles` table
    - Add policies for authenticated users to:
      - Read their own profile
      - Update their own profile
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  first_name text,
  last_name text,
  age integer,
  phone_number text,
  parent_phone_number text,
  parent_email text,
  photo_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Create function to handle user creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name, age, phone_number, parent_phone_number, parent_email, photo_url)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'firstName',
    new.raw_user_meta_data->>'lastName',
    (new.raw_user_meta_data->>'age')::integer,
    new.raw_user_meta_data->>'phoneNumber',
    new.raw_user_meta_data->>'parentPhoneNumber',
    new.raw_user_meta_data->>'parentEmail',
    new.raw_user_meta_data->>'photoUrl'
  );
  RETURN new;
END;
$$ language plpgsql security definer;

-- Create trigger for new user creation
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();