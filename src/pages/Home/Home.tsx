import "swiper/css";

import { Box } from "@chakra-ui/react";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { BannerHome } from "../../components/Banner/BannerHome";

import { SlideProduct } from "../../components/Products/SlideProducts";
import { useGetAllProducts } from "../../hooks/products/useGetAllProducts";
import { MiddleBannerHome } from "../../components/Banner/MiddleBannerHome";

export const Home = () => {
  const product = useGetAllProducts();
  const news = product("news");
  const popular = product("popular");
  const allProducts = product();
  return (
    <Box>
      <BannerHome />
      <SlideProduct query={news} title="Novidades" link="product/news" />
      <SlideProduct query={popular} title="Mais Vendidos" link="product/popular" />
      <MiddleBannerHome />
      <SlideProduct query={allProducts} title="Todos os Produtos" link="product" />
    </Box>
  );
};
