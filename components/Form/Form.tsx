import { useEffect, useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { usersType } from "../../types/index";
import ListUsers from "../ListUsers/ListUsers";

function Form({ users }: usersType): JSX.Element {
  const [showPassword, setShowPassword] = useState(false);
  const [contTryLogin, setContTryLogin] = useState(0);
  const [email, setEmail] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [errorLogin, setErrorLogin] = useState("");
  const [usersDB, setUsersDB] = useState([]);
  const [password, setPassword] = useState("");
  const CFaUserAlt = chakra(FaUserAlt);
  const CFaLock = chakra(FaLock);

  useEffect(() => setUsersDB(Object.values(users)), [users]);

  const onLoginValidation = () => {
    if(!email && !password) return setErrorLogin("Email and password is required");
    if(!email) return setErrorLogin("Email is required");
    if(!password) return setErrorLogin("Password is required");
    setContTryLogin(contTryLogin + 1);
  };

  const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
      id="form"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="teal.500" />
        <Heading color="teal.400" fontSize={"1rem"}>
          Olá {isLogged ? `, ${email}` : null}
        </Heading>


        <Heading fontSize={"1em"} color={"red"}>
              {errorLogin}
            </Heading>


        <Box minW={{ base: "90%", md: "468px" }}>
          {!isLogged && (
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    tabIndex={-1}
                    children={<CFaUserAlt color="gray.300" />}
                    htmlFor="email"
                  />
                  <Input
                    type="email"
                    placeholder="E-mail"
                    tabIndex={1}
                    title="E-mail"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                    tabIndex={-1}
                    htmlFor="password"
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Senha"
                    tabIndex={2}
                    title="Senha"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      tabIndex={3}
                      onClick={handleShowClick}
                      title="Exibir a senha"
                    >
                      {showPassword ? "Ocultar" : "Exibir"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText textAlign="right">
                  <Link tabIndex={4} title="Esqueceu a sua senha?">
                    Esqueceu a senha?
                  </Link>
                </FormHelperText>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
                tabIndex={5}
                onClick={() => onLoginValidation()}
                backgroundColor={contTryLogin > 3 ? "red.500" : "teal.500"}
                isDisabled={contTryLogin > 3}
              >
                {contTryLogin > 3 ? `Tentativas excedidas` : "Entrar"}
              </Button>
            </Stack>
          )}
        </Box>
      </Stack>
      <Box>
        {!isLogged ? (
          <>
            Não possui uma conta?
            <Link
              color="teal.500"
              paddingLeft="10px"
              href="#"
              tabIndex={6}
              title="cadastrar-se"
            >
              Cadastrar-se
            </Link>
            <Box>
              <Button
                h="1.75rem"
                size="sm"
                tabIndex={1}
                onClick={() => setContTryLogin(0)}
                title="Resetar contador de tentativas"
                width="2.5rem"
                padding="0.5rem"
                fontSize="0.5rem"
                marginLeft={2}
                backgroundColor={"teal.500"}
                name={"Resetar contador de tentativas"}
              >
                X
              </Button>{" "}
              {`Contador de tentativas: ${contTryLogin}`}
            </Box>
            {ListUsers(usersDB)}
          </>
        ) : (
            <Button
              h="1.75rem"
              size="sm"
              tabIndex={1}
              onClick={() => setIsLogged(false)}
              title="Exibir a senha"
              width="4.5rem"
            >
              Sair
            </Button>
        )}
      </Box>
    </Flex>
  );
}

export default Form;
