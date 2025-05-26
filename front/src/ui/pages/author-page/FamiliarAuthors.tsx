"use client"
import React from 'react';
import {TAuthor} from "~/types";
import AuthorCard from "~/ui/components/author-card/author-card";

type Props = {
    className?: string;
    familiarAuthors: TAuthor[];
}

const FamiliarAuthors: React.FC<Props> = ({familiarAuthors, className}) => {
    return (
        <div className={className}>
            {familiarAuthors.map((artist, index) => (
                <AuthorCard author={artist} key={index}/>
            ))}
        </div>
    );
};

export default FamiliarAuthors;
