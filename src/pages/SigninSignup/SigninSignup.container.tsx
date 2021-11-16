import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

import { COLOR, SEMANTIC_COLOR, FONT_SIZE } from "../../assets/constants";
import { AuthContext } from "../../context/Auth.context";

import {
  Row,
  Heading2,
  InputLabel,
  TextInput,
} from "../../components/Common.component";
import ActionButton from "../../components/ActionButton.component";

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
`;

const FormContainer = styled.div`
  width: 420px;
  padding: 32px;
  display: flex;
  align-items: left;
  flex-direction: column;
  border-radius: 0px;
  background-color: ${COLOR.gray};
`;

const ShowPasswordButton = styled.button`
  border: none;
  background-color: transparent;
  padding: 4px 0;
  text-decoration: underline;
  cursor: pointer;
`;

const SigninSignupPage: React.FC<{ signIn: boolean }> = ({ signIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowpassword] = useState(false);

  const { activeUser, registerUser, signInUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmitClick = async () => {
    // TODO: validate fields
    if (signIn) {
      signInUser(email, password);
    } else {
      registerUser(email, password);
    }
  };

  useEffect(() => {
    console.log("activeUser: ", activeUser);
    if (activeUser) {
      navigate("/");
    }
  }, [activeUser]);

  return (
    <Container>
      <FormContainer>
        {activeUser ? (
          <div>ALREADY SIGNED IN</div>
        ) : (
          <>
            <Heading2 style={{ marginTop: 0, marginBottom: "32px" }}>
              {signIn ? "SIGN IN" : "SIGN UP"}
            </Heading2>
            <InputLabel htmlFor="email">Email</InputLabel>
            <TextInput
              type="email"
              name="email"
              value={email}
              onChange={(event) => {
                setEmail(event.currentTarget.value);
              }}
              style={{ marginBottom: "32px" }}
            />
            <InputLabel htmlFor="password">Password</InputLabel>
            <TextInput
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={(event) => {
                setPassword(event.currentTarget.value);
              }}
            />
            <ShowPasswordButton
              onClick={() => {
                setShowpassword((prevState) => !prevState);
              }}
            >
              Show/hide password
            </ShowPasswordButton>
            <Row
              style={{
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "64px",
              }}
            >
              {signIn ? (
                <span>
                  Not registered? <Link to="/signup">Sign up</Link>
                </span>
              ) : (
                <span>
                  Already registered? <Link to="/signin">Sign in</Link>
                </span>
              )}
              <ActionButton onClick={handleSubmitClick}>
                {signIn ? "SIGN IN" : "SIGN UP"}
              </ActionButton>
            </Row>
          </>
        )}
      </FormContainer>
    </Container>
  );
};

export default SigninSignupPage;
