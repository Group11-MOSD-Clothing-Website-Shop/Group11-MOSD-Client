import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../redux/apiCalls";
import { resetError } from "../redux/userRedux";
import {
  Container,
  Wrapper,
  Title,
  Form,
  Input,
  Agreement,
  Button,
  ButtonContainer,
  Error,
} from "./style-component/Register";
const Register = () => {
  const navi = useNavigate();
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  useEffect(() => {
    if (error) dispatch(resetError());
  }, [dispatch]);
  const handleInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    register(dispatch, formData);
  };
  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleInput}
            required
          />
          <Input
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleInput}
            required
          />
          <Input
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleInput}
            required
          />
          <Input
            placeholder="Confirm password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInput}
            required
          />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          {error && <Error>{error}</Error>}
          <ButtonContainer>
            <Button type="submit">REGISTER</Button>
            <Button onClick={() => navi("/login")}>SWITCH LOGIN</Button>
          </ButtonContainer>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
