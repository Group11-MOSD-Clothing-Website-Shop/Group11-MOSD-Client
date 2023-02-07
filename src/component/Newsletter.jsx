import React from "react";
import SendIcon from "@mui/icons-material/Send";
import {
  Container,
  Title,
  Description,
  InputContainer,
  Input,
  Button,
} from "./style-component/Newsletter";
const Newsletter = () => {
  return (
    <Container>
      <Title>Newsletter</Title>
      <Description>Get timely updates from favourite products.</Description>
      <InputContainer>
        <Input placeholder="Your email" />
        <Button>
          <SendIcon />
        </Button>
      </InputContainer>
    </Container>
  );
};

export default Newsletter;
