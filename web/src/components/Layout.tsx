import React from "react";
import NavBar from "./NavBar";
import Wrapper from "./Wrapper";

type Props = {
  variant?: "sm" | "regular";
  children: React.ReactNode;
};

const Layout = ({ variant, children }: Props) => {
  return (
    <>
      <NavBar />
      <Wrapper variant={variant}>{children}</Wrapper>
    </>
  );
};

export default Layout;
