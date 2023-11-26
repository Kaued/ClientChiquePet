import { Button, Flex, Spinner } from "@chakra-ui/react"
import { UseInfiniteQueryResult } from "@tanstack/react-query";
import { useEffect, useState } from "react"
import { GetAllOrder, Order } from "../../hooks/orders/useGetAllOrders";
import { OrderItem } from "../Order/OrderItem";
import { useNavigate } from "react-router-dom";
import "./orderData.scss"

interface OrderDataValues {
  data: UseInfiniteQueryResult<void | GetAllOrder, unknown>,
  loadMore: boolean
}

export const OrderData = ({ data, loadMore }: OrderDataValues) => {

  const [orders, setOrders] = useState<Order[]>([]);
  const [hasNext, setHasNext] = useState<boolean>(false);
  const navigate = useNavigate();


  useEffect(() => {

    if (!data.isLoading && data.data) {
      setOrders([]);

      data.data.pages.forEach((item) => {
        if (item) {
          setOrders((befOrder) => [...befOrder, ...item.data]);
        }
      });

      if (data.data.pages[-1]) {
        setHasNext(data.data.pages[-1]!.meta.HasNext);
      }

    }
  }, [data.isLoading, data.data]);

  return (
    <Flex className="orderData">

      <Flex className="orderData-list">
        {orders.length > 0 && orders.map((order) => {
          return (<OrderItem data={order} navigate={navigate} key={order.orderId} />);
        })}

        {data.isLoading && (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
            margin={"10px auto"}
          />
        )}

      </Flex>

      {!loadMore && (
        <Button className="orderData-loadMore" colorScheme="blank" onClick={()=>navigate("pedidos")}>
          Ver Mais
        </Button>
      )}

      {loadMore && hasNext && (
        <Button className="orderData-loadMore" colorScheme="blank" onClick={() => data.fetchNextPage()}>
          Carregar mais
        </Button>
      )}
    </Flex>
  )
}