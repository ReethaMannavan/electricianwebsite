from rest_framework import serializers
from .models import SiteConfig, ServiceNav

from rest_framework import serializers
from .models import ServiceNav

class ServiceNavSerializer(serializers.ModelSerializer):
    children = serializers.SerializerMethodField()

    class Meta:
        model = ServiceNav
        fields = ["id", "label", "path", "children"]

    def get_children(self, obj):
        # Only include direct children for mega menu (2 levels)
        qs = obj.children.all().order_by("order")
        return ServiceNavSerializer(qs, many=True).data


class SiteConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteConfig
        fields = ["logo", "phone"]



#herosection
from rest_framework import serializers
from .models import HeroSection

class HeroSectionSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = HeroSection
        fields = ["id", "heading", "description", "image"]

    def get_image(self, obj):
        request = self.context.get("request")
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return None


#slider-ourservices
from rest_framework import serializers
from .models import HomepageService

class HomepageServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomepageService
        fields = ["id", "title", "description", "image"]



#whychooseus
from rest_framework import serializers
from .models import WhyChooseUs, WhyChooseUsImage, WhyChooseUsCard


class WhyChooseUsImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = WhyChooseUsImage
        fields = ["id", "image"]


class WhyChooseUsCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = WhyChooseUsCard
        fields = ["id", "small_description", "number_title", "content", "icon"]


class WhyChooseUsSerializer(serializers.ModelSerializer):
    images = WhyChooseUsImageSerializer(many=True, read_only=True)
    cards = WhyChooseUsCardSerializer(many=True, read_only=True)

    class Meta:
        model = WhyChooseUs
        fields = ["id", "paragraph", "images", "cards"]




#testimonial
from rest_framework import serializers
from .models import TestimonialSection, Testimonial

class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = ['id', 'name', 'short_text', 'testimonial_text', 'profile_image', 'stars']


class TestimonialSectionSerializer(serializers.ModelSerializer):
    testimonials = TestimonialSerializer(many=True, read_only=True)

    class Meta:
        model = TestimonialSection
        fields = ['id', 'title', 'description', 'testimonials']


#faq
from rest_framework import serializers
from .models import FAQ

class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = ["id", "question", "answer", "order"]


#aboutpage
from rest_framework import serializers
from .models import AboutPage

class AboutPageSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutPage
        fields = '__all__'


#contactpage
from rest_framework import serializers
from .models import ContactPage, ContactInfoBlock, ContactMessage
import re

class ContactInfoBlockSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactInfoBlock
        fields = ["id", "icon", "title", "subtitle", "detail", "order"]


class ContactPageSerializer(serializers.ModelSerializer):
    info_blocks = ContactInfoBlockSerializer(many=True, read_only=True)

    class Meta:
        model = ContactPage
        fields = ["id", "header_title", "header_subtitle", "header_bg_color", "map_image", "info_blocks"]


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ["first_name", "last_name", "phone", "email", "address", "message"]

    # extra validation
    def validate_first_name(self, value):
        if not re.match(r"^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$", value):
            raise serializers.ValidationError("First name can only contain letters and spaces.")
        return value

    def validate_last_name(self, value):
        if not re.match(r"^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$", value):
            raise serializers.ValidationError("Last name can only contain letters and spaces.")
        return value

    def validate_phone(self, value):
        if not re.match(r"^\d{10}$", value):
            raise serializers.ValidationError("Phone number must be exactly 10 digits.")
        return value

    def validate_message(self, value):
        if len(value.strip()) < 10:
            raise serializers.ValidationError("Message must be at least 10 characters.")
        return value




#login
# bookings/serializers.py


# from .models import CustomUser

# class RegisterSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = CustomUser
#         fields = ["id", "phone_number", "email", "password"]
#         extra_kwargs = {
#             "password": {"write_only": True},
#             "email": {"required": True},
#             "phone_number": {"required": True},
#         }

