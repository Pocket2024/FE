import React, { useState } from "react";
import Modal from "react-modal";
import "../style/TicketModal.css";
import Detail from "./Detail";

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
    width: "600px",
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

const TicketModal = ({ isOpen, onRequestClose }) => {
  return (
    <Modal isOpen={isOpen} style={customStyles} onRequestClose={onRequestClose}>
      <Detail />
    </Modal>
  );
};

export default TicketModal;
