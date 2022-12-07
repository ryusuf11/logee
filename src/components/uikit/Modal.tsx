import React from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  return (
    <>
      <div
        id="modalPlain"
        className={`modal ${isOpen ? 'modal--open' : ''}`}
        role="modal"
      >
        <div className="modal__content">
          <div className="modal__header">
            <span className="modal__close" onClick={onClose}>
              ×
            </span>
            <h3 className="modal__title">{title}</h3>
          </div>
          <div className="modal__body">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Modal;
