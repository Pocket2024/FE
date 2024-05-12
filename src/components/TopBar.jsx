import styled from 'styled-components';
import { ReactComponent as LogoIcon } from '../images/pocketlogo_white.svg';
import { useNavigate } from 'react-router-dom';
import { IoTicket } from "react-icons/io5";
import { FaCompass } from "react-icons/fa";
import {useMediaQuery} from 'react-responsive';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import '../style/Dropdown.css';

const TopBarWrapper = styled.div`
    width: 100vw;
    height: 100px;
    background-color: #E65A2E;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 80px;
    position: fixed;
    z-index: 99;
`
const Logo = styled.div`
    height: 23px;
`
const TabContainer = styled.div`
    display: flex;
    width: 200px;
    justify-content: space-between;
`
const Tab = styled.div`
    display: flex;
    height: 23px;
    cursor: pointer;
`
const TabTxt = styled.div`
    color: white;
    font-weight: 700;
    font-size: 20px;
    margin-left: 10px;
`

const TopBar = () => {
    const navigate = useNavigate();
    const isDesktop = useMediaQuery({ minWidth: 800 });

    return (
        <>
        {isDesktop? 
            <TopBarWrapper>
                <Logo><LogoIcon fill='white'/></Logo>
                <TabContainer>
                    <Tab onClick={() => {navigate('/search')}}>
                        <FaCompass color='white' size={23}/>
                        <TabTxt>탐색</TabTxt>
                    </Tab>
                    <Tab onClick={() => {navigate('/myticket')}}>
                        <IoTicket color='white' size={23}/>
                        <TabTxt>내 티켓</TabTxt>
                    </Tab>
                </TabContainer>
            </TopBarWrapper>
            :
            <MTopBarWrapper>
                <Logo><LogoIcon fill='white' style={{width:'80px'}}/></Logo>
                <DropdownContainer>
                    <DropdownButton id="dropdown-basic-button" title="메뉴">
                    <Dropdown.Item className="item" onClick={() => navigate("/search")}><FaCompass color='#E65A2E' size={23}/><span>탐색</span></Dropdown.Item>
                    <Dropdown.Item className="item" onClick={() => navigate("/myticket")}><IoTicket color='#E65A2E' size={23}/><span>내 티켓</span></Dropdown.Item>
                    </DropdownButton>
                </DropdownContainer>
            </MTopBarWrapper>
        }
        </>
    );
};

export default TopBar;

const MTopBarWrapper = styled.div`
    width: 100vw;
    height: 100px;
    background-color: #E65A2E;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30px;
    position: fixed;
    z-index: 99;
`
const DropdownContainer = styled.div`
  display: flex;
  align-items: center;
  .dropdownbtn {
    background: #E65A2E;
  }
`;