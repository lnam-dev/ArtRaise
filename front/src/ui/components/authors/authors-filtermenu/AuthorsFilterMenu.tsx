"use client"
import React, {FC, useState} from 'react';
import FilterDropdown from "~/ui/components/search-bar/filter-dropdown";
import {ChevronDown} from "lucide-react";
import FilterTag from "~/ui/components/tag/filter-tag/filter-tag";
import LettersMenu from "~/ui/components/authors/authors-filtermenu/LettersMenu";
import {useAppDispatch, useAppSelector} from "~/store/client/hooks";
import {setSelectedLetterIndex} from "~/store/client/slices/AuthorsPageSlice";

const AuthorsFilterMenu:FC = () => {
    const [selectedTypeSort, setSelectedTypeSort] = useState<string>("За алфавітом");
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const typesSort = ["За зростанням", "За спаданням", 'За алфавітом', "Найновіші"]
    const authorsPageState = useAppSelector(state => state.authorsPageReducer);
    const dispatch = useAppDispatch();
    const selectLetterIndexHandler = (letterIndex:number) => {
        dispatch(setSelectedLetterIndex(letterIndex));
    }
    return (
        <div className={"w-full"}>
            <div className={"flex flex-wrap items-center gap-4 justify-between"}>
                <h1 className="font-namu text-6 lg:text-8 text-black col-span-3">Всі автори</h1>
                <FilterDropdown onSelect={setSelectedTypeSort} options={typesSort} isOpen={isOpen} toggle={() => setIsOpen(!isOpen)}>{
                    <div className={"flex flex-row gap-3 items-center"}>
                        <p className={"hidden md:flex "}>Сортувати</p>
                        <ChevronDown className={`transition duration-500 ${isOpen ? "-rotate-180" : "rotate-0"}`}/>
                    </div>
                }</FilterDropdown>
            </div>
            <LettersMenu availableLetters={authorsPageState.availableLetters}
                         selectedLetterIndex={authorsPageState.selectedLetterIndex}
                         setSelectedLetterIndex={selectLetterIndexHandler}/>
        </div>
    );
};

export default AuthorsFilterMenu;