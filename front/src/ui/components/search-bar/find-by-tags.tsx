'use client'
import React from 'react';
import SegmentTitle from "~/ui/components/segment-title/segment-title";
import DefaultTag from "~/ui/components/tag/default-tag";
import Hash from "~/assets/hash.svg";
import {TFindByTag} from "~/types";
import {useRouter} from "next/navigation";
import usePath from "~/ui/hooks/usePath";

interface Props {
    tags: TFindByTag[]
}

const FindByTags: React.FC<Props> = ({tags}) => {
    const router = useRouter();
    const pathMaker =  usePath()
    return (
        <>
            <SegmentTitle className="px-4 xl:px-0 mb-8 hidden xl:block">
                Шукайте за тегами
            </SegmentTitle>
            <div className="flex gap-2 flex-nowrap overflow-x-auto scrollbar-hide max-w-full pl-4 xl:pl-0">
                {tags.map((tag) => (
                    <DefaultTag key={tag.id} onClick={() => router.push(pathMaker(`/tag/${tag.slug}`))}>{<div className={"flex flex-row stroke-gray-950 items-center gap-2"}><Hash
                        height={12} width={12}/><p>{tag.name_ua}</p></div>}</DefaultTag>
                ))}
            </div>
        </>
    );
};

export default FindByTags;
