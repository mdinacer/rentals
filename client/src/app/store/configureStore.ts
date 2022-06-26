import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { accountSlice } from "../slices/accountSlice";
import { housesSlice } from "../slices/housesSlice";



export const store = configureStore({
    reducer: {
        account: accountSlice.reducer,
        houses: housesSlice.reducer,
    },
    //middleware: new MiddlewareArray().concat(sampleMiddleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;