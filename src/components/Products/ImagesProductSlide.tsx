import { Box, Flex } from "@chakra-ui/react";
import { useState } from "react";
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";
import { ImageUrlValue } from "../../@types/ImageUrlValue";
import { Config } from "../../environment/config";
import "./imagesProductSlide.scss"

export const ImagesProductSlide = ({ images }: { images: ImageUrlValue[] }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <Flex flexDirection={"column"} flexWrap={"wrap"} className="imageProduct">
      <Swiper
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="imageProduct-swipper"
      >
        {images && images.map((image) =>(
          <SwiperSlide key={image.path}>
            <img src={`${Config.baseApiUrl}/${image.path}`} />
          </SwiperSlide>
        ))}

      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={5}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="imageProduct-swipper__thumb"
      >
        {images && images.map((image) =>(
          <SwiperSlide key={image.path}>
            <img src={`${Config.baseApiUrl}/${image.path}`} />
          </SwiperSlide>
        ))}

      </Swiper>
    </Flex>
  )
}