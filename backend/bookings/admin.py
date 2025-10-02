from django.contrib import admin
# admin.py

from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

class CustomUserAdmin(UserAdmin):
    model = CustomUser

    # Fields to display in the user list
    list_display = (
        "id",
        "phone_number",
        "email",
        "is_staff",
        "is_active",
        "is_verified",
        "created_at",  # replaced 'date_joined'
    )

    # Fields to filter users in the admin
    list_filter = ("is_staff", "is_active", "is_verified")

    # Fields in the user edit page
    fieldsets = (
        (None, {"fields": ("phone_number", "email", "password")}),
        ("Permissions", {"fields": ("is_staff", "is_active", "is_superuser", "groups", "user_permissions")}),
        ("Verification", {"fields": ("is_verified", "otp")}),
        ("Important dates", {"fields": ("created_at",)}),  # replaced 'date_joined'
    )

    # Fields for creating new users in admin
    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": ("phone_number", "email", "password1", "password2", "is_staff", "is_active"),
        }),
    )

    search_fields = ("phone_number", "email")
    ordering = ("created_at",)  # replaced 'date_joined'

# Register the custom user admin
admin.site.register(CustomUser, CustomUserAdmin)




from .models import SiteConfig, ServiceNav

#navbar

@admin.register(SiteConfig)
class SiteConfigAdmin(admin.ModelAdmin):
    list_display = ("phone",)
    # Because there should typically be a single row, you might override constraint
    # Or you can hide “Add” button if one exists.
    
class ChildInline(admin.TabularInline):
    model = ServiceNav
    extra = 1
    fk_name = "parent"

@admin.register(ServiceNav)
class ServiceNavAdmin(admin.ModelAdmin):
    list_display = ("label", "parent", "order", "path")
    list_filter = ("parent",)
    ordering = ("order",)
    search_fields = ("label", "path")
    inlines = [ChildInline]



#herosection
from django.contrib import admin
from django.utils.html import format_html
from django.urls import reverse
from django.shortcuts import redirect

from .models import HeroSection


@admin.register(HeroSection)
class HeroSectionAdmin(admin.ModelAdmin):
    # fields shown in the admin form (including preview)
    fields = ("heading", "description", "image", "image_preview")
    readonly_fields = ("image_preview",)
    list_display = ("heading", "image_thumb")
    search_fields = ("heading",)

    def image_preview(self, obj):
        """Large preview shown on the edit page."""
        if obj and obj.image:
            return format_html(
                '<img src="{}" style="max-width: 600px; height: auto; border-radius:4px;" />',
                obj.image.url,
            )
        return "(No image)"
    image_preview.short_description = "Preview"

    def image_thumb(self, obj):
        """Small thumbnail in changelist."""
        if obj and obj.image:
            return format_html(
                '<img src="{}" style="width: 80px; height: auto; object-fit:cover; border-radius:4px;" />',
                obj.image.url,
            )
        return "-"
    image_thumb.short_description = "Image"

    def has_add_permission(self, request):
        """Allow adding only if no HeroSection exists."""
        # Prevent creating more than one HeroSection
        if HeroSection.objects.exists():
            return False
        return True

    def add_view(self, request, form_url="", extra_context=None):
        """
        Optional: If a HeroSection exists, redirect 'Add' to the change page for the existing object.
        This provides a smoother admin UX: clicking 'Add' opens the existing item for editing.
        """
        existing = HeroSection.objects.first()
        if existing:
            url = reverse(
                "admin:%s_%s_change"
                % (HeroSection._meta.app_label, HeroSection._meta.model_name),
                args=(existing.pk,),
            )
            return redirect(url)
        return super().add_view(request, form_url, extra_context)


#slider
from django.contrib import admin
from .models import HomepageService

@admin.register(HomepageService)
class HomepageServiceAdmin(admin.ModelAdmin):
    list_display = ("title", "created_at")


#whychooseus
from django.contrib import admin
from .models import WhyChooseUs, WhyChooseUsImage, WhyChooseUsCard

class WhyChooseUsImageInline(admin.TabularInline):
    model = WhyChooseUsImage
    extra = 1


class WhyChooseUsCardInline(admin.TabularInline):
    model = WhyChooseUsCard
    extra = 1


@admin.register(WhyChooseUs)
class WhyChooseUsAdmin(admin.ModelAdmin):
    inlines = [WhyChooseUsImageInline, WhyChooseUsCardInline]
    list_display = ["id", "paragraph"]




#testimonial
from django.contrib import admin
from .models import TestimonialSection, Testimonial

class TestimonialInline(admin.TabularInline):
    model = Testimonial
    extra = 1
    readonly_fields = ('created_at',)

@admin.register(TestimonialSection)
class TestimonialSectionAdmin(admin.ModelAdmin):
    list_display = ('title',)
    inlines = [TestimonialInline]

