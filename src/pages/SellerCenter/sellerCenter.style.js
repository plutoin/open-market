import styled from "styled-components";
import Plus from "../../assets/icon-plus.svg";

export const Title = styled.div`
  display: flex;
  width: 1920px;
  justify-content: space-between;
  align-items: center;
  padding: 44px 100px 42px;
  box-sizing: border-box;
  > h1 {
    font-size: 36px;
    font-weight: 700;
    line-height: 44px;
    > strong {
      margin-left: 16px;
      font-size: 36px;
      font-weight: 500;
      line-height: 44px;
      color: var(--color-green);
    }
  }

  > button {
    display: flex;
    width: 168px;
    padding: 11px 0;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 5px;
    color: white;
    background-color: var(--color-green);
    font-size: 18px;
    font-weight: 500;
    line-height: 23px;
    ::before {
      content: "";
      margin-right: 8px;
      height: 32px;
      width: 32px;
      background: url(${Plus}) no-repeat center / 32px 32px;
    }
  }
`;

export const Container = styled.div`
  display: flex;
  width: 1920px;
  padding: 0 100px;
  gap: 30px;
  box-sizing: border-box;
`;

export const Button = styled.button`
  width: 250px;
  padding: 15px 20px;
  margin-bottom: 10px;
  border: none;
  border-radius: 5px;
  background-color: white;
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  text-align: left;
  :hover {
    background-color: #effff3;
    cursor: pointer;
  }
  :first-child {
    color: white;
    background-color: var(--color-green);
  }
`;

export const ProductBox = styled.div`
  width: 1440px;
  height: 884px;
  background: #f2f2f2;
  border: 1px solid var(--color-light-gray);
  border-radius: 5px;
`;

export const ItemHeader = styled.ul`
  display: flex;
  width: 1440px;
  border-bottom: 1px solid var(--color-light-gray);
  padding: 18px 53px 18px 366px;
  border-radius: 5px 5px 0 0;
  background-color: white;
  box-sizing: border-box;
  > li {
    font-size: 18px;
    font-weight: 400;
    line-height: 23px;
    :first-child {
      margin-right: 473px;
    }
    :nth-child(2) {
      margin-right: 240px;
    }
    :last-child {
      margin-left: 106px;
    }
  }
`;
