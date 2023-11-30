import {
  Button,
  Divider,
  Flex,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import './total.scss';
import { FaCartShopping } from 'react-icons/fa6';
import { CartSlice } from '../../features/cart/cartSlice';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useEffect, useState } from 'react';
import { useAlert } from '../../hooks/useAlert';
import { useNavigate } from 'react-router-dom';
import { AuthState } from '../../@types/AuthState';

export const Total = () => {
  const cartSlice: CartSlice = useAppSelector((state) => state.cart);
  const authSate: AuthState = useAppSelector((state) => state.auth);

  const [total, setTotal] = useState(0);
  const toast = useAlert();
  const navigate = useNavigate();

  const finishCart = () => {
    if (authSate.authenticated) {
      navigate('/finalizar/pedido');
    } else {
      toast({ status: 400, mensagem: ['E necessário estar logado para finalizar o pedido'] });
    }
  };
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
    <Flex className="total">
      <Heading className="total-title">Total do carrinho</Heading>
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

      <Flex className="total-time">
        <Text>
          <strong>Tempo estimado:</strong>
          {cartSlice.isOrder ? '10 dias' : '6 dias'}
        </Text>
      </Flex>
      <Flex className="total-end">
        <Button colorScheme="blank" onClick={() => finishCart()}>
          <FaCartShopping />
          Finalizar {cartSlice.isOrder ? 'Encomenda' : 'Compra'}
        </Button>
      </Flex>
    </Flex>
  );
};
