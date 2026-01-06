"""
Seed script to add only the Engagement/Proposal Website service
Run with: python scripts/seed/seed_single_service.py
"""
import sys
import os
from pathlib import Path

# Add backend directory to path
backend_dir = Path(__file__).parent.parent.parent
sys.path.insert(0, str(backend_dir))

import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import uuid
from datetime import datetime

# Load environment variables
load_dotenv(backend_dir / '.env')

MONGODB_URI = os.getenv("MONGODB_URI")
DB_NAME = os.getenv("DB_NAME", "prompt_forge_db")

async def seed_single_service():
    """Seed only the Engagement/Proposal Website service"""
    
    # Connect to MongoDB
    client = AsyncIOMotorClient(MONGODB_URI)
    db = client[DB_NAME]
    services_collection = db.services
    
    # Clear ALL existing services
    await services_collection.delete_many({})
    print("✅ Cleared all existing services")
    
    # Add ONLY the Engagement/Proposal Website service
    service = {
        "id": str(uuid.uuid4()),
        "title": "Engagement / Proposal Website",
        "description": "Beautiful, romantic websites perfect for proposals and engagement announcements. Share your love story with stunning visuals and interactive elements.",
        "icon": "Heart",
        "image": "https://images.unsplash.com/photo-1542460532-50ac46fb13d7?w=800&q=80",
        "link": "https://engagement-proposal-website.netlify.app/",
        "link_text": "View Live Demo",
        "features": [
            "Romantic design with stunning visuals",
            "Love story timeline section",
            "Photo gallery with lightbox",
            "Interactive proposal reveal",
            "Mobile-responsive design",
            "24-hour activation"
        ],
        "price": "₹2,999",
        "active": True,
        "order": 1,
        "created_at": datetime.utcnow().isoformat(),
        "updated_at": datetime.utcnow().isoformat()
    }
    
    # Insert the single service
    result = await services_collection.insert_one(service)
    print(f"✅ Added service: {service['title']}")
    
    # Print summary
    print("\n" + "="*70)
    print("📋 Service Added:")
    print("="*70)
    print(f"✨ {service['title']}")
    print(f"   💰 Price: {service['price']}")
    print(f"   🔗 Link: {service['link']}")
    print(f"   📝 Description: {service['description']}")
    print(f"   ✨ Features: {len(service['features'])} features")
    print("="*70)
    print("\n✅ Services updated successfully!")
    print("🗑️  All other services have been removed")
    
    # Close connection
    client.close()

if __name__ == "__main__":
    print("🌱 Updating services collection...")
    print("🗑️  Removing all existing services...")
    print("➕ Adding only Engagement/Proposal Website...\n")
    asyncio.run(seed_single_service())
