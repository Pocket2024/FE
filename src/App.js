import { Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './pages/LandingPage';
import TopBar from './components/TopBar';

function App() {
  return (
    <>
    <TopBar/>
    <Routes>
        <Route path="/" element={<LandingPage/>}/>
    </Routes>
    </>
  );
}

export default App;
