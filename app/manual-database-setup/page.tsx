"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Copy, ExternalLink, Database, ArrowRight, AlertTriangle, RefreshCw } from "lucide-react"

export default function ManualDatabaseSetup() {
  const [copied, setCopied] = useState(false)
  const [step, setStep] = useState(1)

  const sqlScript = `-- Ghana Labour Department Database Setup
-- Copy and paste this entire script into your Supabase SQL Editor

-- Step 1: Create site_content table
CREATE TABLE IF NOT EXISTS site_content (
  id SERIAL PRIMARY KEY,
  section VARCHAR(50) NOT NULL,
  key VARCHAR(100) NOT NULL,
  value TEXT NOT NULL,
  type VARCHAR(20) DEFAULT 'text',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(section, key)
);

-- Step 2: Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'admin',
  active BOOLEAN DEFAULT TRUE,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 3: Create blog_posts table
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

-- Step 4: Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  position VARCHAR(100),
  company VARCHAR(100),
  content TEXT NOT NULL,
  avatar_url VARCHAR(500),
  rating INTEGER DEFAULT 5,
  featured BOOLEAN DEFAULT FALSE,
  approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 5: Create complaints table
CREATE TABLE IF NOT EXISTS complaints (
  id SERIAL PRIMARY KEY,
  complainant_name VARCHAR(100) NOT NULL,
  complainant_email VARCHAR(100),
  complainant_phone VARCHAR(20),
  company_name VARCHAR(100),
  complaint_type VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  priority VARCHAR(10) DEFAULT 'medium',
  assigned_to VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 6: Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  category VARCHAR(50) NOT NULL,
  subject VARCHAR(200) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'unread',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 7: Create documents table
CREATE TABLE IF NOT EXISTS documents (
  id SERIAL PRIMARY KEY,
  filename VARCHAR(255) NOT NULL,
  file_path VARCHAR(500) NOT NULL,
  file_size INTEGER,
  content_text TEXT,
  processed BOOLEAN DEFAULT FALSE,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 8: Create newsletter_subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id SERIAL PRIMARY KEY,
  email VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(100),
  status VARCHAR(20) DEFAULT 'active',
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  unsubscribed_at TIMESTAMP WITH TIME ZONE
);

-- Step 9: Create page_views table
CREATE TABLE IF NOT EXISTS page_views (
  id SERIAL PRIMARY KEY,
  page_path VARCHAR(255) NOT NULL,
  user_ip VARCHAR(45),
  user_agent TEXT,
  referrer VARCHAR(500),
  viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 10: Create search_logs table
CREATE TABLE IF NOT EXISTS search_logs (
  id SERIAL PRIMARY KEY,
  query VARCHAR(255) NOT NULL,
  results_count INTEGER DEFAULT 0,
  user_ip VARCHAR(45),
  searched_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 11: Create analytics_events table
CREATE TABLE IF NOT EXISTS analytics_events (
  id SERIAL PRIMARY KEY,
  event_type VARCHAR(50) NOT NULL,
  event_data JSONB,
  user_agent TEXT,
  ip_address VARCHAR(45),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample site content
INSERT INTO site_content (section, key, value, type) VALUES
('home', 'hero_title', 'Ghana Labour Department', 'text'),
('home', 'hero_subtitle', 'Protecting Workers Rights and Promoting Fair Employment', 'text'),
('home', 'hero_description', 'We ensure fair labor practices, protect worker rights, and promote safe working conditions across Ghana.', 'text'),
('contact', 'address', '123 Independence Avenue, Accra, Ghana', 'text'),
('contact', 'phone', '+233 30 2123456', 'text'),
('contact', 'email', 'info@labour.gov.gh', 'text'),
('about', 'mission', 'To promote decent work and productive employment for all Ghanaians', 'text'),
('about', 'vision', 'A Ghana where all workers enjoy decent work in a safe and healthy environment', 'text')
ON CONFLICT (section, key) DO NOTHING;

-- Insert admin user (password: demo123)
INSERT INTO admin_users (username, email, password_hash, role) VALUES
('admin', 'admin@labour.gov.gh', '$2b$10$rMb4Ygf9LsJxGI0OFRSWXOQJJlx1uVELUPKL5LXP1lGPi0z9WwQdO', 'admin')
ON CONFLICT (email) DO NOTHING;

-- Insert sample blog posts
INSERT INTO blog_posts (title, excerpt, content, author, category, featured) VALUES
('New Labour Law Amendments 2024', 'Important updates to Ghana''s labour laws affecting all workers and employers.', 'The Ghana Labour Department announces significant amendments to the Labour Act that will strengthen worker protections and improve workplace conditions across the country. These changes reflect our commitment to ensuring fair and safe working environments for all Ghanaians.', 'Labour Department', 'Legal Updates', true),
('Workplace Safety Guidelines', 'Essential safety measures every workplace must implement.', 'Ensuring workplace safety is a shared responsibility between employers and employees. This comprehensive guide outlines the mandatory safety protocols that must be implemented in all workplaces to protect workers from occupational hazards and injuries.', 'Safety Division', 'Safety', true),
('Workers Rights Awareness Campaign', 'Know your rights as a worker in Ghana.', 'Every worker in Ghana has fundamental rights that must be respected by employers. Our awareness campaign aims to educate workers about their rights and provide resources for reporting violations and seeking assistance when needed.', 'Rights Division', 'Workers Rights', false)
ON CONFLICT DO NOTHING;

-- Insert sample testimonials
INSERT INTO testimonials (name, position, company, content, rating, featured, approved) VALUES
('Kwame Asante', 'Factory Worker', 'Ghana Manufacturing Ltd', 'The Labour Department helped resolve my workplace dispute quickly and fairly. Their intervention ensured I received proper compensation and my working conditions improved significantly.', 5, true, true),
('Akosua Mensah', 'HR Manager', 'Tech Solutions Ghana', 'Their guidance on labour compliance has been invaluable for our company. The workshops and resources provided helped us implement better HR practices and maintain good relationships with our employees.', 5, true, true),
('John Doe', 'Construction Worker', 'Build Right Construction', 'Thanks to their intervention, our workplace is now much safer. The safety inspections and recommendations have prevented several potential accidents and created a better working environment for everyone.', 4, false, true)
ON CONFLICT DO NOTHING;

-- Verify the setup
SELECT 'Database setup completed successfully!' as status;
SELECT 'Tables created:' as message;
SELECT tablename FROM pg_tables WHERE schemaname = 'public' AND tablename IN (
  'site_content', 'admin_users', 'blog_posts', 'testimonials', 'complaints',
  'contact_messages', 'documents', 'newsletter_subscribers', 'page_views',
  'search_logs', 'analytics_events'
) ORDER BY tablename;`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sqlScript)
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  const steps = [
    {
      title: "Copy the SQL Script",
      description: "Copy the complete database setup script to your clipboard",
      action: (
        <Button onClick={copyToClipboard} className="bg-[#dd2a1b] hover:bg-[#c02419]" size="lg">
          <Copy className="h-4 w-4 mr-2" />
          {copied ? "Copied!" : "Copy SQL Script"}
        </Button>
      ),
      completed: copied,
    },
    {
      title: "Open Supabase SQL Editor",
      description: "Navigate to your Supabase project's SQL Editor",
      action: (
        <Button asChild variant="outline" size="lg">
          <a
            href="https://app.supabase.com/project/cfqnlejmlzpzrdzjkyrj/sql"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setStep(3)}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Open SQL Editor
          </a>
        </Button>
      ),
      completed: step >= 3,
    },
    {
      title: "Paste and Run the Script",
      description: "Paste the copied SQL script and click 'Run' in Supabase",
      action: (
        <Button onClick={() => setStep(4)} variant="outline" size="lg">
          <CheckCircle className="h-4 w-4 mr-2" />
          Mark as Completed
        </Button>
      ),
      completed: step >= 4,
    },
    {
      title: "Verify Setup",
      description: "Return to the system check to verify everything is working",
      action: (
        <Button asChild className="bg-green-600 hover:bg-green-700" size="lg">
          <a href="/system-check">
            <RefreshCw className="h-4 w-4 mr-2" />
            Check System Status
          </a>
        </Button>
      ),
      completed: false,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Database className="h-12 w-12 text-[#dd2a1b] mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-[#231f20] mb-2">Manual Database Setup</h1>
          <p className="text-gray-600">Step-by-step guide to set up your database tables</p>
        </div>

        {/* Important Notice */}
        <Alert className="mb-6 bg-yellow-50 border-yellow-200">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertTitle className="text-yellow-800">Manual Setup Required</AlertTitle>
          <AlertDescription className="text-yellow-700">
            The automated table creation methods aren't working with your Supabase configuration. This manual approach
            will definitely work and only takes 2-3 minutes to complete.
          </AlertDescription>
        </Alert>

        {/* Steps */}
        <div className="space-y-6">
          {steps.map((stepItem, index) => (
            <Card key={index} className={`${stepItem.completed ? "border-green-200 bg-green-50" : ""}`}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                      stepItem.completed
                        ? "bg-green-600 text-white"
                        : index + 1 === step
                          ? "bg-[#dd2a1b] text-white"
                          : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {stepItem.completed ? <CheckCircle className="h-4 w-4" /> : index + 1}
                  </div>
                  <span className={stepItem.completed ? "text-green-800" : ""}>{stepItem.title}</span>
                  {stepItem.completed && <Badge className="ml-2 bg-green-100 text-green-800">Completed</Badge>}
                </CardTitle>
                <CardDescription className={stepItem.completed ? "text-green-700" : ""}>
                  {stepItem.description}
                </CardDescription>
              </CardHeader>
              <CardContent>{stepItem.action}</CardContent>
            </Card>
          ))}
        </div>

        {/* SQL Script Preview */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>SQL Script Preview</CardTitle>
            <CardDescription>This is what will be executed in your Supabase database</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-900 text-green-400 p-4 rounded-md max-h-[400px] overflow-auto font-mono text-sm">
              <pre>{sqlScript}</pre>
            </div>
          </CardContent>
        </Card>

        {/* What Gets Created */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>What Gets Created</CardTitle>
            <CardDescription>Overview of the database structure</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Database Tables (11 total):</h4>
                <ul className="text-sm space-y-1">
                  <li>✅ site_content - Website content</li>
                  <li>✅ admin_users - Admin accounts</li>
                  <li>✅ blog_posts - News and articles</li>
                  <li>✅ testimonials - User testimonials</li>
                  <li>✅ complaints - Complaint system</li>
                  <li>✅ contact_messages - Contact forms</li>
                  <li>✅ documents - File uploads</li>
                  <li>✅ newsletter_subscribers - Email list</li>
                  <li>✅ page_views - Analytics</li>
                  <li>✅ search_logs - Search tracking</li>
                  <li>✅ analytics_events - User events</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Sample Data:</h4>
                <ul className="text-sm space-y-1">
                  <li>🏠 Homepage content</li>
                  <li>👤 Admin user (admin@labour.gov.gh)</li>
                  <li>📝 3 sample blog posts</li>
                  <li>💬 3 sample testimonials</li>
                  <li>📞 Contact information</li>
                  <li>ℹ️ About page content</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Alert className="mt-6 bg-blue-50 border-blue-200">
          <ArrowRight className="h-4 w-4 text-blue-600" />
          <AlertTitle className="text-blue-800">After Setup</AlertTitle>
          <AlertDescription className="text-blue-700">
            Once you've completed the manual setup, you can:
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>
                Access the admin dashboard at <code>/admin</code>
              </li>
              <li>Login with: admin@labour.gov.gh (password: demo123)</li>
              <li>
                View the public website at <code>/</code>
              </li>
              <li>Manage content, users, and complaints</li>
            </ul>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
}
