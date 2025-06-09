import React from "react";
import { useModal } from "~/ui/hooks/useModal";
interface ownProps {
	//string that describe action in modal we need confirm or decline
	actionToConfirm: string;
	onConfirm?: () => void;
	onDecline?: () => void;
}

const ConfirmInModal: React.FC<ownProps> = ({
	actionToConfirm,
	onConfirm,
	onDecline,
}) => {
	const { hideModal } = useModal();
	return (
		<>
			<p>{actionToConfirm}</p>
			<div className="mt-5 flex justify-self-center flex-row w-full justify-center gap-3">
				<button
					className={"hover:text-green-500/50"}
					title={"Так"}
					onClick={() => {
						if (onConfirm) onConfirm();
						hideModal();
					}}
				/>
				<button
					className={"hover:text-red-600/50"}
					title={"Ні"}
					onClick={() => {
						if (onDecline) onDecline();
						hideModal();
					}}
				/>
			</div>
		</>
	);
};

export default ConfirmInModal;