@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('name', 'stars', 'section')
    list_filter = ('section',)
    search_fields = ('name', 'testimonial_text', 'short_text')



#FAQ
from django.contrib import admin
from .models import FAQ

@admin.register(FAQ)
class FAQAdmin(admin.ModelAdmin):
    list_display = ("question", "order", "is_active")
    list_editable = ("order", "is_active")
    search_fields = ("question", "answer")
    ordering = ("order",)



#aboutpage
from django.contrib import admin
from .models import AboutPage

@admin.register(AboutPage)
class AboutPageAdmin(admin.ModelAdmin):
    list_display = ("main_title", "created_at")
    search_fields = ("main_title", "section2_title", "section3_title", "section4_title")
    readonly_fields = ("created_at",)

    fieldsets = (
        ("Main Section", {
            "fields": ("main_title", "main_text")
        }),
        ("Section 2 (Image Left, Content Right)", {
            "fields": ("section2_image", "section2_title", "section2_text")
        }),
        ("Section 3 (Content Left, Image Right)", {
            "fields": ("section3_title", "section3_text", "section3_image")
        }),
        ("Section 4 (Image Left, Content Right)", {
            "fields": ("section4_image", "section4_title", "section4_text")
        }),
        ("Metadata", {
            "fields": ("created_at",),
        }),
    )


#contactpage

from django.contrib import admin
from django.utils.html import format_html
from .models import ContactPage, ContactInfoBlock, ContactMessage


@admin.register(ContactPage)
class ContactPageAdmin(admin.ModelAdmin):
    list_display = ("header_title", "header_bg_color")
    search_fields = ("header_title", "header_subtitle")


@admin.register(ContactInfoBlock)
class ContactInfoBlockAdmin(admin.ModelAdmin):
    list_display = ("icon_tag", "title", "subtitle", "detail", "order")
    list_editable = ("order",)
    search_fields = ("title", "subtitle", "detail")
    
    def icon_tag(self, obj):
        if obj.icon:
            return format_html('<img src="{}" style="width:40px;height:40px;object-fit:contain;border-radius:4px;" />', obj.icon.url)
        return "—"
    icon_tag.short_description = "Icon"


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ("first_name", "last_name", "email", "phone", "created_at", "is_read")
    list_filter = ("is_read", "created_at")
    search_fields = ("first_name", "last_name", "email", "phone", "message")
    readonly_fields = ("created_at", "ip_address")

    fieldsets = (
        ("Contact Details", {
            "fields": ("first_name", "last_name", "phone", "email", "address", "message")
        }),
        ("Meta", {
            "fields": ("created_at", "ip_address", "is_read")
        }),
    )



#footer

from .models import Footer

@admin.register(Footer)
class FooterAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        # Allow only one footer object
        if Footer.objects.exists():
            return False
        return True



#servicepage
from django.contrib import admin
from .models import ServiceCategory, ServiceItem, SubcategoryBanner

@admin.register(ServiceCategory)
class ServiceCategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "path", "order")
    ordering = ("order",)
    search_fields = ("name", "path")
    # Inline ServiceItems
    inlines = []

@admin.register(ServiceItem)
class ServiceItemAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "order")
    list_filter = ("category",)
    ordering = ("order",)
    search_fields = ("title",)

@admin.register(SubcategoryBanner)
class SubcategoryBannerAdmin(admin.ModelAdmin):
    list_display = ("category", "title")




#servicelist
from .models import ServiceItemBanner, ServiceListEntry

@admin.register(ServiceItemBanner)
class ServiceItemBannerAdmin(admin.ModelAdmin):
    list_display = ("item", "title")


@admin.register(ServiceListEntry)
class ServiceListEntryAdmin(admin.ModelAdmin):
    list_display = ("title", "item", "price", "duration", "order")
    list_filter = ("item",)
    ordering = ("order",)


#emergency
from django.contrib import admin
from .models import EmergencyPage, EmergencyFeature, EmergencyContact

class EmergencyFeatureInline(admin.TabularInline):
    model = EmergencyFeature
    extra = 1

@admin.register(EmergencyPage)
class EmergencyPageAdmin(admin.ModelAdmin):
    inlines = [EmergencyFeatureInline]
    list_display = ("title", "phone_number")

@admin.register(EmergencyContact)
class EmergencyContactAdmin(admin.ModelAdmin):
    list_display = ("name", "mobile", "email", "service", "created_at")
    readonly_fields = ("created_at",)


#areaweservice
from django.contrib import admin
from .models import ServiceArea

@admin.register(ServiceArea)
class ServiceAreaAdmin(admin.ModelAdmin):
    list_display = ("id", "name")
    search_fields = ("name",)
