import styled from "@emotion/styled/macro";
import { backgroundGray } from "../header/color";

const ApiInput = styled.input`
  padding: 15px 30px;
  background-color: gray;
  border: none;
  border-radius: 5px;
  margin-bottom: 30px;
  color: ${backgroundGray};
  font-weight: bold;
  ::-webkit-input-placeholder {
    color: ${backgroundGray};
    font-weight: bold;
  }
`;

const SubmitButton = styled.button`
  padding: 10px 30px;
  background-color: gray;
  color: ${backgroundGray};
  cursor: pointer;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  margin-bottom: 15px;
  width: 100px;
  &:hover {
    background-color: white;
  }
`;

const SavedApi = styled.div`
  height: 50px;
  width: 500px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: none;
  background-color: black;
  color: white;
  margin-bottom: 30px;
`;

const IconStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ApiText = styled.h3<{ chatgpt?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: white;
  margin-bottom: ${(props) => (props.chatgpt ? "5px" : "25px")};
`;

const ExistContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export { ApiInput, ApiText, SubmitButton, SavedApi, IconStyle, ExistContainer };
