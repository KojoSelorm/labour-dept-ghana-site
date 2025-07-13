# Labour Department of Ghana - Official Website

A comprehensive government website for the Labour Department of Ghana, built with Next.js 15, TypeScript, and modern web technologies.

## 🚀 Features

### Core Functionality
- **Homepage**: Hero section, services overview, statistics, and call-to-actions
- **About Us**: Department history, organizational structure, leadership team
- **Services**: Employer and worker services, training programs, licensing
- **Labour Laws**: Comprehensive legal resources and downloadable documents
- **News & Media**: Latest updates, press releases, and media resources
- **GLIMS Portal**: Job portal integration and employment services
- **Reports**: Annual reports, statistics, research publications
- **Training**: Skills development programs and vocational training
- **Contact**: Contact forms and office information
- **Complaints**: Online complaint submission system
- **License Verification**: Business license verification system
- **Inspection Requests**: Workplace inspection request system

### Technical Features
- **AI Chatbot**: Google Gemini-powered assistant for labour-related queries
- **Analytics**: Page tracking and user analytics
- **Newsletter**: Email subscription system
- **Search**: Advanced search functionality
- **Responsive Design**: Mobile-first responsive design
- **CMS Integration**: Payload CMS for content management
- **Database**: Supabase integration for data storage
- **Authentication**: Admin authentication system

## 🛠️ Tech Stack

### Frontend
- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible component library
- **Lucide React**: Icon library

### Backend & Database
- **Supabase**: Database and authentication
- **Payload CMS**: Content management system
- **Google AI**: Gemini integration for chatbot

### Development Tools
- **pnpm**: Package manager
- **ESLint**: Code linting
- **Prettier**: Code formatting

## 📁 Project Structure

```
labour-dept-ghana-site/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── admin/             # Admin dashboard
│   ├── api/               # API routes
│   ├── complaints/        # Complaint submission
│   ├── contact/           # Contact page
│   ├── glims/             # Job portal
│   ├── inspection/        # Inspection requests
│   ├── laws/              # Labour laws
│   ├── news/              # News and media
│   ├── reports/           # Reports and publications
│   ├── services/          # Services page
│   ├── training/          # Training programs
│   ├── verify/            # License verification
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── ui/               # UI components
│   ├── analytics/        # Analytics components
│   ├── auth/             # Authentication components
│   └── ...               # Other component categories
├── lib/                  # Utility libraries
├── cms/                  # Payload CMS configuration
├── scripts/              # Database scripts
└── public/               # Static assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm
- Supabase account
- Google AI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd labour-dept-ghana-site
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-key

   # Google AI Configuration
   GOOGLE_AI_API_KEY=your-google-ai-api-key

   # Email Configuration
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password

   # Next.js Configuration
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-nextauth-secret

   # Payload CMS Configuration
   PAYLOAD_SECRET=your-payload-secret
   MONGODB_URI=your-mongodb-connection-string
   ```

4. **Set up the database**
   ```bash
   # Run the database setup scripts
   pnpm run db:setup
   ```

5. **Start the development server**
   ```bash
   pnpm dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Setup

### Supabase Tables
The project includes SQL scripts for creating all necessary tables:

- `blog_posts`: News and blog articles
- `complaints`: Complaint submissions
- `contact_messages`: Contact form submissions
- `newsletter_subscribers`: Email subscriptions
- `testimonials`: User testimonials
- `documents`: AI knowledge base
- `admin_users`: Admin authentication
- `page_views`: Analytics tracking
- `search_logs`: Search analytics
- `email_logs`: Email tracking

### Running Database Scripts
```bash
# Create tables
psql -h your-supabase-host -U postgres -d postgres -f scripts/create-tables.sql

# Create additional tables
psql -h your-supabase-host -U postgres -d postgres -f scripts/create-additional-tables.sql

# Seed sample data
psql -h your-supabase-host -U postgres -d postgres -f scripts/seed-data.sql
```

## 🎨 Customization

### Branding
The website uses Ghana's national colors:
- Primary Red: `#dd2a1b`
- Primary Blue: `#2b3990`
- Dark Gray: `#231f20`

### Content Management
The Payload CMS allows easy content management for:
- Blog posts and news articles
- Reports and publications
- Training programs
- Site content and settings

## 🔧 Development

### Available Scripts
```bash
# Development
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm start            # Start production server
pnpm lint             # Run ESLint

# Database
pnpm db:setup         # Setup database tables
pnpm db:seed          # Seed sample data

# CMS
cd cms && pnpm dev    # Start Payload CMS
```

### Code Style
- TypeScript for type safety
- Tailwind CSS for styling
- Component-based architecture
- Responsive design principles

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
- **Netlify**: Similar to Vercel deployment
- **Railway**: Full-stack deployment
- **DigitalOcean**: Custom server deployment

### Environment Variables for Production
Ensure all environment variables are set in your deployment platform:
- Supabase credentials
- Google AI API key
- Email configuration
- NextAuth secrets

## 📊 Analytics

The website includes built-in analytics:
- Page view tracking
- Search query analytics
- User interaction tracking
- Performance monitoring

## 🔒 Security

- **Authentication**: Supabase Auth integration
- **Admin Protection**: Middleware for admin routes
- **Input Validation**: Form validation and sanitization
- **CORS**: Proper CORS configuration
- **Environment Variables**: Secure configuration management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- **Email**: info@labour.gov.gh
- **Phone**: 0800 600 300 / 0800 600 400
- **Website**: [https://labour.gov.gh](https://labour.gov.gh)

## 🙏 Acknowledgments

- Ghana Labour Department for the project requirements
- Next.js team for the excellent framework
- Supabase for the backend services
- Google AI for the chatbot functionality
- All contributors and stakeholders

---

**Built with ❤️ for the people of Ghana** 