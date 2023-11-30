import { Flex, Heading, Image, Text } from '@chakra-ui/react';
import banner from '../../images/bannerHomes/1.jpg';

export const HeaderListProduct = ({ title, subtitle }: { title: string; subtitle?: string }) => {
  return (
    <Flex className="listProduct-header">
      <Image src={banner} />
      <Flex className="listProduct-header__content">
        <Heading>
          {title}
          {subtitle && <Text>{subtitle}</Text>}
        </Heading>
      </Flex>
    </Flex>
  );
};
