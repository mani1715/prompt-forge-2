"""
Auto-initialization script that runs on application startup
Automatically seeds portfolio projects and services if database is empty
"""
import asyncio
from datetime import datetime
import uuid

# =========================
# PORTFOLIO PROJECTS
# =========================
PORTFOLIO_PROJECTS = [
    {
        "id": str(uuid.uuid4()),
        "title": "StyleHub E-Commerce Platform",
        "slug": "stylehub-ecommerce",
        "category": "E-commerce",
        "description": "Modern online shopping experience with seamless checkout and secure payments.",
        "full_description": "StyleHub is a comprehensive e-commerce platform with real-time inventory, Stripe payments, and admin dashboard.",
        "image_url": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=60",
        "tech_stack": ["React", "Node.js", "Stripe", "MongoDB"],
        "featured": True,
        "is_private": False,
        "live_demo_url": "/demo/ecommerce",
        "github_url": "",
        "case_study_content": "Built a full-featured e-commerce platform.",
        "status": "completed",
        "client": "StyleHub",
        "duration": "3 months",
        "created_at": datetime.utcnow().isoformat(),
        "updated_at": datetime.utcnow().isoformat()
    }
]

# =========================
# SERVICES DATA
# =========================
SERVICES_DATA = [
    {
        "id": str(uuid.uuid4()),
        "title": "Web Development",
        "slug": "web-development",
        "description": "Custom full-stack web applications.",
        "icon": "code",
        "features": [
            "Custom Web Apps",
            "API Development",
            "Cloud Deployment"
        ],
        "price_range": "$5000 - $50000",
        "price": "$5000 - $50000",
        "active": True,
        "order": 1,
        "created_at": datetime.utcnow().isoformat(),
        "updated_at": datetime.utcnow().isoformat()
    }
]

# =========================
# AUTO INIT FUNCTION
# =========================
async def auto_initialize_database():
    """
    Automatically seed portfolio projects and services
    if collections are empty.
    """
    try:
        from database import projects_collection, services_collection

        # Seed projects
        projects_count = await projects_collection.count_documents({})
        if projects_count == 0:
            print("📦 No projects found. Seeding portfolio projects...")
            await projects_collection.insert_many(PORTFOLIO_PROJECTS)
            print(f"✅ Seeded {len(PORTFOLIO_PROJECTS)} projects")
        else:
            print(f"✅ Projects already exist ({projects_count})")

        # Seed services
        services_count = await services_collection.count_documents({})
        if services_count == 0:
            print("📦 No services found. Seeding services...")
            await services_collection.insert_many(SERVICES_DATA)
            print(f"✅ Seeded {len(SERVICES_DATA)} services")
        else:
            print(f"✅ Services already exist ({services_count})")

        print("🎉 Auto-initialization complete")
        return True

    except Exception as e:
        print(f"❌ Auto-init error: {str(e)}")
        return False


if __name__ == "__main__":
    asyncio.run(auto_initialize_database())
