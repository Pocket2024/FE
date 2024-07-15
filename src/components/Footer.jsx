import React from "react";
import styled from "styled-components";
import icon_info from "../images/info.svg";

const Wrapper = styled.div`
  width: 100%;
  height: 70px;
  background-color: #ca3525;
  display: flex;
  align-items: center;
`;
const Info = styled.div`
  margin-left: 4vw;
`;

const Footer = () => {
  return (
    <Wrapper>
      <Info>
        <img src={icon_info} alt="" />
      </Info>
    </Wrapper>
  );
};

export default Footer;
