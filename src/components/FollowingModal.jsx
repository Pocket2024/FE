import React, { useEffect } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import "../style/TicketModal.css";
import api from "../api/api";
import { useCookies } from "react-cookie";

const customStyles = {
  overlay: {
    backgroundColor: " rgba(0, 0, 0, 0.5)",
    width: "100%",
    height: "100vh",
    zIndex: "998",
    position: "fixed",
    top: "0",
    left: "0",
  },
  content: {
    width: "460px",
    minHeight: "50vh",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "35px",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.25)",
    backgroundColor: "#262626",
    border: "none",
    justifyContent: "center",
    overflow: "auto",
    zIndex: "999",
    padding: "40px",
  },
};

const mobilecustomStyles = {
  overlay: {
    backgroundColor: " rgba(0, 0, 0, 0.5)",
    width: "100%",
    height: "100vh",
    zIndex: "998",
    position: "fixed",
    top: "0",
    left: "0",
  },
  content: {
    width: "90vw",
    minHeight: "fit-content",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "35px",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.25)",
    backgroundColor: "#262626",
    border: "none",
    justifyContent: "center",
    overflow: "auto",
    zIndex: "999",
    padding: "40px",
  },
};

const FollowingModal = ({ isOpen, onRequestClose, following }) => {
  console.log("받아온 팔로잉 목록", following);
  return (
    <Modal isOpen={isOpen} style={customStyles} onRequestClose={onRequestClose}>
      <Title>팔로잉 목록</Title>
      <ListDiv>
        {following.map((following) => (
          <List>
            <ProfileImg src={following.profileImage} />
            <NameBio>
              <Nickname>{following.nickname}</Nickname>
              <Bio>{following.bio}</Bio>
            </NameBio>
          </List>
        ))}
      </ListDiv>
    </Modal>
  );
};

export default FollowingModal;

const Title = styled.div`
  color: white;
  font-size: 25px;
  font-weight: 700;
`;
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
