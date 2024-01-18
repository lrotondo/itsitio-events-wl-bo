import { configureStore } from "@reduxjs/toolkit";
import eventsReducer from "./slices/eventsSlice";

const store = configureStore({
    reducer: {
        events: eventsReducer,
    },
    devTools: {
        serialize: true,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
