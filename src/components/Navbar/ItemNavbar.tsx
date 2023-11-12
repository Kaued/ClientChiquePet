import { NavLink } from 'react-router-dom';
import { LinkNavBar } from './Navbar';
import { Flex, Text } from '@chakra-ui/react';

export const ItemNavBar = ({ path, name, icon, click }: LinkNavBar) => {
  return (
    <NavLink to={path}>
      <Flex
        className="navbar-item"
        onClick={() => click!()}
      >
        {icon}
        <Text
        >
          {name}
        </Text>
      </Flex>
    </NavLink>
  );
};
