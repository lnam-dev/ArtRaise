'use client';

<<<<<<< HEAD
import Link from '~/bridge/ui/Link';
import { SearchBar } from '../../search/search-bar';
import { BasketButton } from '../basket-button';
import { TopicNavigation } from '../topic-navigation';
import { useEffect, useState } from 'react';
import { useAppContext } from '../../../app-context/provider';
import { Image } from '@crystallize/reactjs-components';
import { Price } from '../../price';
import { LanguageSwitcher } from '../language-switcher';
import { Tree } from '../../../../use-cases/contracts/Tree';
import { TenantLogo } from '../../../lib/tenant-logo';
import useLocation from '~/bridge/ui/useLocation';
import items from 'razorpay/dist/types/items';
=======
import { useEffect, useState } from "react";
import useLocation from "~/bridge/ui/useLocation";
import Link from "next/link";
>>>>>>> 4cf1cbe5c529edc396d946439e3af0e509e55aea

import Account from '~/assets/account.svg';
import SearchMobile from '~/assets/search-mobile.svg';
import SearchPC from '~/assets/search-pc.svg';
import Arrow from '~/assets/arrow-right-mobile-menu.svg';

<<<<<<< HEAD
import { CategoryMegaMenu } from '../../category-menu/category-mega-menu';
import React from 'react';
// import BurgerMenu from "~/assets/burger-menu.svg";
import Cross from '~/assets/cross.svg';

export const Header = () => {
  const { path } = useAppContext();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isSmall, setIsSmall] = useState(false);
  const [language, setLanguage] = useState('UA');
=======
import React from "react";
import Cross from "~/assets/cross.svg";

