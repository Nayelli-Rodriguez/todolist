import React from 'react';
import { useModal } from '../Context/ModalContext';
import { TitleMedium } from './TitleMedium';

const Modal = () => {
    const { isModalOpen, closeModal, title, modalContent } = useModal();

    if (!isModalOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center px-2">
            <div className="relative mx-auto p-5 border w-96 shadow-lg rounded-xl bg-white space-y-4">
                <div className='flex justify-between'>
                    <TitleMedium>
                        {title}
                    </TitleMedium>
                    <button onClick={closeModal} className="...">X</button>
                </div>
                {modalContent}
            </div>
        </div>
    );
};

export { Modal };
