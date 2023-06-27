import styled from "styled-components/native";

export const Container = styled.View`
  height: 80px;
  flex-direction: row;
  background: #fafafa;
  z-index: 1;
`;
export const ImageContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
export const InfoContainer = styled.View`
  flex: 3;
  flex-direction: row;
  border-bottom-color: #ddd;
  border-bottom-width: 1px;
  align-items: center;
  justify-content: space-between;
`;
