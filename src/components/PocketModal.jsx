import React, { useState } from "react";
import Modal from "react-modal";
import "../style/PocketModal.css";
import { ChromePicker } from "react-color";
import styled from "styled-components";
import api from "../api/api";

const customStyles = {
  overlay: {
    backgroundColor: " rgba(0, 0, 0, 0.5)",
    width: "100%",
    height: "100vh",
    zIndex: "998",
    position: "fixed",
    top: "0",
    left: "0",
  },
  content: {
    width: "460px",
    minHeight: "fit-content",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "35px",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.25)",
    backgroundColor: "#262626",
    border: "none",
    justifyContent: "center",
    overflow: "auto",
    zIndex: "999",
    padding: "40px",
  },
};

// hex 컬러를 rgb로 바꾸는 함수
function hexToRgb(hex) {
  let r = 0,
    g = 0,
    b = 0;
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex[1] + hex[2], 16);
    g = parseInt(hex[3] + hex[4], 16);
    b = parseInt(hex[5] + hex[6], 16);
  }
  return { r, g, b };
}

// hex를 받아서 명도 확인하고 검/흰 리턴하는 함수
function getTextColor(bgColorHex) {
  const { r, g, b } = hexToRgb(bgColorHex);
  const average = (r + g + b) / 3;
  return average > 127.5 ? "#000000" : "#FFFFFF";
}

const PocketModal = ({ isOpen, onRequestClose }) => {
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("#fff");
  const userId = localStorage.getItem("userId");
  let ACCESS_TOKEN = localStorage.getItem("accessToken");

  const createPocket = () => {
    api
      .post(
        `/api/categories/${userId}`,
        { category: category, color: color },
        {
          headers: {
            Authorization: `${ACCESS_TOKEN}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        alert("포켓이 생성되었습니다.");
      })
      .catch((err) => {
        console.log("create pocket error", err);
      });
  };

  const onChangeCategory = (e) => setCategory(e.target.value);

  const onChangeColor = (color) => {
    setColor(color.hex);
    console.log(color.hex);
  };

  return (
    <Modal isOpen={isOpen} style={customStyles} onRequestClose={onRequestClose}>
      <ModalTitle>포켓 이름</ModalTitle>
      <Input
        value={category}
        onChange={onChangeCategory}
        placeholder="포켓 이름을 입력해주세요."
      />
      <ModalTitle>포켓 색상</ModalTitle>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <ChromePicker color={color} onChange={onChangeColor} />
        <ColorValue>
          <div style={{ backgroundColor: `${color}` }}>
            <span style={{ color: `${getTextColor(color)}` }}>
              {category || "포켓"}
            </span>
          </div>
          <CreateBtn onClick={createPocket}>만들기!</CreateBtn>
        </ColorValue>
      </div>
    </Modal>
  );
};

export default PocketModal;

const ModalTitle = styled.div`
  color: white;
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 10px;
`;
const Input = styled.input`
  border: none;
  background-color: rgba(255, 255, 255, 0.22);
  padding: 15px;
  color: white;
  outline: none;
  font-size: 15px;
  font-weight: 600;
  border-radius: 10px;
  width: 100%;
  margin-bottom: 20px;
  font-weight: 500;
  &::placeholder {
    font-weight: 600;
  }
`;
const CreateBtn = styled.button`
  border: none;
  outline: none;
  background-color: white;
  padding: 15px 30px;
  color: #262626;
  text-align: center;
  font-weight: 700;
  border-radius: 10px;
  margin-top: 70px;
  width: 100%;
  &:hover {
    background-color: black;
    color: white;
  }
`;
const ColorValue = styled.div`
  div {
    width: 140px;
    height: 120px;
    border-radius: 20px 20px 50% 50%; /* 반원 모양 설정 */
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      color: white;
      font-size: 20px;
      font-weight: 700;
    }
  }
`;
