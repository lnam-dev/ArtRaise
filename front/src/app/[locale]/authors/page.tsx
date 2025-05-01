import React from "react";
import {TAuthor} from "~/types";
import AuthorsPage from "~/ui/pages/authors-page/authors-page";


const getAuthorsData = async (): Promise<TAuthor[]> => {
	try {
		console.log("try")
		const responseAuthors = await fetch(`${process.env.API_URL}authors`);
		if (!responseAuthors.ok) {
			console.error(`Failed to fetch art pieces: ${responseAuthors.status}`);
		}
		return await responseAuthors.json() as TAuthor[];
	}catch (error) {
		console.error(`Помилка при завантаженні авторів: ${error}`);
		return [];
	}
}

const Home = async () => {
	const authors = await getAuthorsData();
	return <AuthorsPage authors={authors}/>
}

export default Home;
