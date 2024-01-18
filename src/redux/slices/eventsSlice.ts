import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface EventsSliceState {
    dateFilter: {
        all: boolean;
        from: string;
        to: string;
    };
    sort: {
        perDate: boolean;
        perTitle: boolean;
        perUsers: boolean;
    };
    otherFilters: {
        broadcasted: boolean;
        notBroadcasted: boolean;
    };
    pagination: {
        page: number;
        perPage: number;
    };
}

const initialState: EventsSliceState = {
    dateFilter: {
        all: true,
        from: "",
        to: "",
    },
    sort: {
        perDate: true,
        perTitle: false,
        perUsers: false,
    },
    otherFilters: {
        broadcasted: true,
        notBroadcasted: true,
    },
    pagination: {
        page: 0,
        perPage: 8,
    },
};

export const eventsSlice = createSlice({
    name: "events",
    initialState,
    reducers: {
        changePage: (
            state: EventsSliceState,
            action: PayloadAction<number>
        ) => {
            state.pagination.page = action.payload;
        },
        changeDateFilter: (
            state: EventsSliceState,
            action: PayloadAction<{ accessor: string; value: any }>
        ) => {
            // @ts-ignore
            state.dateFilter[action.payload.accessor] = action.payload.value;
            state.pagination = initialState.pagination;
        },
        changeSort: (
            state: EventsSliceState,
            action: PayloadAction<string>
        ) => {
            // @ts-ignore
            Object.keys(state.sort).forEach((key) => (state.sort[key] = false));
            // @ts-ignore
            state.sort[action.payload] = true;
            state.pagination = initialState.pagination;
        },
        changeOtherFilters: (
            state: EventsSliceState,
            action: PayloadAction<string>
        ) => {
            // @ts-ignore
            state.otherFilters[action.payload] =
                // @ts-ignore
                !state.otherFilters[action.payload];
            state.pagination = initialState.pagination;
        },
    },
});

export const { changePage, changeDateFilter, changeSort, changeOtherFilters } =
    eventsSlice.actions;

export default eventsSlice.reducer;
