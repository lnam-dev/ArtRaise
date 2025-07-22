# ArtRaise

# Tech Stack

### Python 3.11+
### _Backend_: Django, Django Rest Framework
### _Auth_: JWT (Simple JWT)
### _Database_: PostgreSQL
### _DEV environment_: Docker, docker-compose
### _CMS_: Wagtail Headless
### [How to deploy](https://www.digitalocean.com/community/tutorials/how-to-deploy-django-to-app-platform#step-4-mdash-deploying-to-digitalocean-with-app-platform)


# Getting started

## 1. Clone the Repository & Set Up Environment
# Clone the project
```bash
git clone https://github.com/makson2006/ArtRaise.git
```

# Create virtual environment

```bash
cd artraise/backend
python -m venv venv
```

# Activate virtual environment
# For Windows:
```bash
venv\Scripts\activate
```
# For Linux/macOS:
```bash
source venv/bin/activate
```
# Install dependencies
```bash
pip install -r requirements.txt
```

# Docker DEV
## 1.    Запуcr Docker-контейнера
```bash
docker-compose build
```
## 2.    Додавання міграції
```bash
docker-compose run --rm backend sh -c "python manage.py makemigrations --settings=project.settings.dev"
```
## 3.    Виконання міграції
```bash
docker-compose run --rm backend sh -c "python manage.py makemigrations --settings=project.settings.dev"
```
## 4.    Створення суперкористувача
```bash
docker-compose run --rm backend sh -c "python manage.py createsuperuser --settings=project.settings.dev"
```
## 5.    Запуск сервера
```bash
docker-compose up
```
## 6.    Щоб увійти в адмінку, переходитe за
```bash
http://localhost:8000/cms
```
## 7.    Адмінка на dev сервері (аналогічно)
```bash
https://{domen}/cms
```
##       Вводите попередньо вказані дані суперюзера

## Автоматичний деплой на DigitalOcean App Platform

Код автоматично деплоїться через DigitalOcean App Platform при кожному пуші в гілку `master`.

- **Автодеплой**: при зміні в `master` DigitalOcean витягує код з GitHub та запускає новий деплой.
- **Zero downtime**: якщо деплой неуспішний — залишається попередня стабільна версія.
- **Логи** деплою та роботи застосунку (бекенд і фронтенд) доступні в UI DigitalOcean.


## API Endpoints

### Пошук
- `GET /api/search/` — Пошук по сайту

---

### Authors
- `GET /api/authors/` — Отримати список авторів
- `GET /api/authors/{id}` — Отримати автора за ID

---

### Events
- `GET /api/events/` — Отримати список подій
- `GET /api/events/{id}` — Отримати подію за ID

---

### ArtPieces
- `GET /api/artpieces/` — Отримати список творів мистецтва
- `GET /api/artpieces/{id}` — Отримати твір за ID

---

### Users
- `GET /api/users/` — Отримати список користувачів

#### Аутентифікація
- `POST /api/users/register/` — Реєстрація користувача
- `POST /api/users/login/` — Авторизація та отримання токена
- `POST /api/users/token/refresh` — Оновлення токена доступу
- `POST /api/users/token/verify` — Верифікація токена

### FAQ
- `GET /api/faq/` — Отримати список частих запитань

---

### Slider (Слайдер)
- `GET /api/slider/` — Отримати активні слайди для головної сторінки
- `GET /api/slider/{id}/` — Отримати конкретний слайд за ID
- `GET /api/slider/management/` — Отримати всі слайди (включно з неактивними)
- `GET /api/slider/stats/` — Отримати статистику слайдера
- `GET /api/slider/info/` — Отримати інформацію про систему слайдера

# Models

## CustomUser

Користувацька модель, що розширює стандартний `AbstractUser` з авторизацією через email.

| Поле | Тип | Опис |
|------|-----|------|
| `email` | `EmailField` *(унікальне)* | Основне поле для авторизації |
| `username` | `CharField` | Залишається обов'язковим при реєстрації |
| `created_on` | `DateTimeField` | Дата створення користувача |
| + всі стандартні поля `AbstractUser` | `password`, `is_active`, `is_staff`, `is_superuser`, `first_name`, `last_name`, тощо |

#### Аутентифікація
- **USERNAME_FIELD**: `email`  
- **REQUIRED_FIELDS**: `username`

## ArtPiece

Модель, яка представляє мистецький твір (живопис, скульптура, графіка тощо). Містить детальну інформацію про фізичні характеристики, стиль, формат і автора.

