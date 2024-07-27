import React from "react";
import styled from "styled-components";
import { MdFileUpload } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Button = styled.button`
  background-color: white;
  border: none;
  color: #262626;
  padding: 20px 30px;
  position: fixed;
  bottom: 7vh;
  right: 50px;
  display: flex;
  z-index: 100;
  border-radius: 50px;
  gap: 0 10px;
  div {
    font-size: 20px;
    font-weight: 600;
  }
  &:hover {
    background-color: #ffe976;
  }
`;

const UploadBtn = ({ onBtnClick }) => {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => {
        onBtnClick || navigate("/upload");
      }}
    >
      <MdFileUpload size={30} />
      <div>티켓 업로드</div>
    </Button>
  );
};

export default UploadBtn;
