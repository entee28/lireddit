import { Box, Flex } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { useMeQuery } from "../generated/graphql";

type Props = {};

const NavBar = (props: Props) => {
  const [{ data, fetching }] = useMeQuery();

  return (
    <Flex bg={"tomato"} p={4} ml="auto">
      <Flex ml={"auto"}>
        <Box mr={2} color={"white"}>
          <Link href={"/login"}>login</Link>
        </Box>
        <Box mr={2} color={"white"}>
          <Link href={"/register"}>register</Link>
        </Box>
      </Flex>
    </Flex>
  );
};

export default NavBar;
