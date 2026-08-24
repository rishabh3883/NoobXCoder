-- ----------------------------------------------------
-- NOOBXCODER SUPABASE DATABASE SCHEMA
-- Copy and paste this script into Supabase SQL Editor
-- ----------------------------------------------------

-- 1. DSA Questions Table
CREATE TABLE IF NOT EXISTS dsa_questions (
  id BIGINT PRIMARY KEY,
  title TEXT NOT NULL,
  platform TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  problem_url TEXT,
  topic TEXT,
  notes TEXT,
  status TEXT DEFAULT 'Solved',
  date_solved DATE DEFAULT CURRENT_DATE,
  approach TEXT,
  solution_code TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 2. Web Dev Daily Tasks Table
CREATE TABLE IF NOT EXISTS webdev_tasks (
  id BIGINT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT DEFAULT 'Frontend',
  topic TEXT,
  task_url TEXT,
  status TEXT DEFAULT 'Completed',
  date_solved DATE DEFAULT CURRENT_DATE,
  approach TEXT,
  solution_code TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 3. AI / ML Daily Tasks Table
CREATE TABLE IF NOT EXISTS aiml_tasks (
  id BIGINT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT DEFAULT 'Deep Learning',
  topic TEXT,
  task_url TEXT,
  status TEXT DEFAULT 'Completed',
  date_solved DATE DEFAULT CURRENT_DATE,
  approach TEXT,
  solution_code TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 4. YouTube Live Stream Updates Table
CREATE TABLE IF NOT EXISTS webdev_resources (
  id BIGINT PRIMARY KEY,
  title TEXT NOT NULL,
  youtube_url TEXT,
  topic TEXT,
  notes TEXT,
  code_snippet TEXT,
  github_repo TEXT,
  session_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 5. Attendance & Streak Log Table
CREATE TABLE IF NOT EXISTS attendance (
  id BIGINT PRIMARY KEY,
  user_id INT DEFAULT 1,
  date DATE NOT NULL,
  status TEXT DEFAULT 'Present',
  note TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 6. Doubts Portal Table
CREATE TABLE IF NOT EXISTS doubts (
  id BIGINT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  topic TEXT,
  amount INT DEFAULT 10,
  status TEXT DEFAULT 'Open',
  date_posted DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 7. Live Sessions Table
CREATE TABLE IF NOT EXISTS sessions (
  id BIGINT PRIMARY KEY,
  topic TEXT NOT NULL,
  mentor_name TEXT DEFAULT 'LO Novelist',
  scheduled_at TIMESTAMP WITH TIME ZONE,
  meeting_status TEXT DEFAULT 'Scheduled',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 8. Users Table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT DEFAULT 'student',
  leetcode_username TEXT,
  xp INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Enable RLS Policies for Anon API Keys
ALTER TABLE dsa_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE webdev_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE aiml_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE webdev_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE doubts ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anon read dsa" ON dsa_questions FOR SELECT USING (true);
CREATE POLICY "Allow anon insert dsa" ON dsa_questions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anon delete dsa" ON dsa_questions FOR DELETE USING (true);

CREATE POLICY "Allow anon read webdev" ON webdev_tasks FOR SELECT USING (true);
CREATE POLICY "Allow anon insert webdev" ON webdev_tasks FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anon delete webdev" ON webdev_tasks FOR DELETE USING (true);

CREATE POLICY "Allow anon read aiml" ON aiml_tasks FOR SELECT USING (true);
CREATE POLICY "Allow anon insert aiml" ON aiml_tasks FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anon delete aiml" ON aiml_tasks FOR DELETE USING (true);

CREATE POLICY "Allow anon read resources" ON webdev_resources FOR SELECT USING (true);
CREATE POLICY "Allow anon insert resources" ON webdev_resources FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anon delete resources" ON webdev_resources FOR DELETE USING (true);
