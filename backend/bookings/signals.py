# bookings/signals.py
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.mail import send_mail
from django.conf import settings
from .models import CustomUser

@receiver(post_save, sender=CustomUser)
def send_welcome_email(sender, instance, created, **kwargs):
    """
    Sends a welcome/verification email to the user
    whenever a new CustomUser is created.
    """
    if created:
        # Generate OTP
        otp = instance.generate_otp()

        # Email content
        subject = "Welcome to Electrician Booking!"
        message = f"Hello {instance.phone_number},\n\n" \
                  f"Thank you for registering. Your verification OTP is: {otp}\n\n" \
                  f"Please verify your account to start using our services."

        recipient_list = [instance.email]

        send_mail(
            subject,
            message,
            settings.DEFAULT_FROM_EMAIL,
            recipient_list,
            fail_silently=False,
        )



#contact
from django.dispatch import receiver
from django.db.models.signals import post_save
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.conf import settings
from .models import ContactMessage

@receiver(post_save, sender=ContactMessage)
def send_contact_emails(sender, instance, created, **kwargs):
    if not created:
        return

    # Email to site owner
    subject_owner = f"New contact from {instance.first_name} {instance.last_name}"
    html_owner = render_to_string("emails/new_contact_owner.html", {"msg": instance})
    owner_email = getattr(settings, "CONTACT_OWNER_EMAIL", None)

    if owner_email:
        mail = EmailMultiAlternatives(subject_owner, html_owner,
                                      settings.DEFAULT_FROM_EMAIL,
                                      [owner_email])
        mail.attach_alternative(html_owner, "text/html")
        mail.send(fail_silently=False)

    # Acknowledgement email to user
    subject_user = "We received your message"
    html_user = render_to_string("emails/new_contact_user.html", {"msg": instance})
    mail2 = EmailMultiAlternatives(subject_user, html_user,
                                   settings.DEFAULT_FROM_EMAIL,
                                   [instance.email])
    mail2.attach_alternative(html_user, "text/html")
    mail2.send(fail_silently=False)



#emergency
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.mail import send_mail
from django.conf import settings
from .models import EmergencyContact

@receiver(post_save, sender=EmergencyContact)
def send_emergency_email(sender, instance, created, **kwargs):
    if created:
        subject = f"New Emergency Callback Request from {instance.name}"
        message = (
            f"Name: {instance.name}\n"
            f"Mobile: {instance.mobile}\n"
            f"Email: {instance.email}\n"
            f"Service: {instance.service}\n"
            f"Time: {instance.created_at}\n"
        )
        host_email = getattr(settings, "HOST_EMAIL", settings.DEFAULT_FROM_EMAIL)

        send_mail(
            subject,
            message,
            settings.DEFAULT_FROM_EMAIL,
            [host_email],
            fail_silently=False,
        )
