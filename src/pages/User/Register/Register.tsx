import { AbsoluteCenter, Box, Button, Divider, Flex, Heading, Image, Text } from "@chakra-ui/react";
import background from '../../../images/BackgrounRegister.jpg';
import './register.scss';

export const Register = () => {
  

  return(
    <Flex h={"100vh"} justifyContent={"center"} alignItems={"center"} bg={"#ffb013"}>

      <Flex className="register">
        <Image src={background} className="register-image"/>
          <Box className="register-content">
            <Flex className="register-exist">
              <Text>
                Já tem o uma conta?
              </Text>
              <Button colorScheme='yellow' size='md' variant={"solid"}>
                Login
              </Button>
            </Flex>
            <Heading className="register-content__title">
              Registre sua conta
            </Heading>
            <Box position='relative'  >
            <Divider />
            <AbsoluteCenter bg='#6c083d' px='4'>
              Preencha os campos
            </AbsoluteCenter>
          </Box>
          </Box>
      </Flex>

    </Flex>
  );
}