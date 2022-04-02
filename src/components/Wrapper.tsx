import { Box } from "@chakra-ui/react";
import React from "react";

type Props = {
  children: React.ReactNode;
  variant?: "sm" | "regular";
};

const Wrapper = ({ children, variant = "regular" }: Props) => {
  return (
    <Box
      mt={8}
      mx="auto"
      maxW={variant === "regular" ? "800px" : "400px"}
      w="100%"
    >
      {children}
    </Box>
  );
};

export default Wrapper;
