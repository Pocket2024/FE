import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MdNavigateBefore } from "react-icons/md";
import { useResponsive } from "../context/Responsive";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/api";
import { useCookies } from "react-cookie";

const Wrapper = styled.div`
  width: 100vw;
  min-height: calc(100vh - 80px);
  background-color: #262626;
  padding: 0 30px;
`;
const TitleLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${(props) => props.padding};
  font-size: ${(props) => props.fontsize};
  div {
    gap: ${(props) => props.gap};
    display: flex;
    align-items: center;
  }
  .name {
    font-weight: 700;
    color: white;
    margin-right: 5px;
  }
  .pocket {
    font-weight: 700;
    color: white;
  }
`;

const FollowPage = ({ otheruserId }) => {
  const { isDesktop } = useResponsive();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  let userId = localStorage.getItem("userId");
  const [cookies] = useCookies(["access"]);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    const getFollowing = () => {
      api
        .get(
          pathname === "/following"
            ? `/api/follow/following/${userId}`
            : `/api/follow/followers/${userId}`,
          {
            headers: {
              Authorization: `${cookies.access}`,
              withCredentials: true,
            },
          }
        )
        .then((res) => {
          console.log(res);
          setFollowing(res.data);
        })
        .catch((err) => {
          console.log("mobile get following err", err);
        });
    };

    getFollowing();
  }, [userId, cookies.access]);

  const onClickProfile = (userId) => {
    navigate(`/user/${userId}`);
  };

  return (
    <Wrapper>
      <TitleLine>
        <div gap="0 5px">
          <MdNavigateBefore
            color="#A9A9A9"
            size={isDesktop ? 50 : 30}
            onClick={() =>
              otheruserId
                ? navigate(`/user/${otheruserId}`)
                : navigate("/myticket")
            }
            style={{ cursor: "pointer" }}
          />
          <div className="name">
            {pathname === "following" ? "팔로잉" : "팔로워"}
          </div>
          <div className="pocket">목록</div>
        </div>
      </TitleLine>
      <ListDiv>
        {following.map((following) => (
          <List onClick={() => onClickProfile(following.id)} key={following.id}>
            <ProfileImg src={following.profileImage} />
            <NameBio>
              <Nickname>{following.nickname}</Nickname>
              <Bio>{following.bio}</Bio>
            </NameBio>
          </List>
        ))}
      </ListDiv>
    </Wrapper>
  );
};

export default FollowPage;

const ListDiv = styled.div`
  margin-top: 20px;
  overflow-y: auto;
`;
const List = styled.div`
  display: flex;
  align-items: center;
  gap: 0 10px;
  cursor: pointer;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
  &:hover {
    background-color: #323232;
  }
`;
const ProfileImg = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
`;
const NameBio = styled.div``;
const Nickname = styled.div`
  font-size: 17px;
  font-weight: 700;
  color: white;
`;
const Bio = styled.div`
  font-size: 15px;
  color: #737373;
  font-weight: 600;
`;
