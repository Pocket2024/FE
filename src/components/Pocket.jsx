import React from "react";
import styled from "styled-components";
import { FaGetPocket } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";

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

let dummy = [
  { id: 1, category: "야구", color: "#FFE976", count: 3 },
  { id: 2, category: "아이돌", color: "#3C8FDB", count: 8 },
];

const Pocket = () => {
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
        <div className="createBtn">
          <FaPlus color="#929292" size={50} />
        </div>
      </PocketGrid>
    </Wrapper>
  );
};

export default Pocket;
