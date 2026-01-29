import type { ModalType } from "../../../redux/modal/types";
import type { UserWordResponse } from "../../../redux/userDictionary/types";
import AddWordForm from "../../AddWordForm/AddWordForm";
import EditWordForm from "../../EditWordForm/EditWord";

type ModalContentProps = {
  className?: string;
  type: ModalType;
  editingWord?: UserWordResponse | null;
  onClose: () => void;
};

export default function ModalContent({
  className,
  type,
  editingWord,
  onClose,
}: ModalContentProps) {
  switch (type) {
    case "addWord":
      return <AddWordForm className={className} onClose={onClose} />;
    case "editWord":
      return (
        <EditWordForm
          className={className}
          editingWord={editingWord}
          onClose={onClose}
        />
      );
    default:
      return null;
  }
}
