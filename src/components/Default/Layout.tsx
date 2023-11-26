import { useEffect, useRef } from "react";
import { AuthState } from "../../@types/AuthState";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { logout } from "../../features/auth/authSlice";
import { Box, Flex } from "@chakra-ui/react";
import { Navbar } from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { Footer } from "../Footer/Footer";

export const Layout = () => {
  const userState = useAppSelector((state) => state.auth) as AuthState;
  const dispatchUser = useAppDispatch();
  const dispatch = useRef(dispatchUser);
  const user = useRef(userState);

  useEffect(() => {
    if (!user.current.authenticated) {
      dispatch.current(logout);
    }
  }, [user]);

  return (
    <Flex minW={"100%"} minH={"100%"} flexDirection={"column"}>
      <Navbar />
      <Box w={"100%"} minH={"600px"}>
        <Outlet />
      </Box>
      <Footer />
    </Flex>
  );
};
