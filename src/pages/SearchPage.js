import React, { useState } from "react";
import styled from "styled-components";
import { IoSearch } from "react-icons/io5";
import HotTicket from "../components/HotTicket";

const Wrapper = styled.div`
  width: 100vw;
  min-height: calc(100vw - 80px);
  background-color: #262626;
  padding: 50px 100px;
`;
const SearchTitle = styled.div`
  font-size: 30px;
  font-weight: 700;
  color: white;
`;
const SearchDiv = styled.div`
  margin-top: 20px;
  width: 100%;
  padding: 20px 40px;
  background-color: #3d3d3d;
  display: flex;
  align-items: center;
  border-radius: 50px;
  gap: 0 15px;
`;
const SearchInput = styled.input`
  background-color: #3d3d3d;
  border: none;
  outline: none;
  width: 100%;
  font-size: 20px;
  color: white;
  font-weight: 500;
`;

const SearchPage = () => {
  const [keyword, setKeyword] = useState("");
  const onChangeSearch = (e) => setKeyword(e.target.value);
  return (
    <Wrapper>
      <SearchTitle>키워드 검색을 통한 티켓 탐색 🔍</SearchTitle>
      <SearchDiv>
        <IoSearch color="white" size={30} />
        <SearchInput
          placeholder="키워드를 입력해주세요"
          value={keyword}
          onChange={onChangeSearch}
        />
      </SearchDiv>
      <HotTicket />
    </Wrapper>
  );
};

export default SearchPage;
