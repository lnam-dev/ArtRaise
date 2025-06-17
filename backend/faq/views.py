from rest_framework.viewsets import ModelViewSet
from rest_framework.renderers import JSONRenderer
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import FAQ
from .serializers import FAQSerializer


class FAQViewSet(ModelViewSet):
    renderer_classes = [JSONRenderer]
    serializer_class = FAQSerializer
    queryset = FAQ.objects.all()

    def get_queryset(self):
        return self.queryset

    def add_question(self, request):

        question_data = request.data.get("question")

        if not question_data:
            return Response({"error": "Field question required"}, 400)

        question = FAQ.objects.create(question=question_data)
        serializer = self.get_serializer(question)
        return Response(serializer.data, 200)

