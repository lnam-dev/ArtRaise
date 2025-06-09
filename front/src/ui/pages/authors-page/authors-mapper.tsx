"use client"
import SegmentTitle from "~/ui/components/segment-title/segment-title";
import AuthorCard from "~/ui/components/author-card/author-card";
import React, {FC, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "~/store/client/hooks";
import {setAuthors} from "~/store/client/slices/AuthorsPageSlice";
import {TAuthor} from "~/types";

const AuthorsMapper: FC<{ authors: TAuthor[] }> = ({authors}) => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(setAuthors(authors));
    }, []);
    const authorsPageState = useAppSelector((state) => state.authorsPageReducer);
    return (
        <>
          {
              Object.keys(authorsPageState.mapLetterAuthor).map((letter, index) => {
                  return (
                      <div key={letter}>
                          <SegmentTitle>{letter}</SegmentTitle>
                          <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 xl:columns-4 space-y-12 py-4">
                              {authorsPageState.mapLetterAuthor[letter].map(
                                  (artist, index) => (
                                      <AuthorCard author={artist} key={index}/>
                                  )
                              )}
                          </div>
                      </div>
                  );
              })
          }
        </>
    )
}
export default AuthorsMapper;
