import {
  Box,
  CloseButton,
  Drawer,
  DrawerContent,
  Flex,
  Image,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useEffect, useState } from 'react';
import { ItemNavBar } from './ItemNavbar';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { AiOutlineUser } from 'react-icons/ai';
import { BiCategory } from 'react-icons/bi';
import { AuthState } from '../../@types/AuthState';
import logo from '../../images/logo.jpg';
import './item.scss';
import { ConfigItem } from './ConfigItem';

export interface LinkNavBar {
  path: string;
  name: string;
  icon: JSX.Element;
  role: string;
  click?: Function;
}
export const Navbar = () => {
  const userState = useAppSelector((state) => state.auth) as AuthState;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [itens, setItens] = useState<LinkNavBar[]>();

  useEffect(() => {
    setItens([
      {
        path: '/users',
        name: 'Vendedores',
        icon: <AiOutlineUser />,
        role: 'Super Admin',
      },
      {
        path: '/categories',
        name: 'Categorias de Produto',
        icon: <BiCategory />,
        role: 'Seller',
      },
    ]);
  }, []);

  return (
    <Flex bg={'#6c083d'}>
      <Box minH={'100vh'} padding={'10px 10px 10px 10px'} borderRadius={'20px'}>
        <Flex
          justifyContent={'center'}
          alignItems={'center'}
          marginTop={'10px'}
        >
          <Image
            src={logo}
            alt="logo"
            w={'45px'}
            h={'45px'}
            borderRadius={'10px'}
          />
          <Box
            onClick={onOpen}
            aria-label="show"
            marginLeft={'2px'}
            position={'absolute'}
            left={'54px'}
            bg={'#6c083d'}
            padding={'3px'}
            borderRadius={'5px'}
            cursor={'pointer'}
          >
            <MdOutlineKeyboardArrowRight color={'white'} fontSize="20px" />
          </Box>
        </Flex>
        <ConfigItem text={false} />
      </Box>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
      >
        <DrawerContent bg={'#6c083d'} padding={'10px'}>
          <Flex
            justifyContent={'center'}
            alignItems={'center'}
            marginTop={'20px'}
            paddingBottom={'25px'}
            marginBottom={'25px'}
            borderBottom={'2px solid #00000020'}
          >
            <Image
              src={logo}
              alt="logo"
              w={'45px'}
              h={'45px'}
              borderRadius={'10px'}
            />
            <Text
              fontSize="32px"
              fontFamily={'Lato'}
              color={'white'}
              marginLeft={'5px'}
              marginBottom={'0'}
            >
              ChikPet
            </Text>
            <CloseButton
              onClick={onClose}
              fontSize={'16px'}
              color={'white'}
              position={'absolute'}
              right={'-15px'}
              bg={'#6c083d'}
            ></CloseButton>
          </Flex>
          {!!itens &&
            itens.map((item) => {
              if (userState.roles.includes(item.role)) {
                return (
                  <ItemNavBar
                    key={item.path}
                    path={item.path}
                    name={item.name}
                    icon={item.icon}
                    role={item.role}
                    click={onClose}
                  />
                );
              }
            })}
          <ConfigItem text={true} />
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};
