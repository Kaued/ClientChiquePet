import {
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { UseMutationResult } from "@tanstack/react-query";
import { BsTrash3 } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";

interface DeleteProps {
  title: string;
  text: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleDelete: UseMutationResult<void, unknown, any, unknown>;
  param: string | number;
}
export const DeleteConfirm = ({
  title,
  text,
  handleDelete,
  param,
}: DeleteProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <IconButton
        colorScheme="#fbb215"
        aria-label="Editar"
        className="delete__button"
        bg={"red"}
        onClick={onOpen}
        icon={<BsTrash3 />}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{text}</ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={onClose}
              className="delete-content__button"
            >
              <RxCross1 /> Fechar
            </Button>
            <Button
              colorScheme="red"
              onClick={() => handleDelete.mutate(param)}
              className="delete-content__button"
            >
              <BsTrash3 /> Deletar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
