# FAQ API Documentation

## Базовий URL
```
/api/faq/
```

## Ендпоінти

### 1. Отримання списку FAQ 
```http
GET /api/faq/
```
Повертає список всіх активних питань, відсортованих за полем `order`.

#### Відповідь
```json
[
  {
    "id": 1,
    "question": "Текст питання",
    "answer": "Текст відповіді",
    "created_at": "2025-07-31T12:00:00Z"
  }
]
```

### 2. Отримання структурованого списку FAQ
```http
GET /api/faq/question-and-answer/
```
Повертає питання, розділені на загальні та по категоріях.

#### Відповідь
```json
{
    "common": [
        {
            "id": 1,
            "question": "Загальне питання",
            "answer": "Відповідь на загальне питання"
        }
    ],
    "frequent": [
        {
            "category": "Категорія",
            "questions": [
                {
                    "id": 2,
                    "question": "Питання категорії",
                    "answer": "Відповідь на питання категорії"
                }
            ]
        }
    ]
}
```

### 3. Отримання питань для Call-to-Action
```http
GET /api/faq/call-to-action-questions/?page=1&per_page=4
```

#### Параметри запиту
| Параметр  | Тип    | За замовчуванням | Опис                           |
|-----------|--------|------------------|--------------------------------|
| page      | number | 1               | Номер сторінки                 |
| per_page  | number | 4               | Кількість питань на сторінку   |

#### Відповідь
```json
{
    "questions": [
        {
            "id": 1,
            "question": "Текст питання",
            "answer": "Текст відповіді"
        }
    ],
    "total": 10,
    "page": 1,
    "total_pages": 3
}
```

### 4. Робота з запитаннями користувачів

#### Отримання списку запитань
```http
GET /api/faq/questions/
```

##### Відповідь
```json
[
    {
        "id": 1,
        "name": "Ім'я користувача",
        "email": "email@example.com",
        "question": "Текст питання",
        "created_at": "2025-07-31T12:00:00Z"
    }
]
```

#### Створення нового запитання
```http
POST /api/faq/questions/
```

##### Тіло запиту
```json
{
    "name": "Ім'я користувача",
    "email": "email@example.com",
    "question": "Текст питання"
}
```

##### Відповідь успішна (201)
```json
{
    "message": "Question sended",
    "data": {
        "id": 1,
        "name": "Ім'я користувача",
        "email": "email@example.com",
        "question": "Текст питання",
        "created_at": "2025-07-31T12:00:00Z"
    }
}
```

##### Відповідь з помилкою (400)
```json
{
    "error": "Validation error",
    "details": {
        "email": ["Це поле є обов'язковим."],
        "name": ["Це поле є обов'язковим."],
        "question": ["Це поле є обов'язковим."]
    }
}
```

## Приклади використання

### React/Axios приклад отримання FAQ
```javascript
import axios from 'axios';

// Отримання структурованого списку FAQ
const getFAQList = async () => {
  try {
    const response = await axios.get('/api/faq/question-and-answer/');
    const { common, frequent } = response.data;
    // Обробка даних...
  } catch (error) {
    console.error('Помилка при отриманні FAQ:', error);
  }
};

// Отримання пагінованого списку для Call-to-Action
const getCallToActionQuestions = async (page = 1, perPage = 4) => {
  try {
    const response = await axios.get(`/api/faq/call-to-action-questions/?page=${page}&per_page=${perPage}`);
    const { questions, total, total_pages } = response.data;
    // Обробка даних...
  } catch (error) {
    console.error('Помилка при отриманні питань:', error);
  }
};

// Відправка нового питання
const sendQuestion = async (questionData) => {
  try {
    const response = await axios.post('/api/faq/questions/', {
      name: questionData.name,
      email: questionData.email,
      question: questionData.question
    });
    // Обробка успішної відповіді...
  } catch (error) {
    // Обробка помилок валідації...
    console.error('Помилка при відправці питання:', error.response?.data);
  }
};
```

## Примітки
1. Всі запити до API повертають JSON
2. Дати повертаються в форматі ISO 8601
3. При помилках валідації повертається статус 400 з детальним описом помилок
4. Пагінація використовується тільки в ендпоінті call-to-action-questions
