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

## `/api/search`

#### Метод: `GET`

---

#### Параметри запиту

- **q**: (string, опціонально) Текстовий пошук по назві, опису або імені автора.
- **category**: (array, опціонально) Категорії творів (типи). Можна передавати кілька разів: `category=живопис&category=графіка`
- **type**: (array, опціонально) Тип твору (аналогічно до category, для зворотної сумісності).
- **material**: (array, опціонально) Матеріал виконання.
- **theme**: (array, опціонально) Тематика твору.
- **style**: (array, опціонально) Стиль.
- **expression_method**: (array, опціонально) Спосіб вираження (тип).
- **size**: (array, опціонально) Формат/розмір.
- **color**: (array, опціонально) Домінуючий колір.
- **orientation**: (array, опціонально) Орієнтація.
- **gamma**: (array, опціонально) Кольорова гама.
- **author**: (string, опціонально) Пошук по імені автора.
- **price_min**: (number, опціонально) Мінімальна ціна.
- **price_max**: (number, опціонально) Максимальна ціна.
- **price_range**: (array, опціонально) Діапазон цін, наприклад: `price_range=100,500`
- **length_min/length_max**: (number, опціонально) Мін/макс довжина (см).
- **width_min/width_max**: (number, опціонально) Мін/макс ширина (см).
- **height_min/height_max**: (number, опціонально) Мін/макс висота (см).
- **creating_date_start_min/creating_date_start_max**: (number, опціонально) Діапазон року створення.
- **sort_by**: (string, опціонально) Поле для сортування: `title`, `price`, `date`, `author`. За замовчуванням: `title`.
- **sort_direction**: (string, опціонально) Напрямок сортування: `asc` або `desc`. За замовчуванням: `asc`.
- **page**: (number, опціонально) Номер сторінки (починаючи з 1). За замовчуванням: 1.
- **page_size**: (number, опціонально) Кількість елементів на сторінці (максимум 100). За замовчуванням: 20.

---

#### Формат відповіді (`200 OK`)

```json
{
  "results": [
    {
      // Дані твору мистецтва (див. ArtPieceSerializer)
    }
  ],
  "pagination": {
    "current_page": 1,
    "total_pages": 5,
    "total_items": 100,
    "has_next": true,
    "has_previous": false,
    "page_size": 20
  }
}
```

- **results**: масив об'єктів творів мистецтва.
- **pagination**: інформація про поточну сторінку, загальну кількість сторінок, елементів, наявність наступної/попередньої сторінки, розмір сторінки.

---

#### Особливості

- Якщо не передати жодного параметра, повертається перша сторінка всіх творів, відсортованих за назвою.
- Якщо параметри некоректні (наприклад, нечисловий page), повертається перша сторінка.
- Можна комбінувати фільтри та текстовий пошук.
- Для масивних фільтрів (наприклад, `category`, `style`) можна передавати кілька значень через повторення параметра.

---

#### Приклад запиту

```
GET /api/search?q=пейзаж&category=живопис&style=імпресіонізм&price_min=1000&price_max=5000&sort_by=price&sort_direction=desc&page=2&page_size=10
```

---

