-- Insert sample site content
INSERT INTO site_content (section, key, value, type) VALUES
('homepage', 'hero_title', 'Creating a Favourable Employment Environment', 'text'),
('homepage', 'hero_subtitle', 'Enforcing labour laws, facilitating employment services, and promoting industrial harmony nationwide.', 'text'),
('homepage', 'about_title', 'Ghana''s Premier Labour Administration', 'text'),
('homepage', 'about_description', 'The Ghana Labour Department (LD) ensures a favourable employment environment through enforcement of labour laws, employment service delivery, labour inspections, industrial relations, child labour elimination, and workmen''s compensation facilitation.', 'text'),
('about', 'vision', 'A one-stop shop state-of-the-art centre of excellence for Labour Market Information and employer/employee protection.', 'text'),
('about', 'mission', 'To create and maintain a favourable employment environment through employment service delivery, labour inspections, promotion of harmonious industrial relations, elimination of child labour, health and safety, and international relations for national development.', 'text'),
('contact', 'office_address', 'Labour Department Head Office, Accra, Ghana', 'text'),
('contact', 'phone_primary', '0800 600 300', 'text'),
('contact', 'phone_secondary', '0800 600 400', 'text'),
('contact', 'email_primary', 'info@labour.gov.gh', 'text'),
('contact', 'email_complaints', 'complaints@labour.gov.gh', 'text')
ON CONFLICT (section, key) DO NOTHING;

-- Insert sample blog posts
INSERT INTO blog_posts (title, excerpt, content, author, category, featured, image_url) VALUES
('New Labour Law Amendments: What Employers Need to Know', 
 'Comprehensive guide to the latest amendments in Ghana''s Labour Act and their implications for businesses.',
 'The recent amendments to Ghana''s Labour Act introduce significant changes that affect both employers and employees. These changes aim to modernize our labour laws and align them with international best practices while addressing contemporary workplace challenges.

Key amendments include:

1. Enhanced Worker Protection: Strengthened provisions for worker safety and health, including mandatory safety training for all employees in high-risk industries.

2. Digital Workplace Rights: New regulations addressing remote work, digital surveillance, and employee privacy in the digital age.

3. Improved Dispute Resolution: Streamlined processes for resolving workplace disputes, with emphasis on mediation and alternative dispute resolution mechanisms.

4. Updated Compensation Framework: Revised guidelines for overtime pay, holiday compensation, and severance packages.

5. Child Labour Prevention: Stricter penalties for employers who engage in child labour practices, with enhanced monitoring and enforcement mechanisms.

Employers are advised to review their current policies and procedures to ensure compliance with these new amendments. The Labour Department will be conducting workshops and training sessions to help businesses understand and implement these changes effectively.

For detailed information about specific amendments and their implementation timelines, employers can contact our office or visit our website for comprehensive guides and resources.',
 'Labour Department Legal Team',
 'Legal Updates',
 true,
 '/placeholder.svg?height=300&width=500'),

('Workplace Safety Standards: A Complete Guide',
 'Essential safety protocols and regulations every workplace in Ghana must implement.',
 'Workplace safety is a fundamental right of every worker and a legal obligation of every employer. This comprehensive guide outlines the essential safety standards that all workplaces in Ghana must implement to ensure the health and wellbeing of their employees.

Legal Framework:
The Factories, Offices and Shops Act, 1970 (Act 328) and the Labour Act, 2003 (Act 651) provide the legal foundation for workplace safety in Ghana. These laws mandate that employers provide a safe working environment and take all reasonable steps to prevent workplace accidents and occupational diseases.

Key Safety Requirements:

1. Risk Assessment and Management
- Conduct regular workplace risk assessments
- Identify potential hazards and implement control measures
- Maintain detailed records of all safety assessments

2. Safety Training and Education
- Provide comprehensive safety training for all employees
- Conduct regular safety drills and emergency preparedness exercises
- Ensure workers understand safety procedures and protocols

3. Personal Protective Equipment (PPE)
- Provide appropriate PPE for all workers
- Ensure PPE is properly maintained and regularly replaced
- Train workers on proper use and care of safety equipment

4. Workplace Environment
- Maintain adequate lighting, ventilation, and temperature control
- Ensure proper housekeeping and cleanliness standards
- Provide safe access routes and emergency exits

5. Health and Safety Committees
- Establish workplace health and safety committees
- Include worker representatives in safety decision-making
- Conduct regular safety meetings and consultations

Compliance and Enforcement:
The Labour Department conducts regular inspections to ensure compliance with safety standards. Non-compliance can result in penalties, work stoppages, and legal action. Employers are encouraged to proactively implement safety measures and work collaboratively with our inspection teams.

For assistance with safety compliance or to request a workplace safety consultation, contact our Labour Inspection Division.',
 'Safety Inspection Team',
 'Safety',
 false,
 '/placeholder.svg?height=300&width=500'),

