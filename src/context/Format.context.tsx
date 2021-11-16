import React, { useState, createContext, useEffect } from "react";

import { Format, DestinySet } from "../types/index";

import { getFormats, getSets } from "../api/fireBase";

interface FormatContextInterface {
  allFormats: Format[];
  allSets: DestinySet[];
  getFormatName: (code: string) => string;
  getSetName: (code: string) => string;
}

export const FormatContext = createContext<FormatContextInterface>(
  {} as FormatContextInterface
);
FormatContext.displayName = "FormatContext";

export const FormatContextProvider: React.FC = (props) => {
  const [allFormats, setAllFormats] = useState<Format[]>([]);
  const [allSets, setAllSets] = useState<DestinySet[]>([]);

  useEffect(() => {
    console.log("FormatContext - useEffect");
    getFormats()
      .then((formats) => {
        console.log("FormatContext - getFormats:", formats);
        setAllFormats(formats);
      })
      .catch((error) => {
        console.log(error);
      });
    getSets()
      .then((sets) => {
        console.log("FormatContext - getSets:", sets);
        setAllSets(sets);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const getFormatName = (code: string) => {
    const format = allFormats.find((format) => format.code === code);
    return format?.name ?? "";
  };

  const getSetName = (code: string) => {
    const format = allSets.find((format) => format.code === code);
    return format?.name ?? "";
  };

  const initialContext: FormatContextInterface = {
    allFormats: allFormats,
    allSets: allSets,
    getFormatName: getFormatName,
    getSetName: getSetName,
  };

  return (
    <FormatContext.Provider value={initialContext}>
      {props.children}
    </FormatContext.Provider>
  );
};
