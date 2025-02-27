from celery import shared_task
from django.core.mail import send_mail
from django.conf import settings


@shared_task
def send_otp_email_task(email, first_name, otp):
    """
    Celery task to send OTP email asynchronously.
    """
    subject = "Your OTP for Account Verification"
    message = f"Hello {first_name},\n\nYour OTP for verifying your account is: {otp}\n\nUse this OTP to activate your account."
    print("=========TASK")
    print(email, first_name, otp)
    try:
        send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [email])
        print(f"OTP email sent to {email}")
    except Exception as e:
        print(f"Failed to send OTP email to {email}: {str(e)}")
