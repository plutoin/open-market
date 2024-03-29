import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { getSearchResult } from "../../api/productApi";
import { getCookie } from "../../Cookie";

import Dropdown from "../Dropdown/Dropdown";

import {
  Container,
  Label,
  LogoBtn,
  BtnContainer,
  CartBtn,
  UserBtn,
  SellerBtn,
} from "./header.style";

export default function Header() {
  const modalRef = useRef();
  const navigate = useNavigate();

  const token = getCookie("token");
  const loginType = getCookie("loginType");

  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleModal = () => {
    if (isOpen === true) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const onClickSearch = async () => {
    const searchResults = await getSearchResult(searchText);
    navigate("/searchResult", {
      state: searchResults,
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onClickSearch();
    }
  };

  return (
    <Container>
      <LogoBtn to="/" />
      <Label htmlFor="search">
        <input
          id="search"
          type="text"
          placeholder="상품을 검색해 보세요!"
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
        />
        <button onClick={onClickSearch}>
          <span className="ir">검색 버튼</span>
        </button>
      </Label>
      {loginType === "SELLER" ? (
        <>
          <BtnContainer modal={isOpen} width="56">
            <UserBtn onClick={handleModal} ref={modalRef} modal={isOpen} />
            <span>마이페이지</span>
            {isOpen && <Dropdown />}
          </BtnContainer>
          <SellerBtn onClick={() => navigate("/sellerCenter")}>
            판매자 센터
          </SellerBtn>
        </>
      ) : (
        <>
          <BtnContainer>
            {token ? (
              <CartBtn onClick={() => navigate("/cart")} />
            ) : (
              <CartBtn onClick={() => navigate("/login")} />
            )}
            <span>장바구니</span>
          </BtnContainer>
          {token ? (
            <BtnContainer modal={isOpen} width="56">
              <UserBtn onClick={handleModal} ref={modalRef} modal={isOpen} />
              <span>마이페이지</span>
              {isOpen && <Dropdown />}
            </BtnContainer>
          ) : (
            <BtnContainer width="56">
              <UserBtn onClick={() => navigate("/login")} />
              <span>로그인</span>
            </BtnContainer>
          )}
        </>
      )}
    </Container>
  );
}
