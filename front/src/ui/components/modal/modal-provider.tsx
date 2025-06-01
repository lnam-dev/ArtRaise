"use client";

import { createContext, ReactNode, useState } from "react";
import BaseModalWindow from "~/ui/components/modal/modal-base-window";

interface ModalContextProps {
	showModal: (content: ReactNode) => void;
	hideModal: () => void;
}

interface ModalProviderProps {
	children: ReactNode;
}

export const ModalContext = createContext<ModalContextProps | undefined>(
	undefined
);

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
	const [content, setContent] = useState<ReactNode | null>(null);
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const showModal = (content: ReactNode) => {
		setContent(content);
		setIsOpen(true);
	};

	const hideModal = () => {
		setIsOpen(false);
		setContent(null);
	};

	return (
		<ModalContext.Provider value={{ showModal, hideModal }}>
			{children}
			<BaseModalWindow isActive={isOpen} setIsActive={setIsOpen}>
				{content}
			</BaseModalWindow>
		</ModalContext.Provider>
	);
};
