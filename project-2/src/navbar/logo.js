import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  z-index: 11;
`;

const LogoImg = styled.div`
  width: 70px;
  height: 70px;

  img {
    width: 100%;
    height: 100%;
  }
`;

const LogoText = styled.h1`
  font-size: 20px;
  margin: 0;
  margin-left: 4px;
  color: white;
  font-weight: 500;
`;

export default function Logo(props) {
  let logoSrc = props.isMobile
    ? "https://firebasestorage.googleapis.com/v0/b/goal-husky.appspot.com/o/favicon.png?alt=media&token=f3285f01-f19b-4fd3-9a04-fcb10d998463"
    : "https://firebasestorage.googleapis.com/v0/b/goal-husky.appspot.com/o/logo.png?alt=media&token=d8ff5e4c-94c2-434a-b1e8-d3e534b2f8b8";
  return (
    <NavLink to="/main" style={{ textDecoration: "none" }}>
      <LogoWrapper>
        <LogoImg>
          <img src={logoSrc} alt="Goal Husky logo" />
        </LogoImg>{" "}
        {!props.isMobile && <LogoText> Goal Husky! </LogoText>}{" "}
      </LogoWrapper>{" "}
    </NavLink>
  );
}
