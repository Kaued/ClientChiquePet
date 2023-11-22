import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "./bannerHome.scss";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Flex, Heading, Image, Text } from "@chakra-ui/react";
import banner1 from '../../images/bannerHomes/1.jpg';
import banner2 from '../../images/bannerHomes/2.jpg';
import mobile1 from '../../images/bannerHomes/1-1.png';
import mobile2 from '../../images/bannerHomes/2-1.jpeg';

import { useWindowSize } from "../../hooks/useWindowSize";

export const BannerHome = () => {

  const size = useWindowSize();

  return (
    <Flex className="bannerHome">
      <Swiper
        modules={[Pagination, Autoplay]}
        loop={true}
        autoplay={{
          delay: 7000,
          disableOnInteraction: false,
        }}
        slidesPerView={1}
        pagination={{ clickable: true }}
      >
        <SwiperSlide>
          <Flex className="bannerHome-slide">
            <Image
              src={size.width > 768 ? banner1 : mobile1}
              className="bannerHome-slide__image"
            />
            <Flex className="bannerHome-slide__content">
              <Heading>Estilo e Conforto para Pets. Descubra agora!</Heading>
              <Text>
                Encante-se com acessórios pet irresistíveis no Paraíso Pet! Mime
                seu pet com elegância e qualidade. Seu paraíso de acessórios pet
                começa aqui!
              </Text>
            </Flex>
          </Flex>
        </SwiperSlide>
        <SwiperSlide>
          <Flex className="bannerHome-slide">
            <Image
              src={size.width > 768 ? banner2 : mobile2}
              className="bannerHome-slide__image"
            />
            <Flex className="bannerHome-slide__content">
              <Heading>
                Melhor preço, qualidade imbatível. No Paraíso Pet, seu pet
                merece o melhor!
              </Heading>
              <Text>
                ChikPet: onde qualidade e preço se encontram. Mime seu pet com
                acessórios excepcionais sem pesar no bolso. Descubra a elegância
                a preços irresistíveis!
              </Text>
            </Flex>
          </Flex>
        </SwiperSlide>
      </Swiper>
    </Flex>
  );
};
