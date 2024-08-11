import { Routes, Route } from "react-router-dom";
import "./App.css";
import styled from "styled-components";
import LandingPage from "./pages/LandingPage";
import TopBar from "./components/TopBar";
import SearchPage from "./pages/SearchPage";
import MyTicketPage from "./pages/MyTicketPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MyInfoPage from "./pages/MyInfoPage";
import DetailPage from "./pages/DetailPage";
import UploadPage from "./pages/UploadPage";
import MyTicketDetailPage from "./pages/MyTicketDetailPage";
import { ResponsiveProvider } from "./context/Responsive";

function App() {
  return (
    <>
      <ResponsiveProvider>
        <TopBar />
        <Page>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/myticket" element={<MyTicketPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/myinfo" element={<MyInfoPage />} />
            <Route path="/detail/:id" element={<DetailPage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/myticket/:pocket" element={<MyTicketDetailPage />} />
          </Routes>
        </Page>
      </ResponsiveProvider>
    </>
  );
}

export default App;

const Page = styled.div`
  padding-top: 80px;
  font-family: "Pretendard";
`;
