import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NoticeState } from './types/notice';

const initialState : NoticeState = {
    unreadNoticeList: [],
    unreadRefList: []
};

const noticeSlice = createSlice({
    name: 'noticeSlice',
    initialState,
    reducers: {
        setUnreadNoticeList(state, action: PayloadAction<{ noticesRead: number[] }>){
            const {noticesRead} = action.payload;
            if(noticesRead) state.unreadNoticeList = noticesRead;
        },
        serUnreadRefList(state, action: PayloadAction<{ archivesRead: number[] }>){
            const {archivesRead} = action.payload;
            if(archivesRead) state.unreadRefList = archivesRead;
        }
    }
});

export const { setUnreadNoticeList, serUnreadRefList } = noticeSlice.actions;

export default noticeSlice.reducer;
