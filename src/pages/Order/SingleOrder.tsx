import { useNavigate, useParams } from 'react-router-dom';
import { useGetOrder } from '../../hooks/orders/useGetOrders';
import { Badge, Button, Divider, Flex, Heading, Image, Spinner, Text } from '@chakra-ui/react';
import { FaTableList } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import { StautsOrderValue } from '../../@types/StatusOrderValue';
import { Config } from '../../environment/config';
import './order.scss';
import { AiOutlineRollback } from 'react-icons/ai';

export const SingleOrder = () => {
  const { id } = useParams();
  const order = useGetOrder(Number(id));
  const navigate = useNavigate();
  const [status, setStatus] = useState<StautsOrderValue>({
    color: 'yellow',
    name: 'Carregando',
    statusId: -1,
  });
  useEffect(() => {
    if (order.data) {
      setStatus(Config.statusOrder.find((a) => a.statusId == order.data!.statusOrder)!);
    }
  }, [order.data]);

  return (
    <Flex className="order">
      {!order.isLoading && order.data && (
        <>
          <Flex className="order-content">
            <Heading className="order-content__title">
              <FaTableList />
              Pedido - {order.data.orderId}
              <Button colorScheme="teal" onClick={() => navigate(-1)}>
                <AiOutlineRollback />
              </Button>
            </Heading>
            <Badge colorScheme={status.color} className="order-content__status">
              {status.name}
            </Badge>
            <Flex className="order-content__dateTotal">
              <Heading>{new Date(order.data.createDate).toLocaleDateString('pt-BR')}</Heading>
              <Text>
                <span>R$</span>
                {order.data.totalPrice.toFixed(2)}
              </Text>
            </Flex>

            <Flex className="order-content__address">
              <Heading>Endereço de entrega</Heading>
              <Text>
                {`${order.data.address.number} - ${order.data.address.street}, ${order.data.address.neighborhood} - ${order.data.address.city} ${order.data.address.district} - ${order.data.address.cep}`}
              </Text>
            </Flex>
          </Flex>
          <Flex className="order-list h-100">
            {order.data.orderProducts.length > 0 &&
              order.data.orderProducts.map((item) => (
                <Flex key={item.product.productId} flexDirection={'column'} w={'100%'}>
                  <Flex className="order-product">
                    <Image
                      src={`${Config.baseApiUrl}/${item.product.imageUrl.find((f) => f.type == 'cover')?.path}`}
                      className="order-product__cover col-lg-2 col-12"
                    />
                    <Flex className="order-product__content col-lg-4 col-12">
                      <Heading>{item.product.name}</Heading>
                      <Text>Quantidade: {item.qtd}</Text>
                      <Text>Preço unitário: R${item.product.price.toFixed(2)}</Text>
                    </Flex>

                    <Text className="order-product__total col-lg-6 col-12">
                      <span>R$</span>
                      {(item.qtd * item.product.price).toFixed(2)}
                    </Text>
                  </Flex>
                  <Divider />
                </Flex>
              ))}
          </Flex>
        </>
      )}
      {order.isLoading && (
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" margin={'10px auto'} />
      )}
    </Flex>
  );
};
