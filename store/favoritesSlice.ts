import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Hotel } from "@/types/Hotel";

interface FavoritesState {
  hotels: Hotel[];
}

const initialState: FavoritesState = {
  hotels: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<Hotel>) => {
      const exists = state.hotels.find((h) => h.id === action.payload.id);
      if (exists) {
        state.hotels = state.hotels.filter((h) => h.id !== action.payload.id);
      } else {
        state.hotels.push(action.payload);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
