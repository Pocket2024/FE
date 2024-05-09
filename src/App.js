import { Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './pages/LandingPage';
import TopBar from './components/TopBar';
import SearchPage from './pages/SearchPage';
import MyTicketPage from './pages/MyTicketPage';

function App() {
  return (
    <>
    <TopBar/>
      <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path='/search' element={<SearchPage/>}/>
          <Route path='/myticket' element={<MyTicketPage/>}/>
      </Routes>
    </>
  );
}

export default App;
