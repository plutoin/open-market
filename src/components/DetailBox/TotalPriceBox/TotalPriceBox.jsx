import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getCookie } from "../../../Cookie";
import { getCarts, postCarts } from "../../../api/cartApi";

import Modal from "../../Modal/Modal";

import {
  ConfirmContainer,
  TotalInfo,
  TotalPrice,
  TotalQuantity,
  BuyButton,
  CartButton,
} from "./totalPriceBox.style";

export default function TotalPriceBox({
  detail,
  quantity,
  totalPrice,
  loginType,
}) {
  const { product_id } = useParams();
  const navigate = useNavigate();
  const token = getCookie("token");

  const [loginModal, setLoginModal] = useState(false);
  const [cartModal, setCartModal] = useState(false);
  const [cart, setCart] = useState([]);

  const addCart = () => {
    postCarts(token, product_id, quantity).then(navigate("/cart"));
  };

  const goToPayment = () => {
    navigate("/payment", {
      state: {
        products: [
          {
            ...detail,
            quantity,
            order_kind: "direct_order",
          },
        ],
      },
    });
  };

  const openLoginModal = () => {
    setLoginModal(true);
  };

  const closeLoginModal = () => {
    setLoginModal(false);
  };

  const openCartModal = () => {
    setCartModal(true);
  };

  const closeCartModal = () => {
    setCartModal(false);
  };

  useEffect(() => {
    getCarts(token);
  }, [token]);

  const isCart = cart?.filter((i) => i.product_id === parseInt(product_id));

  return (
    <>
      <ConfirmContainer>
        <TotalInfo>총 상품 금액</TotalInfo>
        <TotalPrice>
          <TotalQuantity>
            총 수량 <strong>{quantity}</strong>개
          </TotalQuantity>
          {totalPrice?.toLocaleString()}
          <span>원</span>
        </TotalPrice>
      </ConfirmContainer>
      {detail?.stock === 0 ? (
        <BuyButton style={{ width: "100%" }} disabled>
          품절
        </BuyButton>
      ) : (
        <>
          <BuyButton
            disabled={loginType === "SELLER" ? true : false}
            onClick={
              !token
                ? openLoginModal
                : isCart.length > 0
                ? openCartModal
                : goToPayment
            }
          >
            바로 구매
          </BuyButton>
          <CartButton
            disabled={loginType === "SELLER" ? true : false}
            onClick={
              !token
                ? openLoginModal
                : isCart.length > 0
                ? openCartModal
                : addCart
            }
          >
            장바구니
          </CartButton>
        </>
      )}
      {loginModal && (
        <Modal
          option="login"
          openModal={openLoginModal}
          closeModal={closeLoginModal}
        />
      )}
      {cartModal && (
        <Modal
          option="cart"
          openModal={openCartModal}
          closeModal={closeCartModal}
        />
      )}
    </>
  );
}
