-- Create email_logs table for tracking sent emails
CREATE TABLE IF NOT EXISTS email_logs (
  id SERIAL PRIMARY KEY,
  recipient_email VARCHAR(100) NOT NULL,
  subject VARCHAR(200) NOT NULL,
  email_type VARCHAR(50) NOT NULL,
  status VARCHAR(20) DEFAULT 'sent' CHECK (status IN ('sent', 'failed', 'bounced')),
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  error_message TEXT
);

-- Create search_logs table for analytics
CREATE TABLE IF NOT EXISTS search_logs (
  id SERIAL PRIMARY KEY,
  query VARCHAR(255) NOT NULL,
  results_count INTEGER DEFAULT 0,
  user_ip VARCHAR(45),
  searched_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create page_views table for analytics
CREATE TABLE IF NOT EXISTS page_views (
  id SERIAL PRIMARY KEY,
  page_path VARCHAR(255) NOT NULL,
  user_ip VARCHAR(45),
  user_agent TEXT,
  referrer VARCHAR(500),
  viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
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

-- Create system_settings table for dynamic configuration
CREATE TABLE IF NOT EXISTS system_settings (
  id SERIAL PRIMARY KEY,
  key VARCHAR(100) UNIQUE NOT NULL,
  value TEXT NOT NULL,
  description TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default system settings
INSERT INTO system_settings (key, value, description) VALUES
('site_maintenance', 'false', 'Enable/disable maintenance mode'),
('max_file_upload_size', '10485760', 'Maximum file upload size in bytes (10MB)'),
('email_notifications_enabled', 'true', 'Enable/disable email notifications'),
('chat_bot_enabled', 'true', 'Enable/disable AI chatbot'),
('analytics_enabled', 'true', 'Enable/disable analytics tracking')
ON CONFLICT (key) DO NOTHING;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_email_logs_type ON email_logs(email_type);
CREATE INDEX IF NOT EXISTS idx_email_logs_sent_at ON email_logs(sent_at DESC);
CREATE INDEX IF NOT EXISTS idx_search_logs_query ON search_logs(query);
CREATE INDEX IF NOT EXISTS idx_search_logs_searched_at ON search_logs(searched_at DESC);
CREATE INDEX IF NOT EXISTS idx_page_views_path ON page_views(page_path);
CREATE INDEX IF NOT EXISTS idx_page_views_viewed_at ON page_views(viewed_at DESC);
CREATE INDEX IF NOT EXISTS idx_newsletter_status ON newsletter_subscribers(status);
