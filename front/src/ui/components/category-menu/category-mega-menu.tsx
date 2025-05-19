// 'use client';

// import { useState, useEffect } from 'react';
// import { Category } from './category';
// import ArrowRight from '~/assets/arrow-right.svg';
// import axios from 'axios';

// const initialCategories = [
//   {
//     title: 'Нові надходження',
//     type: '',
//     endpoint: 'http://localhost:8000/api/artpieces',
//     count: 0,
//   },
//   {
//     title: 'Живопис',
//     type: 'painting',
//     endpoint: 'http://localhost:8000/api/artpieces/?type=painting',
//     count: 0,
//   },
//   {
//     title: 'Скульптура',
//     type: 'sculpture',
//     endpoint: 'http://localhost:8000/api/artpieces/?type=sculpture',
//     count: 0,
//   },
//   {
//     title: 'Графіка',
//     type: 'graphics',
//     endpoint: 'http://localhost:8000/api/artpieces/?type=graphics',
//     count: 0,
//   },
//   {
//     title: 'Архітектура',
//     type: 'architecture',
//     endpoint: 'http://localhost:8000/api/artpieces/?type=architecture',
//     count: 0,
//   },
//   {
//     title: 'Прикладне мистецтво',
//     type: 'aplied_art',
//     endpoint: 'http://localhost:8000/api/artpieces/?type=aplied_art',
//     count: 0,
//   },
//   {
//     title: 'Дизайн',
//     type: 'design',
//     endpoint: 'http://localhost:8000/api/artpieces/?type=design',
//     count: 0,
//   },
// ];

// export const CategoryMegaMenu = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [activeIndex, setActiveIndex] = useState<number | null>(0);
//   const [categories, setCategories] = useState(initialCategories);

//   const openMenu = () => {
//     setIsOpen(true);
//     setActiveIndex(0);
//   };

//   const closeMenu = () => {
//     setIsOpen(false);
//     setActiveIndex(0);
//   };

//   const handleCategoryClick = (index: number) => {
//     if (index === activeIndex) {
//       setActiveIndex(null);
//     } else {
//       setActiveIndex(index);
//     }
//   };

//   useEffect(() => {
//     if (isOpen) {
//       fetchCategoryCounts();
//     }
//   }, [isOpen]);

//   const fetchCategoryCounts = async () => {
//     try {
//       const updated = await Promise.all(
//         categories.map(async (cat) => {
//           const res = await axios.get(cat.endpoint);
//           return {
//             ...cat,
//             count: res.data.length,
//           };
//         })
//       );
//       setCategories(updated);
//     } catch (error) {
//       console.error('Помилка при підрахунку творів:', error);
//     }
//   };

//   return (
//     <div className='relative text-[#F0F0F4] transition-all duration-300 ease-out hover:border-b-4 hover:border-white xl:text-[1rem] lg:text-[0.75rem]'>
//       <button onClick={openMenu} className='2xl:text-[1.25rem]'>
//         Категорії
//       </button>

//       {isOpen && (
//         <div
//           className='fixed inset-0 bg-black/50 backdrop-blur-md flex justify-center items-center overflow-hidden'
//           onClick={closeMenu}
//         >
//           <div
//             className=' shadow-lg w-3/4 max-w-4xl relative flex max-h-[447px]' // ПОДУМАТИ ТАК ЩОБ КОНТЕЙНЕР БУВ ПЕВНОЇ ВИСОТИ
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className='bg-white w-1/3 h-auto border-r-1 border-[#62636D] '>
//               {categories.map((category, index) => {
//                 const isActive = activeIndex === index;
//                 return (
//                   <div
//                     key={index}
//                     className={`flex justify-between px-4 py-3 border-b-1 border-[#62636D] transition-colors duration-200 cursor-pointer ${
//                       isActive ? 'bg-[#1F1F1F]' : ''
//                     }`}
//                     onClick={() => handleCategoryClick(index)}
//                   >
//                     <div
//                       className={`flex flex-col font-namu transition-colors duration-200 ${
//                         isActive ? 'text-white' : 'text-[#62636D]'
//                       }`}
//                     >
//                       <p className='lg:text-[14px]'>{category.title}</p>
//                       <p className='lg:text-[12px]'>
//                         {category.count ?? '...'} робіт
//                       </p>
//                     </div>
//                     <ArrowRight
//                       width={32}
//                       height={32}
//                       fill={isActive ? '#FFF' : '#62636D'}
//                     />
//                   </div>
//                 );
//               })}
//             </div>

//             <div className='flex-1 '>
//               <Category closeMenu={closeMenu} activeIndex={activeIndex} />
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
