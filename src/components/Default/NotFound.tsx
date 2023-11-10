import { Button, Flex, Heading, Text } from '@chakra-ui/react';
import { RiArrowGoBackLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Flex
      w="100%"
      h={'100vh'}
      justifyContent={'center'}
      alignItems={'center'}
      flexDirection={'column'}
      flexWrap={'wrap'}
    >
      <Heading className="mb-5" fontFamily={'Lato'}>
        A página não foi encontrada ou não existe!
      </Heading>
      <Button colorScheme="teal" onClick={() => navigate(-1)}>
        <RiArrowGoBackLine />
        <Text margin={'0 4px'}>Voltar</Text>
      </Button>
    </Flex>
  );
};
