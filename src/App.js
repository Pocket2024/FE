import { Routes, Route } from 'react-router-dom';
import './App.css';
import styled from 'styled-components';
import LandingPage from './pages/LandingPage';
import TopBar from './components/TopBar';
import SearchPage from './pages/SearchPage';
import MyTicketPage from './pages/MyTicketPage';

function App() {
  return (
    <>
    <TopBar/>
    <Page>
      <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path='/search' element={<SearchPage/>}/>
          <Route path='/myticket' element={<MyTicketPage/>}/>
      </Routes>
    </Page>
    </>
  );
}

export default App;

const Page = styled.div`
  padding-top: 100px;
  font-family: "Pretendard";
`