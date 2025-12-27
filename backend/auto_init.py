"""
Auto-initialization script that runs on application startup
Automatically seeds portfolio projects if database is empty
"""
import asyncio
from datetime import datetime
import uuid

# Portfolio projects data
PORTFOLIO_PROJECTS = [
    {
        "id": str(uuid.uuid4()),
        "title": "StyleHub E-Commerce Platform",
        "slug": "stylehub-ecommerce",
        "category": "E-commerce",
        "description": "Modern online shopping experience with seamless checkout and secure payments. Complete e-commerce solution with product catalog, shopping cart, wishlist, and integrated payment processing.",
        "full_description": "StyleHub is a comprehensive e-commerce platform built with modern web technologies. Features include real-time inventory management, secure payment processing with Stripe, user authentication, order tracking, and an intuitive admin dashboard for managing products and orders.",
        "image_url": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=60",
        "tech_stack": ["React", "Node.js", "Stripe", "MongoDB", "Tailwind CSS"],
        "featured": True,
        "is_private": False,
        "live_demo_url": "/demo/ecommerce",
        "github_url": "",
        "case_study_content": "Built a full-featured e-commerce platform with shopping cart, checkout, and payment integration.",
        "status": "completed",
        "client": "StyleHub",
        "duration": "3 months",
        "created_at": datetime.utcnow().isoformat(),
        "updated_at": datetime.utcnow().isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "title": "Corporate Business Website",
        "slug": "corporate-website",
        "category": "Corporate",
        "description": "Professional business website with dynamic content management. Elegant design showcasing company services, team profiles, and client testimonials.",
        "full_description": "A modern corporate website featuring dynamic content management, service showcase, team profiles, and client testimonials. Built with performance and SEO optimization in mind.",
        "image_url": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=60",
        "tech_stack": ["React", "FastAPI", "PostgreSQL", "Tailwind CSS"],
        "featured": True,
        "is_private": False,
        "live_demo_url": "/demo/corporate",
        "github_url": "",
        "case_study_content": "Created a professional corporate website with dynamic CMS capabilities.",
        "status": "completed",
        "client": "TechVentures Inc.",
        "duration": "2 months",
        "created_at": datetime.utcnow().isoformat(),
        "updated_at": datetime.utcnow().isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "title": "Learning Management System (LMS)",
        "slug": "lms-platform",
        "category": "Education",
        "description": "Comprehensive LMS platform for online courses and learning. Features include course management, student enrollment, progress tracking, and interactive assessments.",
        "full_description": "EduLearn is a full-featured Learning Management System with course creation tools, student progress tracking, interactive quizzes, video lessons, and real-time collaboration features.",
        "image_url": "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&auto=format&fit=crop&q=60",
        "tech_stack": ["React", "Node.js", "MongoDB", "Socket.io", "AWS"],
        "featured": True,
        "is_private": False,
        "live_demo_url": "/demo/lms",
        "github_url": "",
        "case_study_content": "Developed a comprehensive learning management system with real-time collaboration.",
        "status": "completed",
        "client": "EduLearn",
        "duration": "4 months",
        "created_at": datetime.utcnow().isoformat(),
        "updated_at": datetime.utcnow().isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "title": "Restaurant Booking System",
        "slug": "restaurant-booking",
        "category": "Hospitality",
        "description": "Online reservation system for restaurants with table management. Customers can view availability, book tables, and receive instant confirmation.",
        "full_description": "A complete restaurant booking solution with real-time availability calendar, table management, automated email confirmations, and customer management dashboard.",
        "image_url": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=60",
        "tech_stack": ["React", "Firebase", "Stripe", "Tailwind CSS"],
        "featured": True,
        "is_private": False,
        "live_demo_url": "/demo/restaurant-booking",
        "github_url": "",
        "case_study_content": "Built a restaurant reservation system with real-time availability.",
        "status": "completed",
        "client": "Fine Dining Co.",
        "duration": "2 months",
        "created_at": datetime.utcnow().isoformat(),
        "updated_at": datetime.utcnow().isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "title": "SaaS Landing Page",
        "slug": "saas-landing",
        "category": "SaaS",
        "description": "Modern SaaS product landing page with pricing tiers and feature showcases. Optimized for conversions with clear CTAs and responsive design.",
        "full_description": "A high-converting SaaS landing page with animated sections, pricing calculator, feature showcase, testimonials, and integrated analytics.",
        "image_url": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60",
        "tech_stack": ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
        "featured": True,
        "is_private": False,
        "live_demo_url": "/demo/saas-landing",
        "github_url": "",
        "case_study_content": "Designed a conversion-optimized SaaS landing page with animations.",
        "status": "completed",
        "client": "CloudSync",
        "duration": "1 month",
        "created_at": datetime.utcnow().isoformat(),
        "updated_at": datetime.utcnow().isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "title": "Mobile Design System",
        "slug": "mobile-design-system",
        "category": "Mobile",
        "description": "Beautiful mobile-first design system with reusable components. Complete UI kit with interactive prototypes and design tokens.",
        "full_description": "A comprehensive mobile design system with documented components, design tokens, usage guidelines, and interactive Storybook documentation.",
        "image_url": "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=60",
        "tech_stack": ["Figma", "React Native", "TypeScript", "Storybook"],
        "featured": True,
        "is_private": False,
        "live_demo_url": "/demo/mobile-design",
        "github_url": "",
        "case_study_content": "Created a complete mobile design system with reusable components.",
        "status": "completed",
        "client": "MobileFirst Inc.",
        "duration": "3 months",
        "created_at": datetime.utcnow().isoformat(),
        "updated_at": datetime.utcnow().isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "title": "Real-Time Analytics Dashboard",
        "slug": "analytics-dashboard",
        "category": "Dashboard",
        "description": "Real-time data visualization and reporting system. Interactive charts, metrics tracking, and customizable widgets for business intelligence.",
        "full_description": "An enterprise-grade analytics dashboard with live data streaming, interactive D3.js visualizations, customizable widgets, and comprehensive metrics tracking.",
        "image_url": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60",
        "tech_stack": ["React", "Python", "MongoDB", "D3.js", "WebSocket"],
        "featured": True,
        "is_private": False,
        "live_demo_url": "",
        "github_url": "",
        "case_study_content": "Developed a real-time analytics dashboard with live data visualization.",
        "status": "completed",
        "client": "DataViz Corp",
        "duration": "4 months",
        "created_at": datetime.utcnow().isoformat(),
        "updated_at": datetime.utcnow().isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "title": "Social Media Management Tool",
        "slug": "social-media-manager",
        "category": "SaaS",
        "description": "Multi-platform social media scheduling and analytics tool. Schedule posts, track engagement, and analyze performance across multiple platforms.",
        "full_description": "A comprehensive social media management platform supporting multiple accounts, post scheduling, engagement tracking, performance analytics, and team collaboration features.",
        "image_url": "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop&q=60",
        "tech_stack": ["React", "Node.js", "Redis", "MongoDB", "Twitter API"],
        "featured": True,
        "is_private": False,
        "live_demo_url": "",
        "github_url": "",
        "case_study_content": "Built a multi-platform social media management and analytics tool.",
        "status": "completed",
        "client": "SocialBoost",
        "duration": "5 months",
        "created_at": datetime.utcnow().isoformat(),
        "updated_at": datetime.utcnow().isoformat()
    }
]

