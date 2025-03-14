from django.db import models


class Author(models.Model):
    fullname = models.CharField(max_length=255)
    bio_text = models.TextField(max_length=1000)
    style = models.CharField(max_length=255)
    theme = models.CharField(max_length=255)
    expression_type = models.CharField(max_length=255)
    image_author = models.ImageField(
        upload_to='images_author/',
        blank=True,
        null=True
    )

    def __str__(self):
        return self.fullname
