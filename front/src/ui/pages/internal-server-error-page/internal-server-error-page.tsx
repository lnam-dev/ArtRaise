"use client";
import ButtonArrow from "~/ui/components/button/button-arrow";
import React from "react";
import { useRouter } from "next/navigation";

type Props = {
	message?: string;
};

const InternalServerErrorPage: React.FC<Props> = ({ message }) => {
	const router = useRouter();
	return (
		<main className="container mx-auto mobile-spacing h-[100vh]">
			<div className="flex items-center h-full">
				<div className="w-full lg:w-[45%] ml-auto">
					<h1 className="font-namu text-10 lg:text-12 leading-normal">
						Виникла невідома помилка
					</h1>
					<p className="font-fixel font-normal text-4 leading-normal mb-[3.75rem]">
						{message}
					</p>
					<ButtonArrow
						className="w-full bg-black-950"
						onClick={() => router.back()}
						variant="light">
						Повернутися назад
					</ButtonArrow>
					<ButtonArrow
						className="mt-8 w-full bg-black-950"
						onClick={() => router.push("/ua")}
						variant="light">
						На головну
					</ButtonArrow>
				</div>
			</div>
		</main>
	);
};

export default InternalServerErrorPage;
