import React, { useState, createContext } from "react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";

import { firebaseAuth } from "../api/fireBase";

interface AuthContextInterface {
  activeUser: User | undefined;
  signInUser: (email: string, password: string) => void;
  signOutUser: () => void;
  registerUser: (email: string, password: string) => void;
}

export const AuthContext = createContext<AuthContextInterface>(
  {} as AuthContextInterface
);
AuthContext.displayName = "AuthContext";

export const AuthContextProvider: React.FC = (props) => {
  const [activeUser, setActiveUser] = useState<User | undefined>();

  onAuthStateChanged(firebaseAuth, (user) => {
    setActiveUser(user ?? undefined);
  });

  const signInUser = async (email: string, password: string) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      setActiveUser(userCredentials.user);
    } catch (error) {
      let errorMessage = "Unknown error";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.log("ERROR - signInUser: ", errorMessage);
    }
  };

  const signOutUser = () => {
    signOut(firebaseAuth);
    // .then( update something? )
  };

  const registerUser = async (email: string, password: string) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      setActiveUser(userCredentials.user);
    } catch (error) {
      let errorMessage = "Unknown error";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.log("ERROR - registerUser: ", errorMessage);
    }
  };

  const initialContext: AuthContextInterface = {
    activeUser: activeUser,
    signInUser: signInUser,
    signOutUser: signOutUser,
    registerUser: registerUser,
  };

  return (
    <AuthContext.Provider value={initialContext}>
      {props.children}
    </AuthContext.Provider>
  );
};
