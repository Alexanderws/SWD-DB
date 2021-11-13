import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import { QueryClient, QueryClientProvider } from "react-query";

import { SEMANTIC_COLOR } from "./assets/constants";

import EditDeckPage from "./pages/EditDeck/EditDeck.container";
// import { initializeApp } from "firebase/app";

// import { firebaseConfig } from "./config";

// initializeApp(firebaseConfig);

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
  padding: 40px;
  width: 100%;
  height: 100%;
  min-height: 100vh;
`;

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <QueryClientProvider client={queryClient}>
      <Container>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="deck" element={<EditDeckPage />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
