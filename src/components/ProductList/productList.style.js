import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 70px;
  padding: 80px 320px 180px;
  background-color: white;
`;

export const ItemContainer = styled(Link)`
  display: flex;
  flex-direction: column;
  width: 380px;
  gap: 10px;
`;

export const ItemImage = styled.img`
  width: 380px;
  height: 380px;
  margin-bottom: 16px;
  border: 1px solid var(--color-light-gray);
  border-radius: 10px;
  box-sizing: border-box;
`;

export const ItemStore = styled.span`
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  color: var(--color-deep-gray);
`;

export const ItemName = styled.span`
  font-size: 18px;
  font-weight: 400;
  line-height: 22px;
`;

export const ItemPrice = styled.span`
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  > strong {
    font-size: 24px;
    font-weight: 700;
    line-height: 30px;
  }
`;
