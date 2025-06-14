import React, {FC, useState} from 'react';
import FilterTag from "~/ui/components/filter-tag/filter-tag";
type Props = {
    tags: string[];//arrays of tag
    onSelectTag: (tag: string) => void;//callback to setSelectedTag in parent component
}
const TagsMenu:FC<Props> = ({tags, onSelectTag}) => {
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    return (
            <div className="flex gap-2 flex-nowrap overflow-x-auto max-w-full py-5">
                {tags.map((tag,index) => (<FilterTag isSelected={index === selectedIndex}
                                                     onClick={()=> {
                                                         setSelectedIndex(index)
                                                         onSelectTag(tag)
                                                     }}
                                                     key={tag}>{tag}</FilterTag>))}
            </div>
    );
};

export default TagsMenu;