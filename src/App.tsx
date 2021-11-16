import React, { useState } from "react";
import logo from "./logo.svg";

import { firebaseStorage } from "./api/fireBase";

import { ref, getDownloadURL } from "firebase/storage";

const App = () => {
  const [imageUrl, setImageUrl] = useState("");

  getDownloadURL(ref(firebaseStorage, "images/01/01001.jpg"))
    .then((url) => {
      setImageUrl(url);
    })
    .catch((error) => {
      console.log("image error", error.message);
    });

  return (
    <div>
      <header>
        <img src={imageUrl} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
      </header>
    </div>
  );
};

export default App;
