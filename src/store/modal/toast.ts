import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ToastType } from './types/toast';

const initialState: { toasts: ToastType[] } = {
  toasts: [],
};

const toastSlice = createSlice({
  name: 'toastSlice',
  initialState,
  reducers: {
    addToast(state, action: PayloadAction<{ toast: ToastType }>) {
      const { toast } = action.payload;
      const lastToast =
        state.toasts.length > 0 ? state.toasts[state.toasts.length - 1] : null;

      const seq: number = (lastToast?.id ?? -1) + 1;
      toast.id = seq;

      // const isMobile =
      //   navigator.userAgent.match(/Android/i) ||
      //   navigator.userAgent.match(/webOS/i) ||
      //   navigator.userAgent.match(/iPhone/i) ||
      //   navigator.userAgent.match(/iPad/i) ||
      //   navigator.userAgent.match(/iPod/i) ||
      //   navigator.userAgent.match(/BlackBerry/i) ||
      //   navigator.userAgent.match(/Windows Phone/i)
      //     ? true
      //     : false;
      if (lastToast) {
        if (lastToast.type !== toast.type || lastToast.msg !== toast.msg) {
          state.toasts = [toast];
        }
      } else {
        state.toasts = [toast];
      }
    },
    removeToast(state, action: PayloadAction<{ id: number }>) {
      const { id } = action.payload;
      state.toasts = state.toasts.filter((t) => t.id !== id);
    },
    resetToast(state, action?: PayloadAction) {
      state.toasts = [];
    },
  },
});

export const { addToast, removeToast, resetToast } = toastSlice.actions;

export default toastSlice.reducer;
