# Generated by Django 5.1.6 on 2025-02-17 15:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authors', '0003_remove_author_event'),
        ('events', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='authors',
            field=models.ManyToManyField(related_name='events', to='authors.author'),
        ),
    ]
