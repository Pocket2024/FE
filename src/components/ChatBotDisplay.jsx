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
  z-index: 1000; /* 다른 요소보다 위에 표시 */
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
  align-items: center;
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
  max-height: calc(60vh - 100px); /* InputBar와 Topbar를 제외한 높이 */
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
  const chatEndRef = useRef(null); // 마지막 메시지의 ref 생성
  const ACCESS_TOKEN = localStorage.getItem("accessToken");

  // 채팅이 업데이트될 때마다 스크롤을 최신 메시지로 이동
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 배경 스크롤 방지
    document.body.style.overflow = "hidden";
    return () => {
      // 컴포넌트가 언마운트될 때 배경 스크롤 허용
      document.body.style.overflow = "auto";
    };
  }, []);

  // Input change handler
  const onChangeInput = (e) => {
    setChatinput(e.target.value);
  };

  // 메시지 전송 함수
  const handleSendBtn = () => {
    if (!chatinput.trim()) return; // 빈 메시지일 경우 전송하지 않음

    // 사용자의 메시지를 추가
    const userMessage = { sender: "user", text: chatinput };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // API 호출
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
        // 챗봇 응답 메시지 추가
        const botMessage = { sender: "bot", text: res.data };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
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
        <div ref={chatEndRef} /> {/* 스크롤을 위한 ref */}
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
