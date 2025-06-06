import {
  Box,
  Button,
  CloseButton,
  Drawer,
  DrawerContent,
  Flex,
  Image,
  Link,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { BiCategory } from 'react-icons/bi';
import { BsFacebook, BsInstagram, BsWhatsapp } from 'react-icons/bs';
import { GiHamburgerMenu } from 'react-icons/gi';
import { HiOutlineMail } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { AuthState } from '../../@types/AuthState';
import { Config } from '../../environment/config';
import { useGetAllCategories } from '../../hooks/categories/useGetAllCategories';
import { useAppSelector } from '../../hooks/useAppSelector';
import logo from '../../images/logo.jpg';
import { Cart } from './Cart';
import { ConfigItem } from './ConfigItem';
import { ItemNavBar } from './ItemNavbar';
import { Search } from './Search';
import './item.scss';
import './navbar.scss';

export interface LinkNavBar {
  path: string;
  name: string;
  icon: JSX.Element;
  role: string;
  click?: VoidFunction;
}
export const Navbar = () => {
  const userState = useAppSelector((state) => state.auth) as AuthState;
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const [itens, setItens] = useState<LinkNavBar[]>([]);

  const { isOpen, onClose, onOpen } = useDisclosure();
  const navigate = useNavigate();
  const category = useGetAllCategories();

  useEffect(() => {
    setItens([
      {
        path: '/',
        name: 'Home',
        icon: <AiOutlineHome />,
        role: '',
      },
    ]);
  }, []);

  useEffect(() => {
    if (category.data && !category.isLoading) {
      category.data.pages.forEach((categ) => {
        if (categ) {
          categ.data.forEach((c) => {
            setItens((i) => [
              ...i,
              {
                path: `/produtos/categoria/${c.name}`,
                name: c.name,
                icon: <BiCategory />,
                role: '',
              },
            ]);
          });
        }
      });
    }
  }, [category.data]);

  return (
    <Flex className="header">
      <Flex className="header-contact">
        <Flex className="header-contact__information">
          {Config.email.map((email) => (
            <Link href={email.href} aria-label={email.name} key={email.text}>
              <HiOutlineMail />
              <Text>{email.text}</Text>
            </Link>
          ))}
        </Flex>
        <Flex className="header-contact__social">
          <Link
            href={Config.socialMidia[0].href}
            key={Config.socialMidia[0].href}
            aria-label={Config.socialMidia[0].name}
            target={Config.socialMidia[0].window}
          >
            <BsInstagram />
          </Link>
          <Link
            href={Config.socialMidia[1].href}
            key={Config.socialMidia[1].href}
            aria-label={Config.socialMidia[1].name}
            target={Config.socialMidia[1].window}
          >
            <BsFacebook />
          </Link>
          <Link
            href={Config.socialMidia[2].href}
            key={Config.socialMidia[2].href}
            aria-label={Config.socialMidia[2].name}
            target={Config.socialMidia[2].window}
          >
            <BsWhatsapp />
          </Link>
        </Flex>
      </Flex>
      <Flex className="header-navbar">
        <Flex className="navbar-logo">
          <Image src={logo} className="navbar-logo__img" />
          <Text className="navbar-logo__text">ChikPet</Text>
        </Flex>

        <Flex className="navbar-list">
          {!!itens &&
            itens.map((item) => {
              if (userState.roles.includes(item.role) || item.role === '') {
                return (
                  <ItemNavBar key={item.path} path={item.path} name={item.name} icon={item.icon} role={item.role} />
                );
              }
            })}
        </Flex>

        <Box className="navbar-tablet">
          <Flex className="navbar-item" onClick={() => onOpen()}>
            <GiHamburgerMenu />
            <Text>Menu</Text>
          </Flex>
          <Flex className="navbar-utilities">
            <Flex className="navbar-utilities__cart">
              <Cart />
            </Flex>

            {userState.authenticated && (
              <Box className="navbar-utilities__user">
                <ConfigItem text={false} />
              </Box>
            )}

            {!userState.authenticated && (
              <Box className="navbar-utilities__notLogin">
                <Button onClick={() => navigate('/register')}>Registrar</Button>
                <Button onClick={() => navigate('/login')} colorScheme="yellow">
                  Login
                </Button>
              </Box>
            )}
          </Flex>
        </Box>

        <Flex className="navbar-utilities">
          <Flex className="navbar-utilities__search">
            <Search />
          </Flex>

          <Flex className="navbar-utilities__cart">
            <Cart />
          </Flex>

          {userState.authenticated && (
            <Box className="navbar-utilities__user">
              <ConfigItem text={false} />
            </Box>
          )}

          {!userState.authenticated && (
            <Box className="navbar-utilities__notLogin">
              <Button onClick={() => navigate('/register')}>Registrar</Button>
              <Button onClick={() => navigate('/login')} colorScheme="yellow">
                Login
              </Button>
            </Box>
          )}
        </Flex>
        <Drawer isOpen={isOpen} placement="left" onClose={onClose} returnFocusOnClose={false} onOverlayClick={onClose}>
          <DrawerContent bg={'#6c083d'} padding={'10px'} className="navbar-tablet__list">
            <Flex
              justifyContent={'center'}
              alignItems={'center'}
              marginTop={'20px'}
              paddingBottom={'25px'}
              marginBottom={'25px'}
              borderBottom={'2px solid #00000020'}
            >
              <Image src={logo} alt="logo" w={'45px'} h={'45px'} borderRadius={'10px'} />
              <Text fontSize="32px" fontFamily={'Lato'} color={'white'} marginLeft={'5px'} marginBottom={'0'}>
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
                if (userState.roles.includes(item.role) || item.role === '') {
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
            {userState.authenticated && <ConfigItem text={true} />}
            {!userState.authenticated && (
              <Box className="navbar-utilities__notLogin">
                <Button onClick={() => navigate('/register')}>Registrar</Button>
                <Button onClick={() => navigate('/login')} colorScheme="yellow">
                  Login
                </Button>
              </Box>
            )}
          </DrawerContent>
        </Drawer>
      </Flex>
    </Flex>
  );
};
