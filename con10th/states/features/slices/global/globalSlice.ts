import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FiltersState {
    priceRange: [number, number] | [null, null]; 
    skill?: string; 
    category?: string; 
    serviceType?: string; 
    rating?: number; 
    availability?: boolean; 
    // location?: string; 
    sortBy?: "price" | "rating" | "newest"; // Sorting preference
    // experienceLevel?: "beginner" | "intermediate" | "expert"; // Level of expertise
    
}

interface InitialStateTypes {
    filters: FiltersState;
    isFilterFullOpen: boolean;
    viewMode: "grid" | "list"
}


export const initialState: InitialStateTypes  = {
    isFilterFullOpen: false,
    filters: {
        skill: "Plumber",
        priceRange: [null, null],
        category: "any",
        sortBy: "price",
    },
    viewMode: "grid"
};


export const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setFilters: (state, action:PayloadAction<Partial<FiltersState>>) => {
            state.filters = {...state.filters, ...action.payload}
        },
        toggleFilterFullOpen: (state) => {
            state.isFilterFullOpen = !state.isFilterFullOpen
        },
        setViewMode: (state, action:PayloadAction<"grid" | "list">) => {
            state.viewMode = action.payload
        }
    }
})

export const {setFilters, toggleFilterFullOpen, setViewMode} = globalSlice.actions;

export default globalSlice.reducer;