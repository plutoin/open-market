import styled from "styled-components";

export const CartSection = styled.section`
  width: 1280px;
  margin: 0 auto;
  padding-top: 94px;
  padding-bottom: 160px;
  text-align: center;
  h1 {
    padding: 54px 0 52px;
    font-size: 36px;
    font-weight: 700;
    line-height: 44px;
    text-align: center;
  }
  > button {
    width: 220px;
    margin-top: 40px;
    padding: 19px 0;
    border: none;
    border-radius: 5px;
    color: white;
    background-color: var(--color-green);
    font-size: 24px;
    font-weight: 700;
    line-height: 30px;
    :disabled {
      background-color: var(--color-light-gray);
    }
  }
`;
