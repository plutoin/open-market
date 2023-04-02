import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useAuth } from "../../../auth/useAuth";

import {
  JoinContainer,
  JoinForm,
  JoinButton,
  SellerCodeLabel,
  CheckBoxContainer,
  ErrorMsg,
} from "./buyerJoinForm.style";

import { Tab } from "../../Login/login.style";

export default function BuyerJoinForm() {
  const { onClickBuyerJoin, onClickSellerJoin, validID, validSellerCode } =
    useAuth();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    reset,
    watch,
    getValues,
  } = useForm({ mode: "onBlur", defaultValues: { checkBox: false } });

  const [isSelected, setIsSelected] = useState(true);

  const isValid = watch("checkBox");

  const goToLogin = () => {
    navigate("/login");
  };

  const onSubmit = handleSubmit((data) => {
    if (data.password !== data.password2) {
      setError(
        "password2",
        { message: "비밀번호가 일치하지 않습니다." },
        { shouldFocus: true }
      );
    }

    const phonenum = data.phonenum1 + data.phonenum2 + data.phonenum3;

    if (isSelected) {
      onClickBuyerJoin(data, phonenum, setError, reset, goToLogin);
    } else {
      onClickSellerJoin(data, phonenum, setError, reset, goToLogin);
    }
  });

  const onValidID = () => {
    const id = getValues("userID");
    validID(id, setError);
  };

  const onValidSellerCode = () => {
    const code = getValues("sellerCode");
    validSellerCode(code, setError);
  };

  return (
    <JoinContainer>
      <ul>
        <Tab
          isSelected={isSelected}
          onClick={() => {
            setIsSelected(true);
          }}
        >
          구매회원가입
        </Tab>
        <Tab
          isSelected={!isSelected}
          onClick={() => {
            setIsSelected(false);
          }}
        >
          판매회원가입
        </Tab>
      </ul>
      <JoinForm onSubmit={onSubmit}>
        <label htmlFor="userID">아이디</label>
        <input id="userID" type="id" {...register("userID")} />
        <button className="check" onClick={onValidID}>
          중복확인
        </button>
        {errors.userID && errors.userID.message === "멋진 아이디네요 :)" ? (
          <ErrorMsg style={{ color: "var(--color-green)" }}>
            {errors.userID?.message}
          </ErrorMsg>
        ) : (
          <ErrorMsg>{errors.userID?.message}</ErrorMsg>
        )}

        <label htmlFor="userPW">비밀번호</label>
        <input
          id="userPW"
          type="password"
          maxLength="16"
          {...register("password", {
            required: "비밀번호를 입력해 주세요.",
            minLength: {
              value: 8,
              message: "8글자 이상 입력해 주세요.",
            },
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,16}$/,
              message: "8~16자 영문 대소문자, 숫자, 특수문자를 사용하세요.",
            },
            maxLength: {
              value: 16,
              message: "16자 이하로 입력해 주세요.",
            },
          })}
        />
        {errors.password && <ErrorMsg>{errors.password?.message}</ErrorMsg>}

        <label htmlFor="userPWCheck">비밀번호 재확인</label>
        <input
          id="userPWCheck"
          type="password"
          {...register("password2", {
            required: "비밀번호가 일치하지 않습니다.",
          })}
        />
        {errors.password2 && <ErrorMsg>{errors.password2?.message}</ErrorMsg>}

        <label htmlFor="userName">이름</label>
        <input
          id="userName"
          type="text"
          {...register("name", {
            required: "이름을 입력해 주세요.",
          })}
        />
        {errors.name && <ErrorMsg>{errors.name?.message}</ErrorMsg>}

        <label htmlFor="userNumber">휴대폰번호</label>
        <select id="phone" className="phone" {...register("phonenum1")}>
          <option>010</option>
          <option>011</option>
          <option>016</option>
          <option>017</option>
          <option>070</option>
        </select>
        <input
          type="text"
          className="phone"
          maxLength="4"
          {...register("phonenum2", {
            pattern: {
              value: /^[0-9]+$/,
              message: "숫자만 입력해 주세요.",
            },
          })}
        />
        <input
          type="text"
          className="phone"
          maxLength="4"
          {...register("phonenum3", {
            pattern: {
              value: /^[0-9]+$/,
              message: "숫자만 입력해 주세요.",
            },
          })}
        />
        {errors.phonenum2 && <ErrorMsg>{errors.phonenum2?.message}</ErrorMsg>}
        {errors.phonenum3 && <ErrorMsg>{errors.phonenum3?.message}</ErrorMsg>}

        <label htmlFor="email_1">이메일</label>
        <input id="email_1" type="text" />
        <span className="at">@</span>
        <label htmlFor="email_2" className="ir">
          이메일
        </label>
        <input id="email_2" type="text" />
        {!isSelected && (
          <>
            <SellerCodeLabel htmlFor="sellerCode">
              사업자 등록번호
            </SellerCodeLabel>
            <input id="sellerCode" type="text" {...register("sellerCode")} />
            <button className="check" onClick={onValidSellerCode}>
              인증
            </button>

            {errors.sellerCode &&
            errors.sellerCode.message ===
              "사용 가능한 사업자등록번호입니다." ? (
              <ErrorMsg style={{ color: "var(--color-green)" }}>
                {errors.sellerCode?.message}
              </ErrorMsg>
            ) : (
              <ErrorMsg>{errors.sellerCode?.message}</ErrorMsg>
            )}

            <label htmlFor="storeName">스토어 이름</label>
            <input id="storeName" type="text" {...register("storeName")} />
            {errors.storeName && (
              <ErrorMsg>{errors.storeName?.message}</ErrorMsg>
            )}
          </>
        )}
        <CheckBoxContainer>
          <input id="check" type="checkbox" {...register("checkBox")} />
          <label htmlFor="check"></label>
          <span>
            호두샵의 <strong>이용약관</strong> 및{" "}
            <strong>개인정보처리방침</strong>에 대한 내용을 확인하였고
            동의합니다.
          </span>
        </CheckBoxContainer>
        <JoinButton type="submit" disabled={!isValid} onClick={onSubmit}>
          가입하기
        </JoinButton>
      </JoinForm>
    </JoinContainer>
  );
}
