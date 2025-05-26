"use client"
import React from 'react';
import {useModal} from "~/ui/components/modal/ModalProvider";
import DefaultTag from "~/ui/components/tag/default-tag";
import FilterIcon from "~/assets/filter-icon.svg";
import MobileFilterMenu from "~/ui/pages/search-page/mobile-filter-menu";
import FilterDropdown from "~/ui/components/search-bar/filter-dropdown";
import SearchpageSortSelector from "~/ui/pages/search-page/searchpage-sort-selector";
type Props = {
    className?: string;
}
const MobileFilterNavigation: React.FC<Props> = ({className}) => {
    const {showModal} = useModal();
    return (
        <div className={`w-full flex flex-row items-center justify-between px-4 ${className}`}>
            <DefaultTag onClick={()=> showModal(<MobileFilterMenu/>)}><FilterIcon/></DefaultTag>
            <SearchpageSortSelector/>
        </div>
    );
};

export default MobileFilterNavigation;
