from rest_framework.views import exception_handler
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework import status

def custom_exception_handler(exc, context):
    """
    Custom exception handler that formats serializer validation errors globally.
    """
    # Get the standard response
    response = exception_handler(exc, context)

    # Handle serializer validation errors specifically
    if isinstance(exc, ValidationError):
        formatted_errors = []
        for field, errors in exc.detail.items():
            for error in errors:
                formatted_errors.append(f"{field}: {error}")

        return Response(
            {"status": "error", "message": formatted_errors},
            status=status.HTTP_400_BAD_REQUEST
        )

    return response
