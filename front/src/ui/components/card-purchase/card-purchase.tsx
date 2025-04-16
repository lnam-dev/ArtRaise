'use client';

import Image from 'next/image';
import LinkButton from './link-button';
import { TArtPiece } from '~/types';
import { useArtPiece } from '~/ui/hooks/useArtpPieces';

interface CardPurchaseProps {
  card: TArtPiece;
}

export default function CardPurchase({ card, ...props }: CardPurchaseProps) {
  const path = `/products/${Number(card.id)}`;
  return (
    <article className='break-inside-avoid' {...props}>
      <figure className='relative w-full aspect-[16/9] mb-2'>
        <Image
          src={card.image_artpiece ?? process.env.DEFAULT_IMAGE}
          alt={card.title}
          layout='responsive'
          width={16}
          height={9}
          className='object-cover'
        />
      </figure>
      <p className='font-fixel font-normal text-5 mb-1'>
        {card.author.fullname}
      </p>
      <h3 className='font-fixel font-medium text-5 mb-1'>{card.title}</h3>
      <p className='font-fixel font-normal text-4 text-gray-700 mb-6'>
        {`${card.length_cm} см x ${card.width_cm} см`}
      </p>
      <p
        className='font-fixel font-medium text-5 mb-6'
        aria-label={`Ціна: ${card.price} гривень`}
      >
        &#8372;{card.price}
      </p>
      <LinkButton href={path} className='w-full' variant='solid'>
        Переглянути картину
      </LinkButton>
    </article>
  );
}