export const Header = () => {
	const location = useLocation();
	const [isOpen, setIsOpen] = useState(false);
	const [isSmall, setIsSmall] = useState(false);
	const [language, setLanguage] = useState("UA");
>>>>>>> 4cf1cbe5c529edc396d946439e3af0e509e55aea

  const changeLanguage = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const paths = [
    { path: '/authors', name: language === 'UA' ? 'Автори' : 'Authors' },
    {
      path: '/categories',
      name: language === 'UA' ? 'Категорії' : 'Categories',
    },
    {
      path: '/about-fond',
      name: language === 'UA' ? 'Про Фонд' : 'About the Fund',
    },
    {
      path: '/how-to-buy',
      name: language === 'UA' ? 'Як купити?' : 'How to buy?',
    },
    {
      path: '/qa',
      name: 'Q&A',
    },
  ];

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

<<<<<<< HEAD
  useEffect(() => {
    const checkSize = () => setIsSmall(window.innerWidth < 640);
    checkSize(); // Викликаємо одразу
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);
=======
	useEffect(() => {
		const checkSize = () => setIsSmall(window.innerWidth < 640);
		checkSize();
		window.addEventListener("resize", checkSize);
		return () => window.removeEventListener("resize", checkSize);
	}, []);
>>>>>>> 4cf1cbe5c529edc396d946439e3af0e509e55aea

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

<<<<<<< HEAD
  return (
    <header className='flex items-center w-full xl:h-[3.5rem] lg:h-[3rem] h-[2.25rem] sm:bg-[#232327E5] bg-[#131315] text-white fixed top-0 left-0 z-50'>
      <div className='container flex justify-between items-center mx-auto  w-full'>
        {/* Логотип */}
        <Link
          to={path('/')}
          className='xl:text-[5rem] xl:h-[6rem] 
=======
	return (
		<header className="flex items-center w-full xl:h-[3.5rem] lg:h-[3rem] h-[2.25rem] sm:bg-[#232327E5] bg-[#131315] text-white fixed top-0 left-0 z-50">
			<div className="container flex justify-between items-center mx-auto  w-full">
				{/* Логотип */}
				<Link
					href={"/"}
					className="xl:text-[5rem] xl:h-[6rem] 
>>>>>>> 4cf1cbe5c529edc396d946439e3af0e509e55aea

           lg:text-[4rem] lg:leading-[6rem] lg:h-[6rem] lg:-mt-[0.625rem] lg:-ml-[0.875rem] 
           tracking-[-5%] font-medium 
           md:text-[2.75rem] md:leading-[2.75rem] md:h-[3.5rem] md:w-[160px] md:mt-[0.75rem] md:ml-[1.5rem]
           sm:text-[2.5rem] sm:leading-[2.5rem] 
<<<<<<< HEAD
           text-[2.25rem] leading-[2rem]'
        >
          ARTRAISE{isSmall ? '' : '©'}
        </Link>
        <nav className='xl:h-[3.5rem] lg:h-[3rem] hidden lg:flex space-x-6 px-4 justify-center pt-5'>
          {paths.map((item) => {
            const isActive = location.pathname === path(item.path);
            if (item.path === '/authors') {
              return (
                <React.Fragment key={item.path}>
                  <Link
                    to={path(item.path)}
                    className={`text-[#F0F0F4] transition-all duration-300 ease-out hover:border-b-4 hover:border-white 2xl:text-[1.25rem] xl:text-[1rem] lg:text-[0.75rem] ${
                      isActive ? 'border-b-4' : 'border-transparent'
                    }`}
                  >
                    {item.name}
                  </Link>
                  <CategoryMegaMenu />
                </React.Fragment>
              );
            }

            return item.path !== '/categories' ? (
              <Link
                key={item.path}
                to={path(item.path)}
                className={`text-[#F0F0F4] transition-all duration-300 ease-out hover:border-b-4 hover:border-white 2xl:text-[1.25rem] xl:text-[1rem] lg:text-[0.75rem] ${
                  isActive ? 'border-b-4' : 'border-transparent'
                }`}
              >
                {item.name}
              </Link>
            ) : null;
          })}
        </nav>

        {/* Панель управління (пошук, обране, акаунт, перемикач мови) */}
        <div className='flex items-center lg:gap-[2.5rem] gap-[1rem]'>
          {isSmall ? (
            <Link to={path('/search')} className='hover:opacity-75'>
              <SearchMobile />
            </Link>
          ) : (
            <Link to={path('/search')} className='hover:opacity-75'>
              <SearchPC />
            </Link>
          )}

          <div className='hidden sm:flex items-center gap-[1.5rem]'>
            <Link to={path('/cart')} className='hover:opacity-75'>
              <Account />
            </Link>

            {/* <LanguageSwitcher /> */}
            {/* Кнопка переключення мови */}
            <div className='flex lg:w-[3.5rem] lg:h-[1.5rem] gap-2 hidden'>
              <button
                className={`${
                  language === 'UA' ? 'text-white' : 'text-[#62636D]'
                }`}
                onClick={() => changeLanguage('UA')}
              >
                UA
              </button>

              <button
                className={`${
                  language === 'EN' ? 'text-white' : 'text-[#62636D]'
                }`}
                onClick={() => changeLanguage('EN')}
              >
                EN
              </button>
            </div>
          </div>

          {/* Кнопка мобільного меню */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className='lg:hidden text-white text-[1.5rem] w-[1.5rem] h-[1.5rem]'
          >
            {/* {!isOpen ? <BurgerMenu /> : <Cross />} */}
          </button>
        </div>
      </div>
=======
           text-[2.25rem] leading-[2rem]">
					ARTRAISE{isSmall ? "" : "©"}
				</Link>
				<nav className="xl:h-[3.5rem] lg:h-[3rem] hidden lg:flex space-x-6 px-4 justify-center pt-5">
					{paths.map((item) => {
						const isActive = location.pathname === item.path;
						if (item.path === "/authors") {
							return (
								<React.Fragment key={item.path}>
									<Link
										href={item.path}
										className={`text-[#F0F0F4] transition-all duration-300 ease-out hover:border-b-4 hover:border-white 2xl:text-[1.25rem] xl:text-[1rem] lg:text-[0.75rem] ${
											isActive ? "border-b-4" : "border-transparent"
										}`}>
										{item.name}
									</Link>
								</React.Fragment>
							);
						}

						return item.path !== "/categories" ? (
							<Link
								key={item.path}
								href={item.path}
								className={`text-[#F0F0F4] transition-all duration-300 ease-out hover:border-b-4 hover:border-white 2xl:text-[1.25rem] xl:text-[1rem] lg:text-[0.75rem] ${
									isActive ? "border-b-4" : "border-transparent"
								}`}>
								{item.name}
							</Link>
						) : null;
					})}
				</nav>

				{/* Панель управління (пошук, обране, акаунт, перемикач мови) */}
				<div className="flex items-center lg:gap-[2.5rem] gap-[1rem]">
					{isSmall ? (
						<Link href={"/search"} className="hover:opacity-75">
							<SearchMobile />
						</Link>
					) : (
						<Link href={"/search"} className="hover:opacity-75">
							<SearchPC />
						</Link>
					)}

					<div className="hidden sm:flex items-center gap-[1.5rem]">
						<Link href={"/cart"} className="hover:opacity-75">
							<Account />
						</Link>
					</div>

					{/* Кнопка мобільного меню */}
					<button
						onClick={() => setIsOpen(!isOpen)}
						className="lg:hidden text-white text-[1.5rem] w-[1.5rem] h-[1.5rem]"></button>
				</div>
			</div>
>>>>>>> 4cf1cbe5c529edc396d946439e3af0e509e55aea

      {/* Мобільне меню */}
      {isOpen && (
        <nav className='lg:hidden bg-[#fff] p-7 absolute top-full left-0 w-full h-screen space-y-4'>
          <div className='flex lg:w-[3.5rem] lg:h-[1.5rem] gap-2'>
            <button
              className={`underline ${language === 'UA' ? 'text-[#000]' : ''}`}
              onClick={() => changeLanguage('UA')}
            >
              UA
            </button>

            <button
              className={`underline ${language === 'EN' ? 'text-[#000]' : ''}`}
              onClick={() => changeLanguage('EN')}
            >
              EN
            </button>
          </div>

<<<<<<< HEAD
          <div className='flex flex-col text-[#1F1F1F]  space-y-5'>
            <div className='flex items-center justify-between cursor-pointer'>
              <Link to={path('/authors')}>Автори</Link>
              <Arrow />
            </div>

            <div className='flex items-center justify-between cursor-pointer'>
              <Link to={path('/categories')}>Категорії</Link>
              <Arrow />
            </div>
          </div>
=======
					<div className="flex flex-col text-[#1F1F1F]  space-y-5">
						<div className="flex items-center justify-between cursor-pointer">
							<Link href={"/authors"}>Автори</Link>
							<Arrow />
						</div>

						<div className="flex items-center justify-between cursor-pointer">
							<Link href={"/categories"}>Категорії</Link>
							<Arrow />
						</div>
					</div>
>>>>>>> 4cf1cbe5c529edc396d946439e3af0e509e55aea

          <hr className='border-[#B9BBC8]' />

<<<<<<< HEAD
          <div className='flex flex-col space-y-5 text-[#1F1F1F]'>
            <div className='flex items-center justify-between cursor-pointer'>
              <Link to={path('/how-to-buy')}>Як купити?</Link>
              <Arrow />
            </div>

            <div className='flex items-center justify-between cursor-pointer'>
              <Link to={path('/qa')}>Q&A</Link>
              <Arrow />
            </div>

            <div className='flex items-center justify-between cursor-pointer'>
              <Link to={path('/about-fond')}>Про фонд</Link>
              <Arrow />
            </div>
          </div>
        </nav>
      )}
    </header>
  );
=======
					<div className="flex flex-col space-y-5 text-[#1F1F1F]">
						<div className="flex items-center justify-between cursor-pointer">
							<Link href={"/how-to-buy"}>Як купити?</Link>
							<Arrow />
						</div>

						<div className="flex items-center justify-between cursor-pointer">
							<Link href={"/qa"}>Q&A</Link>
							<Arrow />
						</div>

						<div className="flex items-center justify-between cursor-pointer">
							<Link href={"/about-fond"}>Про фонд</Link>
							<Arrow />
						</div>
					</div>
				</nav>
			)}
		</header>
	);
>>>>>>> 4cf1cbe5c529edc396d946439e3af0e509e55aea
};
