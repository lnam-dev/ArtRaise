import React from 'react';

interface SearchParamsProps {
    title?: string,
    price_min?: string,
    price_max?: string,
    price_range?: string,
    type?: string,
    material?: string,
    theme?: string,
    style?: string,
    author?: string,
}

type Props = {}
const getData = async () => {

}
const Page = async ({params}: { params: Promise<SearchParamsProps> }) => {
    const filterTags = await params;
    console.log(filterTags);
    return (
        <div>
            SEARCH
        </div>
    );
};

export default Page;
