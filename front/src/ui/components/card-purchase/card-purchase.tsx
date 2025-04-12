'use client';

import Image from 'next/image';
import LinkButton from './link-button';
import { TArtPiece } from '~/types';
import { useArtPiece } from '~/ui/hooks/useArtpPieces';

interface CardPurchaseProps {
  card: TArtPiece;
}

export default function CardPurchase({ card, ...props }: CardPurchaseProps) {
  console.log('type', card.type);

  return (
    <article className={`break-inside-avoid `} {...props}>
      <figure className={`mb-2`}>
        <Image
          src={card.image_artpiece ?? '/default.png'}
          alt={card.title} // Додано описовий alt
          layout='responsive'
          width={16}
          height={9}
          className='object-contain w-auto h-auto'
        />
      </figure>

      <p className='font-fixel font-normal text-5 mb-1'>
        {card.author.fullname}
      </p>

      <h3 className={`font-fixel font-medium  text-[#1F1F1F] text-5 mb-1`}>
        {card.title}
      </h3>

      <p className='font-fixel font-normal text-4 text-gray-700 mb-6'>
        {`${card.length_cm} см x ${card.width_cm} см`}
      </p>

      <p
        className={`text-[#1F1F1F] text-5 mb-6 font-fixel font-medium`}
        aria-label={`Ціна: ${card.price} гривень`}
      >
        ${card.price}
      </p>
      <LinkButton cardId={Number(card.id)} className='w-full' variant='solid'>
        Переглянути картину
      </LinkButton>
    </article>
  );
}
