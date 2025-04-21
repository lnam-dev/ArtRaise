// <<<<<<< HEAD
// import ArrowRight from '~/assets/arrow-right.svg';
// import { useState, useEffect } from 'react';
// import LinkButton from '../card-purchase/link-button';
// import Button from '../button/button';
// import { useAppContext } from '~/ui/app-context/provider';
// import MegaMenu from '~/assets/megaMenu.svg';
// import { TArtPiece } from '~/types';
// import Image from 'next/image';
// import Arrow from '~/assets/arrow-right.svg';
// import axios from 'axios';
// import CardPurchaseMegaMenu from '../card-purchase/card-purchase-mega-menu';
// import { useAllArtPieces } from '../../hooks/useAllArtPieces';
// import Cross from '~/assets/cross.svg';
// import usePath from '~/ui/hooks/usePath';
// // import FAQitem from '../faq-item/faq-item';
// =======
import ArrowRight from '~/assets/arrow-right.svg';
import { useState, useEffect } from 'react';
import LinkButton from '../card-purchase/link-button';
import Button from '../button/button';
import MegaMenu from '~/assets/megaMenu.svg';
import { TArtPiece } from '~/types';
import Image from 'next/image';
import Arrow from '~/assets/arrow-right.svg';
import axios from 'axios';
import CardPurchaseMegaMenu from '../card-purchase/card-purchase-mega-menu';
import { useAllArtPieces } from '../../hooks/useAllArtPieces';
import usePath from '~/ui/hooks/usePath';
import Cross from '~/assets/cross.svg';

const categorys = [
  {
    title: 'Нові надходження',
    type: '',
    endpoint: 'http://localhost:8000/api/artpieces',
  },
  {
    title: 'Живопис',
    type: 'painting',
    endpoint: 'http://localhost:8000/api/artpieces/?type=painting',
  },
  {
    title: 'Скульптура',
    type: 'sculpture',
    endpoint: 'http://localhost:8000/api/artpieces/?type=sculpture',
  },
  {
    title: 'Графіка',
    type: 'graphics',
    endpoint: 'http://localhost:8000/api/artpieces/?type=graphics',
  },
  {
    title: 'Архітектура',
    type: 'architecture',
    endpoint: 'http://localhost:8000/api/artpieces/?type=architecture',
  },
  {
    title: 'Прикладне мистецтво',
    type: 'aplied_art',
    endpoint: 'http://localhost:8000/api/artpieces/?type=aplied_art',
  },
  {
    title: 'Дизайн',
    type: 'design',
    endpoint: 'http://localhost:8000/api/artpieces/?type=design',
  },
];

interface CategoryProps {
  closeMenu: () => void;
  activeIndex: number | null;
}

export const Category = ({ closeMenu, activeIndex }: CategoryProps) => {
  const [activeFilter, setActiveFilter] = useState<boolean>(false);
  const [artpieces, setArtpieces] = useState<any[]>([]);
  // FIXME: Deleted function path() replace it with another one
  const path = usePath();
  const { allArtPieces } = useAllArtPieces();

  const fetchArtpieces = async (index: number) => {
    try {
      const response = await axios.get(categorys[index].endpoint);
      setArtpieces(response.data);
    } catch (error) {
      console.error('Помилка при завантаженні творів:', error);
    }
  };

  const handleCloseFilters = () => {
    setActiveFilter(!activeFilter);
  };

  useEffect(() => {
    if (activeIndex !== null && categorys[activeIndex]) {
      fetchArtpieces(activeIndex);
    } else {
      setArtpieces([]);
    }
  }, [activeIndex]);

  return (
    <div className='flex'>
      <div
        className={`w-full h-auto ${
          activeFilter ? 'bg-[#232327]' : 'bg-white'
        }`}
      >
        <div className='grid grid-cols-2 gap-0 w-full h-[4rem] border-b-1 border-[#62636D] '>
          <Button
            href={
              activeIndex !== null
                ? categorys[activeIndex].type
                  ? path(`/product?type=${categorys[activeIndex].type}`)
                  : path('/product') // Для "Нові надходження"
                : '#'
            }
            variant='light'
            disabled={activeIndex === null}
            className={`flex flex-1 justify-between items-center px-4 py-2 h-full border-r-1 border-[#62636D] ${
              artpieces.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={() => closeMenu()}
          >
            Переглянути усі
          </Button>
          <button
            className={`flex flex-1 justify-center items-center gap-2  group ${
              activeFilter
                ? 'text-[#62636D] bg-white'
                : 'text-white bg-[#1F1F1F]'
            }`}
            onClick={handleCloseFilters}
          >
            <MegaMenu
              width={32}
              height={32}
              className={activeFilter ? 'stroke-[#62636D]' : 'stroke-white'}
            />
            Фільтрувати
          </button>
        </div>

        <div className='flex flex-col max-h-[382px] overflow-y-auto scrollbar-thin scrollbar-track-gray-300 divide-y divide-[#62636D]'>
          {activeFilter ? (
            <div className='p-4'>
              {/* Фільтр-меню */}
              <div className='flex justify-center'>
                <button onClick={handleCloseFilters}>
                  <Cross />
                </button>
              </div>
              <div className='space-y-4'>
                {/* Content */}
                {/* <FAQitem question='Жанр' answer='Мистецтво' variant='light' /> */}
              </div>
            </div>
          ) : (
            <div className='flex flex-col max-h-[382px] overflow-y-auto scrollbar-thin scrollbar-track-gray-300 divide-y divide-[#62636D]'>
              {artpieces.map((artpiece) => (
                <CardPurchaseMegaMenu
                  key={artpiece.id}
                  card={artpiece}
                  onCloseMenu={closeMenu}
                />
              ))}
            </div>
          )}

          {/* {artpieces.map((artpiece) => (
            <>
              <CardPurchaseMegaMenu
                key={artpiece.id}
                card={artpiece}
                onCloseMenu={closeMenu}
              />
            </>
          ))} */}
        </div>
      </div>
    </div>
  );
};
