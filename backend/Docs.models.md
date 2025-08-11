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