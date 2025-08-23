# ArtRaise Frontend

Frontend частина проекту ArtRaise - платформи для підтримки мистецької освіти та благодійності.

## 🚀 Швидкий старт

```bash
# Встановлення залежностей
npm install

# Запуск dev сервера
npm run dev

# Збірка для продакшену
npm run build

# Запуск продакшен сервера
npm start
```

## 📁 Структура проекту

```
src/
├── app/                    # Next.js App Router
│   ├── [locale]/          # Локалізація (UA/EN)
│   │   ├── about-fund/    # Сторінка "Про Фонд"
│   │   ├── authors/       # Сторінка авторів
│   │   ├── categories/    # Сторінка категорій
│   │   └── ...           # Інші сторінки
│   └── layout.tsx         # Основний layout
├── ui/                    # UI компоненти
│   ├── components/        # Реюзабельні компоненти
│   │   ├── text-template-page/     # Базовий шаблон сторінки
│   │   ├── about-fund-img-wrapper/ # Обгортка для зображень
│   │   ├── about-fund-page/        # Сторінка "Про Фонд"
│   │   ├── slider/                 # Слайдери
│   │   ├── quick-menu/             # Швидке меню
│   │   └── ...                     # Інші компоненти
│   ├── pages/             # Сторінкові компоненти
│   └── hooks/             # React хуки
├── types/                 # TypeScript типи
├── store/                 # Redux store
├── i18n/                  # Інтернаціоналізація
└── styles/                # Глобальні стилі
```

## 🎨 UI Компоненти

### Основні компоненти

#### text-template-page
Базовий шаблон сторінки з слайдером, меню і двома секціями контенту.

**Особливості:**
- Реюзабельний шаблон для різних сторінок
- Слайдер (fullscreen або classic)
- Quick menu з навігацією по секціях
- Дві секції: HTML з адмінки + JSX контент
- Безпечний рендеринг HTML через DOMPurify

#### about-fund-img-wrapper
Обгортка для картинки + прозорої кнопки.

**Особливості:**
- Next.js Image для оптимізації
- Прозора кнопка поверх зображення
- Hover ефекти та responsive дизайн
- Кастомізувані пропси

#### about-fund-page
Сторінка "Про Фонд", що об'єднує всі компоненти.

**Особливості:**
- Повна інформація про благодійний фонд "Друзі ЛНАМ"
- Програми підтримки студентів та викладачів
- Фотографії та візуальний контент
- Responsive дизайн

### Використання компонентів

```tsx
// Створення нової сторінки
import TextTemplatePage from "~/ui/components/text-template-page/text-template-page";

const MyPage = () => (
  <TextTemplatePage
    slider={sliderData}
    htmlContent={htmlFromAdmin}
    jsxContent={<MyCustomComponent />}
    sections={["Секція 1", "Секція 2"]}
  />
);

// Використання обгортки для зображень
import AboutFundImgWrapper from "~/ui/components/about-fund-img-wrapper/about-fund-img-wrapper";

const ImageSection = () => (
  <AboutFundImgWrapper
    src="/path/to/image.jpg"
    alt="Опис зображення"
    buttonText="Натисніть мене"
    onButtonClick={() => console.log("Clicked!")}
  />
);
```

## 🌐 Локалізація

Проект підтримує українську та англійську мови через Next.js i18n.

```tsx
// Використання локалізації
import { useTranslations } from 'next-intl';

const Component = () => {
  const t = useTranslations('common');
  return <h1>{t('title')}</h1>;
};
```

## 🎯 Технології

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + CSS Modules
- **State Management**: Redux Toolkit
- **Internationalization**: next-intl
- **Image Optimization**: next/image
- **Security**: DOMPurify для HTML очищення

## 🔒 Безпека

- DOMPurify для очищення HTML з адмінки
- TypeScript для типізації
- Валідація вхідних даних
- Безпечні імпорти компонентів

## 📱 Responsive Design

Всі компоненти адаптовані для різних розмірів екрану:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (до 767px)

## 🚀 Deployment

Проект готовий до деплою на:
- Vercel
- Netlify
- AWS
- Docker контейнерах

```bash
# Docker build
docker build -t artraise-frontend .

# Docker run
docker run -p 3000:3000 artraise-frontend
```

## 📚 Документація

Детальна документація по компонентам знаходиться в:
- `src/ui/components/README.md` - загальна документація
- `src/ui/components/*/README.md` - документація по компонентах

## 🤝 Розробка

### Створення нового компонента

1. Створіть папку в `src/ui/components/`
2. Додайте `.tsx`, `.module.css`, `index.ts` файли
3. Оновіть документацію
4. Додайте типи в `src/types/`

### Створення нової сторінки

1. Створіть папку в `src/app/[locale]/`
2. Додайте `page.tsx`
3. Використовуйте існуючі компоненти
4. Додайте локалізацію

## 📄 Ліцензія

Цей проект є частиною ArtRaise платформи та розповсюджується відповідно до внутрішніх правил організації.



