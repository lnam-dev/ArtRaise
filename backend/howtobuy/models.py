from django.db import models

class HowToBuyModel(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    is_active = models.BooleanField(default=True)
    order = models.IntegerField(default=0, db_index=True)
    show_in_how_to_buy = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

