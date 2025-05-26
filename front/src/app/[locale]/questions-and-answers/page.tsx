import React from "react";
import {TAuthor} from "~/types";
import AuthorsPage from "~/ui/pages/authors-page/authors-page";
import {MOCKED_QADATA, TQAPage} from "~/use-cases/contracts/qa-page";
import QAPage from "~/ui/pages/qa-page/qa-page";


const getQAdata = async (): Promise<TQAPage> => {
    try {
        // const responseAuthors = await fetch(`${process.env.API_URL}qa`);
        // if (!responseAuthors.ok) {
        //     console.error(`Failed to fetch art pieces: ${responseAuthors.status}`);
        // }
        // return await responseAuthors.json() as TAuthor[];
        return MOCKED_QADATA;
    }catch (error) {
        console.error(`Помилка при завантаженні FAQ: ${error}`);
        return {
            questionsCategories: [],
            frequentlyAskedQuestions: []
        };
    }
}

const Home = async () => {
    const QAdata:TQAPage = await getQAdata();
    return <QAPage {...QAdata}/>
}

export default Home;
