import { useState } from "react";
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
// import { useLazyQuery } from "react-apollo";
// import { GET_LOGIN } from "../../graphql/queryGetLogin";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Form: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [contTryLogin, setContTryLogin] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [errorLogin, setErrorLogin] = useState("");

  // const [getUserLogin, { loading, error, data }] = useLazyQuery(GET_LOGIN, {
  //   onCompleted: () => {
  //     if (data?.peopleByEmail.length > 0) {
  //       setIsLogged(true);
  //     } else {
  //       setErrorLogin("Usuário ou senha incorretos");
  //     }
  //   },
  //   onError: (errors) => {
  //     throw new Error(errors.message);
  //   },
  // });

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error in graphql:(</p>;

  const onLogin = () => {
    setContTryLogin(contTryLogin + 1);
    // getUserLogin({
    //   variables: { email: email, password: password },
    // });
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
                onClick={() => onLogin()}
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
            <p>
              <h1>
                {" "}
                <Box>
                  <Button
                    h="1.75rem"
                    size="sm"
                    tabIndex={1}
                    onClick={() => setContTryLogin(0)}
                    title="Exibir a senha"
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
              </h1>
              <br />

              <h1>
                {" "}
                <Heading fontSize={"1em"} color={"red"}>
                  {errorLogin}
                </Heading>
              </h1>
            </p>
          </>
        ) : (
          <>
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
          </>
        )}
      </Box>
    </Flex>
  );
};

export default Form;
