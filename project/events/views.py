from rest_framework.renderers import JSONRenderer
from rest_framework.viewsets import ModelViewSet
from .models import Event
from .serializers import EventSerializer


class EventViewSet(ModelViewSet):
    serializer_class = EventSerializer
    renderer_classes = [JSONRenderer]
    queryset = Event.objects.all()

    def get_queryset(self):
        return self.queryset.order_by('-id')
    