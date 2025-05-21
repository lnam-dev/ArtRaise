# 🖼️ ArtRaise Backend Documentation

This is the backend for the **ArtRaise** platform, built with **Django** and **Django REST Framework**.

---

## 📦 Tech Stack

- Python 3.11+
- Django 4.x
- Django REST Framework
- PostgreSQL
- DigitalOcean (for deployment and database)  
  ➤ [How To Deploy](https://www.digitalocean.com/community/tutorials/how-to-deploy-django-to-app-platform#step-4-mdash-deploying-to-digitalocean-with-app-platform)

---

## 🚀 Getting Started

### 1. Clone the Repository & Set Up Environment

```bash
# Clone the project
git clone https://github.com/makson2006/ArtRaise.git
``` 
```bash

cd artraise/backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# For Windows:
venv\Scripts\activate
``` 
```bash

# For Linux/macOS:
source venv/bin/activate
``` 
```bash

# Install dependencies
pip install -r requirements.txt
``` 

```bash

# Docker DEV

# 1.    Запуcr Docker-контейнера
docker-compose build
``` 
```bash

# 2.    Додавання міграції
        docker-compose run --rm backend sh -c "python manage.py makemigrations --settings=project.settings.dev"
``` 
```bash

# 3.    Виконання міграції
docker-compose run --rm backend sh -c "python manage.py makemigrations --settings=project.settings.dev"
``` 
```bash

# 4.    Створення суперкористувача
        docker-compose run --rm backend sh -c "python manage.py createsuperuser --settings=project.settings.dev"
``` 
```bash

# 5.    Запуск сервера
        docker-compose up
``` 
# 6.    Щоб увійти в адмінку, переходитe за 
        websitedoman/cms
#       Вводите попередньо вказані дані суперюзера

``` 

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

# Для перегляду кількості айтемів в фільтрах

GET /api/artpieces/stats/

Формат відповіді
{
  "type": [
    {"name": "painting", "count": 12},
    {"name": "sculpture", "count": 5}
  ],
  "style": [
    {"name": "abstract", "count": 13},
    {"name": "modern", "count": 7}
  ],
  "theme": [
    {"name": "nature", "count": 4},
    {"name": "portrait", "count": 8}
  ]
}
