import { Flex } from '@chakra-ui/react';
import { Cart } from '../../components/EndCart/Cart';
import { Total } from '../../components/EndCart/Total';
import './endCart.scss';
import { useEffect } from 'react';

export const EndCart = () => {
  useEffect(() => {
    document.title = 'Finalizar Carrinho';
  }, []);

  return (
    <Flex className="endCart">
      <Flex className="endCart-product col-lg-7 mb-lg-0 col-12 mb-5">
        <Cart />
      </Flex>

      <Flex className="endCart-confirm col-lg-5 col-12">
        <Total />
      </Flex>
    </Flex>
  );
};
