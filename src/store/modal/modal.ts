import { FunctionComponent } from 'react';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ModalType } from './types/modal';

const initialState: {modals: ModalType[]} = {
  modals: [],
};

const modalSlice = createSlice({
  name: 'modalSlice',
  initialState,
  reducers: {
    addModal(state, action: PayloadAction<{modal: ModalType, duplicateCheck?: boolean}>) {
        const {modal, duplicateCheck} = action.payload;
        const lastModal = state.modals.length > 0 ? state.modals[state.modals.length - 1] : null;
        let duplicate = lastModal?.component?.name === modal.component.name;
        if(duplicateCheck) duplicate = state.modals.some((m) => m.component.name === modal.component.name);
        if(duplicate) return;

        const seq: number = (lastModal?.id ?? -1) + 1;
        modal.id = seq;
        state.modals = [...state.modals, modal];
    },
    removeModal(state, action: PayloadAction<{id: number, scrollRelease: () => void}>){
        const {id, scrollRelease} = action.payload;
        state.modals = state.modals.filter((m) => m.id !== id);
        if(!state.modals.filter(m => !m.nonModal).length) scrollRelease();
    },
    resetModal(state, action: PayloadAction<{scrollRelease: () => void}>){
      const {scrollRelease} = action.payload;
      state.modals = [];
      scrollRelease();
    }
  },
});

export const { addModal, removeModal, resetModal } = modalSlice.actions;

export default modalSlice.reducer;
