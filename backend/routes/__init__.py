from .auth import router as auth_router
from .pages import router as pages_router
from .services import router as services_router
from .projects import router as projects_router
from .contacts import router as contacts_router
from .settings import router as settings_router
from .admins import router as admins_router
from .storage import router as storage_router
from .skills import router as skills_router
from .content import router as content_router
from .notes import router as notes_router
from .about import router as about_router
from .chat import router as chat_router
from .blogs import router as blogs_router
from .newsletter import router as newsletter_router
from .analytics import router as analytics_router
from .feelings_services import router as feelings_services_router

__all__ = [
    'auth_router',
    'pages_router',
    'services_router',
    'projects_router',
    'contacts_router',
    'settings_router',
    'admins_router',
    'storage_router',
    'skills_router',
    'content_router',
    'notes_router',
    'about_router',
    'chat_router',
    'blogs_router',
    'newsletter_router',
    'analytics_router',
    'feelings_services_router'
]
