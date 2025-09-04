from rest_framework.viewsets import ModelViewSet
from rest_framework.renderers import JSONRenderer
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import FAQ, CallToAction
from rest_framework.views import APIView
from .serializers import FAQSerializer, CallToActionSerializer
from django.db.models import Q


class FAQViewSet(ModelViewSet):
    """
    API endpoint для роботи з FAQ (Frequently Asked Questions).
    Надає операції створення, читання, оновлення та видалення питань.

    GET /api/faq/
    POST /api/faq/
    GET /api/faq/{id}/
    PUT /api/faq/{id}/
    DELETE /api/faq/{id}/
    """
    renderer_classes = [JSONRenderer]
    serializer_class = FAQSerializer

    def get_queryset(self):
        """Повертає тільки активні питання, відсортовані за порядком"""
        queryset = FAQ.objects.filter(is_active=True).order_by('order')
        return queryset

    @action(detail=False, methods=['POST'], url_path='add-question')
    def add_question(self, request):
        """Додає нове питання до FAQ"""
        question_data = request.data.get("question")

        if not question_data:
            return Response({"error": "Field question required"}, 400)

        question = FAQ.objects.create(question=question_data)
        serializer = self.get_serializer(question)
        return Response(serializer.data, 200)
    
    @action(detail=False, methods=['GET'], url_path='question-and-answer')
    def question_and_answer(self, request):
        """
        API endpoint для отримання списку Q&A, які треба показувати на сайті.
        Використовує прапорець show_in_question_answer=True.
        """

        # Загальні питання (без категорії)
        common_faq = FAQ.objects.filter(
            is_active=True,
            show_in_question_answer=True,
            category__isnull=True
        ).order_by('order')

        # Питання по категоріях
        category_faq = FAQ.objects.filter(
            is_active=True,
            show_in_question_answer=True,
            category__isnull=False
        ).select_related("category").order_by('category__name', 'order')

        # Серіалізація загальних
        common_data = FAQSerializer(common_faq, many=True).data

        # Групування категорій
        categories = {}
        for faq in category_faq:
            cat_name = faq.category.name if faq.category else "Інше"
            if cat_name not in categories:
                categories[cat_name] = []
            categories[cat_name].append(faq)

        # Формування відповіді
        frequent_data = [
            {
                'category': category,
                'questions': FAQSerializer(questions, many=True).data,
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
        """
        API endpoint для отримання пагінованого списку питань для секції Call-to-Action.
        Повертає тільки активні питання з позначкою show_in_call_to_action=True.

        GET /api/faq/call-to-action-questions/?page=1&per_page=4

        Параметри:
            page (int): Номер сторінки (за замовчуванням 1)
            per_page (int): Кількість питань на сторінку (за замовчуванням 4)

        Формат відповіді:
        {
            "questions": [
                {
                    "id": 1,
                    "question": "Текст питання",
                    "answer": "Текст відповіді"
                }
            ],
            "total": 10,
            "page": 1,
            "total_pages": 3
        }
        """
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


class CallToActionFormAPIView(APIView):
    """
    API endpoint для роботи з запитаннями від користувачів (Call to Action).
    Дозволяє створювати нові запитання та отримувати список існуючих.

    GET /api/faq/call-to-action/
    POST /api/faq/call-to-action/

    Формат запиту POST:
    {
        "name": "Ім'я користувача",
        "email": "email@example.com",
        "question": "Текст питання"
    }

    Формат відповіді GET:
    [
        {
            "id": 1,
            "name": "Ім'я користувача",
            "email": "email@example.com",
            "question": "Текст питання",
            "created_at": "2025-07-31T12:00:00Z"
        }
    ]
    """
    def post(self, request):
        """
        Створює нове питання від користувача.
        
        Обов'язкові поля:
        - name: ім'я користувача
        - email: email користувача
        - question: текст питання
        """
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
