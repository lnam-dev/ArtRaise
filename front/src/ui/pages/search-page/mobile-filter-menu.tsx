import React from 'react';
import FilterMenu from "~/ui/pages/search-page/filter-menu";
import Button from "~/ui/components/button/button";
import {useModal} from "~/ui/components/modal/ModalProvider";
import {useRouter} from "next/navigation";
import {useAppSelector} from "~/store/client/hooks";
import {getFilteredUrlParamsFromFilterState} from "~/ui/pages/search-page/func";

type Props = {}

const MobileFilterMenu: React.FC<Props> = ({}) => {
    const { hideModal} = useModal();
    const router = useRouter();
    const searchFilterState = useAppSelector(state => state.searchPageReducer);
    const onSearchHandler = () => {
        router.push(`/ua/search/?${getFilteredUrlParamsFromFilterState(searchFilterState)}`);
        hideModal();
    }
    return (
        <div className={"flex flex-col justify-center items-center gap-3"}><FilterMenu
            className={"max-w-72 max-h-96 overflow-y-auto"}/>
            <Button
                onClick={onSearchHandler}
                className="w-40"
                variant="dark">
                Пошук
            </Button></div>
    );
};

export default MobileFilterMenu;
