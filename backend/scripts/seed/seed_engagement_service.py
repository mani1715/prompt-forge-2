"""
Seed script to add Engagement Invitation Service
"""
import asyncio
import sys
from pathlib import Path

# Add backend directory to path
backend_dir = Path(__file__).parent.parent.parent
sys.path.insert(0, str(backend_dir))

from database import feelings_services_collection
from datetime import datetime
import uuid

async def seed_engagement_service():
    """Add Engagement Invitation Service"""
    
    print("🌸 Seeding Engagement Invitation Service...")
    
    # Check if service already exists
    existing = await feelings_services_collection.find_one({"event_type": "Engagement"})
    if existing:
        print("✅ Engagement service already exists. Updating...")
        await feelings_services_collection.delete_one({"event_type": "Engagement"})
    
    service_id = str(uuid.uuid4())
    now = datetime.utcnow().isoformat()
    
    engagement_service = {
        "id": service_id,
        "name": "Engagement Invitation Website",
        "event_type": "Engagement",
        "description": "Create a beautiful personalized engagement invitation website that you can share with your loved ones. Send your special moment in a unique and memorable way through a stunning mini-site.",
        "features": [
            "Beautiful responsive design",
            "Personalized engagement story",
            "Photo gallery section",
            "Event details and location",
            "RSVP functionality",
            "Shareable via WhatsApp",
            "24-hour active link",
            "Custom color themes"
        ],
        "original_price": 999.0,
        "offer_price": 499.0,
        "currency": "₹",
        "images": [
            "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
            "https://images.unsplash.com/photo-1529634806980-85c3dd6d9bc1?w=800"
        ],
        "demo_url": "https://engagement-proposal-website.netlify.app/",
        "is_active": True,
        "display_order": 1,
        "created_at": now,
        "updated_at": now,
        "created_by": "system"
    }
    
    await feelings_services_collection.insert_one(engagement_service)
    print(f"✅ Engagement service added successfully!")
    print(f"   Service ID: {service_id}")
    print(f"   Name: {engagement_service['name']}")
    print(f"   Price: {engagement_service['currency']}{engagement_service['offer_price']}")
    print(f"   Demo: {engagement_service['demo_url']}")

async def main():
    try:
        await seed_engagement_service()
        print("\n🎉 Seeding completed successfully!")
    except Exception as e:
        print(f"\n❌ Error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(main())
