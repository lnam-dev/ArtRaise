'use client';

import Image from 'next/image';
import LinkButton from './link-button';
import { TArtPiece } from '~/types';

interface CardPurchaseProps {
  card: TArtPiece;
  onCloseMenu?: () => void;
}

export default function CardPurchaseMegaMenu({
  card,
  onCloseMenu,
  ...props
}: CardPurchaseProps) {
  console.log('type', card.type);

  const getTypeName = (type: string) => {
    switch (type) {
      case 'painting':
        return 'Живопис';
      case 'sculpture':
        return 'Скульптура';
      case 'graphics':
        return 'Графіка';
      case 'architecture':
        return 'Архітектура';
      case 'aplied_art':
        return 'Прикладне мистецтво';
      case 'design':
        return 'Дизайн';
      default:
        return 'Інше';
    }
  };

  const handleClick = () => {
    onCloseMenu?.();
  };

  return (
    <article
      className={`break-inside-avoid grid grid-cols-[60px_2fr_1fr_1fr_auto] items-center gap-3 border-b-1 border-[#62636D]`}
      {...props}
    >
      <figure>
        <Image
          src={card.image_artpiece ?? '/default.png'}
          alt={card.title} // Додано описовий alt
          layout='responsive'
          width={16}
          height={9}
          className='object-contain w-auto h-auto'
        />
      </figure>

      <h3
        className={`font-fixel font-medium  text-[#1F1F1F] ml-4 text-[1rem] font-namu`}
      >
        {card.title}
      </h3>
      <p className='font-fixel font-medium text-[#636363]'>
        {getTypeName(card.type)}
      </p>

      <p
        className={`text-[#1F1F1F] font-namu`}
        aria-label={`Ціна: ${card.price} гривень`}
      >
        ${card.price}
      </p>
      <LinkButton
        // cardId={Number(card.id)}
        className='w-full'
        variant='light'
        onClick={handleClick}
      ></LinkButton>
    </article>
  );
}
