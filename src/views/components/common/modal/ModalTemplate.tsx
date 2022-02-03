import React from 'react';
import styled from 'styled-components';

interface PropsType {
  children: React.ReactNode;
  nonModal?: boolean;
  close?: () => void;
  className?: string;
}

const ModalTemplate = ({ children, nonModal, close, className }: PropsType) => {
  nonModal = Boolean(nonModal);

  const closeModal = (e: React.MouseEvent) => {
    if (nonModal) return;
    const element = e.target as HTMLElement;
    if (close && element.classList.contains('dim')) close();
  };

  return (
    <div className={className}>
      {!nonModal ? (
        <div className="dim" onClick={closeModal}>
          <div className="cont">{children}</div>
        </div>
      ) : (
        <div className="cont">{children}</div>
      )}
    </div>
  );
};

export const ModalStyle = styled(ModalTemplate)`
  .dim {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);

    &.non-modal {
      background-color: transparent;
    }

    .cont {
      background-color: #fff;
    }
  }
`;

export const FullScreenModalStyle = styled(ModalTemplate)`
  .dim {
    .cont {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1;
      width: 100%;
      height: 100%;
      background-color: #fff;
    }
  }
`;