# Services data
SERVICES_DATA = [
    {
        "id": str(uuid.uuid4()),
        "title": "Web Development",
        "slug": "web-development",
        "description": "Custom web applications built with modern technologies. Full-stack development using React, Node.js, Python, and cloud platforms.",
        "icon": "code",
        "features": [
            "Custom Web Applications",
            "Responsive Design",
            "API Development",
            "Cloud Deployment"
        ],
        "price_range": "$5000 - $50000",
        "price": "$5000 - $50000",
        "active": True,
        "order": 1,
        "created_at": datetime.utcnow().isoformat(),
        "updated_at": datetime.utcnow().isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "title": "E-commerce Solutions",
        "slug": "ecommerce-solutions",
        "description": "Complete e-commerce platforms with payment integration, inventory management, and analytics. Built for scalability and performance.",
        "icon": "shopping-cart",
        "features": [
            "Payment Integration",
            "Inventory Management",
            "Order Tracking",
            "Analytics Dashboard"
        ],
        "price_range": "$8000 - $80000",
        "price": "$8000 - $80000",
        "active": True,
        "order": 2,
        "created_at": datetime.utcnow().isoformat(),
        "updated_at": datetime.utcnow().isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "title": "UI/UX Design",
        "slug": "ui-ux-design",
        "description": "Beautiful and intuitive user interfaces. User-centered design approach with modern design systems and prototyping.",
        "icon": "palette",
        "features": [
            "User Research",
            "Wireframing & Prototyping",
            "Design Systems",
            "Usability Testing"
        ],
        "price_range": "$3000 - $30000",
        "price": "$3000 - $30000",
        "active": True,
        "order": 3,
        "created_at": datetime.utcnow().isoformat(),
        "updated_at": datetime.utcnow().isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "title": "Mobile App Development",
        "slug": "mobile-app-development",
        "description": "Native and cross-platform mobile applications. iOS and Android development with React Native and Flutter.",
        "icon": "smartphone",
        "features": [
            "iOS & Android Apps",
            "Cross-Platform Development",
            "App Store Deployment",
            "Push Notifications"
        ],
        "price_range": "$10000 - $100000",
        "price": "$10000 - $100000",
        "active": True,
        "order": 4,
        "created_at": datetime.utcnow().isoformat(),
        "updated_at": datetime.utcnow().isoformat()
    }
]

