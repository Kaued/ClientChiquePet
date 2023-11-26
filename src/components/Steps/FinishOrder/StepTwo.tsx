import {
  Button,
  Divider,
  Flex,
  Heading,
  SlideFade,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { CartSlice } from "../../../features/cart/cartSlice";
import {
  finishOrderSliceValue,
  setItemsOrder,
} from "../../../features/finishOrder/finishOrderSlice";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import "./finishStep.scss";
import { useGetAddress } from "../../../hooks/address/useGetAddress";

export const StepTwo = () => {
  const finishOrder: finishOrderSliceValue = useAppSelector(
    (state) => state.finishOrder,
  );
  const cartSlice: CartSlice = useAppSelector((state) => state.cart);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const address = useGetAddress(finishOrder.addressId);

  useEffect(() => {
    onOpen();
    if (cartSlice.item.length > 0) {
      const items: { productId: number; qtd: number }[] = [];
      cartSlice.item.forEach((item) => {
        items.push({ productId: item.product.productId, qtd: item.qtd });
      });
      dispatch(setItemsOrder({ item: items, isOrder: cartSlice.isOrder }));
    } else {
      navigate("/carrinho");
    }
  }, []);

  const [total, setTotal] = useState(0);

  const finishCart = () => {};

  useEffect(() => {
    if (cartSlice.item.length > 0) {
      setTotal(0);
      cartSlice.item.forEach((item) => {
        setTotal((total) => total + item.product.price * item.qtd);
      });
    } else {
      setTotal(0);
    }
  }, [cartSlice]);

  return (
    <SlideFade in={isOpen} offsetY="20px">
      <Flex className="total">
        <Heading className="total-title">Total do seu Pedido</Heading>
        <Divider />
        <Flex className="total-result">
          <TableContainer className="total-result__table">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th colSpan={2}></Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Subtotal: </Td>
                  <Td>R${total.toFixed(2)}</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>

          <Flex className="total-result__finalPrice">
            <Text>Total</Text>
            <Text>R${total.toFixed(2)}</Text>
          </Flex>
        </Flex>

        <Flex className="total-address">
          {!address.isLoading && address.data && (
            <Text>
              <strong>Endereço de entrega:`
                </strong>{" "}
              {`${address.data.number} - ${address.data.street}, ${address.data.neighborhood} - ${address.data.city} ${address.data.district} - ${address.data.cep}`}
            </Text>
          )}
          {address.isLoading && (
            <Text>
              <strong>Carregando</strong>
            </Text>
          )}
          {!address.isLoading && !address.data && (
            <Text>
              <strong>Endereço inválido, refaça a operação</strong>
            </Text>
          )}
        </Flex>

        <Flex className="total-payment">
          <Text>O vendedor entrará em contato para discutir o pagamento</Text>
        </Flex>

        <Flex className="total-end">
          <Button colorScheme="blank" onClick={() => finishCart()}>
            <FaCartShopping />
            Finalizar {cartSlice.isOrder ? "Encomenda" : "Compra"}
          </Button>
        </Flex>
      </Flex>
    </SlideFade>
  );
};
