import styled from "styled-components";

export const RedButton = styled("div")`
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  height: 30px;
  min-width: 40px;
  font-size: 14px;
  line-height: 1.4;
  padding-left: 12px;
  padding-right: 12px;
  border-radius: 3px;
  opacity: 1;
  user-select: none;
  transition-property: background, opacity;
  transition-duration: 100ms;
  transition-timing-function: ease-out;
  color: rgb(235, 86, 86);
  fill: rgb(235, 86, 86);
  background: rgba(235, 86, 86, 0.06);
  box-shadow: rgba(15, 15, 15, 0.1) 0px 1px 2px,
    rgba(235, 86, 86, 0.3) 0px 0px 0px 1px inset;
  font-weight: 500;
  width: 100%;
  cursor: pointer;
  &:hover {
    background-color: #fefefe;
  }
`;
