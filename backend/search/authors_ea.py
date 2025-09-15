from collections import namedtuple
from datetime import datetime


def create_authors_ea():
    # Створюємо namedtuple для мок-об'єктів
    MockAuthor = namedtuple('MockAuthor', ['id', 'fullname'])
    MockCategory = namedtuple('MockCategory', ['id', 'name_en', 'name_ua', 'slug', 'description', 'image_url', 'is_active', 'order'])
    MockArtPiece = namedtuple('MockArtPiece', [
        'id', 'title', 'price', 'length_cm', 'width_cm', 'height_cm',
        'creating_date_start', 'creating_date_end', 'style', 'author',
        'image_artpiece', 'certificate', 'category', 'tags', 'created_at'
    ])

    # Мок-категорія для всіх творів
    mock_category = MockCategory(
        id=999,
        name_en="Project Authors",
        name_ua="Автори проекту",
        slug="project-authors",
        description="Творці платформи ArtRaise",
        image_url=None,
        is_active=True,
        order=0
    )

    # Дані про авторів проекту
    authors_data = [
        {
            'id': 1000000000001,
            'title': 'Frontend',
            'author_name': 'Danyil',
            'price': 999999.99,
            'style': 'Сучасний веб-дизайн',
            'description': 'Головний розробник платформи ArtRaise'
        },
        {
            'id': 1000000000000002,
            'title': 'Backend',
            'author_name': 'Yehor',
            'price': 999999.99,
            'style': 'Django & API майстерність',
            'description': 'Спеціаліст з серверної частини та баз даних'
        },
        {
            'id': 1000000000000003,
            'title': 'Frontend',
            'author_name': 'Maxim',
            'price': 999999.99,
            'style': 'Next.js & UI/UX дизайн',
            'description': 'Творець інтерфейсів і користувацького досвіду'
        },
        {
            'id': 1000000000000004,
            'title': 'Frontend',
            'author_name': 'Anna',
            'price': 999999.99,
            'style': 'Next.js & QA',
            'description': 'Експерт з інфраструктури'
        }
    ]

    mock_artpieces = []

    for data in authors_data:
        mock_author = MockAuthor(
            id=data['id'],
            fullname=data['author_name']
        )

        mock_artpiece = MockArtPiece(
            id=data['id'],
            title=data['title'],
            price=data['price'],
            length_cm=42,
            width_cm=29.7,
            height_cm=0.1,
            creating_date_start='developer',
            creating_date_end='',
            style=data['style'],
            author=mock_author,
            image_artpiece=None,
            certificate=None,
            category=mock_category,
            tags=[],
            created_at=datetime.now()
        )
        mock_artpieces.append(mock_artpiece)

    return mock_artpieces