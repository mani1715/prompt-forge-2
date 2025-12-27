import re
from datetime import datetime
from typing import Any, Dict

def create_slug(title: str) -> str:
    """Create a URL-friendly slug from a title"""
    slug = title.lower()
    slug = re.sub(r'[^a-z0-9]+', '-', slug)
    slug = slug.strip('-')
    return slug

def serialize_document(doc: Dict[str, Any]) -> Dict[str, Any]:
    """Serialize MongoDB document for JSON response"""
    if doc is None:
        return None
    
    # Remove MongoDB's _id field
    if '_id' in doc:
        del doc['_id']
    
    # Convert datetime objects to ISO strings
    for key, value in doc.items():
        if isinstance(value, datetime):
            doc[key] = value.isoformat()
    
    return doc
