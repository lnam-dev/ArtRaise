# ArtRaise

# Docker DEV

# 1.    Запуcr Docker-контейнера
        docker-compose build
# 2.    Додавання міграції
        docker-compose run --rm backend sh -c "python manage.py makemigrations --settings=project.settings.dev"
# 3.    Виконання міграції
        docker-compose run --rm backend sh -c "python manage.py makemigrations --settings=project.settings.dev"
# 4.    Створення суперкористувача
        docker-compose run --rm backend sh -c "python manage.py createsuperuser --settings=project.settings.dev"
# 5.    Запуск сервера
        docker-compose up
# 6.    Щоб увійти в адмінку, переходитe за 
        http://localhost:8000/cms
#       Вводите попередньо вказані дані суперюзера


# Список API
{GET}

/api/authors/       

/api/authors/{id}

/api/events/

/api/events/{id}

/api/artpieces/

/api/artpieces/{id}

/api/users

{POST}

/api/users/register/

/api/users/login/

/api/users/token/refresh

/api/users/token/verify

# Апі для пошуку по сайту

/api/search/



