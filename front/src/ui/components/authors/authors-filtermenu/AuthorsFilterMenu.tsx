"use client"
import React, {FC, useState} from 'react';
import FilterDropdown from "~/ui/components/search-bar/filter-dropdown";
import {ChevronDown} from "lucide-react";
import FilterTag from "~/ui/components/filter-tag/filter-tag";
import LettersMenu from "~/ui/components/authors/authors-filtermenu/LettersMenu";
type Props = {
    availableLetters: string[];
}
const AuthorsFilterMenu:FC<Props> = ({availableLetters}) => {
    const [selectedTypeSort, setSelectedTypeSort] = useState<string>("За алфавітом");
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const typesSort = ["За зростанням", "За спаданням", 'За алфавітом', "Найновіші"]
    return (
        <div className={"w-full"}>
            <div className={"flex flex-wrap items-center gap-4 justify-between"}>
                <h1 className="font-namu text-6 lg:text-8 text-black col-span-3">
                    Всі автори
                </h1>
                {/*sortdropdown*/}
                <FilterDropdown onSelect={setSelectedTypeSort} options={typesSort} isOpen={isOpen}
                                toggle={() => setIsOpen(!isOpen)}>{
                    <div className={"flex flex-row gap-3 items-center"}>
                        <p className={"hidden md:flex "}>Сортувати</p>
                        <ChevronDown className={`transition duration-500 ${isOpen ? "-rotate-180" : "rotate-0"}`}/>
                    </div>
                }</FilterDropdown>
            </div>
            <LettersMenu availableLetters={availableLetters}/>
        </div>
    );
};

export default AuthorsFilterMenu;