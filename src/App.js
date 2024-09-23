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
import OtherUserPage from "./pages/OtherUserPage";
import FollowPage from "./pages/FollowPage";
import CalendarDetailPage from "./pages/CalendarDetailPage";
import { useIsLoading } from "./store/store";
import Loading from "./components/Loading";
import Notification from "./components/Notification";
import LikeTicketPage from "./pages/LikeTicketPage";

function App() {
  const { isLoading } = useIsLoading();
  return (
    <>
      <ResponsiveProvider>
        {isLoading && <Loading />}
        <TopBar />
        <Notification />
        <Page>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/myticket" element={<MyTicketPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/myinfo" element={<MyInfoPage />} />
            <Route path="/detail/:ticket" element={<DetailPage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/myticket/:pocket" element={<MyTicketDetailPage />} />
            <Route
              path="/myticket/:pocket/:ticket"
              element={<MyTicketDetailPage />}
            />
            <Route path="/user/:otheruserId" element={<OtherUserPage />} />
            <Route
              path="/user/:otheruserId/:pocket"
              element={<MyTicketDetailPage />}
            />
            <Route
              path="/user/:otheruserId/:pocket/:ticket"
              element={<MyTicketDetailPage />}
            />
            <Route path="/following" element={<FollowPage />} />
            <Route path="/follower" element={<FollowPage />} />
            <Route
              path="/myticket/calendar/:date"
              element={<CalendarDetailPage />}
            />
            <Route
              path="/myticket/calendar/:date/:ticket"
              element={<CalendarDetailPage />}
            />
            <Route path="/myticket/like" element={<LikeTicketPage />} />
            <Route path="/myticket/like/:ticket" element={<LikeTicketPage />} />
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
