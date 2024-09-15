import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import api from "../api/api";
import { useResponsive } from "../context/Responsive";
import { MdEdit } from "react-icons/md";
import { MdCameraEnhance } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  background-color: #262626;
  > div {
    width: 30vw;
  }
`;
const ProfileBox = styled.div`
  display: flex;
  background-color: ${(props) => props.background};
  border-radius: 13px;
  width: 100%;
  padding: ${(props) => props.padding};
  align-items: center;
  margin-bottom: 20px;
  justify-content: space-between;
  .divbox {
    display: flex;
    align-items: center;
    gap: 0 20px;
  }
`;
const ProfileImg = styled.img`
  border-radius: 50%;
  width: 5vw;
  height: 5vw;
  object-fit: cover;
`;
const BottomLine = styled.div`
  display: flex;
  justify-content: ${(props) => props.justifycontent};
  align-items: center;
`;

const MyInfoPage = () => {
  const { isDesktop } = useResponsive();
  const navigate = useNavigate();
  let ACCESS_TOKEN = localStorage.getItem("accessToken");
  let userId = localStorage.getItem("userId");
  const [infoData, setInfoData] = useState([]);
  const [isedit, setIsEdit] = useState(false);
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneMessage, setPhoneMessage] = useState("");
  const [bio, setBio] = useState("");

  const imgRef = useRef();
  const [img, setImg] = useState("");
  const [realimg, setRealimg] = useState([]);

  // 이미지 업로드 input의 onChange
  const saveImgFile = () => {
    const file = imgRef.current.files[0] ? imgRef.current.files[0] : "";
    setRealimg(file);
    const reader = new FileReader();
    if (file !== "") {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImg(reader.result);
        console.log(reader.result);
      };
    }
  };

  const getMyInfo = () => {
    api
      .get(`/api/users/details/${userId}`, {
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
  }, [isedit]);

  const onChangeNickname = (e) => {
    setNickname(e.target.value);
  };

  const onChangePhone = (e) => {
    const currentPhone = e.target.value;
    setPhone(currentPhone);

    const phonenumRegex = /^(01[016789]{1})-?[0-9]{3,4}-?[0-9]{4}$/;

    if (!phonenumRegex.test(currentPhone)) {
      setPhoneMessage(
        <span style={{ color: "#FE334C" }}>
          010-1234-5678 형태로 입력해주세요.
        </span>
      );
    } else {
      setPhoneMessage("");
    }
  };
  const onChangeEmail = (e) => {
    const currentEmail = e.target.value;
    setEmail(currentEmail);

    const emailRegex = /^[a-zA-Z0-9+-.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (!emailRegex.test(currentEmail)) {
      setEmailMessage(
        <span style={{ color: "#FE334C" }}>
          이메일 형식에 맞게 입력해주세요.
        </span>
      );
    } else {
      setEmailMessage("");
    }
  };
  const onChangeBio = (e) => {
    setBio(e.target.value);
  };
  const handleEdit = () => {
    const formData = new FormData();

    // formData.append("email", email);
    nickname && formData.append("nickName", nickname);
    bio && formData.append("bio", bio);
    phone && formData.append("phoneNumber", phone);
    realimg && formData.append("profileImage", realimg);

    for (let key of formData.keys()) {
      console.log("key: " + key);
    }
    for (let value of formData.values()) {
      console.log("value: " + value);
    }

    api
      .post(`/api/users/${userId}`, formData, {
        headers: {
          Authorization: `${ACCESS_TOKEN}`,
        },
      })
      .then((res) => {
        console.log("edit", res);
        setIsEdit(false);
        alert("정보가 수정되었습니다.");
      })
      .catch((err) => {
        console.error("Error handle edit", err);
      });
  };

  const handleLogout = () => {
    if (window.confirm("로그아웃하시겠습니까?")) {
      api
        .delete("/api/users/logout", {
          headers: {
            Authorization: `${ACCESS_TOKEN}`,
          },
        })
        .then((res) => {
          window.localStorage.removeItem("accessToken");
          alert("로그아웃 되었습니다.");
          navigate("/");
        })
        .catch((err) => {
          alert("로그아웃 실패");
          console.log(err);
        });
    } else {
    }
  };

  return (
    <>
      {isDesktop ? (
        <Wrapper>
          <div>
            <Line mbottom="30px" ptop="5vh">
              <MTxt size="30px">내 정보</MTxt>
            </Line>
            <ProfileBox
              background={isedit ? "" : "#333333"}
              padding={isedit ? "" : "20px 30px"}
            >
              <div className="divbox">
                {isedit ? (
                  <div style={{ position: "relative" }}>
                    <ProfileImg
                      src={img ? img : `${infoData.profileImageUrl}`}
                    />
                    <EditImg>
                      <input
                        type="file"
                        name="profile"
                        id="profileimg"
                        ref={imgRef}
                        onChange={saveImgFile}
                      />
                      <label htmlFor="profileimg">
                        <MdCameraEnhance color="white" />
                      </label>
                    </EditImg>
                  </div>
                ) : (
                  <ProfileImg src={`${infoData.profileImageUrl}`} />
                )}
                <div>
                  <Title fontsize="22px" mtop="0" mbottom="0">
                    닉네임
                  </Title>
                  {isedit ? (
                    <Input
                      font="17px"
                      padding="10px 20px"
                      onChange={onChangeNickname}
                      defaultValue={infoData.nickName}
                      placeholder="닉네임을 입력해주세요."
                    />
                  ) : (
                    <Contents fontsize="17px" mbottom="0">
                      {infoData.nickName}
                    </Contents>
                  )}
                </div>
              </div>
              {isedit ? (
                <></>
              ) : (
                <Logout onClick={handleLogout}>로그아웃</Logout>
              )}
            </ProfileBox>
            <Title fontsize="22px">이메일</Title>
            {isedit ? (
              <>
                <Input
                  font="17px"
                  padding="10px 20px"
                  onChange={onChangeEmail}
                  defaultValue={infoData.email}
                  placeholder="이메일을 입력해주세요."
                />
                <span>{emailMessage}</span>
              </>
            ) : (
              <Contents fontsize="17px">{infoData.email}</Contents>
            )}
            <Title fontsize="22px">휴대폰 번호</Title>
            {isedit ? (
              <>
                <Input
                  font="17px"
                  padding="10px 20px"
                  onChange={onChangePhone}
                  defaultValue={infoData.phoneNumber}
                  placeholder="ex. 010-1234-5678"
                />
                <span>{phoneMessage}</span>
              </>
            ) : (
              <Contents fontsize="17px">{infoData.phoneNumber}</Contents>
            )}
            <Title fontsize="22px">한 줄 소개</Title>
            {isedit ? (
              <Input
                font="17px"
                padding="10px 20px"
                onChange={onChangeBio}
                defaultValue={infoData.bio}
                placeholder="한 줄로 자신을 소개해주세요."
              />
            ) : (
              <Contents fontsize="17px">{infoData.bio}</Contents>
            )}
            <BottomLine justifycontent="flex-end">
              {isedit ? (
                <EditBtn fontsize="17px" onClick={handleEdit}>
                  <MdEdit size={25} />
                  <span>수정 완료</span>
                </EditBtn>
              ) : (
                <EditBtn fontsize="17px" onClick={() => setIsEdit(true)}>
                  <MdEdit size={25} />
                  <span>수정하기</span>
                </EditBtn>
              )}
            </BottomLine>
          </div>
        </Wrapper>
      ) : (
        <MWrapper>
          <Line mbottom="30px" ptop="5vh">
            <MTxt size="20px">내 정보</MTxt>
          </Line>
          <ProfileBox
            background={isedit ? "" : "#333333"}
            padding={isedit ? "" : "20px 30px"}
          >
            <div className="divbox">
              {isedit ? (
                <div style={{ position: "relative" }}>
                  <MProfileImg
                    src={img ? img : `${infoData.profileImageUrl}`}
                  />
                  <MEditImg>
                    <input
                      type="file"
                      name="profile"
                      id="profileimg"
                      ref={imgRef}
                      onChange={saveImgFile}
                    />
                    <label htmlFor="profileimg">
                      <MdCameraEnhance color="white" />
                    </label>
                  </MEditImg>
                </div>
              ) : (
                <MProfileImg src={`${infoData.profileImageUrl}`} />
              )}
              <div>
                <Title mtop="0" mbottom="0">
                  닉네임
                </Title>
                {isedit ? (
                  <Input
                    padding="10px 15px"
                    onChange={onChangeNickname}
                    defaultValue={infoData.nickName}
                    placeholder="닉네임을 입력해주세요."
                  />
                ) : (
                  <Contents mbottom="0">{infoData.nickName}</Contents>
                )}
              </div>
            </div>
            {isedit ? <></> : <Logout onClick={handleLogout}>로그아웃</Logout>}
          </ProfileBox>
          <Title>이메일</Title>
          <Contents>{infoData.email}</Contents>
          <Title>휴대폰 번호</Title>
          {isedit ? (
            <Input
              padding="10px 15px"
              onChange={onChangePhone}
              defaultValue={infoData.phoneNumber}
              placeholder="ex. 010-1234-5678"
            />
          ) : (
            <Contents>{infoData.phoneNumber}</Contents>
          )}
          <Title>한 줄 소개</Title>
          {isedit ? (
            <Input
              padding="10px 15px"
              onChange={onChangeBio}
              defaultValue={infoData.bio}
              placeholder="한 줄로 자신을 소개해주세요."
            />
          ) : (
            <Contents>{infoData.bio}</Contents>
          )}
          <BottomLine justifycontent="flex-end">
            {isedit ? (
              <EditBtn fontsize="17px" onClick={handleEdit}>
                <MdEdit size={25} />
                <span>수정 완료</span>
              </EditBtn>
            ) : (
              <EditBtn fontsize="17px" onClick={() => setIsEdit(true)}>
                <MdEdit size={25} />
                <span>수정하기</span>
              </EditBtn>
            )}
          </BottomLine>
        </MWrapper>
      )}
    </>
  );
};

export default MyInfoPage;

const MWrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  padding: 0 10vw;
  background-color: #262626;
`;
const Line = styled.div`
  display: flex;
  font-weight: 700;
  margin-bottom: ${(props) => props.mbottom};
  padding-top: ${(props) => props.ptop};
  align-items: end;
`;
const MProfileImg = styled.img`
  border-radius: 50%;
  width: 15vw;
  height: 15vw;
  object-fit: cover;
`;
const MTxt = styled.div`
  color: white;
  font-size: ${(props) => props.size};
`;
const Title = styled.div`
  font-size: ${(props) => props.fontsize || "17px"};
  font-weight: 700;
  color: ${(props) => props.fcolor || "white"};
  margin-bottom: ${(props) => props.mbottom || "5px"};
  margin-top: ${(props) => props.mtop || "15px"};
  > span {
    color: #ca3525;
  }
`;
const Contents = styled.div`
  margin-bottom: ${(props) => props.mbottom || "30px"};
  font-size: ${(props) => props.fontsize || "13px"};
  font-weight: 500;
  color: #b7b7b7;
`;
const EditBtn = styled.button`
  border: none;
  background-color: white;
  border-radius: 40px;
  color: #262626;
  font-size: ${(props) => props.fontsize};
  font-weight: 700;
  padding: 20px;
  width: 200px;
  margin-top: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0 10px;
  &:hover {
    background-color: black;
    color: white;
    fill: white;
  }
`;
const Input = styled.input`
  border: none;
  background-color: rgba(255, 255, 255, 0.22);
  border-radius: 10px;
  padding: ${(props) => props.padding};
  outline: none;
  font-size: ${(props) => props.font};
  width: 100%;
  margin-bottom: 10px;
  color: white;
  font-weight: 700;
  &::placeholder {
    color: rgba(255, 255, 255, 0.53);
    font-size: ${(props) => props.font};
  }
`;

const Logout = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #d9d9d9;
  text-align: center;
  text-decoration: underline;
  cursor: pointer;
  &:hover {
    color: white;
  }
  display: flex;
  align-items: center;
`;

const EditImg = styled.div`
  input {
    display: none;
  }
  label {
    background-color: rgba(54, 54, 54, 0.7);
    border-radius: 50%;
    width: 2vw;
    height: 2vw;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
`;

const MEditImg = styled.div`
  input {
    display: none;
  }
  label {
    background-color: rgba(54, 54, 54, 0.7);
    border-radius: 50%;
    width: 7vw;
    height: 7vw;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
`;
