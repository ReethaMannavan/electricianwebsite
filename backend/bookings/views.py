from django.shortcuts import render

from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import SiteConfig, ServiceNav
from .serializers import SiteConfigSerializer, ServiceNavSerializer

class SiteConfigViewSet(viewsets.ViewSet):
    """
    A small viewset to expose site config (logo + phone).
    """
    permission_classes = [permissions.AllowAny]

    def list(self, request):
        sc = SiteConfig.objects.first()
        serializer = SiteConfigSerializer(sc)
        return Response(serializer.data)

#services
from rest_framework import viewsets, permissions
from .models import ServiceNav
from .serializers import ServiceNavSerializer

class ServiceNavViewSet(viewsets.ModelViewSet):
    queryset = ServiceNav.objects.filter(parent=None).order_by("order")
    serializer_class = ServiceNavSerializer

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            return [permissions.AllowAny()]
        return super().get_permissions()




#herosection
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import HeroSection
from .serializers import HeroSectionSerializer

class HeroSectionView(APIView):
    def get(self, request):
        hero = HeroSection.objects.first()
        if hero:
            serializer = HeroSectionSerializer(hero, context={"request": request})
            return Response(serializer.data)
        return Response({"detail": "Hero section not set yet."}, status=404)



#slider-ourservices
from rest_framework import viewsets
from .models import HomepageService
from .serializers import HomepageServiceSerializer

class HomepageServiceViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for homepage services (read-only).
    """
    queryset = HomepageService.objects.all()
    serializer_class = HomepageServiceSerializer


#whychooseus
from rest_framework import viewsets
from .models import WhyChooseUs
from .serializers import WhyChooseUsSerializer


class WhyChooseUsViewSet(viewsets.ModelViewSet):
    queryset = WhyChooseUs.objects.all()
    serializer_class = WhyChooseUsSerializer



#testimonial
from rest_framework import viewsets
from .models import TestimonialSection, Testimonial
from .serializers import TestimonialSectionSerializer, TestimonialSerializer

class TestimonialSectionViewSet(viewsets.ModelViewSet):
    queryset = TestimonialSection.objects.all()
    serializer_class = TestimonialSectionSerializer


class TestimonialViewSet(viewsets.ModelViewSet):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer


#faq
from rest_framework import generics
from .models import FAQ
from .serializers import FAQSerializer

class FAQListView(generics.ListAPIView):
    queryset = FAQ.objects.filter(is_active=True).order_by("order")
    serializer_class = FAQSerializer



#aboutpage
from rest_framework import viewsets
from .models import AboutPage
from .serializers import AboutPageSerializer

class AboutPageViewSet(viewsets.ModelViewSet):
    queryset = AboutPage.objects.all()
    serializer_class = AboutPageSerializer



#contactpage
from rest_framework import generics
from .models import ContactPage, ContactMessage
from .serializers import ContactPageSerializer, ContactMessageSerializer

class ContactPageView(generics.RetrieveAPIView):
    queryset = ContactPage.objects.all()
    serializer_class = ContactPageSerializer

    def get_object(self):
        # return the first (or only) contact page
        return ContactPage.objects.first()


class ContactMessageCreateView(generics.CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer

    def perform_create(self, serializer):
        ip = self.request.META.get("REMOTE_ADDR")
        serializer.save(ip_address=ip)




#login
# bookings/views.py

from rest_framework.response import Response
from rest_framework import status, generics
from rest_framework.permissions import AllowAny
from django.core.mail import send_mail
from django.conf import settings

from .models import CustomUser
from .serializers import RegisterSerializer

from rest_framework.response import Response
from rest_framework import status

class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            print("REGISTER ERRORS:", serializer.errors)  # 👈 Will show you the real issue
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        user = serializer.save()
        otp = user.generate_otp()
        send_mail(
            subject="Your Verification Code",
            message=f"Your OTP code is {otp}",
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[user.email],
        )
        return Response(serializer.data, status=status.HTTP_201_CREATED)



# bookings/views.py

from rest_framework.views import APIView

class VerifyOTPView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        phone = request.data.get("phone_number")
        otp = request.data.get("otp")

        try:
            user = CustomUser.objects.get(phone_number=phone)
        except CustomUser.DoesNotExist:
            return Response({"error": "User not found"}, status=404)

        if user.otp == otp:
            user.is_verified = True
            user.otp = None
            user.save()
            return Response({"message": "Account verified successfully"}, status=200)
        return Response({"error": "Invalid OTP"}, status=400)





#footer
from rest_framework import generics
from .models import Footer
from .serializers import FooterSerializer

class FooterDetailView(generics.RetrieveAPIView):
    queryset = Footer.objects.all()
    serializer_class = FooterSerializer

    def get_object(self):
        # Always return the first (and only) footer entry
        return Footer.objects.first()



#servicepage
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import ServiceCategory
from .serializers import ServiceCategorySerializer

class ServiceCategoryViewSet(viewsets.ModelViewSet):
    queryset = ServiceCategory.objects.all()
    serializer_class = ServiceCategorySerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        slug = self.request.query_params.get("slug")
        path = self.request.query_params.get("path")
        qs = super().get_queryset()
        if slug:
            qs = qs.filter(path__icontains=slug)
        if path:  # ✅ exact match on path
            qs = qs.filter(path=path)
        return qs


#servicelist
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import ServiceItem
from .serializers import ServiceItemSerializer

class ServiceItemViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API for fetching service items with banner and list entries.
    """
    queryset = ServiceItem.objects.all()
    serializer_class = ServiceItemSerializer
    permission_classes = [AllowAny]



#cart
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Cart, CartItem
from .models import ServiceListEntry
from .serializers import CartSerializer, CartItemSerializer

class CartView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CartSerializer

    def get_object(self):
        cart, created = Cart.objects.get_or_create(user=self.request.user)
        return cart


class AddToCartView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CartItemSerializer

    def post(self, request, *args, **kwargs):
        service_id = request.data.get('service_entry')
        quantity = int(request.data.get('quantity', 1))
        user_cart, _ = Cart.objects.get_or_create(user=request.user)
        service_item = ServiceListEntry.objects.get(id=service_id)

        cart_item, created = CartItem.objects.get_or_create(
            cart=user_cart,
            service_entry=service_item
        )
        if not created:
            cart_item.quantity += quantity
        else:
            cart_item.quantity = quantity
        cart_item.save()

        serializer = CartSerializer(user_cart)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UpdateCartItemView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CartItemSerializer
    queryset = CartItem.objects.all()
    lookup_field = 'id'


class RemoveCartItemView(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = CartItem.objects.all()
    lookup_field = 'id'



#emergency
from rest_framework import generics
from .models import EmergencyPage, EmergencyContact
from .serializers import EmergencyPageSerializer, EmergencyContactSerializer

class EmergencyPageView(generics.RetrieveAPIView):
    queryset = EmergencyPage.objects.all()
    serializer_class = EmergencyPageSerializer

    def get_object(self):
        return EmergencyPage.objects.first()  # Always return first page content


class EmergencyContactCreateView(generics.CreateAPIView):
    queryset = EmergencyContact.objects.all()
    serializer_class = EmergencyContactSerializer


#areaservices
from rest_framework import viewsets
from .models import ServiceArea
from .serializers import ServiceAreaSerializer

class ServiceAreaViewSet(viewsets.ModelViewSet):
    queryset = ServiceArea.objects.all()
    serializer_class = ServiceAreaSerializer
    http_method_names = ["get"]  # only allow GET requests (read-only)
