import React, { useState } from "react";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import welcome from "../images/welcome.svg";

const Wrapper = styled.div`
  width: 100vw;
  background-color: white;
  padding: 10vh 5vw;
  display: flex;
  justify-content: center;
`;
const Msg = styled.div`
  font-weight: 500;
  margin: 5px 10px;
  font-size: ${(props) => props.fsize};
`;
const InputDiv = styled.div`
  display: flex;
  justify-content: center;
  div {
    width: 50vw;
    margin-top: 5vh;
  }
`;
const PcDiv = styled.div``;
const Welcome = styled.div`
  img {
    width: 60vw;
  }
`;

const SignupPage = () => {
  const isDesktop = useMediaQuery({ minWidth: 1220 });
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [nickname, setNickname] = useState("");
  const [pw, setPw] = useState("");
  const [pwMessage, setPwMessage] = useState("");
  const [pwcheck, setPwcheck] = useState(false);
  const [pwcheckMessage, setPwcheckMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneMessage, setPhoneMessage] = useState("");
  const [bio, setBio] = useState("");

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
  const onChangeNickname = (e) => {
    setNickname(e.target.value);
  };
  const onChangePw = (e) => {
    const currentPw = e.target.value;
    setPw(currentPw);

    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,16}$/;

    if (!passwordRegex.test(currentPw)) {
      setPwMessage(
        <span style={{ color: "#FE334C" }}>
          비밀번호는 8-16자, 영문, 숫자, 특수문자(!@#$%^&*?_)를 포함해야 합니다.
        </span>
      );
    } else {
      setPwMessage("");
    }
  };
  const onChangePwcheck = (e) => {
    const currentPw2 = e.target.value;
    setPwcheck(currentPw2);

    if (currentPw2 !== pw) {
      setPwcheckMessage(
        <span style={{ color: "#FE334C" }}>비밀번호가 일치하지 않습니다.</span>
      );
    } else {
      setPwcheckMessage("");
    }
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
  const onChangeBio = (e) => {
    setBio(e.target.value);
  };

  const handleSignup = () => {
    axios
      .post("http://127.0.0.1:8080/api/users/signup", {
        email: email,
        nickName: nickname,
        password: pw,
        password2: pwcheck,
        bio: bio,
        phoneNumber: phone,
      })
      .then((res) => {
        alert("회원가입 성공");
        navigate("/login");
        console.log(res);
      })
      .catch((err) => {
        console.error("Error handle signup: ", err);
      });
  };
  return (
    <>
      {isDesktop ? (
        <Wrapper>
          <PcDiv>
            <Welcome>
              <img src={welcome} alt="" />
            </Welcome>
            <InputDiv>
              <div>
                <FormTitle fontsize="25px" mbottom="10px">
                  이메일<span>*</span>
                </FormTitle>
                <Input
                  onChange={onChangeEmail}
                  fontsize="20px"
                  padding="20px 25px"
                  placeholder="이메일을 입력해주세요."
                />
                <Msg>{emailMessage}</Msg>
                <FormTitle fontsize="25px" mbottom="10px" mtop="30px">
                  닉네임<span>*</span>
                </FormTitle>
                <Input
                  onChange={onChangeNickname}
                  fontsize="20px"
                  padding="20px 25px"
                  placeholder="닉네임을 입력해주세요."
                />
                <FormTitle fontsize="25px" mbottom="10px" mtop="30px">
                  비밀번호<span>*</span>
                </FormTitle>
                <Input
                  onChange={onChangePw}
                  type="password"
                  fontsize="20px"
                  padding="20px 25px"
                  placeholder="비밀번호를 입력해주세요."
                />
                <Msg>{pwMessage}</Msg>
                <FormTitle fontsize="25px" mbottom="10px" mtop="30px">
                  비밀번호 확인<span>*</span>
                </FormTitle>
                <Input
                  onChange={onChangePwcheck}
                  type="password"
                  fontsize="20px"
                  padding="20px 25px"
                  placeholder="비밀번호를 한 번 더 입력해주세요."
                />
                <Msg>{pwcheckMessage}</Msg>
                <FormTitle fontsize="25px" mbottom="10px" mtop="30px">
                  휴대폰 번호<span>*</span>
                </FormTitle>
                <Input
                  onChange={onChangePhone}
                  fontsize="20px"
                  padding="20px 25px"
                  placeholder="ex. 010-1234-5678"
                />
                <Msg>{phoneMessage}</Msg>
                <FormTitle fontsize="25px" mbottom="10px" mtop="30px">
                  한 줄 소개
                </FormTitle>
                <Input
                  onChange={onChangeBio}
                  fontsize="20px"
                  padding="20px 25px"
                  placeholder="한 줄로 자신을 소개해주세요."
                />
                <MSignupBtn fontsize="20px" onClick={handleSignup}>
                  회원가입 완료
                </MSignupBtn>
              </div>
            </InputDiv>
          </PcDiv>
        </Wrapper>
      ) : (
        <MWrapper>
          <MWelcome>
            <img src={welcome} alt="" />
          </MWelcome>
          <FormTitle>
            이메일<span>*</span>
          </FormTitle>
          <Input
            onChange={onChangeEmail}
            placeholder="이메일을 입력해주세요."
          />
          <Msg fsize="10px">{emailMessage}</Msg>
          <FormTitle>
            닉네임<span>*</span>
          </FormTitle>
          <Input
            onChange={onChangeNickname}
            placeholder="닉네임을 입력해주세요."
          />
          <FormTitle>
            비밀번호<span>*</span>
          </FormTitle>
          <Input
            onChange={onChangePw}
            type="password"
            placeholder="비밀번호를 입력해주세요."
          />
          <Msg fsize="10px">{pwMessage}</Msg>
          <FormTitle>
            비밀번호 확인<span>*</span>
          </FormTitle>
          <Input
            onChange={onChangePwcheck}
            type="password"
            placeholder="비밀번호를 한 번 더 입력해주세요."
          />
          <Msg fsize="10px">{pwcheckMessage}</Msg>
          <FormTitle>
            휴대폰 번호<span>*</span>
          </FormTitle>
          <Input onChange={onChangePhone} placeholder="ex. 010-1234-5678" />
          <Msg fsize="10px">{phoneMessage}</Msg>
          <FormTitle>한 줄 소개</FormTitle>
          <Input
            onChange={onChangeBio}
            placeholder="한 줄로 자신을 소개해주세요."
          />
          <MSignupBtn onClick={handleSignup}>회원가입 완료</MSignupBtn>
        </MWrapper>
      )}
    </>
  );
};

export default SignupPage;

const MWrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: white;
  padding: 0 10vw;
`;
const MWelcome = styled.div`
  img {
    width: 100%;
    padding: 5vh 0;
  }
`;
const FormTitle = styled.div`
  font-size: ${(props) => props.fontsize || "15px"};
  font-weight: 600;
  color: ${(props) => props.fcolor || "#272727"};
  margin-bottom: ${(props) => props.mbottom || "5px"};
  margin-top: ${(props) => props.mtop || "15px"};
  > span {
    color: #ca3525;
  }
`;
const Input = styled.input`
  border: 1.5px solid rgba(38, 38, 38, 0.44);
  outline: none;
  background-color: white;
  border-radius: 10px;
  width: 100%;
  padding: ${(props) => props.padding || "15px 20px"};
  font-size: ${(props) => props.fontsize || "12px"};
  font-weight: 700;
  color: #262626;
  &::placeholder {
    color: rgba(38, 38, 38, 0.53);
    font-size: ${(props) => props.fontsize || "12px"};
  }
  &:focus {
    border: 1.5px solid rgba(60, 143, 219, 0.64);
  }
`;
const MSignupBtn = styled.button`
  border: none;
  background-color: #262626;
  border-radius: 40px;
  color: white;
  font-size: ${(props) => props.fontsize};
  font-weight: 600;
  padding: 20px;
  width: 100%;
  margin: 5vh 0 100px 0;
`;
