"""
Update existing clients to add is_active field
"""
import asyncio
from database import clients_collection

async def update_clients():
    """Add is_active field to all existing clients"""
    print("🔧 Updating clients schema...")
    
    # Update all clients that don't have is_active field
    result = await clients_collection.update_many(
        {"is_active": {"$exists": False}},
        {"$set": {"is_active": True}}
    )
    
    print(f"✅ Updated {result.modified_count} clients")
    
    # Show all clients
    clients = await clients_collection.find({}).to_list(length=100)
    print(f"\n📊 Total clients: {len(clients)}")
    for client in clients:
        print(f"  • {client['name']} ({client['email']}) - Active: {client.get('is_active', 'N/A')}")

if __name__ == "__main__":
    asyncio.run(update_clients())
