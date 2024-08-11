import React, { useEffect, useState } from "react";
import styled from "styled-components";
import api from "../api/api";
import profileimg from "../images/profileimg.png";
import { IoMdSettings } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useResponsive } from "../context/Responsive";

const ProfileBox = styled.div`
  display: flex;
  width: 100%;
  img {
    width: 15vh;
    height: 15vh;
    border-radius: 50%;
  }
`;

const Profile = () => {
  const { isDesktop } = useResponsive();
  let ACCESS_TOKEN = localStorage.getItem("accessToken");
  const [infoData, setInfoData] = useState([]);
  const navigate = useNavigate();

  const getMyInfo = () => {
    api
      .get(`/api/users/details/1`, {
        headers: {
          Authorization: `${ACCESS_TOKEN}`,
        },
      })
      .then((res) => {
        console.log("profile", res);
        setInfoData(res.data);
        localStorage.setItem("userId", res.data.id);
      })
      .catch((err) => {
        console.error("Error get info", err);
      });
  };
  useEffect(() => {
    getMyInfo();
  }, []);

  return (
    <>
      {isDesktop ? (
        <ProfileBox>
          <img
            src={`http://localhost:8080/images/${infoData.profileImageUrl}`}
            alt="profileimg"
          />
          <TxtInfo mleft="2vw">
            <div>
              <NameLine line="3vh">
                <Nickname fsize="3vh">{infoData.nickName}</Nickname>
                <IoMdSettings
                  size={27}
                  className="SettingIcon"
                  color="white"
                  onClick={() => navigate("/myinfo")}
                />
              </NameLine>
              <Bio fsize="2vh" mtop="10px">
                {infoData.bio}
              </Bio>
              <NumLine mtop="10px">
                <Unit fsize="18px">
                  <Title>포켓</Title>
                  <Num>{infoData.ticketCategoryCount}</Num>
                </Unit>
                <Unit fsize="18px">
                  <Title>티켓</Title>
                  <Num>{infoData.reviewCount}</Num>
                </Unit>
                <Unit fsize="18px">
                  <Title>팔로워</Title>
                  <Num fcolor="#727272">{infoData.followersCount}</Num>
                </Unit>
                <Unit fsize="18px">
                  <Title>팔로잉</Title>
                  <Num fcolor="#727272">{infoData.followingsCount}</Num>
                </Unit>
              </NumLine>
            </div>
          </TxtInfo>
        </ProfileBox>
      ) : (
        <MProfileBox>
          <img src={profileimg} alt="profileimg" />
          <TxtInfo height="23vw">
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
      )}
    </>
  );
};

export default Profile;

const MProfileBox = styled.div`
  display: flex;
  margin-top: 5vh;
  padding: 0 30px;
  width: 100%;
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
  height: ${(props) => props.height || "15vh"};
  color: white;
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
