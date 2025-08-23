# About Fund Page Component

## Опис

Компонент `AboutFundPage` - це основна сторінка "Про Фонд", яка об'єднує `TextTemplatePage` та `AboutFundImgWrapper` для створення повноцінної сторінки з інформацією про благодійний фонд "Друзі ЛНАМ".

## Структура

```
about-fund-page/
├── about-fund-page.tsx      # Основний компонент
├── about-fund-page.module.css # Стилі компонента
├── index.ts                 # Експорт компонента
└── README.md                # Цей файл
```

## Використання

```tsx
import AboutFundPage from "~/ui/components/about-fund-page/about-fund-page";

const Page = () => {
  const sliderData = {
    slides: [
      { 
        imgSrc: "/slider/img-1.png", 
        title: "Про Фонд",
        subtitle: "Благодійний Фонд 'Друзі ЛНАМ'",
        description: "Підтримка розвитку Львівської національної академії мистецтв"
      }
    ],
    variant: "fullscreen"
  };

  const htmlContent = `
    <h1>Про Фонд</h1>
    <p>Опис фонду...</p>
  `;

  return <AboutFundPage slider={sliderData} htmlContent={htmlContent} />;
};
```

## Пропси

```typescript
interface AboutFundPageProps {
  slider: TSliderBaseProps;        // Дані для слайдера
  htmlContent: string;             // HTML контент з адмінки для Section 1
}
```

## Функціональність

### Section 1 (Ліва колонка)
- Відображає HTML контент з адмінки
- Включає інформацію про фонд та його програми
- Безпечно рендериться через DOMPurify

### Section 2 (Права колонка)
- Заголовок "Фотографії"
- Два компоненти `AboutFundImgWrapper`:
  1. Зустріч випускників (`/4photo.jpg`)
  2. Кадри: Аліна Кіндяк (`/certificate-1.png`)

### Quick Menu
- Навігація по секціях: "Про Фонд", "Програми", "Фотографії"
- Автоматичне перемикання між секціями

### Slider
- Повноекранний слайдер з зображеннями
- Підтримує заголовки, підзаголовки та описи

## Контент

### HTML контент включає:
- Заголовок "Про Фонд"
- Опис благодійного фонду "Друзі ЛНАМ"
- Програми фонду:
  - Підтримка студентів та аспірантів
  - Покращення умов навчання
  - Підтримка викладачів та персоналу
  - Підтримка мистецьких проектів
  - Програма енергозбереження

### Зображення:
- **4photo.jpg**: Зустріч випускників та студентів на ярмарку
- **certificate-1.png**: Світла кімната з меблями (кадри: Аліна Кіндяк)

## Стилі

- Використовує Tailwind CSS для основного стилювання
- CSS модулі для специфічних стилів
- Responsive дизайн для всіх розмірів екрану
- Hover ефекти для зображень

## Безпека

- HTML контент очищається через DOMPurify
- TypeScript типізація всіх пропсів
- Валідація вхідних даних

## Залежності

- `text-template-page` - базовий шаблон
- `about-fund-img-wrapper` - обгортка для зображень
- `slider-wrapper` - компонент слайдера
- `quick-menu` - навігаційне меню
- `button-transparent` - прозора кнопка
