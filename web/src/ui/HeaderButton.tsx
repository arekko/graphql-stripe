import styled from "styled-components";

export const HeaderButton = styled("div")`
  display: inherit;
  align-items: center;
  width: auto;
  user-select: none;
  transition-property: background, opacity;
  transition-duration: 100ms;
  transition-timing-function: ease-out;
  padding: 4px 10px;
  border-radius: 3px;
  flex-shrink: 0;
  margin-left: 4px;
  margin-right: 4px;
  font-size: 15px;
  font-weight: 500;
  &:hover {
    background-color: rgba(50, 50, 50, 0.08);
  }
`;
