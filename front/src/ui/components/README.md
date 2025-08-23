# UI Components

Цей каталог містить всі UI компоненти проекту ArtRaise.

## Структура компонентів

### Основні компоненти

#### text-template-page
Базовий шаблон сторінки з слайдером, меню і двома секціями контенту.

**Структура:**
- `slider-wrapper` - слайдер (fullscreen або classic)
- `quick-menu` - меню з кнопками по секціях
- `section-grid` - сітка з двома секціями:
  - `section-1`: HTML з адмінки (через dompurify + dangerouslySetInnerHTML)
  - `section-2`: JSX, переданий через пропси

**Пропси:**
```typescript
interface TextTemplatePageProps {
  slider: TSliderBaseProps;
  htmlContent: string; // HTML з адмінки
  jsxContent: React.ReactNode; // JSX контент
  sections?: string[]; // секції для quick-menu
}
```

#### about-fund-img-wrapper
Обгортка для картинки + прозорої кнопки.

**Структура:**
- `<Image />` - картинка фонова або головна (next/image)
- `<ButtonTransparent />` - кнопка поверх картинки

**Пропси:**
```typescript
interface AboutFundImgWrapperProps {
  src: string;
  alt: string;
  buttonText: string;
  onButtonClick: () => void;
  className?: string;
}
```

#### about-fund-page
Об'єднує `text-template-page` і `about-fund-img-wrapper`.

**Функціональність:**
- Передає HTML з адмінки в Section 1
- Передає JSX-компонент (AboutFundImgWrapper) в Section 2
- Легко змінювати слайдер або меню без зміни внутрішньої логіки

### Інші компоненти

#### slider
- `slider-wrapper.tsx` - обгортка для різних типів слайдерів
- `slider-fullscreen.tsx` - повноекранний слайдер
- `slider-classic.tsx` - класичний слайдер

#### quick-menu
Меню з кнопками/лінками по секціях сторінки.

#### button-transparent
Прозора кнопка з можливістю кастомізації.

## Використання

### Створення нової сторінки з text-template-page

```typescript
import TextTemplatePage from "~/ui/components/text-template-page/text-template-page";

const MyPage = () => {
  const htmlContent = "<h1>Мій заголовок</h1><p>Мій контент</p>";
  const jsxContent = <MyCustomComponent />;
  
  return (
    <TextTemplatePage
      slider={sliderData}
      htmlContent={htmlContent}
      jsxContent={jsxContent}
      sections={["Секція 1", "Секція 2"]}
    />
  );
};
```

### Використання about-fund-img-wrapper

```typescript
import AboutFundImgWrapper from "~/ui/components/about-fund-img-wrapper/about-fund-img-wrapper";

const MyComponent = () => {
  const handleClick = () => {
    console.log("Button clicked!");
  };
  
  return (
    <AboutFundImgWrapper
      src="/path/to/image.jpg"
      alt="Опис зображення"
      buttonText="Натисніть мене"
      onButtonClick={handleClick}
    />
  );
};
```

## Безпека

- Для HTML з адмінки обов'язково використовується `dompurify` для очищення від XSS атак
- Всі компоненти приймають дані через пропси, а не хардкодять контент
- Використовується TypeScript для типізації

## Стилі

- CSS модулі для локальних стилів
- Tailwind CSS для утилітарних класів
- Responsive дизайн для всіх компонентів
