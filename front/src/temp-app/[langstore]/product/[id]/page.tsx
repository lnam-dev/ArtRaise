'use client';

import { headers } from 'next/headers';
import Search from '~/ui/pages/Search';
import { CrystallizeAPI } from '~/use-cases/crystallize/read';
import { getContext } from '~/use-cases/http/utils';
import { getStoreFront } from '~/use-cases/storefront.server';

import axios from 'axios';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import LinkToAuthor from '~/assets/linkToAuthor.svg';
import { ArtDetails } from '~/ui/components/art-details/art-details';
import { Accordion } from '~/ui/components/art-details/art-details';
import Link from '~/bridge/ui/Link';
import { useAppContext } from '~/ui/app-context/provider';
import Buy from '~/assets/buy.svg';
import ArrowRight from '~/assets/whiteArrowRight.svg';
import LinkButton from '~/ui/components/card-purchase/link-button';
import { useParams } from 'next/navigation';

interface ArtPiecePage {
  id: number;
  imageSrc: string;
  price: number;
  title: string;
  author: {
    id: number;
    fullname: string;
    bio_text: string;
  };
  material: string;
  theme: string;
  style: string;
  creating_date: string;
  size: string;
  description: string;
}

export default function Page() {
  const { id } = useParams();
  const [artPieces, setArtPieces] = useState<ArtPiecePage[]>([]);
  const { path, _t } = useAppContext();

  useEffect(() => {
    if (!id) return;

    const fetchArtPieces = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/artpieces/${id}/`
        );
        const transformedData: ArtPiecePage[] = response.data
          ? [
              {
                id: response.data.id,
                author: {
                  id: response.data.author?.id,
                  fullname: response.data.author?.fullname || 'Невідомий автор',
                  bio_text: response.data.author?.bio_text || '',
                },
                imageSrc: response.data.image_artpiece,
                price: response.data.price
                  ? parseFloat(response.data.price)
                  : 0,
                title: response.data.title || 'Без назви',
                material: response.data.material,
                theme: response.data.theme,
                style: response.data.style,
                creating_date: response.data.creating_date,
                size: `${response.data.length_cm || '?'} см x ${
                  response.data.width_cm || '?'
                } см`,
                description: response.data.description,
              },
            ]
          : [];

        console.log('Отримані дані:', response.data);
        setArtPieces(transformedData);
      } catch (error) {
        console.error('Помилка при завантаженні мистецьких творів:', error);
      }
    };

    fetchArtPieces();
  }, [id]);

  //   console.log('artpieces', artPieces);
  console.log('id: ');

  return (
    <div className='container flex felx-col mt-[100px] mx-auto gap-10'>
      {artPieces.length > 0 ? (
        artPieces.map((piece) => (
          <div key={piece.id} className='flex flex-col lg:col-span-3 gap-10'>
            <div className='w-full'>
              <Image
                src={piece.imageSrc}
                alt={`Art piece ${piece.title}`}
                width={800}
                height={400}
                // fill
                // className='object-contain'
              />
            </div>

            <div className='grid lg:grid-cols-3 w-full gap-7 '>
              <div className='lg:col-span-2 lg:-mt-[5rem] bg-[#fff] opacity-[90%]'>
                <div className='mb-7'>
                  <h1 className='font-namu 2xl:text-[3rem] xl:text-[2.75rem] lg:text-[2.5rem]'>
                    {piece.title}
                  </h1>
                  <p className='flex items-center font-fixel font-medium 2xl:text-[2rem] xl:text-[1.75rem] lg:text-[1.5rem]'>
                    {piece.author.fullname}{' '}
                    <Link to={path(`/author/${piece.author.id}`)}>
                      <LinkToAuthor className='ml-3' />{' '}
                    </Link>
                  </p>
                </div>

                <ArtDetails
                  details={[
                    { label: 'Матеріал', value: piece.material },
                    { label: 'Тема', value: piece.theme },
                    { label: 'Стиль', value: piece.style },
                    { label: 'Дата створення', value: piece.creating_date },
                    { label: 'Розмір', value: piece.size },
                  ]}
                />

                <Accordion
                  accordionItems={[
                    { title: 'Опис твору', content: piece.description },
                    { title: 'Про автора', content: piece.author.bio_text },
                    { title: 'Умови придбання', content: piece.description }, // змінити на умови придбання
                    {
                      title: 'Сертифікати автентичності',
                      content: piece.description,
                    }, // змінити на сертифікати автентичності
                    { title: 'FAQ', content: piece.description }, // змінити на FAQ
                  ]}
                />
              </div>

              <div className='flex flex-col justify-start col-span-1 w-full'>
                <p className='font-fixel 2xl:text-[1.5rem] lg:text-[1.25rem] text-[#3D3D3D]'>
                  Вартість картини
                </p>
                <p className='font-namu 2xl:text-[3.5rem] xl:text-[2.75rem] lg:text-[2.5rem]'>
                  ₴{piece.price}
                </p>
                <button className='flex justify-center w-full gap-3 p-auto py-2 mt-4 font-fixel font-medium 2xl:text-[1.5rem] xl:text-[1.25rem] text-[#F0F0F4] bg-[#131315]'>
                  <Buy /> Придбати
                </button>
                <div className='mt-7'>
                  <h1 className='w-[70%] mb-4 font-fixel font-medium 2xl:text-[2rem] xl:text-[1.5rem] lg:text-[1.25rem]'>
                    Роботи інших авторів у схожій стилістиці
                  </h1>

                  <div className='flex flex-col'>
                    <div className='w-full'>
                      <Image
                        src={piece.imageSrc}
                        alt={`Art piece ${piece.title}`}
                        width={300}
                        height={200}
                        className='w-full h-auto'
                      />
                    </div>

                    <div className='flex justify-between items-center px-4 py-2 bg-[#131315]'>
                      <div className='flex flex-col space-y-2'>
                        <p className='font-fixel 2xl:text-[1.25rem] text-[#B9BBC8]'>
                          {piece.author.fullname}
                        </p>

                        <div className='2xl:text-[1.5rem]'>
                          <p className='font-namu text-[#fff]'>{piece.title}</p>
                          <p className='font-fixel text-[#B9BBC8]'>
                            {piece.size}
                          </p>
                        </div>

                        <p className='font-fixel font-medium 2xl:text-[1.5rem] text-[#F0F0F4]'>
                          ₴{piece.price}
                        </p>
                      </div>
                      <LinkButton cardId={piece.id} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Немає доступних творів мистецтва.</p>
      )}
    </div>
  );
}
