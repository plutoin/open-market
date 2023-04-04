import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Logo from "../../assets/Logo-hodu.png";

export default function SellerHeader() {
  const navigate = useNavigate();

  return (
    <Container>
      <button onClick={() => navigate("/")} />
      <h1>판매자 센터</h1>
    </Container>
  );
}

const Container = styled.header`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 26px 0 26px 100px;
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.1);
  > h1 {
    font-size: 30px;
    font-weight: 500;
    line-height: 38px;
  }
  > button {
    width: 80px;
    height: 80px;
    border: none;
    background: url(${Logo}) no-repeat center / contain;
  }
`;
