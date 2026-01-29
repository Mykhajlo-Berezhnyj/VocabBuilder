import type { RootState } from "../store";

export const selectIsOpen = (state: RootState) => state.modal.isOpen;

export const selectTypeModal = (state: RootState) => state.modal.type;

export const selectPayload = (state: RootState) => state.modal.payload;
