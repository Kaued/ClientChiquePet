import {
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { FaCartShopping } from 'react-icons/fa6';
import { CartSlice, removeAllItems } from '../../features/cart/cartSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { CartItem } from '../Navbar/CartItem';
import './cartShow.scss';

export const Cart = () => {
  const cartSlice: CartSlice = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const removeAll = async () => {
    dispatch(removeAllItems());
    onClose();
  };

  return (
    <Flex className="cartShow">
      <Heading className="cartShow-title">
        <FaCartShopping />
        Carrinho
      </Heading>
      <Flex className="cartShow-list">
        {cartSlice.item.length > 0 &&
          cartSlice.item.map((item, index) => <CartItem index={index} item={item} key={index} />)}
        {cartSlice.item.length <= 0 && <Heading className="cartShow-notFound">Nenhum produto no carrinho</Heading>}
      </Flex>
      <Button className="cartShow-button" onClick={() => onOpen()} colorScheme="blank">
        <FaRegTrashAlt />
        Remover todo os produtos
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Deseja remove todos os produtos</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Todos os produtos serão removidos</ModalBody>

          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={onClose}>
              Não
            </Button>
            <Button colorScheme="red" onClick={() => removeAll()}>
              Sim
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};
