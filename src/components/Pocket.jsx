import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { FaGetPocket } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import Modal from "react-modal";
import "../style/Modal.css";
import { ChromePicker } from "react-color";

const Wrapper = styled.div``;
const PocketTitle = styled.div`
  display: flex;
  gap: 0 10px;
  margin: 40px 0 15px 0;
  div {
    color: white;
    font-size: 15px;
    font-weight: 600;
    height: 15px;
    line-height: 15px;
    gap: 0 5px;
  }
`;
const PocketGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 210px);
  gap: 30px 0;
  margin-top: 20px;
  .createBtn {
    width: 180px;
    height: 160px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
`;
const PocketDiv = styled.div`
  width: 180px; /* 너비 설정 */
  height: 160px; /* 높이 설정 */
  background-color: white; /* 배경 색 설정 */
  border-radius: 20px 20px 50% 50%; /* 반원 모양 설정 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
  background-color: ${(props) => props.color || "white"};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  .category-name {
    font-size: 20px;
    font-weight: 700;
  }
  .ticket-count {
    font-size: 50px;
    font-weight: 700;
    text-align: center;
  }
`;
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

let dummy = [
  { id: 1, category: "야구", color: "#FFE976", count: 3 },
  { id: 2, category: "아이돌", color: "#3C8FDB", count: 8 },
];

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

const Pocket = () => {
  const [modal, setModal] = useState(false);
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("#fff");

  const onChangeCategory = (e) => setCategory(e.target.value);
  const onChangeColor = (color) => {
    setColor(color.hex);
    console.log(color.hex);
  };
  return (
    <Wrapper>
      <PocketTitle>
        <FaGetPocket color="white" />
        <div>포켓몬님의 포켓</div>
      </PocketTitle>
      <PocketGrid>
        {dummy.map((pocket) => (
          <PocketDiv color={pocket.color}>
            <div>
              <div className="category-name">{pocket.category}</div>
              <div className="ticket-count">{pocket.count}</div>
            </div>
          </PocketDiv>
        ))}
        <div className="createBtn" onClick={() => setModal(true)}>
          <FaPlus color="#929292" size={50} />
        </div>
      </PocketGrid>
      <Modal
        isOpen={modal}
        style={customStyles}
        onRequestClose={() => setModal(false)}
      >
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
            <CreateBtn>만들기!</CreateBtn>
          </ColorValue>
        </div>
      </Modal>
    </Wrapper>
  );
};

export default Pocket;

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
