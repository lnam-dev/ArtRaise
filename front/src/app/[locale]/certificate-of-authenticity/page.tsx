import React from "react";
import TextTemplatePage from "~/ui/components/text-template-page/text-template-page";
import CardPurchase from "~/ui/components/card/card-purchase";
import { TSliderBaseProps } from "~/types/slider";
import { TArtPiece } from "~/types";

const mockHtml = `
  <p class="text-base leading-relaxed text-gray-900 mb-8 font-fixel max-w-full lg:max-w-[730px] ">
    Сертифікат автентичності  - це офіційний документ, який підтверджує, що ваш твір мистецтва є оригіналом, створений саме тим автором, чиє імʼя він носить. Це своєрідний "паспорт" роботи, який зберігається разом із нею протягом усього життя.
  </p>

  <h2 class="text-2xl font-bold text-gray-900 mb-4 font-namu">Що містить сертифікат?</h2>

  <h3 class="text-lg font-semibold text-gray-900 mt-6 mb-3 font-fixel">Програма підтримки студентів та аспірантів</h3>
  <ul class="list-disc list-inside space-y-1 text-gray-900 mb-6 font-fixel">
    <li>Імʼя автора</li>
    <li>Назва твору</li>
    <li>Рік створення</li>
    <li>Опис техніки та матеріалів</li>
    <li>Розмір роботи</li>
    <li>Фото твору для ідентифікації</li>
    <li>Підпис автора або офіційної галереї</li>
  </ul>

  <h3 class="text-lg font-semibold text-gray-900 mt-6 mb-3 font-fixel">Навіщо він потрібен?</h3>
  <ul class="list-disc list-inside space-y-1 text-gray-900 mb-6 font-fixel">
    <li>Підетвердження оригінальності - гарантія, що твір створений саме цим автором, а не є копією.</li>
    <li>Підвищення цінності - роботи з підтвердженим походженням оцінюються значно дорожче.</li>
    <li>Захист від підробок - унеможливлює незаконне відтворення чи продаж підробок.</li>
    <li>Легкість перепродажу - якщо ви кооли-небудь вирішите продати роботу, сертифікат стане важливим аргументом для покупця.</li>
    <li>Частина історії твору - сертифікат зберігає дані, які можуть бути важливими для майбутніх поколінь.</li>
  </ul>

  <h3 class="text-lg font-semibold text-gray-900 mt-6 mb-3 font-fixel">Як виглядає?</h3>
  <p class="text-base leading-relaxed text-gray-900 mb-8 font-fixel max-w-full lg:max-w-[730px]">
    Сертифікат автентичності може бути у друкованому або цифровому форматі. Він оформлюється на фірмовому бланку, містить унікальний номер і підпис автора чи представника галереї
  </p>

  <p class="text-base leading-relaxed text-gray-900 mb-8 font-fixel max-w-full lg:max-w-[730px]">
    Памʼятайте: ніколи не втрачайте сертифікат
    - це ключ до доведення справжності вашого твору </p>
`;

const sliderData: TSliderBaseProps = {
  slides: [
    {
      title: "Сертифікат автентичності",
      subtitle: "Офіційний доказ цінності  оригінальності твору мистецтва",
      description: "Інформація про сертифікати автентичності",
      imgSrc: "/slider/img-1.png",
    },
    {
      title: "Що входить у сертифікат",
      subtitle: "Гарантія походження та унікальності",
      description: "Деталі та приклади сертифікатів",
      imgSrc: "/slider/img-2.png",
    },
  ],
  variant: "fullscreen",
};

const Page = () => {
  const mockCard1: TArtPiece = {
    id: 101,
    title: "Girl with a Pearl Earring",
    price: "0",
    type: "painting",
    material: "oil on canvas",
    theme: "portrait",
    style: "baroque",
    length_cm: "44.5",
    width_cm: "39",
    height_cm: null,
    creating_date: "1665",
    description: "",
    certificate: "",
    image_artpiece: "/slider/img-1.png",
    orientation: "portrait",
    author: {
      id: 1,
      fullname: "Johannes Vermeer",
      bio_text: "",
      image_author: "/default.png",
    },
    category: {
      name_en: "Painting",
      name_ua: "Живопис",
      slug: "painting",
    },
  };

  const mockCard2: TArtPiece = {
    id: 102,
    title: "American Gothic",
    price: "300",
    type: "painting",
    material: "oil on beaverboard",
    theme: "portrait",
    style: "american gothic",
    length_cm: "74.3",
    width_cm: "62.4",
    height_cm: null,
    creating_date: "1930",
    description: "",
    certificate: "",
    image_artpiece: "/slider/img-2.png",
    orientation: "portrait",
    author: {
      id: 2,
      fullname: "Grant Wood",
      bio_text: "",
      image_author: "/default.png",
    },
    category: {
      name_en: "Painting",
      name_ua: "Живопис",
      slug: "painting",
    },
  };

  const jsxContent = (
    <div>
      <div className="columns-1 sm:columns-2 lg:columns-auto space-y-8">
        <CardPurchase card={mockCard1} variable="dark" />
        <CardPurchase card={mockCard2} variable="dark" />
      </div>
    </div>
  );

  return (
    <TextTemplatePage
      slider={sliderData}
      htmlContent={mockHtml}
      jsxContent={jsxContent}
      sections={["Інформація", "Роботи"]}
      rightColumnTitle="Роботи, які мають сертифікати автентичності:"
      rightColumnTitleClass="font-fixel font-medium tracking-[-0.04rem] text-left text-6 xl:text-8 mb-4"
    />
  );
};

export default Page;
