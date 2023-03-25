import React, { useState } from "react";

import QuantityButton from "../QuantityButton/QuantityButton";

import { AxiosInstance } from "../../Axios";
import { getCookie } from "../../Cookie";

import { Container, Text, FirstBtn, SecBtn } from "./modal.style";
import { DeleteBtn } from "../CartBox/ItemCard/itemCard.style";

export default function Modal({
  option,
  productId,
  cartId,
  orderNum,
  active,
  minusStock,
  plusStock,
}) {
  const [modal, setModal] = useState(true);
  const token = getCookie("token");

  const editQuantity = async () => {
    try {
      await AxiosInstance.put(
        `/cart/${cartId}/`,
        {
          product_id: productId,
          quantity: orderNum,
          is_active: active,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      window.location.reload();
    } catch (error) {
      return error.response.data;
    }
  };

  const deleteItem = async () => {
    try {
      await AxiosInstance.delete(`/cart/${cartId}/`, {
        headers: {
          Authorization: token,
        },
      });
      alert("삭제되었습니다.");
      window.location.reload();
    } catch (error) {
      return error.response.data;
    }
  };

  return (
    <>
      {modal && (
        <Container>
          {option === "quantity" ? (
            <QuantityButton
              orderNum={orderNum}
              minusStock={minusStock}
              plusStock={plusStock}
            />
          ) : null}
          {option === "delete" ? (
            <Text>상품을 삭제하시겠습니까?</Text>
          ) : option === "login" ? (
            <Text>
              로그인이 필요한 서비스입니다.
              <br />
              로그인 하시겠습니까?
            </Text>
          ) : null}
          <div>
            {option === "delete" || option === "quantity" ? (
              <FirstBtn onClick={() => setModal(false)}>취소</FirstBtn>
            ) : option === "login" ? (
              <FirstBtn onClick={() => setModal(false)}>아니오</FirstBtn>
            ) : null}
            {option === "delete" ? (
              <SecBtn onClick={deleteItem}>확인</SecBtn>
            ) : option === "quantity" ? (
              <SecBtn onClick={editQuantity}>수정</SecBtn>
            ) : option === "login" ? (
              <SecBtn>예</SecBtn>
            ) : null}
          </div>
          <DeleteBtn onClick={() => setModal(false)} />
        </Container>
      )}
    </>
  );
}
