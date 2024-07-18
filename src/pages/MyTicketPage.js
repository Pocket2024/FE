import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useMediaQuery } from "react-responsive";
import profileimg from "../images/profileimg.png";
import { IoMdSettings } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  width: 100vw;
  height: calc(100vh - 80px);
  padding: 0 10vw;
`;
const ProfileBox = styled.div`
  display: flex;
  margin-top: 10vh;
  > img {
    width: 12w;
    height: 12vw;
    border-radius: 50%;
  }
`;

const MyTicketPage = () => {
  const isDesktop = useMediaQuery({ minWidth: 1220 });
  let ACCESS_TOKEN = localStorage.getItem("accessToken");
  const [infoData, setInfoData] = useState([]);
  const navigate = useNavigate();

  const getMyInfo = () => {
    axios
      .get("http://127.0.0.1:8080/api/users/details", {
        headers: {
          Authorization: `${ACCESS_TOKEN}`,
        },
      })
      .then((res) => {
        console.log(res);
        setInfoData(res.data);
      })
      .catch((err) => {
        console.error("Error get info", err);
      });
  };
  useEffect(() => {
    getMyInfo();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      {isDesktop ? (
        <Wrapper>
          <ProfileBox>
            <img src={profileimg} alt="profileimg" />
            <TxtInfo width="30%" mleft="50px">
              <div>
                <NameLine line="35px">
                  <Nickname fsize="35px">{infoData.nickname}</Nickname>
                  <IoMdSettings
                    size={30}
                    className="SettingIcon"
                    onClick={() => navigate("/myinfo")}
                  />
                </NameLine>
                <Bio fsize="20px" mtop="15px">
                  {infoData.bio}
                </Bio>
                <NumLine mtop="15px">
                  <Unit fsize="20px">
                    <Title>포켓</Title>
                    <Num>0</Num>
                  </Unit>
                  <Unit fsize="20px">
                    <Title>티켓</Title>
                    <Num>0</Num>
                  </Unit>
                  <Unit fsize="20px">
                    <Title>팔로워</Title>
                    <Num fcolor="#727272">0</Num>
                  </Unit>
                  <Unit fsize="20px">
                    <Title>팔로잉</Title>
                    <Num fcolor="#727272">0</Num>
                  </Unit>
                </NumLine>
              </div>
            </TxtInfo>
          </ProfileBox>
        </Wrapper>
      ) : (
        <Wrapper>
          <MProfileBox>
            <img src={profileimg} alt="profileimg" />
            <TxtInfo>
              <div>
                <NameLine>
                  <Nickname>{infoData.nickname}</Nickname>
                  <IoMdSettings
                    size={20}
                    className="SettingIcon"
                    onClick={() => navigate("/myinfo")}
                  />
                </NameLine>
                <Bio>{infoData.bio}</Bio>
                <NumLine>
                  <Unit>
                    <Title>포켓</Title>
                    <Num>0</Num>
                  </Unit>
                  <Unit>
                    <Title>티켓</Title>
                    <Num>0</Num>
                  </Unit>
                  <Unit>
                    <Title>팔로워</Title>
                    <Num fcolor="#727272">0</Num>
                  </Unit>
                  <Unit>
                    <Title>팔로잉</Title>
                    <Num fcolor="#727272">0</Num>
                  </Unit>
                </NumLine>
              </div>
            </TxtInfo>
          </MProfileBox>
        </Wrapper>
      )}
    </>
  );
};

export default MyTicketPage;

const MProfileBox = styled.div`
  display: flex;
  margin-top: 5vh;
  > img {
    width: 23vw;
    height: 23vw;
    border-radius: 50%;
  }
`;
const TxtInfo = styled.div`
  margin-left: ${(props) => props.mleft || "15px"};
  width: ${(props) => props.width || "100%"};
  display: flex;
  align-items: center;
  > div {
    width: 100%;
  }
`;
const NameLine = styled.div`
  display: flex;
  line-height: ${(props) => props.line || "20px"};
  .SettingIcon {
    cursor: pointer;
    &:hover {
      fill: #ca3525;
    }
  }
`;
const Nickname = styled.div`
  font-weight: 700;
  font-size: ${(props) => props.fsize || "20px"};
  margin-right: 10px;
`;
const Bio = styled.div`
  font-weight: 600;
  font-size: ${(props) => props.fsize || "12px"};
  color: #737373;
  margin-top: ${(props) => props.mtop || "5px"};
`;
const NumLine = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: ${(props) => props.mtop || "5px"};
`;
const Unit = styled.div`
  display: flex;
  font-size: ${(props) => props.fsize || "12px"};
  font-weight: 600;
`;
const Title = styled.div`
  margin-right: 5px;
`;
const Num = styled.div`
  color: ${(props) => props.fcolor || "#CA3525"};
`;
