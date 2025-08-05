from rest_framework import serializers
from .models import HowToBuyModel

class HowTobuySerializer(serializers.ModelSerializer):
    class Meta:
        model = HowToBuyModel
        fields = [
            'id',
            'title',
            'description',
            'is_active',
            'order',
            'show_in_how_to_buy',
            'created_at',
        ]
        read_only_fields = [
            'id',
            'created_at',
        ]
