"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, XCircle, Database, Loader2, Play, Save, Copy, FileCode, ExternalLink } from "lucide-react"

export default function SQLConsole() {
  const [sql, setSql] = useState("")
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("console")

  // Updated exec function that handles existing function
  const createExecFunctionSQL = `-- Drop existing function if it exists and create new one
DROP FUNCTION IF EXISTS exec_sql(text);

CREATE OR REPLACE FUNCTION exec_sql(sql text) 
RETURNS text AS $$
DECLARE
  result text;
BEGIN
  EXECUTE sql;
  result := 'SUCCESS: SQL executed successfully';
  RETURN result;
EXCEPTION
  WHEN OTHERS THEN
    result := 'ERROR: ' || SQLERRM;
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;`

  const createTablesSQL = `-- Create site_content table
CREATE TABLE IF NOT EXISTS site_content (
  id SERIAL PRIMARY KEY,
  section VARCHAR(50) NOT NULL,
  key VARCHAR(100) NOT NULL,
  value TEXT NOT NULL,
  type VARCHAR(20) DEFAULT 'text' CHECK (type IN ('text', 'image', 'html')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(section, key)
);

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'admin' CHECK (role IN ('admin', 'editor', 'moderator')),
  active BOOLEAN DEFAULT TRUE,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  author VARCHAR(100) NOT NULL,
  category VARCHAR(50) NOT NULL,
  featured BOOLEAN DEFAULT FALSE,
  image_url VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  position VARCHAR(100),
  company VARCHAR(100),
  content TEXT NOT NULL,
  avatar_url VARCHAR(500),
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  featured BOOLEAN DEFAULT FALSE,
  approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create complaints table
CREATE TABLE IF NOT EXISTS complaints (
  id SERIAL PRIMARY KEY,
  complainant_name VARCHAR(100) NOT NULL,
  complainant_email VARCHAR(100),
  complainant_phone VARCHAR(20),
  company_name VARCHAR(100),
  complaint_type VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'investigating', 'resolved', 'closed')),
  priority VARCHAR(10) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  assigned_to VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  category VARCHAR(50) NOT NULL,
  subject VARCHAR(200) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create documents table
CREATE TABLE IF NOT EXISTS documents (
  id SERIAL PRIMARY KEY,
  filename VARCHAR(255) NOT NULL,
  file_path VARCHAR(500) NOT NULL,
  file_size INTEGER,
  content_text TEXT,
  processed BOOLEAN DEFAULT FALSE,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create newsletter_subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id SERIAL PRIMARY KEY,
  email VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(100),
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed', 'bounced')),
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  unsubscribed_at TIMESTAMP WITH TIME ZONE
);

-- Create page_views table
CREATE TABLE IF NOT EXISTS page_views (
  id SERIAL PRIMARY KEY,
  page_path VARCHAR(255) NOT NULL,
  user_ip VARCHAR(45),
  user_agent TEXT,
  referrer VARCHAR(500),
  viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create search_logs table
CREATE TABLE IF NOT EXISTS search_logs (
  id SERIAL PRIMARY KEY,
  query VARCHAR(255) NOT NULL,
  results_count INTEGER DEFAULT 0,
  user_ip VARCHAR(45),
  searched_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create analytics_events table
CREATE TABLE IF NOT EXISTS analytics_events (
  id SERIAL PRIMARY KEY,
  event_type VARCHAR(50) NOT NULL,
  event_data JSONB,
  user_agent TEXT,
  ip_address VARCHAR(45),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_featured ON blog_posts(featured);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON blog_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_testimonials_featured ON testimonials(featured);
CREATE INDEX IF NOT EXISTS idx_testimonials_approved ON testimonials(approved);
CREATE INDEX IF NOT EXISTS idx_complaints_status ON complaints(status);
CREATE INDEX IF NOT EXISTS idx_complaints_created_at ON complaints(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_documents_processed ON documents(processed);`

  // Fixed verify tables SQL using pg_tables
  const verifyTablesSQL = `SELECT tablename as table_name 
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY tablename;`

  const seedDataSQL = `-- Insert sample site content
INSERT INTO site_content (section, key, value, type) VALUES
('home', 'hero_title', 'Ghana Labour Department', 'text'),
('home', 'hero_subtitle', 'Protecting Workers Rights and Promoting Fair Employment', 'text'),
('home', 'about_text', 'The Labour Department of Ghana is committed to ensuring fair and safe working conditions for all workers in Ghana.', 'html'),
('contact', 'address', '123 Independence Avenue, Accra, Ghana', 'text'),
('contact', 'phone', '+233 30 2123456', 'text'),
('contact', 'email', 'info@labour.gov.gh', 'text')
ON CONFLICT (section, key) DO NOTHING;

-- Insert admin user
INSERT INTO admin_users (username, email, password_hash, role)
VALUES ('admin', 'admin@labour.gov.gh', '$2b$10$rMb4Ygf9LsJxGI0OFRSWXOQJJlx1uVELUPKL5LXP1lGPi0z9WwQdO', 'admin')
ON CONFLICT (email) DO NOTHING;

-- Insert sample blog posts
INSERT INTO blog_posts (title, excerpt, content, author, category, featured, image_url)
VALUES 
('New Labour Laws in Ghana', 'Learn about the recent changes to labour laws in Ghana', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.', 'John Doe', 'Laws', TRUE, '/images/blog/labour-laws.jpg'),
('Workplace Safety Guidelines', 'Essential safety guidelines for all workplaces', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.', 'Jane Smith', 'Safety', FALSE, '/images/blog/workplace-safety.jpg'),
('Employee Rights in Ghana', 'Understanding your rights as an employee', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.', 'Robert Johnson', 'Rights', FALSE, '/images/blog/employee-rights.jpg')
ON CONFLICT DO NOTHING;

-- Insert sample testimonials
INSERT INTO testimonials (name, position, company, content, rating, featured, approved)
VALUES 
('Kwame Mensah', 'Factory Worker', 'Ghana Manufacturing Ltd', 'The Labour Department helped me resolve my dispute with my employer quickly and fairly.', 5, TRUE, TRUE),
('Ama Owusu', 'HR Manager', 'Accra Tech Solutions', 'The guidelines provided by the Labour Department have been invaluable in creating our workplace policies.', 4, TRUE, TRUE),
('Kofi Adu', 'Construction Worker', 'BuildGhana Inc', 'I received prompt assistance when I reported unsafe working conditions at my site.', 5, FALSE, TRUE)
ON CONFLICT DO NOTHING;`

  const executeSQL = async (sqlToExecute: string) => {
    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch("/api/direct-sql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sql: sqlToExecute }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to execute SQL")
      }

      setResult(data)
    } catch (err: any) {
      console.error("SQL execution error:", err)
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleExecute = () => {
    if (!sql.trim()) {
      setError("Please enter SQL to execute")
      return
    }
    executeSQL(sql)
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const handleUseTemplate = (template: string) => {
    setSql(template)
    setActiveTab("console")
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <Database className="h-12 w-12 text-[#dd2a1b] mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-[#231f20] mb-2">SQL Console</h1>
          <p className="text-gray-600">Execute SQL directly on your Supabase database</p>
        </div>

        {/* Quick Access to Supabase */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-blue-900">Recommended: Use Supabase SQL Editor</h3>
              <p className="text-sm text-blue-700">
                For the most reliable experience, execute SQL directly in Supabase
              </p>
            </div>
            <Button variant="outline" asChild>
              <a
                href="https://app.supabase.com/project/cfqnlejmlzpzrdzjkyrj/sql"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Open Supabase SQL Editor
              </a>
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="console">SQL Console</TabsTrigger>
            <TabsTrigger value="templates">SQL Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="console" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Execute SQL</CardTitle>
                <CardDescription>Enter SQL commands to run on your Supabase database</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Enter SQL here..."
                  value={sql}
                  onChange={(e) => setSql(e.target.value)}
                  className="min-h-[200px] font-mono text-sm"
                />

                {error && (
                  <Alert variant="destructive" className="mt-4">
                    <XCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                      {error}
                      <div className="mt-2">
                        <Button variant="outline" size="sm" asChild>
                          <a
                            href="https://app.supabase.com/project/cfqnlejmlzpzrdzjkyrj/sql"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Try in Supabase SQL Editor
                          </a>
                        </Button>
                      </div>
                    </AlertDescription>
                  </Alert>
                )}

                {result && (
                  <Alert className="mt-4 bg-green-50 border-green-200">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertTitle>Success</AlertTitle>
                    <AlertDescription>
                      <div>{result.message}</div>
                      {result.data && typeof result.data === "string" && (
                        <div className="mt-2 font-mono text-sm">{result.data}</div>
                      )}
                      {result.data && Array.isArray(result.data) && (
                        <div className="mt-2">
                          <strong>Results:</strong>
                          <pre className="mt-1 text-xs bg-gray-100 p-2 rounded">
                            {JSON.stringify(result.data, null, 2)}
                          </pre>
                        </div>
                      )}
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setSql("")}>
                  Clear
                </Button>
                <Button onClick={handleExecute} disabled={isLoading} className="bg-[#dd2a1b] hover:bg-[#c02419]">
                  {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Play className="h-4 w-4 mr-2" />}
                  Execute SQL
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="templates" className="mt-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileCode className="h-5 w-5 mr-2 text-[#dd2a1b]" />
                    Fix exec_sql Function
                  </CardTitle>
                  <CardDescription>Drop and recreate the SQL execution function</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-100 p-3 rounded-md overflow-auto max-h-[150px]">
                    <pre className="text-xs">{createExecFunctionSQL}</pre>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => handleCopy(createExecFunctionSQL)}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                  <Button onClick={() => handleUseTemplate(createExecFunctionSQL)}>
                    <Play className="h-4 w-4 mr-2" />
                    Use
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Database className="h-5 w-5 mr-2 text-[#dd2a1b]" />
                    Create All Tables
                  </CardTitle>
                  <CardDescription>Create all required database tables</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-100 p-3 rounded-md overflow-auto max-h-[150px]">
                    <pre className="text-xs">{createTablesSQL.substring(0, 500)}...</pre>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => handleCopy(createTablesSQL)}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                  <Button onClick={() => handleUseTemplate(createTablesSQL)}>
                    <Play className="h-4 w-4 mr-2" />
                    Use
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Save className="h-5 w-5 mr-2 text-[#dd2a1b]" />
                    Seed Sample Data
                  </CardTitle>
                  <CardDescription>Add initial data to your tables</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-100 p-3 rounded-md overflow-auto max-h-[150px]">
                    <pre className="text-xs">{seedDataSQL.substring(0, 500)}...</pre>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => handleCopy(seedDataSQL)}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                  <Button onClick={() => handleUseTemplate(seedDataSQL)}>
                    <Play className="h-4 w-4 mr-2" />
                    Use
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-[#dd2a1b]" />
                    Verify Tables (Fixed)
                  </CardTitle>
                  <CardDescription>Check which tables exist using pg_tables</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-100 p-3 rounded-md overflow-auto max-h-[150px]">
                    <pre className="text-xs">{verifyTablesSQL}</pre>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => handleCopy(verifyTablesSQL)}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                  <Button onClick={() => handleUseTemplate(verifyTablesSQL)}>
                    <Play className="h-4 w-4 mr-2" />
                    Use
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 mb-4">
            Follow these steps in order: 1) Fix exec_sql function, 2) Create tables, 3) Seed data, 4) Verify tables
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="outline" asChild>
              <a href="/database-status">Check Database Status</a>
            </Button>
            <Button variant="outline" asChild>
              <a
                href="https://app.supabase.com/project/cfqnlejmlzpzrdzjkyrj/sql"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Supabase SQL Editor
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
