from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SiteConfigViewSet, ServiceNavViewSet, FooterDetailView, HeroSectionView, HomepageServiceViewSet, TestimonialSectionViewSet, TestimonialViewSet,WhyChooseUsViewSet
from .views import FAQListView
from .views import ServiceCategoryViewSet
from .views import ServiceItemViewSet
from .views import AboutPageViewSet
from .views import ContactPageView, ContactMessageCreateView
from .views import CartView, AddToCartView, UpdateCartItemView, RemoveCartItemView
from .views import EmergencyPageView, EmergencyContactCreateView
from .views import ServiceAreaViewSet

from .views import RegisterView, VerifyOTPView
from rest_framework_simplejwt.views import TokenRefreshView
from .serializers import CustomTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer



router = DefaultRouter()
router.register(r"siteconfig", SiteConfigViewSet, basename="siteconfig")
router.register(r"servicenav", ServiceNavViewSet, basename="servicenav")
router.register(r'homepage-services', HomepageServiceViewSet, basename='homepage-services')
router.register(r'why-choose-us', WhyChooseUsViewSet, basename="why-choose-us")
router.register(r'testimonial-sections', TestimonialSectionViewSet, basename='testimonial-section')
router.register(r'testimonials', TestimonialViewSet, basename='testimonial')
router.register(r'about', AboutPageViewSet, basename='about')
router.register(r'areas', ServiceAreaViewSet, basename="servicearea")
router.register(r'service-categories', ServiceCategoryViewSet, basename='service-category')
router.register(r'service-items', ServiceItemViewSet, basename='service-item')


urlpatterns = [
    path("", include(router.urls)),
    path("footer/", FooterDetailView.as_view(), name="footer-detail"),
    path("hero-section/", HeroSectionView.as_view(), name="hero-section"),
    path("faqs/", FAQListView.as_view(), name="faq-list"),
    path("contact/", ContactPageView.as_view(), name="contact-page"),
    path("contact/messages/", ContactMessageCreateView.as_view(), name="contact-message"),
    path("emergency/", EmergencyPageView.as_view(), name="emergency-page"),
    path("emergency/contact/", EmergencyContactCreateView.as_view(), name="emergency-contact"),


    path("auth/register/", RegisterView.as_view(), name="register"),
    path("auth/verify-otp/", VerifyOTPView.as_view(), name="verify_otp"),
    path("auth/login/", CustomTokenObtainPairView.as_view(), name="login"),
    path("auth/refresh/", TokenRefreshView.as_view(), name="token_refresh"),

    path("cart/", CartView.as_view(), name="cart-detail"),
    path("cart/add/", AddToCartView.as_view(), name="cart-add"),
    path("cart/update/<int:id>/", UpdateCartItemView.as_view(), name="cart-update"),
    path("cart/remove/<int:id>/", RemoveCartItemView.as_view(), name="cart-remove"),
]
