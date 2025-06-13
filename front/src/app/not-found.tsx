import ButtonArrow from "~/ui/components/button/button-arrow";
import "~/styles/bg-dark.css";

export default function NotFound() {
	return (
		<main className="bg-body-dark container mx-auto mobile-spacing text-white h-[100vh]">
			<div className="flex items-center h-full">
				<div className="w-full lg:w-[45%] ml-auto">
					<h1 className="font-namu text-10 lg:text-[17.5rem] leading-normal">
						404
					</h1>
					<h3 className="font-fixel font-normal text-6 leading-normal mb-8">
						Халепа:(
					</h3>
					<p className="font-fixel font-normal text-4 leading-normal mb-[3.75rem]">
						Здається, сторінка, яку ви шукаєте, не існує. <br /> Давайте
						повернемо Вас на правильний шлях
					</p>
					<ButtonArrow className="w-full" href="/" variant="light">
						Повернутися на головну
					</ButtonArrow>
				</div>
			</div>
		</main>
	);
}
