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
        setAuth(state, action: PayloadAction<{ user?: UserInfo, access_token?: string}>){
            const {user, access_token} = action.payload;

            if(access_token && user){
                state.user = user;
                state.accessToken = access_token;
            }else{
                state.user = null;
                state.accessToken = null;
            }
        }
    }
});

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;
