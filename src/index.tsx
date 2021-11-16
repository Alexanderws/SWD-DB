import "./index.css";
import "./assets/fonts/icons.css";

import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import { QueryClient, QueryClientProvider } from "react-query";

import { SEMANTIC_COLOR } from "./assets/constants";

import { FormatContextProvider } from "./context/Format.context";
import { ModalContextProvider } from "./context/Modal.context";
import { AuthContextProvider } from "./context/Auth.context";
import Header from "./components/Header.component";
import Footer from "./components/Footer.component";
import DeckList from "./pages/DeckList/DeckList.container";
import EditDeckPage from "./pages/EditDeck/EditDeck.container";
import SigninSignupPage from "./pages/SigninSignup/SigninSignup.container";
import CardModal from "./components/CardModal.component";

const queryClient = new QueryClient();

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`;

const Container = styled.div`
  background-color: ${SEMANTIC_COLOR.background};
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;
const InnerContainer = styled.div`
  padding: 40px;
  flex-grow: 1;
  display: flex;
`;

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <AuthContextProvider>
      <ModalContextProvider>
        <FormatContextProvider>
          <QueryClientProvider client={queryClient}>
            <Container>
              <CardModal />
              <BrowserRouter>
                <Header />
                <InnerContainer>
                  <Routes>
                    <Route
                      path="/"
                      element={<SigninSignupPage signIn={false} />}
                    />
                    <Route path="deck" element={<EditDeckPage />} />
                    <Route
                      path="signin"
                      element={<SigninSignupPage signIn={true} />}
                    />
                    <Route
                      path="signup"
                      element={<SigninSignupPage signIn={false} />}
                    />
                    <Route path="decks" element={<DeckList />} />
                  </Routes>
                </InnerContainer>
                <Footer />
              </BrowserRouter>
            </Container>
          </QueryClientProvider>
        </FormatContextProvider>
      </ModalContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
