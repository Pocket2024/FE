import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import PocketModal from "./PocketModal";
import api from "../api/api";
import { useResponsive } from "../context/Responsive";

const Wrapper = styled.div`
  width: 100%;
  padding-bottom: 10vh;
`;
const PocketGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 33%);
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
  width: 85%; /* 너비 설정 */
  height: 160px; /* 높이 설정 */
  background-color: white; /* 배경 색 설정 */
  border-radius: 20px 20px 50% 50%; /* 반원 모양 설정 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
  background-color: ${(props) => props.color || "white"};
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
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

const Pocket = ({ otheruserId }) => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  let ACCESS_TOKEN = localStorage.getItem("accessToken");
  const [pocket, setPocket] = useState([]);
  const { isDesktop } = useResponsive();

  const getPocket = () => {
    api
      .get("/api/categories/getTicketCategories", {
        headers: {
          Authorization: `${ACCESS_TOKEN}`,
        },
      })
      .then((res) => {
        console.log("pocket", res);
        setPocket(res.data.categories);
      })
      .catch((err) => {
        console.log("get pocket error", err);
      });
  };

  const onClickPocket = (pocketId, category) => {
    navigate(`/myticket/${pocketId}`, { state: category });
  };

  useEffect(() => {
    getPocket();
  }, []);
  return (
    <>
      {isDesktop ? (
        <Wrapper>
          <PocketGrid>
            {pocket.map((pocket) => (
              <PocketDiv
                color={pocket.color}
                onClick={() => onClickPocket(pocket.id, pocket.category)}
                key={pocket.id}
                id={pocket.id}
              >
                <div style={{ color: `${getTextColor(pocket.color)}` }}>
                  <div className="category-name">{pocket.category}</div>
                  <div className="ticket-count">{pocket.reviewCount}</div>
                </div>
              </PocketDiv>
            ))}
            {otheruserId ? (
              <></>
            ) : (
              <div className="createBtn" onClick={() => setModal(true)}>
                <FaPlus color="#929292" size={50} />
              </div>
            )}
          </PocketGrid>
          <PocketModal isOpen={modal} onRequestClose={() => setModal(false)} />
        </Wrapper>
      ) : (
        <Wrapper style={{ padding: "0 30px" }}>
          <MPocketGrid>
            {pocket.map((pocket) => (
              <MPocketDiv
                color={pocket.color}
                onClick={() => onClickPocket(pocket.id, pocket.category)}
                key={pocket.id}
                id={pocket.id}
              >
                <div style={{ color: `${getTextColor(pocket.color)}` }}>
                  <div className="category-name">{pocket.category}</div>
                  <div className="ticket-count">{pocket.reviewCount}</div>
                </div>
              </MPocketDiv>
            ))}
            <div className="createBtn" onClick={() => setModal(true)}>
              <FaPlus color="#929292" size={30} />
            </div>
          </MPocketGrid>
          <PocketModal isOpen={modal} onRequestClose={() => setModal(false)} />
        </Wrapper>
      )}
    </>
  );
};

export default Pocket;

const MPocketDiv = styled.div`
  width: 90%; /* 너비 설정 */
  height: 25vw; /* 높이 설정 */
  background-color: white; /* 배경 색 설정 */
  border-radius: 3vw 3vw 50% 50%; /* 반원 모양 설정 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
  background-color: ${(props) => props.color || "white"};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  .category-name {
    font-size: 3vw;
    font-weight: 700;
    text-align: center;
  }
  .ticket-count {
    font-size: 8vw;
    font-weight: 700;
    text-align: center;
  }
`;

const MPocketGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 33%);
  gap: 30px 0;
  margin-top: 20px;
  .createBtn {
    width: 90%;
    height: 25vw;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
`;