| Поле | Тип | Опис |
|------|-----|------|
| `title` | `CharField` | Назва роботи |
| `price` | `DecimalField` | Ціна (до 2 знаків після коми, лише додатні значення) |
| `type` | `ChoiceField` | Тип мистецтва: `painting`, `sculpture`, `graphics`, `architecture`, `aplied_art`, `design` |
| `material` | `CharField` | Матеріал, з якого створено роботу |
| `theme` | `CharField` | Тематика твору |
| `style` | `CharField` | Художній стиль |
| `length_cm` | `DecimalField` | Довжина (см) |
| `width_cm` | `DecimalField` | Ширина (см) |
| `height_cm` | `DecimalField` *(nullable)* | Висота (см), опціонально |
| `format` | `ChoiceField` | Формат: `small`, `medium`, `big` |
| `orientation` | `ChoiceField` | Орієнтація: `square`, `portrait`, `landscape` |
| `gamma` | `CharField` *(optional)* | Кольорова гама |
| `dominant_color` | `CharField` *(optional)* | Домінантний колір |
| `creating_date_start` | `PositiveIntegerField` *(optional)* | Рік початку створення |
| `creating_date_end` | `PositiveIntegerField` *(optional)* | Рік завершення створення |
| `description` | `TextField` | Опис твору |
| `certificate` | `FileField` *(optional)* | Сертифікат автентичності (файл) |
| `image_artpiece` | `ImageField` *(optional)* | Зображення твору |
| `author` | `ForeignKey` → `Author` | Посилання на автора твору |

---

#### ArtPieceType

- `painting` — живопис  
- `sculpture` — скульптура  
- `graphics` — графіка  
- `architecture` — архітектура  
- `aplied_art` — прикладне мистецтво  
- `design` — дизайн

#### ArtPieceFormat

- `small` — малий  
- `medium` — середній  
- `big` — великий

#### ArtPieceOrientation

- `square` — квадратна  
- `portrait` — портретна  
- `landscape` — пейзажна

## Author

Модель, що описує автора мистецьких творів. Містить базову інформацію, стиль, тематику творчості та зображення.

| Поле | Тип | Опис |
|------|-----|------|
| `fullname` | `CharField` | Повне ім’я автора |
| `bio_text` | `TextField` | Біографічна довідка (до 3000 символів) |
| `style` | `CharField` | Стиль, у якому працює автор |
| `theme` | `CharField` | Основна тематика творчості |
| `expression_type` | `CharField` | Тип художнього вираження (напр., реалізм, абстракція тощо) |
| `image_author` | `ImageField` *(optional)* | Фото або портрет автора |


## Event

Модель, що представляє подію — виставку, арт-подію чи інший захід, у якому беруть участь автори.

| Поле | Тип | Опис |
|------|-----|------|
| `title` | `CharField` | Назва події |
| `location_name` | `CharField` | Назва локації |
| `location_details` | `CharField` *(optional)* | Деталі про локацію (поверх, зал, адреса тощо) |
| `ticket_price` | `DecimalField` | Вартість квитка (до 2 знаків після коми) |
| `description` | `TextField` | Короткий опис події (до 1000 символів) |
| `start_date` | `DateField` *(optional)* | Дата початку |
| `end_date` | `DateField` *(optional)* | Дата завершення |
| `authors` | `ManyToManyField` → `Author` | Список авторів, що беруть участь у події |

#### Індекси
- `start_date`
- `end_date`
- `ticket_price`
- `title`


## Order

Модель, що представляє замовлення на артоб'єкт. Містить контактні дані клієнта, дату замовлення та статус виконання.

| Поле | Тип | Опис |
|------|-----|------|
| `artpiece` | `ForeignKey` → `ArtPiece` | Артоб'єкт, що замовляється |
| `email` | `EmailField` | Email замовника |
| `phone_number` | `CharField` | Телефон замовника |
| `first_name` | `CharField` | Ім’я замовника |
| `last_name` | `CharField` | Прізвище замовника |
| `created_at` | `DateTimeField` | Дата та час створення замовлення (встановлюється автоматично) |
| `status` | `CharField` *(choices)* | Статус замовлення (за замовчуванням `pending`) |

#### Статуси:
- `pending` — очікує підтвердження  
- `accepted` — підтверджене  
- `in progress` — виконується  
- `completed` — виконане  
- `cancelled` — скасоване

# API Documentation

## Search API

**Endpoint:** `GET /api/search/`

