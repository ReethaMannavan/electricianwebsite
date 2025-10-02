from django.db import models
from django.conf import settings

# (other models like Booking, Service, etc., go here — but for now we focus navbar/dynamic parts)

class SiteConfig(models.Model):
    """
    Holds site-level settings: logo, phone, etc.
    Expect only one instance.
    """
    logo = models.ImageField(upload_to="siteconfig/", null=True, blank=True)
    phone = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return "SiteConfig"

#servicedropdown
from django.db import models
from django.utils.text import slugify

class ServiceNav(models.Model):
    label = models.CharField(max_length=100)
    path = models.CharField(max_length=255, blank=True)  # URL path
    parent = models.ForeignKey(
        "self",
        null=True,
        blank=True,
        on_delete=models.CASCADE,
        related_name="children"
    )
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.label

    # Automatically generate path from label if empty
    def save(self, *args, **kwargs):
        if not self.path:
            # If it has a parent, prepend parent's path
            parent_path = self.parent.path if self.parent else "/services"
            # Make slug for current label
            slug = slugify(self.label)
            self.path = f"{parent_path}/{slug}".replace("//", "/")
        super().save(*args, **kwargs)





#herosection
from django.db import models

class HeroSection(models.Model):
    heading = models.CharField(max_length=255)
    description = models.TextField()
    image = models.ImageField(upload_to="hero/")

    def __str__(self):
        return self.heading


#slider-ourservices
from django.db import models

