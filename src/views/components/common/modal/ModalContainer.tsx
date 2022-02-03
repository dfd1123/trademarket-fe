import React, { useState, useContext, useEffect } from 'react';
import useModal from '@/hooks/useModal';
import Component from '@/views/components/common/Component';
import Portal from '@/views/components/common//Portal';
import { ModalContext, ModalType } from '@/provider/ModalProvider';

const ModalContainer = () => {
    const {modals, close, resolve} = useContext(ModalContext);
    const [conModals, setConModals] = useState<ModalType[]>([]);

    console.log(modals);

    useEffect(() => {
        setConModals(modals);
        console.log('awdawdawd', conModals);
    }, [modals.length])

    return (
        <Portal elementId="modal-root">
         { modals && modals.length > 0 ? modals.map(modal => <Component is={modal.component} key={modal.id} props={{...modal.props, close: close(modal.id), resolve: <T extends {}>(result: T) => resolve(modal.id, result)}} />) : 'ff' }
        </Portal>
    );
}

export default ModalContainer;