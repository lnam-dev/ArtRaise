"use client"
import React from 'react';
import Accordion from "~/ui/components/accordion/accordion";
import {ArtStyleArray, ArtThemeArray, ArtTypeArray, ArtTypeEnum} from "~/types/filter-types/filterenums";
import FilterTag from "~/ui/components/tag/filter-tag/filter-tag";
import {useAppDispatch, useAppSelector} from "~/store/client/hooks";
import {append} from "domutils";
import {appendFilter, removeFilter} from "~/store/client/slices/SearchPageSlice";
import {state} from "sucrase/dist/types/parser/traverser/base";

type Props = {
    className?: string;
}

const FilterMenu: React.FC<Props> = ({className}) => {
    const dispatch = useAppDispatch()
    const filterState = useAppSelector(state => state.searchPageReducer)
    return (
        <div className={` ${className}`}>
            <Accordion title={"Категорія"}>
                <div className={"flex w-full flex-wrap gap-3 mt-4"}>
                    {
                        ArtTypeArray.map((value) => {
                            const isSelected = filterState.type === value;
                            const handleOnClick = () => {
                                if (!isSelected) {
                                    dispatch(appendFilter({filterKey: 'type', filterValue: value}))
                                } else {
                                    dispatch(removeFilter({filterKey: 'type'}))
                                }
                            }
                            return (
                                <FilterTag key={value} className={`py-1`} onClick={handleOnClick}
                                           isSelected={isSelected}>
                                    {value}
                                </FilterTag>
                            )
                        })
                    }

                </div>
            </Accordion>
            <Accordion title={"Стиль"}>
                <div className={"flex w-full flex-wrap gap-3 mt-4"}>
                    {
                        ArtStyleArray.map((value) => {
                            const isSelected = filterState.style === value;
                            const handleOnClick = () => {
                                if (!isSelected) {
                                    dispatch(appendFilter({filterKey: 'style', filterValue: value}))
                                } else {
                                    dispatch(removeFilter({filterKey: 'style'}))
                                }
                            }
                            return (
                                <FilterTag key={value} className={`py-1`} onClick={handleOnClick}
                                           isSelected={isSelected}>
                                    {value}
                                </FilterTag>
                            )
                        })
                    }
                </div>
            </Accordion>
            <Accordion title={"Тема"}>
                <div className={"flex w-full flex-wrap gap-3 mt-4"}>
                    {
                        ArtThemeArray.map((value) => {
                            const isSelected = filterState.theme === value;
                            const handleOnClick = () => {
                                if (!isSelected) {
                                    dispatch(appendFilter({filterKey: 'theme', filterValue: value}))
                                } else {
                                    dispatch(removeFilter({filterKey: 'theme'}))
                                }
                            }
                            return (
                                <FilterTag key={value} className={`py-1`} onClick={handleOnClick}
                                           isSelected={isSelected}>
                                    {value}
                                </FilterTag>
                            )
                        })
                    }

                </div>
            </Accordion>
            <Accordion title={"Ціна"}>
                <div>hello</div>
            </Accordion>
            <Accordion title={"Матеріал"}>
                <div>hello</div>
            </Accordion>
            <Accordion title={"Засіб вираження"}>
                <div>hello</div>
            </Accordion>
            <Accordion title={"Розмір"}>
                <div>hello</div>
            </Accordion>
            <Accordion title={"Колір"}>
                <div>hello</div>
            </Accordion>
        </div>
    );
};

export default FilterMenu;
