import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import agent from "../api/agent";
import { House } from "../models/house";
import { HouseParams, getAxiosHouseParams } from "../models/houseParams";
import { MetaData } from "../models/pagination";
import { RootState } from "../store/configureStore";

interface HousesState {
    housesLoaded: boolean;
    status: string;
    houseParams: HouseParams;
    metaData: MetaData | null;
}

const housesAdapter = createEntityAdapter<House>({
    selectId: (house) => house.slug,
    sortComparer: (a, b) => a.title.localeCompare(b.title),
});

export const fetchHousesAsync = createAsyncThunk<House[], void, { state: RootState }>(
    "house/fetchHousesAsync",
    async (_, thunkApi) => {
        const houseParams = thunkApi.getState().houses.houseParams;
        const params = getAxiosHouseParams(houseParams);
        try {
            const response = await agent.Houses.list(params);

            thunkApi.dispatch(setMetaData(response.metaData));
            return response.items;
        } catch (error: any) {
            return thunkApi.rejectWithValue({ error: error.data });
        }
    }
)

export const fetchHouseAsync = createAsyncThunk<House, string>(
    "house/fetchHouseAsync",
    async (slug: string, thunkApi) => {
        try {
            return await agent.Houses.details(slug);
        } catch (error: any) {
            return thunkApi.rejectWithValue({ error: error.data });
        }
    }
)

function initParams() {
    return {
        pageNumber: 1,
        pageSize: 9,
        orderBy: "title",
    }
}

export const housesSlice = createSlice({
    name: 'houses',
    initialState: housesAdapter.getInitialState<HousesState>({
        housesLoaded: false,
        status: "idle",
        houseParams: initParams(),
        metaData: null
    }),
    reducers: {
        setHouseParams: (state, action) => {
            state.housesLoaded = false;
            state.houseParams = { ...state.houseParams, ...action.payload, pageNumber: 1 };
        },

        setPageNumber: (state, action) => {
            state.housesLoaded = false;
            state.houseParams = { ...state.houseParams, ...action.payload };
        },

        setPageSize: (state, action) => {
            state.housesLoaded = false;
            state.houseParams = { ...state.houseParams, ...action.payload };
        },

        setMetaData: (state, action) => {
            state.metaData = action.payload;
        },
        resetHouseParams: (state) => {
            state.houseParams = initParams();
        },
        setHouse: housesAdapter.addOne,
        updateHouse: housesAdapter.updateOne,
        removeHouse: housesAdapter.removeOne,
    },
    extraReducers: (builder => {

        builder.addCase(fetchHousesAsync.pending, (state) => {
            state.status = "pendingFetchHouses";
        });

        builder.addCase(fetchHousesAsync.fulfilled, (state, action) => {
            housesAdapter.setAll(state, action.payload)
            state.status = "idle";
            state.housesLoaded = true;
        });

        builder.addCase(fetchHousesAsync.rejected, (state) => {
            state.status = "idle";
        });

        builder.addCase(fetchHouseAsync.pending, (state) => {
            state.status = "pendingFetchHouse";
        });

        builder.addCase(fetchHouseAsync.fulfilled, (state, action) => {
            housesAdapter.upsertOne(state, action.payload)
            state.status = "idle";
        });

        builder.addCase(fetchHouseAsync.rejected, (state) => {
            state.status = "idle";
        });
    })
})

export const houseSelectors = housesAdapter
    .getSelectors<RootState>(state => state.houses);

export const {
    setHouseParams,
    resetHouseParams,
    setMetaData,
    setPageNumber,
    setPageSize,
    setHouse,
    updateHouse,
    removeHouse,
} = housesSlice.actions;