('Understanding Your Rights as a Worker in Ghana',
 'A comprehensive guide to worker rights under Ghanaian law and how to protect them.',
 'Every worker in Ghana has fundamental rights protected by law. Understanding these rights is essential for ensuring fair treatment and safe working conditions. This guide explains your key rights as a worker and how to protect them.

Fundamental Worker Rights:

1. Right to Fair Wages
- Receive at least the national minimum wage
- Timely payment of wages (not later than the 3rd working day of the following month)
- Equal pay for equal work regardless of gender, religion, or ethnicity
- Overtime compensation for work beyond normal hours

2. Right to Safe Working Conditions
- Work in an environment free from hazards
- Receive appropriate safety training and equipment
- Report unsafe conditions without fear of retaliation
- Access to first aid and emergency medical care

3. Right to Rest and Leisure
- Maximum 8 hours of work per day and 40 hours per week
- At least 24 consecutive hours of rest per week
- Annual leave of at least 15 working days
- Public holidays as prescribed by law

4. Right to Freedom of Association
- Join or form trade unions
- Participate in collective bargaining
- Engage in lawful industrial action
- Protection from anti-union discrimination

5. Right to Non-Discrimination
- Equal treatment regardless of race, gender, religion, political affiliation, or disability
- Protection from sexual harassment and workplace bullying
- Reasonable accommodation for workers with disabilities
- Maternity and paternity leave provisions

6. Right to Job Security
- Protection from unfair dismissal
- Proper notice period for termination
- Severance pay where applicable
- Due process in disciplinary proceedings

How to Protect Your Rights:

1. Know Your Employment Contract
- Read and understand all terms and conditions
- Keep copies of all employment documents
- Clarify any unclear provisions with your employer

2. Document Everything
- Keep records of work hours, wages, and working conditions
- Document any incidents of rights violations
- Maintain correspondence with your employer

3. Seek Help When Needed
- Contact your trade union representative
- File complaints with the Labour Department
- Seek legal advice for serious violations

4. Use Available Resources
- Labour Department hotlines: 0800 600 300 / 0800 600 400
- Regional Labour offices for local assistance
- Online resources and guidance materials

Remember: Your rights are protected by law, and there are mechanisms in place to ensure these rights are respected. Don''t hesitate to seek help if you believe your rights are being violated.',
 'Worker Rights Division',
 'Worker Rights',
 false,
 '/placeholder.svg?height=300&width=500')
ON CONFLICT DO NOTHING;

-- Insert sample testimonials
INSERT INTO testimonials (name, position, company, content, rating, featured, approved) VALUES
('Kwame Asante', 'Factory Worker', 'Tema Industrial Area', 'The Labour Department helped resolve my workplace dispute quickly and fairly. Their mediation services saved my job and improved working conditions for all employees.', 5, true, true),
('Akosua Mensah', 'HR Manager', 'Accra Manufacturing Ltd', 'Their workplace inspection services helped us improve our safety standards significantly. The team was professional and provided clear guidance on compliance requirements.', 5, true, true),
('Ibrahim Yakubu', 'Small Business Owner', 'Northern Region', 'The training programs provided by the Labour Department equipped my employees with valuable skills. Our productivity has increased by 40% since the training.', 5, true, true),
('Grace Osei', 'Union Representative', 'Ghana Trades Union Congress', 'The Labour Department''s support in union formation and worker rights education has been invaluable. They truly understand the needs of Ghanaian workers.', 5, true, true),
('Samuel Adjei', 'Construction Supervisor', 'Kumasi Construction Co.', 'The safety training program was comprehensive and practical. It has significantly reduced workplace accidents on our construction sites.', 5, false, true),
('Mary Boateng', 'Textile Worker', 'Ashanti Textiles', 'When I faced discrimination at work, the Labour Department provided excellent support and helped resolve the issue professionally.', 5, false, true)
ON CONFLICT DO NOTHING;

-- Insert sample admin user (password should be hashed in production)
INSERT INTO admin_users (username, email, password_hash, role) VALUES
('admin', 'admin@labour.gov.gh', '$2b$10$example_hash_here', 'admin')
ON CONFLICT (username) DO NOTHING;
