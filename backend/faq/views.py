from rest_framework.viewsets import ModelViewSet
from rest_framework.renderers import JSONRenderer
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import FAQ, CallToAction
from rest_framework.views import APIView
from .serializers import FAQSerializer, CallToActionSerializer
from django.db.models import Q


class FAQViewSet(ModelViewSet):
    renderer_classes = [JSONRenderer]
    serializer_class = FAQSerializer
    queryset = FAQ.objects.all()

    def get_queryset(self):
        queryset = FAQ.objects.filter(is_active=True).order_by('order')
        return queryset

    def add_question(self, request):

        question_data = request.data.get("question")

        if not question_data:
            return Response({"error": "Field question required"}, 400)

        question = FAQ.objects.create(question=question_data)
        serializer = self.get_serializer(question)
        return Response(serializer.data, 200)
    
    @action(detail=False, methods=['GET'], url_path='question-and-answer')
    def question_and_answer(self, request):
        common_faq = FAQ.objects.filter(
            Q(category__isnull=True) | Q(category=''),
            is_active=True
        ).order_by('order')

        category_faq = FAQ.objects.filter(
            is_active=True
        ).exclude(
            Q(category__isnull=True) | Q(category='')
        ).order_by('order', 'category')

        common_data = FAQSerializer(common_faq, many=True).data

        categories = {}
        for faq in category_faq:
            if faq.category not in categories:
                categories[faq.category] = []
            categories[faq.category].append(faq)

        frequent_data = [
            {
                'category': category,
                'question': FAQSerializer(questions, many=True).data,
            }
            for category, questions in categories.items()
        ]

        return Response(
            {
                'common': common_data,
                'frequent': frequent_data,
            }
        )
    
    @action(detail=False, methods=['GET'], url_path='call-to-action-questions')
    def call_to_action_questions(self, request):
        page = int(request.query_params.get('page', 1))
        per_page = int(request.query_params.get('per_page', 4))

        questions = FAQ.objects.filter(
            is_active=True,
            show_in_call_to_action=True
        ).order_by('order')
        
        start = (page - 1) * per_page
        end = start + per_page
        
        paginated_questions = questions[start:end]
        total_questions = questions.count()
        
        serializer = self.get_serializer(paginated_questions, many=True)
        
        return Response({
            'questions': serializer.data,
            'total': total_questions,
            'page': page,
            'total_pages': (total_questions + per_page - 1) // per_page,
        })


class CallToActionAPIView(APIView):
    def post(self, request):
        serializer = CallToActionSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(
                {
                    "message": "Question sended",
                    "data": serializer.data
                },
                status=201
            )
        else:
            return Response(
                {
                    "error": "Validation error",
                    "details": serializer.errors
                },
                status=400
            )

    def get(self, request):
        questions = CallToAction.objects.all().order_by('-created_at')
        serializer = CallToActionSerializer(questions, many=True)
        return Response(serializer.data)




