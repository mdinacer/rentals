import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Notification } from "../models/notification";
import { RootState } from "../store/configureStore";


interface notificationsState {
    notificationsLoaded: boolean;
    status: string;
}

const notificationsAdapter = createEntityAdapter<Notification>({
    selectId: (notification) => notification.id,
    sortComparer: (a, b) => a.title.localeCompare(b.title),
});

export const notificationsSlice = createSlice({
    name: "notifications",
    initialState: notificationsAdapter.getInitialState<notificationsState>({
        notificationsLoaded: false,
        status: 'idle',
    }),
    reducers: {
        addNotification: notificationsAdapter.addOne,
        updateNotification: notificationsAdapter.updateOne,
        removeNotification: notificationsAdapter.removeOne,
    }
})

export const notificationsSelectors = notificationsAdapter.getSelectors<RootState>(state => state.notifications);

export const { addNotification, updateNotification, removeNotification } = notificationsSlice.actions;