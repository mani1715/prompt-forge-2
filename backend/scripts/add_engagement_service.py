"""
Script to add Engagement/Proposal Website service example
"""
import asyncio
import sys
from pathlib import Path

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).parent.parent))

from database import services_collection
from models.service import Service
from datetime import datetime
import uuid

async def add_engagement_service():
    """Add the Engagement/Proposal Website service"""
    
    # Check if this service already exists
    existing = await services_collection.find_one({"title": "Engagement/Proposal Website"})
    
    if existing:
        print("✅ Engagement/Proposal Website service already exists!")
        print(f"   Service ID: {existing['id']}")
        return
    
    # Create the service
    service = Service(
        id=str(uuid.uuid4()),
        title="Engagement/Proposal Website",
        description="Create a magical, personalized website to propose or celebrate your engagement. A beautiful digital experience to share your love story with stunning animations, photo galleries, and interactive elements.",
        icon="HeartHandshake",
        features=[
            "Romantic animated hero section with your photos",
            "Interactive love story timeline",
            "Beautiful photo gallery with multiple layouts",
            "Hidden messages and surprises for your partner",
            "Customizable proposal section",
            "Mobile-responsive romantic design",
            "Shareable link to family and friends",
            "Music and video integration",
            "Guest book and wishes section",
            "Custom domain support"
        ],
        price="Starting at $299",
        active=True,
        order=5,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    
    # Convert to dict and prepare for MongoDB
    service_doc = service.model_dump()
    service_doc['created_at'] = service_doc['created_at'].isoformat()
    service_doc['updated_at'] = service_doc['updated_at'].isoformat()
    
    # Insert into database
    await services_collection.insert_one(service_doc)
    
    print("✅ Engagement/Proposal Website service added successfully!")
    print(f"   Service ID: {service.id}")
    print(f"   Title: {service.title}")
    print(f"   Features: {len(service.features)} features")
    print(f"   Price: {service.price}")
    print(f"   Live example: https://engagement-proposal-website.netlify.app/")

async def main():
    """Main function"""
    try:
        print("🚀 Adding Engagement/Proposal Website service...")
        await add_engagement_service()
        print("\n✨ Done!")
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(main())
