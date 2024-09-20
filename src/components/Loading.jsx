import React from "react";
import Spinner from "../images/loading.gif";
import styled from "styled-components";
import { useResponsive } from "../context/Responsive";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #262626;
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