class HomepageService(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    image = models.ImageField(upload_to="homepage_services/")

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Homepage Service"
        verbose_name_plural = "Homepage Services"

    def __str__(self):
        return self.title


#whychooseus
from django.db import models

class WhyChooseUs(models.Model):
    paragraph = models.TextField(help_text="Main paragraph shown on the right side")

    def __str__(self):
        return f"WhyChooseUs Section ({self.id})"


class WhyChooseUsImage(models.Model):
    section = models.ForeignKey(
        WhyChooseUs,
        related_name="images",
        on_delete=models.CASCADE
    )
    image = models.ImageField(upload_to="why_choose_us/images/")

    def __str__(self):
        return f"Image for section {self.section.id}"


class WhyChooseUsCard(models.Model):
    section = models.ForeignKey(
        WhyChooseUs,
        related_name="cards",
        on_delete=models.CASCADE
    )
    small_description = models.CharField(max_length=255)
    number_title = models.CharField(max_length=50, help_text="e.g. '50+' or '98%'")
    content = models.TextField()
    icon = models.ImageField(
        upload_to="why_choose_us/icons/",
        blank=True,
        null=True,
        help_text="Upload an icon image (SVG/PNG)"
    )

    def __str__(self):
        return f"Card {self.small_description} ({self.number_title})"



#testimonial
from django.db import models

class TestimonialSection(models.Model):
    """Dynamic section content for Testimonials"""
    title = models.CharField(max_length=200)
    description = models.TextField()

    class Meta:
        verbose_name = "Testimonials Section"
        verbose_name_plural = "Testimonials Section"

    def __str__(self):
        return self.title


class Testimonial(models.Model):
    """Individual testimonial card"""
    section = models.ForeignKey(TestimonialSection, on_delete=models.CASCADE, related_name='testimonials')
    name = models.CharField(max_length=100)
    short_text = models.CharField(max_length=200, help_text="Short text under name (e.g., designation)")
    testimonial_text = models.TextField()
    profile_image = models.ImageField(upload_to='testimonials/')
    stars = models.PositiveSmallIntegerField(default=5)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Testimonial"
        verbose_name_plural = "Testimonials"

    def __str__(self):
        return f"{self.name} ({self.stars} stars)"



#faQ
from django.db import models

class FAQ(models.Model):
    question = models.CharField(max_length=255)
    answer = models.TextField()
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.question



#aboutpage
from django.db import models

class AboutPage(models.Model):
    # First section: title + text
    main_title = models.CharField(max_length=200)
    main_text = models.TextField()
    
    # Section 2: two-column (image left, content right)
    section2_image = models.ImageField(upload_to='about/')
    section2_title = models.CharField(max_length=200)
    section2_text = models.TextField()
    
    # Section 3: two-column (content left, image right)
    section3_title = models.CharField(max_length=200)
    section3_text = models.TextField()
    section3_image = models.ImageField(upload_to='about/')
    
    # Section 4: two-column (image left, content right)
    section4_image = models.ImageField(upload_to='about/')
    section4_title = models.CharField(max_length=200)
    section4_text = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.main_title


#contact
from django.db import models

class ContactPage(models.Model):
    header_title = models.CharField(max_length=200)
    header_subtitle = models.CharField(max_length=300, blank=True)
    header_bg_color = models.CharField(max_length=7, default="#0056B3")  # hex color
    map_image = models.ImageField(upload_to="contact_maps/", blank=True, null=True)

    def __str__(self):
        return self.header_title


# class ContactInfoBlock(models.Model):
#     icon = models.CharField(max_length=100, blank=True)  # optional: name of lucide-react icon
#     title = models.CharField(max_length=120)
#     subtitle = models.CharField(max_length=200, blank=True)
#     detail = models.TextField(blank=True)
#     order = models.PositiveSmallIntegerField(default=0)

#     class Meta:
#         ordering = ["order"]

#     def __str__(self):
#         return self.title

class ContactInfoBlock(models.Model):
    page = models.ForeignKey(
        ContactPage,
        on_delete=models.CASCADE,
        related_name="info_blocks",
        null=True,   # allow null for now
        blank=True
       
    )
    icon = models.ImageField(upload_to="contact_icons/", blank=True, null=True)
    title = models.CharField(max_length=120)
    subtitle = models.CharField(max_length=200, blank=True)
    detail = models.TextField(blank=True)
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.title






class ContactMessage(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    phone = models.CharField(max_length=15)
    email = models.EmailField()
    address = models.CharField(max_length=255, blank=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)
    ip_address = models.GenericIPAddressField(null=True, blank=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.email})"




#login
# bookings/models.py

from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
import random

class CustomUserManager(BaseUserManager):
    def create_user(self, phone_number, email, password=None, **extra_fields):
        if not phone_number:
            raise ValueError("Phone number is required")
        if not email:
            raise ValueError("Email is required")

        email = self.normalize_email(email)
        user = self.model(phone_number=phone_number, email=email, **extra_fields)
        user.set_password(password)
        user.is_verified = False  # default unverified
        user.save(using=self._db)
        return user

    def create_superuser(self, phone_number, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(phone_number, email, password, **extra_fields)


class CustomUser(AbstractBaseUser, PermissionsMixin):
    phone_number = models.CharField(max_length=15, unique=True)
    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)
    otp = models.CharField(max_length=6, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    objects = CustomUserManager()

    USERNAME_FIELD = "phone_number"
    REQUIRED_FIELDS = ["email"]

    def __str__(self):
        return self.phone_number

    def generate_otp(self):
        otp = str(random.randint(100000, 999999))
        self.otp = otp
        self.save()
        return otp


#footer
from django.db import models

class Footer(models.Model):
    logo = models.ImageField(upload_to="footer/", blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    instagram_url = models.URLField(max_length=255, blank=True, null=True)
    google_url = models.URLField(max_length=255, blank=True, null=True)
    location = models.CharField(max_length=255, blank=True, null=True)
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)

    class Meta:
        verbose_name = "Footer"
        verbose_name_plural = "Footer"

    def __str__(self):
        return "Website Footer"


#servicepage
from django.db import models
from django.utils.text import slugify

class ServiceCategory(models.Model):
    """
    Subcategory for services (e.g., Commercial, Residential)
    """
    name = models.CharField(max_length=150)
    description = models.TextField(blank=True)
    path = models.CharField(max_length=255, blank=True)  # dynamic URL slug
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.path:
            self.path = f"/services/{slugify(self.name)}"
        super().save(*args, **kwargs)


class ServiceItem(models.Model):
    """
    Individual service under a subcategory
    """
    category = models.ForeignKey(
        ServiceCategory,
        on_delete=models.CASCADE,
        related_name="items"
    )
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to="services/")
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.title


class SubcategoryBanner(models.Model):
    """
    Small top div with title, paragraph, and right-side round image
    """
    category = models.OneToOneField(
        ServiceCategory,
        on_delete=models.CASCADE,
        related_name="banner"
    )
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to="subcategory-banners/")

    def __str__(self):
        return f"Banner for {self.category.name}"





