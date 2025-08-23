# Text Template Page Component

Базовий шаблон сторінки з слайдером, меню і двома секціями контенту.

## Структура

```
text-template-page
├─ slider-wrapper
│  └─ slider-fullscreen (або slider-classic)
├─ quick-menu (з секціями)
├─ section-grid
│  ├─ section-1: HTML з адмінки (через dompurify + dangerouslySetInnerHTML)
│  └─ section-2: JSX, переданий через пропси
```

## Використання

```tsx
import TextTemplatePage from "~/ui/components/text-template-page";

const MyPage = () => {
  const sliderData = {
    slides: [
      { imgSrc: "/image1.jpg", title: "Заголовок 1" },
      { imgSrc: "/image2.jpg", title: "Заголовок 2" }
    ],
    variant: "fullscreen"
  };

  const htmlContent = "<h1>HTML з адмінки</h1><p>Контент...</p>";
  
  const jsxContent = <div>JSX контент</div>;

  return (
    <TextTemplatePage
      slider={sliderData}
      htmlContent={htmlContent}
      jsxContent={jsxContent}
      sections={["Секція 1", "Секція 2"]}
      onSectionChange={(section) => console.log(section)}
    />
  );
};
```

## Props

| Prop | Тип | Опис |
|------|-----|------|
| `slider` | `TSliderBaseProps` | Дані для слайдера |
| `htmlContent` | `string` | HTML контент з адмінки |
| `jsxContent` | `React.ReactNode` | JSX контент для другої секції |
| `sections` | `string[]` | Масив назв секцій для quick menu |
| `currentSection` | `string` | Поточна активна секція |
| `onSectionChange` | `(section: string) => void` | Callback при зміні секції |

## Безпека

HTML контент автоматично очищається через DOMPurify для запобігання XSS атак.

## Стилі

Компонент використовує CSS модулі з Tailwind CSS класами. Стилі адаптивні та оптимізовані для різних розмірів екрану.
