"use client"
import React, {useEffect, useState} from 'react';
import AuthorsFilterMenu from "~/ui/components/authors/authors-filtermenu/AuthorsFilterMenu";
import {TAuthor} from "~/types";
import SegmentTitle from "~/ui/components/segment-title/segment-title";
import axios from "axios";
import {getFirstLettersOfAuthorsName, getMapOfLettersAuthors} from "~/app/[langstore]/authors/functionsAuthor";
import AuthorCard from "~/ui/components/author-card/author-card";

const Home = () => {
    const [authors, setAuthors] = useState<TAuthor[]>([])
    const [letterAuthors, setLetterAuthors] = useState<Record<string, TAuthor[]>>({});
    const [availableLetters, setAvailableLetters] = useState<string[]>([]);
    useEffect(
        () => {
            const fetchUsers = async () => {
                const response = await axios.get(`http://localhost:8000/api/authors`);
                const authorsData: TAuthor[] = response.data;
                setAuthors(authorsData);
                const availableLettersData = getFirstLettersOfAuthorsName(authorsData);
                setAvailableLetters(availableLettersData);
                setLetterAuthors(getMapOfLettersAuthors(authorsData, availableLettersData));
            }
            fetchUsers();
        }, []
    )
    return (
        <div className={"font-namu mt-16 grid grid-cols-4 gap-x-[1rem] w-full h-fit auto-rows-auto px-[3vw]"}>
            <div className={"col-span-full"}>
                <AuthorsFilterMenu availableLetters={availableLetters}/>
                {availableLetters.map(letter => (
                    <div key={letter}>
                        <SegmentTitle>{letter}</SegmentTitle>
                        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 xl:columns-4 space-y-12 py-4">
                            {letterAuthors[letter].map((artist, index) => <AuthorCard author={artist} key={index}/>)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;