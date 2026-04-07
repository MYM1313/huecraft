/*
  SUPABASE DATABASE SCHEMA

  -- 1. Projects Table
  CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    subtitle TEXT,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    before_image_url TEXT,
    after_image_url TEXT,
    category TEXT NOT NULL DEFAULT 'Residential',
    tags TEXT[],
    features TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );

  -- 2. Services Table
  CREATE TABLE services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    subtitle TEXT,
    description TEXT NOT NULL,
    short_description TEXT,
    image_url TEXT NOT NULL,
    images TEXT[],
    points TEXT[],
    core_features JSONB,
    pricing JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );

  -- 3. Testimonials Table
  CREATE TABLE testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    message TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );

  -- 4. Leads Table
  CREATE TABLE leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    address TEXT,
    service TEXT,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );

  -- 5. Quotes Table
  CREATE TABLE quotes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    service_type TEXT NOT NULL,
    budget_range TEXT NOT NULL,
    timeline TEXT NOT NULL,
    description TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );

  -- 6. Authorized Admins Table
  CREATE TABLE authorized_admins (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );

  -- RLS POLICIES

  -- Enable RLS
  ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
  ALTER TABLE services ENABLE ROW LEVEL SECURITY;
  ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
  ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
  ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
  ALTER TABLE authorized_admins ENABLE ROW LEVEL SECURITY;

  -- Public Read Access
  CREATE POLICY "Public Read Projects" ON projects FOR SELECT USING (true);
  CREATE POLICY "Public Read Services" ON services FOR SELECT USING (true);
  CREATE POLICY "Public Read Testimonials" ON testimonials FOR SELECT USING (true);

  -- Admin Full Access (Authenticated Users)
  CREATE POLICY "Admin Full Projects" ON projects FOR ALL TO authenticated USING (true) WITH CHECK (true);
  CREATE POLICY "Admin Full Services" ON services FOR ALL TO authenticated USING (true) WITH CHECK (true);
  CREATE POLICY "Admin Full Testimonials" ON testimonials FOR ALL TO authenticated USING (true) WITH CHECK (true);
  CREATE POLICY "Admin Full Leads" ON leads FOR ALL TO authenticated USING (true) WITH CHECK (true);
  CREATE POLICY "Admin Full Quotes" ON quotes FOR ALL TO authenticated USING (true) WITH CHECK (true);
  CREATE POLICY "Admin Full Authorized Admins" ON authorized_admins FOR ALL TO authenticated USING (true) WITH CHECK (true);

  -- Public Submission Policies
  CREATE POLICY "Public Create Leads" ON leads FOR INSERT WITH CHECK (true);
  CREATE POLICY "Public Create Quotes" ON quotes FOR INSERT WITH CHECK (true);

  -- STORAGE BUCKET
  -- Create a bucket named 'project-images' in Supabase Storage
  -- Set it to public
  -- Add policies:
  -- 1. Public Read: (true)
  -- 2. Authenticated Upload: (role() = 'authenticated')
  -- 3. Authenticated Delete: (role() = 'authenticated')
*/
