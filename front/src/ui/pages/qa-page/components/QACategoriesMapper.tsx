import React from 'react';
import {TQuestionCategory} from "~/types";
import QACategory from "~/ui/pages/qa-page/components/QACategory";

type Props = {
    categories: TQuestionCategory[]
}

const QaCategoriesMapper: React.FC<Props> = ({categories}) => {
    return (
        <ul className={"col-span-full"}>
            <h2 className={`my-8 md:my-18 text-8 md:text-12 md:text-nowrap `}>Зазвичай запитують:</h2>
            {categories.map((category, id) => {
                return (
                    <QACategory key={category.name} category={category}/>
                )
            })}
        </ul>
    );
};

export default QaCategoriesMapper;
