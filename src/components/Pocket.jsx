import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { FaGetPocket } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import Modal from "react-modal";
import "../style/Modal.css";

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
  font-weight: 600;
  border-radius: 10px;
  &:hover {
    background-color: black;
    color: white;
  }
`;

let dummy = [
  { id: 1, category: "야구", color: "#FFE976", count: 3 },
  { id: 2, category: "아이돌", color: "#3C8FDB", count: 8 },
];

const Pocket = () => {
  const [modal, setModal] = useState(false);
  const [category, setCategory] = useState("");

  const onChangeCategory = (e) => setCategory(e.target.value);
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
        <CreateBtn>만들기!</CreateBtn>
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
    height: "400px",
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
