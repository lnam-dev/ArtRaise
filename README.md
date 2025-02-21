# ArtRaise

# Docker

# 1.    Запуcr Docker-контейнера
        docker-compose build
# 2.    Додавання та виконання міграції
        docker-compose run --rm project sh -c "python manage.py makemigrations"
        
        docker-compose run --rm project sh -c "python manage.py migrate"
# 3.    Створення суперкористувача
        docker-compose run --rm project sh -c "python manage.py createsuperuser"
# 4.    Запуск сервера
        docker-compose up
# 5.    Щоб увійти в адмінку, переходитe за 
        http://localhost:8000/cms
#       Вводите попередньо вказані дані суперюзера
