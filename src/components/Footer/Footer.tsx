import { Flex, Heading, Image, Link, Text } from "@chakra-ui/react";
import { BsFacebook, BsInstagram, BsWhatsapp } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { Config } from "../../environment/config";
import logo from "../../images/logo.jpg";
import "./footer.scss";
import { FaRegCopyright } from "react-icons/fa6";

export const Footer = () => {
  const navigate = useNavigate();

  return (
    <Flex w={"100%"} flexDirection={"column"}>
      <Flex className="footer">
        <Flex className="footer-logo col-lg-3 col-12 p-lg-2">
          <Image src={logo} alt="Logo" />
          <Heading>ChikPet</Heading>
        </Flex>
        <Flex className="footer-links col-lg-3 col-12 p-lg-2">
          <Heading>Links Uteis</Heading>
          <Link onClick={() => navigate("/")}>Home</Link>
        </Flex>
        <Flex className="footer-contact col-lg-3 col-12 p-lg-2">
          <Heading>Contatos</Heading>

          <Flex>
            <Heading>Email</Heading>
            <Link
              href={Config.email[0].href}
              key={Config.email[0].href}
              aria-label={Config.email[0].name}
              target={Config.email[0].window}
            >
              <HiOutlineMail />
            </Link>
          </Flex>

          <Flex>
            <Heading>Whastsapp</Heading>
            <Link
              href={Config.socialMidia[2].href}
              key={Config.socialMidia[2].href}
              aria-label={Config.socialMidia[2].name}
              target={Config.socialMidia[2].window}
            >
              <BsWhatsapp />
            </Link>
          </Flex>

          <Flex>
            <Heading>Redes sociais</Heading>
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
          </Flex>
        </Flex>
      </Flex>
      <Flex className="footer-rights col-12">
        <Text className="col-lg-6 col-12">
          <FaRegCopyright />
          ChikPet | Todos direitos reservados
        </Text>
        <Text className="col-lg-6 col-12">
          Desenvolvido por Kauê & Felipe
        </Text>
      </Flex>
    </Flex>
  );
};
