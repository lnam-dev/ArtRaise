import React from 'react';
import SortIcon from "~/assets/sort-icon.svg";
import DefaultTag from "~/ui/components/tag/default-tag";

type Props = {

}

const SearchpageSortSelector: React.FC<Props> = ({  }) => {
  return (
    <DefaultTag><SortIcon/></DefaultTag>
  );
};

export default SearchpageSortSelector;
