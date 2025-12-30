import asyncio
from database import projects_collection

async def clean_duplicates():
    """Remove the old duplicate projects"""
    
    # Delete the old projects without proper demo URLs
    old_slugs = ["social-media-manager", "analytics-dashboard"]
    
    for slug in old_slugs:
        result = await projects_collection.delete_one({"slug": slug})
        if result.deleted_count > 0:
            print(f"✅ Deleted old project: {slug}")
        else:
            print(f"ℹ️  Project not found: {slug}")
    
    print("\n🎉 Cleanup completed!")

if __name__ == "__main__":
    asyncio.run(clean_duplicates())
