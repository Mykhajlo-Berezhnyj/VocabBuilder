import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ModalState, ModalType } from "./types";
import type { UserWordResponse } from "../userDictionary/types";

const initialState: ModalState = {
  isOpen: false,
  type: null,
  payload: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal(state, action: PayloadAction<{type:ModalType, payload?: UserWordResponse}>) {
      state.isOpen = true;
      state.type = action.payload.type;
      state.payload=action.payload.payload ?? null;
    },
    closeModal(state) {
      state.isOpen = false;
      state.type = null;
      state.payload = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
