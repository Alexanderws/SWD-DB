import { COLOR } from "./constants";

export const getFactionColor = (faction: string): string => {
  switch (faction) {
    case "blue":
      return COLOR.blueFactionDark;
    case "red":
      return COLOR.redFactionDark;
    case "yellow":
      return COLOR.yellowFactionDark;
    case "gray":
      return COLOR.grayFactionDark;
    default:
      return COLOR.grayFactionDark;
  }
};
