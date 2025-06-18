"use client";

import React, { useState, useEffect } from "react";
import Link from "~/bridge/ui/Link";
import useDevice from "~/ui/hooks/useDevice";
import SearchMobile from "~/assets/search-mobile.svg";
import SearchPC from "~/assets/search-pc.svg";
import Arrow from "~/assets/arrow-right-mobile-menu.svg";
import HeaderSwitchLang from "./header-switch-lang";
import Burger from "~/assets/burger-menu.svg";
import { usePathname } from "next/navigation";

import "./header.scss";
import { CategoryMegaMenu } from "../../category-menu/category-mega-menu";

export const Header = () => {
  const { isDesktop } = useDevice();
  const currentPath = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) =>
    path === currentPath.split("/").filter(Boolean)[1];

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [currentPath]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="flex w-full h-10 xl:h-[3.5rem] lg:h-[3.75rem] bg-gray-950/90 backdrop-blur-sm text-white fixed top-0 left-0 z-50">
      <div className="relative w-full xl:static">
        <div className="container static flex w-full h-full pr-4 mx-auto xl:pr-0 2xl:relative">
          <Link
            to="/"
            className="font-fixel font-medium text-[3.25rem] inline-block leading-none tracking-[-0.05em] md:w-[10rem] lg:text-[4rem] xl:text-[4.65rem] xl:after:content-['©'] absolute left-0 xl:-left-1 -top-2"
          >
            ARTRAISE
          </Link>

          <nav className="absolute flex flex-row hidden h-full transform -translate-x-1/2 left-1/2 lg:flex">
            <Link
              to={"authors"}
              className={`link ${isActive("authors") ? "link--active" : ""}`}
            >
              Автори
            </Link>
            <Link
              to={"categories"}
              className={`link ${isActive("categories") ? "link--active" : ""}`}
            >
              Категорії
            </Link>
            <Link
              to={"about-fund"}
              className={`link ${isActive("about-fund") ? "link--active" : ""}`}
            >
              Про фонд
            </Link>
            <Link
              to={"how-to-buy"}
              className={`link ${isActive("how-to-buy") ? "link--active" : ""}`}
            >
              Як купити?
            </Link>
            <Link
              to={"questions-and-answers"}
              className={`link ${
                isActive("questions-and-answers") ? "link--active" : ""
              }`}
            >
              Q&A
            </Link>
          </nav>

          <div className="flex items-center h-full gap-4 ml-auto lg:gap-10">
            <Link to={"/search"} className="hover_button__light">
              {!isDesktop ? <SearchMobile /> : <SearchPC />}
            </Link>
            {isDesktop && <HeaderSwitchLang />}

            {!isDesktop && (
              <button
                onClick={toggleMobileMenu}
                className="relative z-50 flex flex-col items-center justify-center w-6 h-6 hover_button__light"
                aria-label="Toggle mobile menu"
              >
                <div className="relative flex flex-col justify-center w-6 h-6">
                  <span
                    className={`absolute block h-0.5 w-6 bg-white transform transition-all duration-300 ease-in-out ${
                      isMobileMenuOpen
                        ? "rotate-45 translate-y-0"
                        : "rotate-0 -translate-y-1.5"
                    }`}
                  />
                  <span
                    className={`absolute block h-0.5 w-6 bg-white transform transition-all duration-300 ease-in-out ${
                      isMobileMenuOpen ? "opacity-0" : "opacity-100"
                    }`}
                  />
                  <span
                    className={`absolute block h-0.5 w-6 bg-white transform transition-all duration-300 ease-in-out ${
                      isMobileMenuOpen
                        ? "-rotate-45 translate-y-0"
                        : "rotate-0 translate-y-1.5"
                    }`}
                  />
                </div>
              </button>
            )}
          </div>
        </div>

        {isMobileMenuOpen && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden top-2.5rem "
              onClick={closeMobileMenu}
            />
            <nav
              className={`fixed left-0 w-full bg-white z-50 lg:hidden transform transition-transform duration-300 ease-in-out top-2.5rem h-screen ${
                isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
              }`}
            >
              <div className="p-4 space-y-6 max-h-[calc(100vh-2.5rem)] overflow-y-auto">
                <div className="flex flex-col text-[#1F1F1F] space-y-5">
                  <Link
                    to={"/authors"}
                    className={`flex items-center justify-between py-2 transition-colors border-b border-transparent hover:border-gray-200 ${
                      isActive("authors")
                        ? "text-gray-900 font-medium"
                        : "hover:text-gray-700"
                    }`}
                    onClick={closeMobileMenu}
                  >
                    <span className="text-lg transition-colors font-namu">
                      Автори
                    </span>
                    <Arrow className="text-gray-400 transition-transform hover:translate-x-1" />
                  </Link>

                  <Link
                    to={"/categories"}
                    className={`flex items-center justify-between py-2 transition-colors border-b border-transparent hover:border-gray-200 ${
                      isActive("categories")
                        ? "text-gray-900 font-medium"
                        : "hover:text-gray-700"
                    }`}
                    onClick={closeMobileMenu}
                  >
                    <span className="text-lg transition-colors font-namu">
                      Категорії
                    </span>
                    <Arrow className="text-gray-400 transition-transform hover:translate-x-1" />
                  </Link>
                </div>

                <hr className="border-[#B9BBC8]" />

                <div className="flex flex-col space-y-5 text-[#1F1F1F]">
                  <Link
                    to={"/how-to-buy"}
                    className={`flex items-center justify-between py-2 transition-colors border-b border-transparent hover:border-gray-200 ${
                      isActive("how-to-buy")
                        ? "text-gray-900 font-medium"
                        : "hover:text-gray-700"
                    }`}
                    onClick={closeMobileMenu}
                  >
                    <span className="text-lg transition-colors font-namu">
                      Як купити?
                    </span>
                    <Arrow className="text-gray-400 transition-transform hover:translate-x-1" />
                  </Link>

                  <Link
                    to={"/questions-and-answers"}
                    className={`flex items-center justify-between py-2 transition-colors border-b border-transparent hover:border-gray-200 ${
                      isActive("questions-and-answers")
                        ? "text-gray-900 font-medium"
                        : "hover:text-gray-700"
                    }`}
                    onClick={closeMobileMenu}
                  >
                    <span className="text-lg transition-colors font-namu">
                      Q&A
                    </span>
                    <Arrow className="text-gray-400 transition-transform hover:translate-x-1" />
                  </Link>

                  <Link
                    to={"/about-fund"}
                    className={`flex items-center justify-between py-2 transition-colors border-b border-transparent hover:border-gray-200 ${
                      isActive("about-fund")
                        ? "text-gray-900 font-medium"
                        : "hover:text-gray-700"
                    }`}
                    onClick={closeMobileMenu}
                  >
                    <span className="text-lg transition-colors font-namu">
                      Про фонд
                    </span>
                    <Arrow className="text-gray-400 transition-transform hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </nav>
          </>
        )}
      </div>
    </header>
  );
};
