import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { MdCancel } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import api from "../api/api";

// Styled components
const Wrapper = styled.div`
  width: 400px;
  height: 60vh;
  position: fixed;
  bottom: 16vh;
  right: 50px;
  background-color: white;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  z-index: 1000;
`;
const ChatBotTopbar = styled.div`
  width: 100%;
  height: 40px;
  background-color: #3c8fdb;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-radius: 20px 20px 0 0;
  padding: 0 20px;
`;
const InputBar = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  gap: 0 10px;
  padding: 0 20px;
  input {
    outline: none;
    border: none;
    background-color: #f1f1f1;
    border-radius: 30px;
    padding: 10px 20px;
    height: 40px;
    color: #262626;
    font-size: 15px;
    width: 100%;
    &::placeholder {
      color: #c5c5c5;
    }
  }
  button {
    outline: none;
    border: none;
    background-color: #3c8fdb;
    border-radius: 50%;
    aspect-ratio: 1 / 1;
    height: 40px;
  }
`;
const ChatContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: calc(60vh - 100px);
`;

const Message = styled.div`
  background-color: ${(props) =>
    props.sender === "user" ? "#daf8cb" : "#f1f1f1"};
  align-self: ${(props) =>
    props.sender === "user" ? "flex-end" : "flex-start"};
  padding: 10px 20px;
  border-radius: 20px;
  max-width: 70%;
  word-wrap: break-word;
  color: #262626;
`;

const ChatBotDisplay = ({ onClick }) => {
  const [chatinput, setChatinput] = useState("");
  const [messages, setMessages] = useState([]); // 대화 메시지를 저장할 상태
  const chatEndRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가
  const ACCESS_TOKEN = localStorage.getItem("accessToken");

  // 컴포넌트가 처음 마운트될 때 환영 메시지 추가
  useEffect(() => {
    const welcomeMessage = {
      sender: "bot",
      text: "챗봇 서비스에 오신 것을 환영합니다. 궁금한 점을 입력해주세요.",
    };
    setMessages([welcomeMessage]);

    // 배경 스크롤 방지
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const onChangeInput = (e) => {
    setChatinput(e.target.value);
  };

  const handleSendBtn = () => {
    if (!chatinput.trim()) return;

    const userMessage = { sender: "user", text: chatinput };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // '답변 중...' 메시지를 추가하고 로딩 상태로 설정
    const loadingMessage = {
      sender: "bot",
      text: "답변 중.. 잠시만 기다려주세요.",
    };
    setMessages((prevMessages) => [...prevMessages, loadingMessage]);
    setIsLoading(true);

    api
      .post(
        "/api/chatbot/ask",
        { chatinput },
        {
          headers: {
            Authorization: `${ACCESS_TOKEN}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        // '답변 중...' 메시지를 제거하고 실제 응답 메시지를 추가
        setMessages((prevMessages) => [
          ...prevMessages.slice(0, -1), // 마지막 메시지 ('답변 중...') 제거
          { sender: "bot", text: res.data },
        ]);
        setIsLoading(false);
        setChatinput("");
      })
      .catch((err) => {
        console.log("chatbot error", err);
      });
  };

  return (
    <Wrapper>
      <ChatBotTopbar>
        <MdCancel
          fill="white"
          onClick={onClick}
          style={{ cursor: "pointer" }}
        />
      </ChatBotTopbar>
      <ChatContainer>
        {messages.map((msg, index) => (
          <Message key={index} sender={msg.sender}>
            {msg.text}
          </Message>
        ))}
        <div ref={chatEndRef} />
      </ChatContainer>
      <InputBar>
        <input
          type="text"
          value={chatinput}
          onChange={onChangeInput}
          placeholder="궁금한 정보를 입력해주세요."
        />
        <button onClick={handleSendBtn}>
          <IoSend fill="white" />
        </button>
      </InputBar>
    </Wrapper>
  );
};

export default ChatBotDisplay;
