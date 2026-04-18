// Figma-exported icons — imported as URL strings by Vite
import caretLeft from "./CaretLeft.svg";
import caretRight from "./CaretLeft-1.svg";
import chartLine from "./ChartLine.svg";
import compass from "./Compass.svg";
import bellLarge from "./Frame 2147236351.svg";
import bell from "./Frame 50.svg";
import graduationCap from "./GraduationCap.svg";
import house from "./House.svg";
import search from "./IconBase.svg";
import list from "./List.svg";
import users from "./Users.svg";
import closeX from "./fi_2732657.svg";
import clock from "./fi_3114812.svg";
import userAdd from "./user-add-01.svg";
import moreVertical from "./more-vertical.svg";
import bubbleChat from "./bubble-chat.svg";

export const icons = {
  caretLeft,
  caretRight,
  chartLine,
  compass,
  bell,
  bellLarge,
  graduationCap,
  house,
  search,
  list,
  users,
  closeX,
  clock,
  userAdd,
  moreVertical,
  bubbleChat,
} as const;

export type IconName = keyof typeof icons;
