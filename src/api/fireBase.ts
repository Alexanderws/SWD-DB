import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  limit,
  doc,
  setDoc,
} from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";
import { ref, getStorage, getDownloadURL } from "firebase/storage";

import { Card, Deck, Format } from "../types/index";
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

const firebaseConfig = {
  apiKey: "AIzaSyChnksnT7HlAg3od9mDuqiQ8y5aNSi2A7s",
  authDomain: "swdestinydb-21d2e.firebaseapp.com",
  projectId: "swdestinydb-21d2e",
  storageBucket: "swdestinydb-21d2e.appspot.com",
  messagingSenderId: "800845416166",
  appId: "1:800845416166:web:f71f2c9f69a6e7456bdd27",
  measurementId: "G-HFYJBPHE0G",
};

// MARK: - Firebase initials
const firebaseApp = initializeApp(firebaseConfig);
const firestoreDB = getFirestore(firebaseApp);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseStorage = getStorage(firebaseApp);

// Get a list of cards from your database
export const fetchCards = async (): Promise<Card[]> => {
  const cardsRef = collection(firestoreDB, "cards");
  const q = query(cardsRef, limit(100)); // TODO: Remove limit
  const cardsSnapshot = await getDocs(q);
  const cardsList = cardsSnapshot.docs.map((doc) => doc.data());
  return cardsList as Card[];
};

export const getCardsWithAffiliation = async (
  affiliations: string[]
): Promise<Card[]> => {
  const cardsRef = collection(firestoreDB, "cards");
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
  const formatRef = collection(firestoreDB, "formats");
  const formatSnapshot = await getDocs(formatRef);
  const formatList = formatSnapshot.docs.map((doc) => doc.data());
  return formatList as Format[];
};

export const getImageUrl = async (
  set: string,
  cardId: string
): Promise<string> => {
  let imageUrl = "";
  try {
    imageUrl = await getDownloadURL(
      ref(firebaseStorage, `images/${set}/${cardId}.jpg`)
    );
  } catch (error) {
    let errorMessage = "Unknown error";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.log("ERROR - getImageUrl: ", errorMessage);
  }
  return imageUrl;
};

export const saveDeck = async (deck: Deck) => {
  const userId = firebaseAuth.currentUser?.uid;
  if (userId) {
    try {
      await setDoc(doc(firestoreDB, `users/${userId}/decks`, deck.id), {
        deck: deck,
      });
    } catch (error) {
      let errorMessage = "Unknown error";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.log("ERROR - saveDeck: ", errorMessage);
    }
  }
};
