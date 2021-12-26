import { Box, Flex, Heading } from "@chakra-ui/react";
import { userType } from "../../types";

export default function ListUsers(usersDB: userType[]): JSX.Element {
  if (!usersDB) return <Box>Loading users...</Box>;
  return (
    <Flex flexDirection="column">
      {" "}
      <br />
      <Heading fontSize={"1em"} color={"black"} alignSelf={"center"}>
        Lista de usuários cadastrados
      </Heading>
      {usersDB.map((user: userType) => {
        return (
          <Box
            display={"flex"}
            width={"100%"}
            justifyContent={"space-around"}
            key={user._id}
          >
            <b>E-mail:</b> {user.email} <b>Senha:</b> {user.password}
          </Box>
        );
      })}
    </Flex>
  );
}
