import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [title, setTitle] = useState("");

    const openModal = (title = "", content) => {
        setTitle(title);
        setModalContent(content);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalContent(null);
        setTitle("");
    };

    return (
        <ModalContext.Provider value={{ isModalOpen, openModal, closeModal, title, modalContent }}>
            {children}
        </ModalContext.Provider>
    );
};
