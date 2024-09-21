import React from "react";
import Spinner from "../images/loading.gif";
import styled from "styled-components";
import { useResponsive } from "../context/Responsive";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #00000086;
`;
const Image = styled.img`
  width: ${(props) => props.width};
`;

const Loading = () => {
  const { isDesktop } = useResponsive();
  return (
    <Wrapper>
      <Image src={Spinner} alt="로딩중" width={isDesktop ? "10vw" : "20vw"} />
    </Wrapper>
  );
};

export default Loading;
