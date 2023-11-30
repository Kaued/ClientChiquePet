import { Flex, Heading, Image, Text } from '@chakra-ui/react';
import middleBanner from '../../images/middleBannerHome/middleBaner.png';
import { useWindowSize } from '../../hooks/useWindowSize';
import middleBannerMobile from '../../images/middleBannerHome/middleBanerMobile.png';
import './middleBannerHome.scss';

export const MiddleBannerHome = () => {
  const size = useWindowSize();
  return (
    <Flex className="middleBanner">
      <Image src={size.width > 768 ? middleBanner : middleBannerMobile} className="middleBanner-image" />

      <Flex className="middleBanner-content">
        <Heading>Acessórios Pet na ChikPet: Estilo e Conforto em Cada Detalhe!</Heading>
        <Text>
          Descubra a coleção exclusiva de acessórios para pets na ChikPet. De coleiras deslumbrantes a caminhas
          aconchegantes, ofereça ao seu companheiro peludo um toque de estilo e conforto. Explore agora!
        </Text>
      </Flex>
    </Flex>
  );
};
