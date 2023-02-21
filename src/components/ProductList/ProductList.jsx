import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { AxiosInstance } from "../../Axios";
import { setProducts } from "../../redux/action/Actions";

import Loading from "../Loading/Loading";

import {
  Container,
  ItemContainer,
  ItemImage,
  ItemStore,
  ItemName,
  ItemPrice,
} from "./productList.style";

export default function ProductList() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [loading, setLoading] = useState(null);

  const { products } = useSelector((state) => ({
    products: state.productReducer.products,
  }));

  const productList = async () => {
    try {
      const res = await AxiosInstance.get("products/");
      dispatch(setProducts(res.data.results));
      setLoading(false);
    } catch {
      console.log("ERROR!");
    }
  };

  useEffect(() => {
    productList();
    setLoading(true);
  }, []);

  return (
    <Container>
      {loading && <Loading />}
      {products &&
        products.map((item) => (
          <ItemContainer
            onClick={() => history.push(`productDetail/${item.product_id}`)}
            key={item.product_id}
          >
            <ItemImage src={item.image} alt="상품 이미지" />
            <ItemStore>{item.store_name}</ItemStore>
            <ItemName>{item.product_name}</ItemName>
            <ItemPrice>
              <strong>
                {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </strong>
              원
            </ItemPrice>
          </ItemContainer>
        ))}
    </Container>
  );
}
