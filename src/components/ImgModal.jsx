import React from "react";
import Modal from "react-modal";
import "../style/TicketModal.css";

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
    width: "fit-content",
    minHeight: "fit-content",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "35px",
    backgroundColor: "rgba(0, 0, 0, 0)",
    border: "none",
    justifyContent: "center",
    alignItems: "center",
    overflow: "auto",
    zIndex: "999",
  },
};

const ImgModal = ({ isOpen, onRequestClose, imgUrl }) => {
  return (
    <Modal isOpen={isOpen} style={customStyles} onRequestClose={onRequestClose}>
      <img src={imgUrl} alt="img" />
    </Modal>
  );
};

export default ImgModal;
