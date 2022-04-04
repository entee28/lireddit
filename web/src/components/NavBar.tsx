import { Box, Button, Flex, Link } from "@chakra-ui/react";
import React from "react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";

const NavBar = () => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });
  let body = null;

  if (fetching) {
    body = null;
  } else if (!data?.me) {
    body = (
      <>
        <Link mr={2} href={"/login"}>
          login
        </Link>
        <Link href={"/register"}>register</Link>
      </>
    );
  } else {
    body = (
      <>
        <Box mr={4}>{data.me.username}</Box>
        <Button
          variant="link"
          onClick={() => logout()}
          isLoading={logoutFetching}
        >
          logout
        </Button>
      </>
    );
  }

  return (
    <Flex bg={"tan"} p={4} ml="auto">
      <Flex ml={"auto"}>{body}</Flex>
    </Flex>
  );
};

export default NavBar;
