import type { UserWordResponse } from "../userDictionary/types";

export type ModalType = "addWord" | "editWord" | "wellDoneModal"| null;

export type PayloadType = {
  etitingWord?: UserWordResponse
}

export type ModalState = {
  isOpen: boolean;
  type: ModalType;
  payload: PayloadType | null;
};
