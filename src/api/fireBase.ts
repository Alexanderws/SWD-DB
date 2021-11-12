import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  limit,
} from "firebase/firestore/lite";

import { Card, Format } from "../types/index";
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyChnksnT7HlAg3od9mDuqiQ8y5aNSi2A7s",
  authDomain: "swdestinydb-21d2e.firebaseapp.com",
  projectId: "swdestinydb-21d2e",
  storageBucket: "swdestinydb-21d2e.appspot.com",
  messagingSenderId: "800845416166",
  appId: "1:800845416166:web:f71f2c9f69a6e7456bdd27",
  measurementId: "G-HFYJBPHE0G",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get a list of cards from your database
export const fetchCards = async (): Promise<Card[]> => {
  const cardsRef = collection(db, "cards");
  const q = query(cardsRef, limit(100)); // TODO: Remove limit
  const cardsSnapshot = await getDocs(q);
  const cardsList = cardsSnapshot.docs.map((doc) => doc.data());
  return cardsList as Card[];
};

export const getCardsWithAffiliation = async (
  affiliations: string[]
): Promise<Card[]> => {
  const cardsRef = collection(db, "cards");
  const q = query(
    cardsRef,
    where("affiliation_code", "in", affiliations),
    limit(50) // TODO: Remove limit
  );
  const cardsSnapshot = await getDocs(q);
  const cardsList = cardsSnapshot.docs.map((doc) => doc.data());
  return cardsList as Card[];
};

export const getFormats = async (): Promise<Format[]> => {
  const formatRef = collection(db, "formats");
  const formatSnapshot = await getDocs(formatRef);
  const formatList = formatSnapshot.docs.map((doc) => doc.data());
  return formatList as Format[];
};
