import { Box, Button, Flex, Heading, Link } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";

const NavBar = () => {
  const router = useRouter();
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
      <Flex alignItems={"center"}>
        <Button as={Link} href="/create-post" bgColor={"white"} mr={4}>
          create post
        </Button>
        <Box mr={4}>{data.me.username}</Box>
        <Button
          variant="link"
          onClick={async () => {
            await logout();
            router.reload();
          }}
          isLoading={logoutFetching}
        >
          logout
        </Button>
      </Flex>
    );
  }

  return (
    <Flex
      position={"sticky"}
      top={0}
      zIndex={10}
      bg={"tan"}
      p={4}
      ml="auto"
      alignItems={"center"}
    >
      <Flex flex={1} m="auto" maxW={800} align="center">
        <Link href="/">
          <Heading>LiReddit</Heading>
        </Link>
        <Flex ml={"auto"}>{body}</Flex>
      </Flex>
    </Flex>
  );
};

export default NavBar;
