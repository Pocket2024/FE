import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { useResponsive } from "../context/Responsive";
import { useCookies } from "react-cookie"; // useCookies import
import useNotificationStore from "../store/notificationStore";
import useAuthStore from "../store/authStore";

const Wrapper = styled.div`
  width: 100vw;
  height: calc(100vh - 80px);
  background-color: #262626;
  padding: 0 30vw;
`;

const LoginPage = () => {
  const { isDesktop } = useResponsive();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [cookies, setCookie] = useCookies(["access"]); // 쿠키 훅
  const { showNotification } = useNotificationStore();
  const { login } = useAuthStore();

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePw = (e) => {
    setPw(e.target.value);
  };
  const handleLogin = () => {
    api
      .post("/api/users/login", {
        email: email,
        password: pw,
      })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("accessToken", res.data.accessToken);
        // 토큰 값을 쿠키에 저장
        setCookie("access", res.data.accessToken, { path: "/" });

        localStorage.setItem("userId", res.data.userId);
        showNotification("✅ 로그인 성공!");
        login();
        navigate("/myticket");
      })
      .catch((err) => {
        console.log("Error handle login", err);
      });
  };
  const activeEnter = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };
  return (
    <>
      {isDesktop ? (
        <Wrapper>
          <MTxt size="30px" mbottom="30px" ptop="15vh">
            로그인
          </MTxt>
          <MInput
            onChange={onChangeEmail}
            placeholder="이메일을 입력해주세요."
            font="17px"
            padding="20px 30px"
          />
          <MInput
            onChange={onChangePw}
            type="password"
            placeholder="비밀번호를 입력해주세요."
            font="17px"
            padding="20px 30px"
            onKeyDown={(e) => activeEnter(e)}
          />
          <LoginBtn font="20px" onClick={handleLogin}>
            로그인
          </LoginBtn>
          <MTxt size="20px" mbottom="20px" ptop="5vh">
            계정이 없으신가요?
          </MTxt>
          <MSignupBtn
            font="20px"
            onClick={() => {
              navigate("/signup");
            }}
          >
            회원가입하기
          </MSignupBtn>
        </Wrapper>
      ) : (
        <MWrapper>
          <MTxt size="20px" mbottom="30px" ptop="15vh">
            로그인
          </MTxt>
          <MInput
            onChange={onChangeEmail}
            placeholder="이메일을 입력해주세요."
            font="12px"
            padding="15px 20px"
          />
          <MInput
            onChange={onChangePw}
            type="password"
            placeholder="비밀번호를 입력해주세요."
            font="12px"
            padding="15px 20px"
            onKeyDown={(e) => activeEnter(e)}
          />
          <LoginBtn font="15px" onClick={handleLogin}>
            로그인
          </LoginBtn>
          <MTxt size="12px" mbottom="10px" ptop="5vh">
            계정이 없으신가요?
          </MTxt>
          <MSignupBtn
            font="15px"
            onClick={() => {
              navigate("/signup");
            }}
          >
            회원가입하기
          </MSignupBtn>
        </MWrapper>
      )}
    </>
  );
};

export default LoginPage;

const MWrapper = styled.div`
  width: 100vw;
  height: calc(100vh - 80px);
  background-color: #262626;
  padding: 0 17vw;
`;
const MTxt = styled.div`
  color: white;
  text-align: center;
  font-size: ${(props) => props.size};
  font-weight: 700;
  margin-bottom: ${(props) => props.mbottom};
  padding-top: ${(props) => props.ptop};
`;
const MInput = styled.input`
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
const MSignupBtn = styled.button`
  border: none;
  background-color: white;
  border-radius: 40px;
  color: #ca3525;
  font-size: ${(props) => props.font};
  font-weight: 600;
  padding: 20px;
  width: 100%;
`;
const LoginBtn = styled.button`
  border: none;
  background-color: #ca3525;
  border-radius: 40px;
  color: white;
  font-size: ${(props) => props.font};
  font-weight: 600;
  padding: 20px;
  width: 100%;
  &:hover {
    background-color: white;
    color: #ca3525;
  }
`;
