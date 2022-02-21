import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, UserInfo } from './types/auth';

const initialState : AuthState = {
    accessToken: null,
    user: null
};

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        setAuth(state, action: PayloadAction<{ user?: UserInfo, accessToken?: string}>){
            const {user, accessToken} = action.payload;

            if(accessToken && user){
                state.user = user;
                state.accessToken = accessToken;
            }else{
                state.user = null;
                state.accessToken = null;
            }
        }
    }
});

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;
