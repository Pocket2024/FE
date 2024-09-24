import React, { useEffect, useState } from "react";
import styled from "styled-components";
import api from "../api/api";
import { useCookies } from "react-cookie";
import { IoMdSettings } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useResponsive } from "../context/Responsive";
import FollowingModal from "./FollowingModal";
import { BsPersonFillAdd } from "react-icons/bs";
import { GiCancel } from "react-icons/gi";
import useNotificationStore from "../store/notificationStore";

const ProfileBox = styled.div`
  display: flex;
  width: 100%;
  img {
    width: 15vh;
    height: 15vh;
    border-radius: 50%;
    object-fit: cover;
  }
`;
const FollowBtn = styled.button`
  border: none;
  outline: none;
  background-color: #323232;
  border-radius: 5px;
  padding: 5px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0 5px;
  color: #c8c8c8;
  fill: #c8c8c8;
  font-size: 15px;
  font-weight: 500;

  &:hover {
    color: white;
    fill: white;
    background-color: #4a4a4a;
  }
`;

const Profile = ({ otheruserId }) => {
  const { isDesktop } = useResponsive();
  let userId = localStorage.getItem("userId");
  const [infoData, setInfoData] = useState([]);
  const navigate = useNavigate();
  const [cookies] = useCookies(["access"]);
  const [following, setFollowing] = useState([]);
  const { showNotification } = useNotificationStore();
  const [followtoggle, setFollowtoggle] = useState(false);

  useEffect(() => {
    const getMyInfo = () => {
      api
        .get(
          otheruserId
            ? `/api/users/details/${otheruserId}`
            : `/api/users/details/${userId}`,
          {
            headers: {
              Authorization: `${cookies.access}`,
              withCredentials: true,
            },
          }
        )
        .then((res) => {
          console.log("profile", res);
          setInfoData(res.data);
        })
        .catch((err) => {
          console.error("Error get info", err);
        });
    };

    getMyInfo();
  }, [otheruserId, userId, cookies.access, followtoggle]);

  const [followingModal, setFollowingModal] = useState(false);
  const [follower, setFollower] = useState(false);

  const onClickFollowing = async () => {
    try {
      const res = await api.get(
        otheruserId
          ? `/api/follow/following/${otheruserId}`
          : `/api/follow/following/${userId}`,
        {
          headers: {
            Authorization: `${cookies.access}`,
          },
        }
      );

      // 호출 성공 시 처리
      if (isDesktop) {
        console.log("following", res);
        setFollowing(res.data);
        isDesktop && setFollowingModal(true);
      } else {
        navigate("/following");
      }

      setFollower(false);
    } catch (err) {
      console.log("팔로잉 목록 조회 실패", err);
    }
  };
  const onClickFollower = async () => {
    try {
      const res = await api.get(
        otheruserId
          ? `/api/follow/followers/${otheruserId}`
          : `/api/follow/followers/${userId}`,
        {
          headers: {
            Authorization: `${cookies.access}`,
          },
        }
      );

      // 호출 성공 시 처리
      if (isDesktop) {
        console.log("follower", res);
        setFollowing(res.data);
        setFollowingModal(true);
      } else {
        navigate("/follower");
      }
      setFollower(true);
    } catch (err) {
      console.log("팔로잉 목록 조회 실패", err);
    }
  };

  const handleFollow = () => {
    if (infoData.followedByCurrentUser === false) {
      // 팔로우하지 않은 경우 팔로우
      api
        .post(
          "/api/follow/follow",
          {
            followingId: otheruserId,
            followerId: userId,
          },
          {
            headers: {
              Authorization: `${cookies.access}`,
            },
          }
        )
        .then(() => {
          setFollowtoggle(!followtoggle);
          showNotification("👤 팔로우 성공");
        })
        .catch(() => {
          alert("팔로우 실패");
        });
    } else {
      // 팔로우하는 경우 팔로우 취소
      api
        .post(
          "/api/follow/unfollow",
          {
            followingId: otheruserId,
            followerId: userId,
          },
          {
            headers: {
              Authorization: `${cookies.access}`,
            },
          }
        )
        .then(() => {
          setFollowtoggle(!followtoggle);
          showNotification("👤 팔로우 취소");
        })
        .catch(() => {
          alert("팔로우 취소 실패");
        });
    }
  };

  return (
    <>
      {isDesktop ? (
        <ProfileBox>
          <img src={`${infoData.profileImageUrl}`} alt="profileimg" />
          <TxtInfo mleft="2vw">
            <div>
              <NameLine line="3vh">
                <Nickname fsize="3vh">{infoData.nickName}</Nickname>
                {otheruserId ? (
                  <FollowBtn onClick={handleFollow}>
                    {infoData.followedByCurrentUser ? (
                      <>
                        <GiCancel />
                        <span>팔로우 취소</span>
                      </>
                    ) : (
                      <>
                        <BsPersonFillAdd />
                        <span>팔로우</span>
                      </>
                    )}
                  </FollowBtn>
                ) : (
                  <IoMdSettings
                    size={27}
                    className="SettingIcon"
                    color="white"
                    onClick={() => navigate("/myinfo")}
                  />
                )}
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
                  <Title
                    style={{ cursor: "pointer" }}
                    onClick={onClickFollower}
                  >
                    팔로워
                  </Title>
                  <Num fcolor="#727272">{infoData.followersCount}</Num>
                </Unit>
                <Unit fsize="18px">
                  <Title
                    style={{ cursor: "pointer" }}
                    onClick={onClickFollowing}
                  >
                    팔로잉
                  </Title>
                  <Num fcolor="#727272">{infoData.followingsCount}</Num>
                  <FollowingModal
                    isOpen={followingModal}
                    onRequestClose={() => setFollowingModal(false)}
                    following={following}
                    follower={follower} // 팔로워 클릭 이벤트 감지
                  />
                </Unit>
              </NumLine>
            </div>
          </TxtInfo>
        </ProfileBox>
      ) : (
        <MProfileBox>
          <img src={`${infoData.profileImageUrl}`} alt="profileimg" />
          <TxtInfo height="23vw">
            <div>
              <NameLine>
                <Nickname>{infoData.nickName}</Nickname>
                {otheruserId ? (
                  <FollowBtn onClick={handleFollow}>
                    {infoData.followedByCurrentUser ? (
                      <>
                        <GiCancel />
                        <span>팔로우 취소</span>
                      </>
                    ) : (
                      <>
                        <BsPersonFillAdd />
                        <span>팔로우</span>
                      </>
                    )}
                  </FollowBtn>
                ) : (
                  <IoMdSettings
                    size={27}
                    className="SettingIcon"
                    color="white"
                    onClick={() => navigate("/myinfo")}
                  />
                )}
              </NameLine>
              <Bio>{infoData.bio}</Bio>
              <NumLine>
                <Unit>
                  <Title>포켓</Title>
                  <Num>{infoData.ticketCategoryCount}</Num>
                </Unit>
                <Unit>
                  <Title>티켓</Title>
                  <Num>{infoData.reviewCount}</Num>
                </Unit>
                <Unit>
                  <Title
                    style={{ cursor: "pointer" }}
                    onClick={onClickFollower}
                  >
                    팔로워
                  </Title>
                  <Num fcolor="#727272">{infoData.followersCount}</Num>
                </Unit>
                <Unit>
                  <Title
                    style={{ cursor: "pointer" }}
                    onClick={onClickFollowing}
                  >
                    팔로잉
                  </Title>
                  <Num fcolor="#727272">{infoData.followingsCount}</Num>
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
    object-fit: cover;
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
  align-items: center;
  gap: 0 10px;
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
