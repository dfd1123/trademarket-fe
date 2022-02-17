import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DialogType } from '@/store/modal/types/dialog';
import { Action } from 'history';

const initialState: {dialog: DialogType | null} = {
  dialog: null
};

const dialogSlice = createSlice({
  name: 'dialogSlice',
  initialState,
  reducers: {
    addDialog(state, action: PayloadAction<{dialog: DialogType}>) {
        const {dialog} = action.payload;
        state.dialog = dialog;
    },
    removeDialog(state, action: PayloadAction<{scrollRelease: () => void}>){
        action.payload.scrollRelease();
        state.dialog = null;
    }
  },
});

export const { addDialog, removeDialog } = dialogSlice.actions;

export default dialogSlice.reducer;
