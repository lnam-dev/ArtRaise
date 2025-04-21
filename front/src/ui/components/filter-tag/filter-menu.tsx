'use client';
import React, { useState } from 'react';
import Accordion from '../accordion/accordion';
import FilterTag from './filter-tag';
import Button from '../button/button';

const genre = [''];
const category = [''];
const styles = ['Абстракція', 'Модерн', 'Експресіонізм', 'Образний'];
const themes = ['Абстракція', 'Портрет', 'Пейзаж', 'Люди', 'Тварини'];
const mediums = ['Акрил', 'Олія', 'Акварель', 'Спрей-фарба'];
const materials = [''];

const FilterMenu = () => {
  const [selectedFilters, setSelectedFilters] = useState<{
    genre: string[];
    category: string[];
    style: string[];
    theme: string[];
    medium: string[];
    materials: string[];
  }>({
    genre: [],
    category: [],
    style: [],
    theme: [],
    medium: [],
    materials: [],
  });

  const toggleFilter = (
    category: 'genre' | 'category' | 'style' | 'theme' | 'medium' | 'materials',
    value: string
  ) => {
    setSelectedFilters((prev) => {
      const alreadySelected = prev[category].includes(value);
      return {
        ...prev,
        [category]: alreadySelected
          ? prev[category].filter((item) => item !== value)
          : [...prev[category], value],
      };
    });
  };

  const resetFilters = () => {
    setSelectedFilters({
      genre: [],
      category: [],
      style: [],
      theme: [],
      medium: [],
      materials: [],
    });
  };

  const renderTags = (
    category: 'genre' | 'category' | 'style' | 'theme' | 'medium' | 'materials',
    options: string[]
  ) => {
    return (
      <div className='flex flex-wrap gap-2 mt-2'>
        {options.map((option) => (
          <FilterTag
            key={option}
            isSelected={selectedFilters[category].includes(option)}
            onClick={() => toggleFilter(category, option)}
            variant='light'
          >
            {option}
          </FilterTag>
        ))}
      </div>
    );
  };

  return (
    <div className='w-full p-4 '>
      <Accordion variant='filter' question='Жанр'>
        {renderTags('genre', genre)}
      </Accordion>
      <Accordion variant='filter' question='Категорія'>
        {renderTags('category', category)}
      </Accordion>
      <Accordion variant='filter' question='Стиль'>
        {renderTags('style', styles)}
      </Accordion>
      <Accordion variant='filter' question='Тема'>
        {renderTags('theme', themes)}
      </Accordion>
      <Accordion variant='filter' question='Засіб вираження'>
        {renderTags('medium', mediums)}
      </Accordion>
      <Accordion variant='filter' question='Матеріали'>
        {renderTags('materials', materials)}
      </Accordion>

      <div className='flex  gap-3 mt-6'>
        <Button
          includeArrow={false}
          variant='light'
          className='w-full bg-[#F0F0F4] text-[#131315] text-[1rem]'
        >
          Показати 120 робіт
        </Button>
        <button
          //   variant='outline'
          className='w-full border-1 border-[#B9BBC8] bg-[#232327] text-[#B9BBC8] text-[1rem]'
          onClick={resetFilters}
        >
          Скинути
        </button>
      </div>
    </div>
  );
};

export default FilterMenu;
