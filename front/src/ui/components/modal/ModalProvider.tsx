"use client"
import {createContext, ReactNode, useContext, useState} from 'react'
import ModalWindow from "~/ui/components/modal/ModalWindow";

interface ModalContextProps {
    showModal: (content: ReactNode) => void;
    hideModal: () => void;
}

interface ModalProviderProps {
    children: React.ReactNode;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);


export const ModalProvider: React.FC<ModalProviderProps> = ({children}) => {
    const [content, setContent] = useState<ReactNode | null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const showModal = (content: ReactNode) => {
        setContent(content);
        setIsOpen(true)
    }
    const hideModal = () => {
        setIsOpen(false)
        setContent(null)
    }


    return (
        <ModalContext.Provider value={{showModal, hideModal}}>
            {children}
                <ModalWindow isActive={isOpen} setIsActive={setIsOpen}>
                    {content}
                </ModalWindow>
        </ModalContext.Provider>

    )
}

//hideModal() showModal()
export const useModal = (): ModalContextProps => {
    const context = useContext(ModalContext);
    if (!context) {
        console.error('use modal must be in modal provider!')
        throw new Error('useModal must be in modal provider!')
    }
    return context;
}
