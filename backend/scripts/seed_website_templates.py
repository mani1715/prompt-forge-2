"""
Seed script to add website template services
These are ready-to-launch websites that can be activated in 24 hours
"""
import asyncio
import sys
from pathlib import Path

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).parent.parent))

from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from datetime import datetime
import uuid

load_dotenv()

MONGODB_URI = os.environ.get("MONGODB_URI", "mongodb://localhost:27017")
DB_NAME = os.environ.get("DB_NAME", "mspn_dev_db")

async def seed_website_templates():
    """Add website template services to the database"""
    client = AsyncIOMotorClient(MONGODB_URI)
    db = client[DB_NAME]
    services_collection = db['services']
    
    # Website template data
    website_templates = [
        {
            "id": str(uuid.uuid4()),
            "title": "E-Commerce Store",
            "description": "Complete online store with product catalog, shopping cart, and payment integration. Perfect for retail businesses ready to sell online.",
            "icon": "ShoppingCart",
            "image": "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
            "link": "https://ecommerce-demo.example.com",
            "link_text": "View Demo",
            "features": [
                "Product Management",
                "Shopping Cart",
                "Payment Gateway",
                "Order Tracking",
                "Customer Dashboard"
            ],
            "price": "$2,999",
            "active": True,
            "order": 2,
            "created_at": datetime.utcnow().isoformat(),
            "updated_at": datetime.utcnow().isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "title": "Restaurant Website",
            "description": "Modern restaurant website with menu showcase, online ordering, and table reservation system. Get your restaurant online in 24 hours.",
            "icon": "Code",
            "image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
            "link": "https://restaurant-demo.example.com",
            "link_text": "View Demo",
            "features": [
                "Digital Menu",
                "Online Ordering",
                "Table Reservations",
                "Location & Hours",
                "Photo Gallery"
            ],
            "price": "$1,999",
            "active": True,
            "order": 3,
            "created_at": datetime.utcnow().isoformat(),
            "updated_at": datetime.utcnow().isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "title": "Portfolio Website",
            "description": "Professional portfolio website to showcase your work. Ideal for designers, photographers, and creative professionals.",
            "icon": "Palette",
            "image": "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80",
            "link": "https://portfolio-demo.example.com",
            "link_text": "View Demo",
            "features": [
                "Project Showcase",
                "Image Galleries",
                "About Section",
                "Contact Form",
                "Social Links"
            ],
            "price": "$1,499",
            "active": True,
            "order": 4,
            "created_at": datetime.utcnow().isoformat(),
            "updated_at": datetime.utcnow().isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "title": "Corporate Website",
            "description": "Professional business website with company information, services, team profiles, and client testimonials. Establish your online presence.",
            "icon": "Layers",
            "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
            "link": "https://corporate-demo.example.com",
            "link_text": "View Demo",
            "features": [
                "Company Overview",
                "Services Section",
                "Team Profiles",
                "Client Testimonials",
                "Blog Integration"
            ],
            "price": "$2,499",
            "active": True,
            "order": 5,
            "created_at": datetime.utcnow().isoformat(),
            "updated_at": datetime.utcnow().isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "title": "Landing Page",
            "description": "High-converting landing page for product launches, events, or promotions. Optimized for lead generation and conversions.",
            "icon": "Code",
            "image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
            "link": "https://landing-demo.example.com",
            "link_text": "View Demo",
            "features": [
                "Hero Section",
                "Feature Highlights",
                "CTA Buttons",
                "Lead Capture Form",
                "Social Proof"
            ],
            "price": "$999",
            "active": True,
            "order": 6,
            "created_at": datetime.utcnow().isoformat(),
            "updated_at": datetime.utcnow().isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "title": "Booking System",
            "description": "Appointment booking website for service businesses. Includes calendar integration, automated reminders, and payment processing.",
            "icon": "Code",
            "image": "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80",
            "link": "https://booking-demo.example.com",
            "link_text": "View Demo",
            "features": [
                "Calendar Integration",
                "Automated Reminders",
                "Online Payment",
                "Service Management",
                "Customer Dashboard"
            ],
            "price": "$3,499",
            "active": True,
            "order": 7,
            "created_at": datetime.utcnow().isoformat(),
            "updated_at": datetime.utcnow().isoformat()
        }
    ]
    
    try:
        # Delete old template services (keep Web Development)
        await services_collection.delete_many({
            "title": {"$ne": "Web Development"}
        })
        print("✅ Cleared old template services")
        
        # Insert new template services
        if website_templates:
            result = await services_collection.insert_many(website_templates)
            print(f"✅ Added {len(result.inserted_ids)} website template services")
            
            for template in website_templates:
                print(f"   - {template['title']} (${template['price']})")
        
        print("\n🎉 Website templates seeded successfully!")
        
    except Exception as e:
        print(f"❌ Error seeding website templates: {e}")
        raise
    
    finally:
        client.close()

if __name__ == "__main__":
    asyncio.run(seed_website_templates())
