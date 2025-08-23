# About Fund Page Component

Сторінка "Про Фонд" для ARTRAISE проекту, яка складається з трьох основних частин:

## Структура компонентів

```
about-fund-page
├─ text-template-page (базовий шаблон)
│  ├─ slider-wrapper
│  ├─ quick-menu
│  └─ section-grid
└─ about-fund-img-wrapper (обгортка для зображень)
    ├─ Image компонент
    └─ ButtonTransparent
```

## Використання

```tsx
import AboutFundPage from "~/ui/pages/about-fund-page";

const MyComponent = () => {
  const sliderData = {
    slides: [
      { imgSrc: "/slider/img-1.png", title: "Про Фонд" },
      { imgSrc: "/slider/img-2.png", title: "Благодійний Фонд 'Друзі ЛНАМ'" }
    ],
    variant: "fullscreen"
  };

  const htmlContent = `
    <h1>Про Фонд</h1>
    <p>HTML контент з адмінки...</p>
  `;

  return (
    <AboutFundPage
      slider={sliderData}
      htmlContent={htmlContent}
    />
  );
};
```

## Особливості

### 1. Text Template Page
- **Реюзабельний шаблон** для інших сторінок
- **Безпечний HTML** через DOMPurify
- **Quick Menu** з навігацією по секціях
- **Адаптивний дизайн**

### 2. About Fund Image Wrapper
- **Оптимізовані зображення** через Next.js Image
- **Прозорі кнопки** поверх зображень
- **Hover ефекти** та анімації
- **Responsive поведінка**

### 3. Quick Menu
- **Навігація по секціях** сторінки
- **Анімовані підкреслення**
- **Callback функції** для обробки змін

## Секції Quick Menu

1. **Про Фонд** - основна інформація
2. **Програми** - загальний огляд програм
3. **Підтримка студентів** - деталі студентських програм
4. **Покращення умов** - інфраструктурні проекти
5. **Підтримка викладачів** - програми для персоналу
6. **Енергозбереження** - екологічні ініціативи

## Стилізація

- **CSS Modules** для локальних стилів
- **Responsive дизайн** для всіх пристроїв
- **Hover ефекти** та анімації
- **Семантична HTML структура**

## Безпека

- **DOMPurify** для очищення HTML з адмінки
- **TypeScript** для типізації
- **Валідація пропсів** на рівні компонентів

## Розширення

Компонент легко розширюється для створення інших сторінок:

```tsx
// Приклад для іншої сторінки
const OtherPage = () => (
  <TextTemplatePage
    slider={sliderData}
    htmlContent={otherHtmlContent}
    jsxContent={<OtherJSXComponent />}
    sections={["Секція 1", "Секція 2"]}
  />
);
```
