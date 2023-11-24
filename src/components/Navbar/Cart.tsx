import {
  Button,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from "@chakra-ui/react";
import { AiOutlineDown, AiOutlineShoppingCart } from "react-icons/ai";
import { CartSlice, setIsOrder } from "../../features/cart/cartSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { CartItem } from "./CartItem";
import "./cart.scss";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const Cart = () => {
  const cartSlice: CartSlice = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { onClose } = useDisclosure();

  const setOrder = (order: boolean) => {
    dispatch(setIsOrder({ order }));
  };

  return (
    <>
      <Menu closeOnSelect={false}>
        <MenuButton
          as={Button}
          rightIcon={<AiOutlineDown />}
          className="cart-button"
        >
          <AiOutlineShoppingCart />
        </MenuButton>
        <MenuList zIndex={2} maxH={"500px"} overflowY={"auto"}>
          {cartSlice.item.length > 0 &&
            cartSlice.item.map((product, index) => (
              <CartItem key={index} index={index} item={product} />
            ))}
          {cartSlice.item.length >0 && (
            <Flex className="cart-end" onClick={()=>navigate("/carrinho")}><FaShoppingCart />Finalizar Compra</Flex>
          )}
          {cartSlice.item.length<=0 &&(
            <MenuItem className="cart-notFound"><Heading>Não há produtos no carrinho</Heading></MenuItem>
          )}
        </MenuList>
      </Menu>
      <Modal isOpen={cartSlice.openQuestion} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Deseja realizar uma encomenda?</ModalHeader>

          <ModalBody>
            A quantidade de um dos produtos e superior a do estoque, você ainda
            pode continuar seu pedido. Basta apenas realizar uma encomenda.
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="yellow" mr={3} onClick={() => setOrder(false)}>
              Não
            </Button>
            <Button colorScheme="teal" onClick={() => setOrder(true)}>
              Sim
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
