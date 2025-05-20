"use client"
import React from 'react';
import {useModal} from "~/ui/components/modal/ModalProvider";
import DefaultTag from "~/ui/components/tag/default-tag";
import FilterMenu from "~/ui/pages/search-page/filter-menu";
import ButtonArrow from "~/ui/components/button/button-arrow";
import {getFilteredUrlParamsFromObject} from "~/ui/pages/search-page/func";
import {useAppSelector} from "~/store/client/hooks";
import Button from "~/ui/components/button/button";
import {useRouter} from "next/navigation";

type Props = {
    className?: string;
}
//TODO refactor this component
const MobileFilterMenu: React.FC<Props> = ({className}) => {
    const {showModal,hideModal} = useModal();
    const router = useRouter();
    const searchFilterState = useAppSelector(state => state.searchPageReducer);
    console.log(searchFilterState)
    console.log(getFilteredUrlParamsFromObject(searchFilterState))
    return (
        <div className={`w-full flex flex-row items-center justify-between px-4 ${className}`}>
            <DefaultTag onClick={()=> showModal(<div className={"flex flex-col justify-center items-center gap-3"}><FilterMenu className={"max-w-72 max-h-96 overflow-y-auto"}/>
                <Button
                onClick={()=> {router.push(`/ua/search/?${getFilteredUrlParamsFromObject(searchFilterState)}`);hideModal();}}
                className="w-40"
                variant="dark">
                Пошук
            </Button></div>)}>FILTERS</DefaultTag>
            <DefaultTag>SORT</DefaultTag>
        </div>
    );
};

export default MobileFilterMenu;