async def auto_initialize_database():
    """
    Automatically initialize database with portfolio projects and services
    if they don't exist. Runs on application startup.
    """
    try:
        from database import db, projects_collection, services_collection, admins_collection
        
        # Check if projects exist
        projects_count = await projects_collection.count_documents({})
        if projects_count == 0:
            print("📦 No projects found. Auto-seeding portfolio projects...")
            await projects_collection.insert_many(PORTFOLIO_PROJECTS)
            print(f"✅ Successfully seeded {len(PORTFOLIO_PROJECTS)} portfolio projects")
        else:
            print(f"✅ Database already has {projects_count} projects")
        
        # Check if services exist
        services_count = await services_collection.count_documents({})
        if services_count == 0:
            print("📦 No services found. Auto-seeding services...")
            await services_collection.insert_many(SERVICES_DATA)
            print(f"✅ Successfully seeded {len(SERVICES_DATA)} services")
        else:
            print(f"✅ Database already has {services_count} services")
            
        # Check if admin exists (only email-based admins for the admin panel)
        from auth.password import hash_password
        email_admin_count = await admins_collection.count_documents({"email": {"$exists": True}})
        if email_admin_count == 0:
            print("📦 No email-based admin user found. Creating default admin...")
            admin_data = {
                "id": str(uuid.uuid4()),
                "email": "admin@mspndev.com",
                "password": hash_password("admin123"),
                "name": "Admin",
                "is_super_admin": True,
                "created_at": datetime.utcnow().isoformat(),
                "updated_at": datetime.utcnow().isoformat()
            }
            await admins_collection.insert_one(admin_data)
            print("✅ Default admin created (admin@mspndev.com / admin123)")
        else:
            print(f"✅ Database already has {email_admin_count} email-based admin(s)")
        
        print("🎉 Auto-initialization complete!")
        return True
        
    except Exception as e:
        print(f"❌ Error during auto-initialization: {str(e)}")
        return False

if __name__ == "__main__":
    # Can be run standalone for testing
    asyncio.run(auto_initialize_database())