**Опис:** Пошук та фільтрація творів мистецтва з пагінацією та статистикою цін.

### Параметри запиту

#### Текстовий пошук
| Параметр | Тип | Опис |
|----------|-----|------|
| `q` | `string` | Пошуковий запит (пошук за назвою, ім'ям автора, описом) |

#### Фільтри (підтримують множинні значення)
| Параметр | Тип | Опис |
|----------|-----|------|
| `category` | `string[]` | Категорії творів |
| `type` | `string[]` | Типи творів (`painting`, `sculpture`, `graphics`, `architecture`, `aplied_art`, `design`) |
| `material` | `string[]` | Матеріали |
| `theme` | `string[]` | Теми творів |
| `style` | `string[]` | Стилі творів |
| `expression_method` | `string[]` | Методи вираження |
| `size` | `string[]` | Розміри (`small`, `medium`, `big`) |
| `color` | `string[]` | Домінуючі кольори |
| `orientation` | `string[]` | Орієнтація (`square`, `portrait`, `landscape`) |
| `gamma` | `string[]` | Гама |

#### Цінові фільтри
| Параметр | Тип | Опис |
|----------|-----|------|
| `price_min` | `float` | Мінімальна ціна |
| `price_max` | `float` | Максимальна ціна |

#### Фільтр за автором
| Параметр | Тип | Опис |
|----------|-----|------|
| `author` | `string` | Пошук за ім'ям автора |

#### Сортування
| Параметр | Тип | Опис | Значення |
|----------|-----|------|----------|
| `sort_by` | `string` | Поле для сортування | `title`, `price`, `date`, `author` |
| `sort_direction` | `string` | Напрямок сортування | `asc`, `desc` |

#### Пагінація
| Параметр | Тип | Опис |
|----------|-----|------|
| `page` | `int` | Номер сторінки (за замовчуванням: 1) |
| `page_size` | `int` | Кількість елементів на сторінці (за замовчуванням: 20, максимум: 100) |

### Приклади запитів

```bash
# Пошук за назвою
GET /api/search/?q=пейзаж

# Фільтрація за типом та матеріалом
GET /api/search/?type=painting&material=олія

# Множинні значення фільтра
GET /api/search/?type=painting&type=sculpture&style=реалізм

# Фільтрація за ціною
GET /api/search/?price_min=1000&price_max=5000

# Сортування за ціною
GET /api/search/?sort_by=price&sort_direction=desc

# Пагінація
GET /api/search/?page=2&page_size=10

# Комбінований запит
GET /api/search/?q=портрет&type=painting&price_min=2000&sort_by=price&page=1&page_size=20
```

### Структура відповіді

```json
{
  "results": [
    {
      "id": 1,
      "title": "Назва твору",
      "price": "2500.00",
      "type": "painting",
      "material": "Олія",
      "theme": "Портрет",
      "style": "Реалізм",
      "length_cm": "50.00",
      "width_cm": "70.00",
      "height_cm": "3.00",
      "format": "medium",
      "orientation": "portrait",
      "gamma": "теплий",
      "dominant_color": "червоний",
      "creating_date_start": 2020,
      "creating_date_end": 2020,
      "description": "Опис твору",
      "image_artpiece": "https://example.com/image.jpg",
      "certificate": "https://example.com/certificate.pdf",
      "author": {
        "id": 1,
        "fullname": "Ім'я Автора",
        "bio_text": "Біографія автора",
        "image_author": "https://example.com/author.jpg"
      }
    }
  ],
  "pagination": {
    "current_page": 1,
    "total_pages": 5,
    "total_items": 100,
    "has_next": true,
    "has_previous": false,
    "page_size": 20
  },
  "price_range": {
    "min_price": "500.00",
    "max_price": "15000.00"
  },
  "filters_applied": {
    "query": "пейзаж",
    "categories": [],
    "types": ["painting"],
    "materials": ["олія"],
    "themes": [],
    "styles": [],
    "expression_methods": [],
    "sizes": [],
    "colors": [],
    "orientations": [],
    "gammas": [],
    "price_min": "1000",
    "price_max": "5000",
    "author": null,
    "sort_by": "title",
    "sort_direction": "asc"
  }
}
```

### Опис полів відповіді

#### `results`
Масив об'єктів творів мистецтва, що відповідають критеріям пошуку.

#### `pagination`
Інформація про пагінацію:
- `current_page` - поточна сторінка
- `total_pages` - загальна кількість сторінок
- `total_items` - загальна кількість елементів
- `has_next` - чи є наступна сторінка
- `has_previous` - чи є попередня сторінка
- `page_size` - кількість елементів на сторінці

#### `price_range`
Статистика цін для поточного набору результатів:
- `min_price` - мінімальна ціна серед знайдених творів
- `max_price` - максимальна ціна серед знайдених творів

#### `filters_applied`
Застосовані фільтри та параметри пошуку для відлагодження та відображення активних фільтрів в UI.

### Коди відповідей

- `200 OK` - Успішний запит
- `400 Bad Request` - Некоректні параметри запиту
- `500 Internal Server Error` - Внутрішня помилка сервера

### Примітки

1. **Множинні значення**: Більшість фільтрів підтримують множинні значення. Використовуйте один і той же параметр кілька разів: `?type=painting&type=sculpture`

2. **Регістронезалежний пошук**: Текстовий пошук (`q`) та пошук за автором (`author`) працюють без урахування регістра.

3. **Валідація цін**: Некоректні значення `price_min` та `price_max` ігноруються.

4. **Продуктивність**: Використовується `select_related('author')` для оптимізації запитів до бази даних.

5. **Статистика цін**: `price_range` розраховується для поточного відфільтрованого набору даних, а не для всієї бази даних.

## Slider API

**Опис:** API для управління слайдером головної сторінки сайту. Слайди можуть посилатися на твори мистецтва, авторів, події або мати довільні посилання.

### Endpoints

#### 1. Отримати активні слайди
**Endpoint:** `GET /api/slider/`

**Опис:** Повертає список усіх активних слайдів, відсортованих за порядком відображення.

**Приклад відповіді:**
```json
[
  {
    "id": 1,
    "title": "Нова виставка",
    "subtitle": "Сучасне мистецтво XXI століття",
    "description": "<p>Детальний опис виставки...</p>",
    "image_url": "https://artraise-media.fra1.cdn.digitaloceanspaces.com/slider/slide1.jpg",
    "order": 1,
    "is_active": true,
    "link_url": "/events/1/",
    "link_type": "event",
    "linked_object_id": 1,
    "linked_object_info": {
      "type": "event",
      "id": 1,
      "title": "Виставка сучасного мистецтва",
      "start_date": "2025-02-01",
      "end_date": "2025-02-28"
    },
    "created_at": "2025-01-15T10:30:00Z",
    "updated_at": "2025-01-15T10:30:00Z"
  }
]
```

#### 2. Отримати конкретний слайд
**Endpoint:** `GET /api/slider/{id}/`

**Опис:** Повертає детальну інформацію про конкретний слайд.

**Приклад відповіді:**
```json
{
  "id": 1,
  "title": "Портрет художника",
  "subtitle": "Знайомтеся з талановитими авторами",
  "description": "<p>Опис слайда...</p>",
  "image_url": "https://artraise-media.fra1.cdn.digitaloceanspaces.com/slider/author_slide.jpg",
  "order": 2,
  "is_active": true,
  "link_url": "/authors/1/",
  "link_type": "author",
  "linked_object_id": 1,
  "linked_object_info": {
    "type": "author",
    "id": 1,
    "name": "Олександр Семерня",
    "bio": "Український художник, що працює у стилі сучасного реалізму..."
  },
  "created_at": "2025-01-15T10:30:00Z",
  "updated_at": "2025-01-15T10:30:00Z"
}
```

#### 3. Отримати всі слайди (управління)
**Endpoint:** `GET /api/slider/management/`

**Опис:** Повертає всі слайди (включно з неактивними) для адміністративних цілей.

**Приклад відповіді:**
```json
[
  {
    "id": 1,
    "title": "Активний слайд",
    "subtitle": "Підзаголовок",
    "image_url": "https://artraise-media.fra1.cdn.digitaloceanspaces.com/slider/slide1.jpg",
    "order": 1,
    "is_active": true,
    "link_info": "Твір мистецтва: Думи, мої думи...",
    "created_at": "2025-01-15T10:30:00Z",
    "updated_at": "2025-01-15T10:30:00Z"
  },
  {
    "id": 2,
    "title": "Неактивний слайд",
    "subtitle": "Підзаголовок",
    "image_url": "https://artraise-media.fra1.cdn.digitaloceanspaces.com/slider/slide2.jpg",
    "order": 2,
    "is_active": false,
    "link_info": "Автор: Петро Іваненко",
    "created_at": "2025-01-14T15:20:00Z",
    "updated_at": "2025-01-16T11:45:00Z"
  }
]
```

#### 4. Отримати статистику слайдера
**Endpoint:** `GET /api/slider/stats/`

**Опис:** Повертає статистичну інформацію про слайди.

**Приклад відповіді:**
```json
{
  "total_slides": 5,
  "active_slides": 3,
  "inactive_slides": 2,
  "slides_with_artpiece": 1,
  "slides_with_author": 1,
  "slides_with_event": 1,
  "slides_with_custom_link": 0
}
```

#### 5. Отримати інформацію про систему
**Endpoint:** `GET /api/slider/info/`

**Опис:** Повертає загальну інформацію про функціональність слайдера.

**Приклад відповіді:**
```json
{
  "name": "ArtRaise Slider",
  "version": "1.0",
  "description": "Система управління слайдером головної сторінки ArtRaise",
  "features": [
    "Підтримка зв'язків з творами мистецтва, авторами та подіями",
    "Можливість додавання довільних посилань",
    "Управління порядком відображення слайдів",
    "Активація/деактивація слайдів",
    "Завантаження зображень",
    "Wagtail CMS інтеграція для зручного управління"
  ]
}
```

### Опис полів слайда

| Поле | Тип | Опис |
|------|-----|------|
| `id` | `integer` | Унікальний ідентифікатор |
| `title` | `string` | Заголовок слайда (макс. 200 символів) |
| `subtitle` | `string` | Підзаголовок слайда (макс. 300 символів, опціонально) |
| `description` | `string` | Rich text опис слайда (HTML) |
| `image_url` | `string` | URL зображення слайда |
| `order` | `integer` | Порядок відображення (менші числа з'являються першими) |
| `is_active` | `boolean` | Чи активний слайд |
| `link_url` | `string` | URL для переходу при кліці на слайд |
| `link_type` | `string` | Тип посилання (`artpiece`, `author`, `event`, `custom`, або `null`) |
| `linked_object_id` | `integer` | ID пов'язаного об'єкта (якщо застосовно) |
| `linked_object_info` | `object` | Додаткова інформація про пов'язаний об'єкт |
| `created_at` | `datetime` | Час створення |
| `updated_at` | `datetime` | Час останнього оновлення |

### Типи посилань

1. **`artpiece`** - Посилання на твір мистецтва (`/artpiece/{id}/`)
   - `linked_object_info` містить: `type`, `id`, `title`, `price`, `author_name`

2. **`author`** - Посилання на автора (`/authors/{id}/`)
   - `linked_object_info` містить: `type`, `id`, `name`, `bio`

3. **`event`** - Посилання на подію (`/events/{id}/`)
   - `linked_object_info` містить: `type`, `id`, `title`, `start_date`, `end_date`

4. **`custom`** - Довільне посилання
   - `linked_object_info` містить: `type`, `url`

5. **`null`** - Посилання не вказано

### Приклади використання у фронтенді

#### Отримання слайдів для головної сторінки
```javascript
const response = await fetch('/api/slider/');
const slides = await response.json();

slides.forEach(slide => {
  console.log(`Слайд: ${slide.title}`);
  console.log(`Зображення: ${slide.image_url}`);
  console.log(`Посилання: ${slide.link_url}`);
});
```

#### Обробка кліку по слайду
```javascript
const handleSlideClick = (slide) => {
  if (slide.link_url) {
    if (slide.link_type === 'custom') {
      // Зовнішнє посилання - відкриваємо в новій вкладці
      window.open(slide.link_url, '_blank');
    } else {
      // Внутрішнє посилання - навігація в додатку
      router.push(slide.link_url);
    }
  }
};
```

### Коди відповідей

- `200 OK` - Успішний запит
- `404 Not Found` - Слайд не знайдено (для `/api/slider/{id}/`)
- `500 Internal Server Error` - Внутрішня помилка сервера

### Примітки

1. **Сортування**: Слайди повертаються відсортованими за полем `order` (за зростанням), потім за датою створення (за спаданням).

2. **Тільки активні**: Endpoint `/api/slider/` повертає лише активні слайди (`is_active=true`).

3. **Валідація**: Кожен слайд повинен мати рівно одне посилання (або на об'єкт, або довільний URL).

4. **Зображення**: Зображення завантажуються через Django і зберігаються в DigitalOcean Spaces.

5. **Управління**: Слайди можна створювати та редагувати через Django Admin (`/admin/slider/slide/`) або Wagtail CMS (`/cms/`).