#     def validate_password(self, value):
#         if len(value) != 10 or not value.isdigit():
#             raise serializers.ValidationError("Password must be exactly 10 digits.")
#         return value

#     def create(self, validated_data):
#         # call the custom manager so password is hashed
#         user = CustomUser.objects.create_user(**validated_data)
#         return user

from .models import CustomUser
from rest_framework import serializers
import re  # for regex validation

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["id", "phone_number", "email", "password"]
        extra_kwargs = {
            "password": {"write_only": True},
            "email": {"required": True},
            "phone_number": {"required": True},
        }

    def validate_password(self, value):
        # Minimum length requirement
        if len(value) < 8:
            raise serializers.ValidationError("Password must be at least 8 characters long.")
        # Must contain at least one letter and one number
        if not re.search(r"[A-Za-z]", value) or not re.search(r"\d", value):
            raise serializers.ValidationError("Password must contain at least one letter and one number.")
        return value

    def create(self, validated_data):
        # Use your custom manager to hash password
        user = CustomUser.objects.create_user(**validated_data)
        return user


from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        if not self.user.is_verified:
            raise serializers.ValidationError("Account not verified. Please check your email.")
        return data






#footer

from .models import Footer

class FooterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Footer
        fields = "__all__"


#servicepage
from rest_framework import serializers
from .models import ServiceCategory, ServiceItem, SubcategoryBanner

class ServiceItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceItem
        fields = ["id", "title", "description", "image"]


class SubcategoryBannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubcategoryBanner
        fields = ["title", "description", "image"]


class ServiceCategorySerializer(serializers.ModelSerializer):
    items = ServiceItemSerializer(many=True, read_only=True)
    banner = SubcategoryBannerSerializer(read_only=True)

    class Meta:
        model = ServiceCategory
        fields = ["id", "name", "description", "path", "banner", "items"]



#servicelistpage

from rest_framework import serializers
from .models import (
    ServiceCategory,
    ServiceItem,
    SubcategoryBanner,
    ServiceItemBanner,   
    ServiceListEntry,   
)
class ServiceListEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceListEntry
        fields = ["id", "title", "reviews", "price", "duration", "image"]


class ServiceItemBannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceItemBanner
        fields = ["title", "description", "image"]


class ServiceItemSerializer(serializers.ModelSerializer):
    banner = ServiceItemBannerSerializer(read_only=True)
    list_entries = ServiceListEntrySerializer(many=True, read_only=True)

    class Meta:
        model = ServiceItem
        fields = ["id", "title", "description", "image", "banner", "list_entries"]



#cart
from rest_framework import serializers
from .models import Cart, CartItem
from .models import ServiceListEntry

class CartItemSerializer(serializers.ModelSerializer):
    title = serializers.CharField(source='service_entry.title', read_only=True)
    price = serializers.DecimalField(source='service_entry.price', max_digits=10, decimal_places=2, read_only=True)
    image = serializers.ImageField(source='service_entry.image', read_only=True)
    total_price = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = CartItem
        fields = ['id', 'service_entry', 'title', 'price', 'quantity', 'total_price', 'image']


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    total_amount = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = Cart
        fields = ['id', 'user', 'items', 'total_amount']



#emergency
from rest_framework import serializers
from .models import EmergencyPage, EmergencyFeature, EmergencyContact

class EmergencyFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmergencyFeature
        fields = ["id", "icon", "title", "description"]

class EmergencyPageSerializer(serializers.ModelSerializer):
    features = EmergencyFeatureSerializer(many=True, read_only=True)

    class Meta:
        model = EmergencyPage
        fields = [
            "id", "hero_image", "title", "description", "rating", "reviews_count",
            "support_image", "phone_number", "form_title", "form_text", "features"
        ]

class EmergencyContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmergencyContact
        fields = ["id", "name", "mobile", "email", "service", "created_at"]


#areaservices
from rest_framework import serializers
from .models import ServiceArea

class ServiceAreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceArea
        fields = ["id", "name"]
