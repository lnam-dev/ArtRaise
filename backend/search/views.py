from django.db.models import Q
from django.contrib.postgres.search import SearchVector
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from rest_framework import status
from artpiece.models import ArtPiece
from authors.models import Author
from events.models import Event


class SearchView(APIView):
    renderer_classes = [JSONRenderer]

    def get(self, request):
        query = request.GET.get("q", "").strip()
        if not query:
            return Response({"results": []}, status=status.HTTP_200_OK)

        artpieces = ArtPiece.objects.filter(
            Q(title__icontains=query) | Q(description__icontains=query)
        ).values("id", "title")

        authors = Author.objects.filter(
            Q(fullname__icontains=query)
        ).values("id", "fullname")

        events = Event.objects.filter(
            Q(title__icontains=query) | Q(description__icontains=query)
        ).values("id", "title", "start_date")

        results = {
            "artpieces": list(artpieces),
            "authors": list(authors),
            "events": list(events),
        }

        return Response({"results": results}, status=status.HTTP_200_OK)
