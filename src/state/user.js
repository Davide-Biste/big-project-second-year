import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

const initialState = {
    token: null,
    detail: {},
    notifications: [],
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserToken: (state, action) => {
            state.token = action.payload;
        },
        setUserDetail: (state, action) => {
            state.detail = action.payload;
        },
        setUserNotifications: (state, action) => {
            state.notifications = action.payload;
        },
    },
});

export const {
    setUserToken,
    setUserDetail,
    setUserNotifications,
} = userSlice.actions;

export default userSlice.reducer;

export const userSelectors = {
    token: (state) => _.get(state, 'user.token', ''),
    detail: (state) => _.get(state, 'user.detail', {}),
    id: (state) => _.get(state, 'user.detail._id', ''),
    notifications: (state) => state.user.notifications || [],
};
