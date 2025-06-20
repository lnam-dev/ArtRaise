import ModalButtonClose from "../modal-button-close";
import Button from "../../button/button";
import { useModal } from "~/ui/hooks/useModal";

const ModalOrderSuccess = () => {
	const { hideModal } = useModal();

	return (
		<section
			role="dialog"
			aria-modal="true"
			aria-labelledby="modal-title"
			aria-describedby="modal-description"
			className="flex flex-row bg-white w-fit h-fit relative xl:max-w-[90vw] xl:max-h-[90vh]">
			<ModalButtonClose variable="light" />
			<div className="px-6 py-8 xl:p-8 flex-grow-2">
				<h1 className="font-namu font-normal text-900 text-6 xl:text-8 mb-4 leading-9">
					Дякуємо за покупку 🥳
				</h1>
				<h3 className="font-fixel font-normal text-900 text-4 xl:text-6 mb-8 leading-normal">
					З вами зв’яжеться адміністрація ArtRaise впродовж 3-х днів
				</h3>
				<Button
					variant="dark"
					className="w-full"
					href="/"
					onClick={() => hideModal()}>
					Повернутися на головну
				</Button>
			</div>
		</section>
	);
};
export default ModalOrderSuccess;
