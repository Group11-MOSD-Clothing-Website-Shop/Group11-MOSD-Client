import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/apiCalls";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import Button from "@mui/material/Button";
import Icon from "../component/Icon";
import { useNavigate } from "react-router-dom";
import { loginFailure, loginSuccess, resetError } from "../redux/userRedux";
import {
  Container,
  Wrapper,
  Title,
  Form,
  Input,
  Link,
  Error,
} from "./style-component/Login";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navi = useNavigate();
  gapi.load("client:auth2", () => {
    gapi.auth2.init({
      clientId:
        "694830871542-d8ggebospri9avtnpi995163epoe0d7d.apps.googleusercontent.com",
      plugin_name: "chat",
      // scope: 'https://www.googleapis.com/auth/spreadsheets.readonly'
    });
  });

  useEffect(() => {
    if (error) dispatch(resetError());
  }, [dispatch]);

  const inputHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, formData);
    // navi('/')
  };
  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      dispatch(
        loginSuccess({
          token,
          ...result,
        })
      );
      window.location.reload();
    } catch (error) {
      dispatch(
        loginFailure(
          error?.message || "Google sign in unsuccessfully. Try again"
        )
      );
    }
  };

  const googleFailure = (err) => {
    dispatch(loginFailure("Google sign in unsuccessfully. Try again"));
  };
  return (
    <Container>
      <Wrapper>
        <Title>LOG IN</Title>
        <Form>
          <Input
            placeholder="Email"
            name="email"
            value={formData.name}
            onChange={inputHandler}
            required
          />
          <Input
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={inputHandler}
            required
          />
          <GoogleLogin
            fullWidth
            clientId="694830871542-d8ggebospri9avtnpi995163epoe0d7d.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                style={{ backgroundColor: "teal", marginTop: "20px" }}
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy={"single_host_origin"}
          />
          <Button
            fullWidth
            variant="contained"
            style={{ backgroundColor: "teal", margin: "20px 0" }}
            onClick={handleClick}
          >
            LOG IN
          </Button>
          {error && <Error>{error}</Error>}
          <Link>DO YOU FORGET YOUR PASSWORD?</Link>
          <Link onClick={() => navi("/register")}>CREATE A NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
