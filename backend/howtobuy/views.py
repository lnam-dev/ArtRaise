from rest_framework.response import Response
from rest_framework.views import APIView
from faq.models import FAQ
from faq.serializers import FAQSerializer


# Create your views here.
class HowToBuyAPIView(APIView):
    """
    API endpoint для отримання секції "Як купити".
    Повертає впорядкований список активних питань, позначених для показу в розділі "Як купити".

    GET /api/faq/how-to-buy/
    """
    def get(self, request):
        queryset = FAQ.objects.filter(
            is_active=True,
            show_in_how_to_buy=True
        ).order_by('order')
        
        serializer = FAQSerializer(queryset, many=True)
        return Response(serializer.data)