#serviceitem list page

class ServiceItemBanner(models.Model):
    """
    Banner for the ServiceItem list page (different from subcategory banner).
    """
    item = models.OneToOneField(
        ServiceItem,
        on_delete=models.CASCADE,
        related_name="banner"
    )
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to="item-banners/")

    def __str__(self):
        return f"Banner for {self.item.title}"


class ServiceListEntry(models.Model):
    """
    Each service option under a ServiceItem (like grid cards with price/reviews).
    """
    item = models.ForeignKey(
        ServiceItem,
        on_delete=models.CASCADE,
        related_name="list_entries"
    )
    title = models.CharField(max_length=200)
    reviews = models.CharField(max_length=100, blank=True)  # e.g. "5.67 (345k reviews)"
    price = models.DecimalField(max_digits=10, decimal_places=2)
    duration = models.CharField(max_length=50, blank=True)  # e.g. "20 mins"
    image = models.ImageField(upload_to="service-entries/", blank=True, null=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return f"{self.title} ({self.item.title})"


#cart
from django.db import models
from django.conf import settings
from .models import ServiceListEntry

User = settings.AUTH_USER_MODEL

class Cart(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="cart")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Cart of {self.user.username}"

    @property
    def total_amount(self):
        return sum(item.total_price for item in self.items.all())


class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name="items")
    service_entry = models.ForeignKey(ServiceListEntry, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    class Meta:
        unique_together = ('cart', 'service_entry')

    @property
    def total_price(self):
        return self.service_entry.price * self.quantity

    def __str__(self):
        return f"{self.quantity} x {self.service_entry.title}"



#emergency
from django.db import models
from django.conf import settings

class EmergencyPage(models.Model):
    # First Section
    hero_image = models.ImageField(upload_to="emergency/hero/", blank=True, null=True)

    # Second Section (Left)
    title = models.CharField(max_length=255)
    description = models.TextField()
    rating = models.DecimalField(max_digits=3, decimal_places=1, default=5.0)
    reviews_count = models.PositiveIntegerField(default=0)
    support_image = models.ImageField(upload_to="emergency/support/", blank=True, null=True)
    phone_number = models.CharField(max_length=20)

    # Second Section (Right - Form text)
    form_title = models.CharField(max_length=255, default="Request a call back")
    form_text = models.TextField(default="Fill-in your details below and we will get back to you within 30 minutes or less!")

    def __str__(self):
        return "Emergency Page Content"


class EmergencyFeature(models.Model):
    page = models.ForeignKey(EmergencyPage, on_delete=models.CASCADE, related_name="features")
    icon = models.ImageField(upload_to="emergency/features/")
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.title


class EmergencyContact(models.Model):
    # Form submissions
    name = models.CharField(max_length=100)
    mobile = models.CharField(max_length=20)
    email = models.EmailField()
    service = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.service}"



#areaservices


class ServiceArea(models.Model):
    name = models.CharField(max_length=100, unique=True)

    class Meta:
        ordering = ["name"]  # Sort alphabetically

    def __str__(self):
        return self.name
