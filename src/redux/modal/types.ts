import type { UserWordResponse } from "../userDictionary/types";

export type ModalType = "addWord" | "editWord" | "wellDoneModal"| null;

export type ModalState = {
  isOpen: boolean;
  type: ModalType;
  payload: UserWordResponse | null;
};
