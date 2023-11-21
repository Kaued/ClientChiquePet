import { FreeMode, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Flex, Heading, Link } from "@chakra-ui/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "./slideProduct.scss";
import "swiper/css/navigation";

import { UseInfiniteQueryResult } from "@tanstack/react-query";
import { GetAllProducts } from "../../hooks/products/useGetAllProducts";
import { useNavigate } from "react-router-dom";
import { Products } from "../../hooks/products/useGetProduct";
import { useEffect, useState } from "react";
import { CardProduct } from "./CardProduct";

interface SlideProductProps {
  query: UseInfiniteQueryResult<GetAllProducts | any>;
  title: string;
  link : string;
}

export const SlideProduct = ({ query, title, link }: SlideProductProps) => {
  const navigate = useNavigate();
  const [data, setData] = useState<Products[]>([]);
  const [hasNext, setHasNext] = useState<boolean>(false);
  
  useEffect(() => {
    if (!!query.data && !query.isLoading) {
      setData([]);
      query.data.pages.forEach((products: GetAllProducts) => {
        setData((data) => [...data, ...products.data]);
        setHasNext(products.meta.HasNext);
      });
    }
  }, [query]);

  return (
    <Flex className="slideProduct">
      <Flex>
        <Heading className="slideProduct-title">{title}</Heading>
        <Link onClick={()=>navigate(link)} className="slideProduct-link">Ver Mais</Link>
      </Flex>
      {!query.isLoading && (
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={"30px"}
          navigation={true}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination, Navigation]}
          className="slideProduct-swipper"
          onReachEnd={() => {
            if (hasNext) {
              query.fetchNextPage();
            }
          }}
        >
          {data.length > 0 &&
            data.map((product) => (
              <SwiperSlide
                key={product.productId}
                className="slideProduct-swipper__slide"
              >
                <CardProduct data={product} navigate={navigate} />
              </SwiperSlide>
            ))}
        </Swiper>
      )}
    </Flex>
  );
};
