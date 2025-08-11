# Generated manually - finalize category refactoring

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('artpiece', '0011_populate_categories_and_migrate_data'),
    ]

    operations = [
        # 1. Видаляємо старе поле type
        migrations.RemoveField(
            model_name='artpiece',
            name='type',
        ),
        # 2. Робимо category обов'язковим полем
        migrations.AlterField(
            model_name='artpiece',
            name='category',
            field=models.ForeignKey(help_text='Категорія твору мистецтва', on_delete=django.db.models.deletion.PROTECT, related_name='artpieces', to='artpiece.category', verbose_name='Категорія'),
        ),
    ]
