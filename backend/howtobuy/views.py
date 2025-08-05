from rest_framework.views import APIView
from backend.howtobuy.models import HowToBuyModel
from .serializers import HowTobuySerializer
from rest_framework.response import Response


class HowToBuyAPIView(APIView):
    def get(self, request):
        queryset = HowToBuyModel.objects.all()
        serializer = HowTobuySerializer(queryset, many=True)
        return Response(serializer.data)