import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

type ViewMode = "grid" | "list";

type UiState = {
  viewMode: ViewMode;
};

const initialState: UiState = {
  viewMode: "grid",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setViewMode(state, action: PayloadAction<ViewMode>) {
      state.viewMode = action.payload;
    },
  },
});

export const { setViewMode } = uiSlice.actions;
export default uiSlice.reducer;
export const selectViewMode = (state: RootState) => state.ui.viewMode;
