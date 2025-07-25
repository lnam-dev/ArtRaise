# Generated by Django 5.1.6 on 2025-02-25 07:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authors', '0003_remove_author_event'),
        ('events', '0002_event_authors'),
    ]

    operations = [
        migrations.AddIndex(
            model_name='event',
            index=models.Index(fields=['start_date'], name='events_even_start_d_d4b514_idx'),
        ),
        migrations.AddIndex(
            model_name='event',
            index=models.Index(fields=['title'], name='events_even_title_aedf91_idx'),
        ),
        migrations.AddIndex(
            model_name='event',
            index=models.Index(fields=['end_date'], name='events_even_end_dat_ef2904_idx'),
        ),
        migrations.AddIndex(
            model_name='event',
            index=models.Index(fields=['ticket_price'], name='events_even_ticket__a17457_idx'),
        ),
    ]
