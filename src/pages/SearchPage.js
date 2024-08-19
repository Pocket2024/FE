import React, { useState } from "react";
import styled from "styled-components";
import { IoSearch } from "react-icons/io5";
import HotTicket from "../components/HotTicket";
import RecentTicket from "../components/RecentTicket";
import api from "../api/api";
import SearchResult from "../components/SearchResult";

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
const TypeRadioBox = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 0 10px;
`;
const TypeInput = styled.input`
  display: none;
  &:checked + label {
    background-color: #ffe976; /* 체크된 경우 배경색 변경 */
    span {
      color: #151515;
    }
  }
`;
const TypeLabel = styled.label`
  padding: 8px 25px;
  background-color: #656565;
  border-radius: 20px;
  cursor: pointer;
  &:hover {
    background-color: #8a8a8a;
  }
`;
const TypeSpan = styled.span`
  color: white;
  font-size: 17px;
  font-weight: 500;
`;

const SearchPage = () => {
  let ACCESS_TOKEN = localStorage.getItem("accessToken");
  const [keyword, setKeyword] = useState("");
  const [selectedTypeId, setSelectedTypeId] = useState(1); // 기본값을 1로 설정
  const [selectedType, setSelectedType] = useState("title");
  const [isSearch, setIsSearch] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const onChangeSearch = (e) => setKeyword(e.target.value);
  const handleTypeChange = (id, type) => {
    setSelectedTypeId(id); // 선택된 타입을 업데이트
    setSelectedType(type);
  };
  const searchType = [
    { id: 1, value: "title", name: "제목" },
    { id: 2, value: "location", name: "장소" },
    { id: 3, value: "seat", name: "좌석" },
    { id: 4, value: "date", name: "날짜" },
    { id: 5, value: "content", name: "내용" },
  ];
  const handleSearch = () => {
    api
      .get(
        `/api/reviews/search?keyword=${keyword}&searchType=${selectedType}`,
        {
          headers: {
            Authorization: `${ACCESS_TOKEN}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setSearchResult(res.data);
        setIsSearch(true);
        setSearchKeyword(keyword);
      })
      .catch((err) => {
        console.log("검색 에러", err);
      });
  };
  const activeEnter = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <Wrapper>
      <SearchTitle>키워드 검색을 통한 티켓 탐색 🔍</SearchTitle>
      <TypeRadioBox>
        {searchType.map((type) => (
          <>
            <TypeInput
              type="radio"
              id={type.id}
              value={type.value}
              checked={selectedTypeId === type.id} // 선택된 타입을 확인
              onChange={() => handleTypeChange(type.id, type.value)}
            />
            <TypeLabel htmlFor={type.id} key={type.id}>
              <TypeSpan>{type.name}</TypeSpan>
            </TypeLabel>
          </>
        ))}
      </TypeRadioBox>
      <SearchDiv>
        <IoSearch color="white" size={30} />
        <SearchInput
          placeholder="키워드를 입력해주세요"
          value={keyword}
          onChange={onChangeSearch}
          onKeyDown={(e) => activeEnter(e)}
        />
      </SearchDiv>
      {isSearch ? (
        <SearchResult results={searchResult} keyword={searchKeyword} />
      ) : (
        <>
          <HotTicket />
          <RecentTicket />
        </>
      )}
    </Wrapper>
  );
};

export default SearchPage;
