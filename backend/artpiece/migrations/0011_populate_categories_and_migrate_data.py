# Generated manually for populating categories and migrating data

from django.db import migrations


def create_categories_and_migrate_artpieces(apps, schema_editor):
    """
    Створюємо категорії на основі існуючих ArtPieceType
    і переносимо існуючі artpieces в нові категорії
    """
    Category = apps.get_model('artpiece', 'Category')
    ArtPiece = apps.get_model('artpiece', 'ArtPiece')
    
    # Маппинг старых типов на новые категории
    categories_mapping = {
        'painting': {
            'name_en': 'Painting',
            'name_ua': 'Живопис',
            'description': 'Твори живопису - картини, написані різними техніками',
            'slug': 'painting',
            'order': 1
        },
        'sculpture': {
            'name_en': 'Sculpture', 
            'name_ua': 'Скульптура',
            'description': 'Скульптурні роботи та об\'ємні форми мистецтва',
            'slug': 'sculpture',
            'order': 2
        },
        'graphics': {
            'name_en': 'Graphics',
            'name_ua': 'Графіка', 
            'description': 'Графічні роботи, малюнки, гравюри',
            'slug': 'graphics',
            'order': 3
        },
        'architecture': {
            'name_en': 'Architecture',
            'name_ua': 'Архітектура',
            'description': 'Архітектурні проекти та роботи',
            'slug': 'architecture', 
            'order': 4
        },
        'aplied_art': {
            'name_en': 'Applied Art',
            'name_ua': 'Прикладне мистецтво',
            'description': 'Декоративно-прикладне мистецтво та ремесла',
            'slug': 'applied-art',
            'order': 5
        },
        'design': {
            'name_en': 'Design',
            'name_ua': 'Дизайн',
            'description': 'Дизайнерські роботи та проекти',
            'slug': 'design',
            'order': 6
        }
    }

    # Створюємо категорії
    created_categories = {}
    for old_type, category_data in categories_mapping.items():
        category, created = Category.objects.get_or_create(
            slug=category_data['slug'],
            defaults={
                'name_en': category_data['name_en'],
                'name_ua': category_data['name_ua'],
                'description': category_data['description'],
                'order': category_data['order'],
                'is_active': True
            }
        )
        created_categories[old_type] = category
        print(f"Category {category.name_ua} ({'created' if created else 'exists'})")

    # Переносимо існуючі artpieces
    migrated_count = 0
    unmapped_types = set()
    
    for artpiece in ArtPiece.objects.filter(category__isnull=True):
        old_type = artpiece.type
        if old_type in created_categories:
            artpiece.category = created_categories[old_type]
            artpiece.save()
            migrated_count += 1
        else:
            unmapped_types.add(old_type)
    
    print(f"Migrated {migrated_count} artpieces to new category system")
    if unmapped_types:
        print(f"Warning: Found unmapped types: {unmapped_types}")


def reverse_migration(apps, schema_editor):
    """
    Зворотня міграція - очищаємо категорії
    """
    Category = apps.get_model('artpiece', 'Category')
    ArtPiece = apps.get_model('artpiece', 'ArtPiece')

    # Очищуємо зв'язки
    ArtPiece.objects.all().update(category=None)

    # Видаляємо категорії
    Category.objects.all().delete()


class Migration(migrations.Migration):

    dependencies = [
        ('artpiece', '0010_add_category_model'),
    ]

    operations = [
        migrations.RunPython(
            create_categories_and_migrate_artpieces,
            reverse_migration
        ),
    ]
