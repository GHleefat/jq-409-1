import { create } from "zustand";

export const FONT_OPTIONS = [
  { value: "'Noto Serif SC', 'SimSun', 'Songti SC', serif", label: "宋体 · Songti" },
  { value: "'ZCOOL XiaoWei', 'KaiTi', 'Kaiti SC', serif", label: "楷体 · Kaiti" },
  { value: "'FangSong', 'STFangsong', 'Noto Serif SC', serif", label: "仿宋 · Fangsong" },
];

interface CardState {
  text: string;
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
  showDots: boolean;
  showBorder: boolean;
  setText: (text: string) => void;
  setFontFamily: (font: string) => void;
  setFontSize: (size: number) => void;
  setLineHeight: (height: number) => void;
  setShowDots: (show: boolean) => void;
  setShowBorder: (show: boolean) => void;
}

export const useCardStore = create<CardState>((set) => ({
  text: "落霞與孤鶩齊飛\n秋水共長天一色",
  fontFamily: FONT_OPTIONS[1].value,
  fontSize: 28,
  lineHeight: 1.6,
  showDots: true,
  showBorder: true,
  setText: (text) => set({ text }),
  setFontFamily: (fontFamily) => set({ fontFamily }),
  setFontSize: (fontSize) => set({ fontSize }),
  setLineHeight: (lineHeight) => set({ lineHeight }),
  setShowDots: (showDots) => set({ showDots }),
  setShowBorder: (showBorder) => set({ showBorder }),
}));
