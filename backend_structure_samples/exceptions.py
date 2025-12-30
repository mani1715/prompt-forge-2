"""
Custom Exceptions for Better Error Handling
"""
from fastapi import HTTPException, status


class BaseAPIException(HTTPException):
    """Base exception for all API errors"""
    
    def __init__(self, detail: str, status_code: int = status.HTTP_400_BAD_REQUEST):
        super().__init__(status_code=status_code, detail=detail)


class AuthenticationError(BaseAPIException):
    """Authentication failed"""
    
    def __init__(self, detail: str = "Invalid credentials"):
        super().__init__(detail=detail, status_code=status.HTTP_401_UNAUTHORIZED)


class AuthorizationError(BaseAPIException):
    """User not authorized to perform action"""
    
    def __init__(self, detail: str = "Not authorized to perform this action"):
        super().__init__(detail=detail, status_code=status.HTTP_403_FORBIDDEN)


class ResourceNotFoundError(BaseAPIException):
    """Resource not found"""
    
    def __init__(self, resource: str = "Resource"):
        super().__init__(
            detail=f"{resource} not found",
            status_code=status.HTTP_404_NOT_FOUND
        )


class ValidationError(BaseAPIException):
    """Validation error"""
    
    def __init__(self, detail: str):
        super().__init__(detail=detail, status_code=status.HTTP_422_UNPROCESSABLE_ENTITY)


class DuplicateResourceError(BaseAPIException):
    """Resource already exists"""
    
    def __init__(self, resource: str = "Resource"):
        super().__init__(
            detail=f"{resource} already exists",
            status_code=status.HTTP_409_CONFLICT
        )


class RateLimitExceeded(BaseAPIException):
    """Rate limit exceeded"""
    
    def __init__(self):
        super().__init__(
            detail="Rate limit exceeded. Please try again later.",
            status_code=status.HTTP_429_TOO_MANY_REQUESTS
        )


class ServiceUnavailableError(BaseAPIException):
    """Service unavailable"""
    
    def __init__(self, detail: str = "Service temporarily unavailable"):
        super().__init__(detail=detail, status_code=status.HTTP_503_SERVICE_UNAVAILABLE)
