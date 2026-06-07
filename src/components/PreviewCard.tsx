import { forwardRef } from "react";
import { useCardStore } from "@/store/useCardStore";

const PreviewCard = forwardRef<HTMLDivElement>((_, ref) => {
  const { text, fontFamily, fontSize, lineHeight, showDots, showBorder } = useCardStore();

  const isPunctuation = (char: string) => /[，。！？；：、,.!?;:]/.test(char);

  const renderText = () => {
    if (!text.trim()) {
      return <span className="text-ink-700/40">請輸入文字...</span>;
    }

    const chars = Array.from(text);
    return chars.map((char, index) => {
      if (char === "\n") {
        return <br key={index} />;
      }
      const isPunc = isPunctuation(char);
      const shouldShowDot = showDots && isPunc;
      return (
        <span key={index} className="relative inline-block">
          <span
            style={{
              fontSize: isPunc && showDots ? `${fontSize * 0.7}px` : undefined,
              color: isPunc && showDots ? "#C23A2B" : "#1A1A1A",
            }}
          >
            {char}
          </span>
          {shouldShowDot && (
            <span
              style={{
                position: "absolute",
                right: `-${fontSize * 0.2}px`,
                top: "50%",
                transform: "translateY(-50%)",
                width: `${Math.max(6, fontSize * 0.2)}px`,
                height: `${Math.max(6, fontSize * 0.2)}px`,
                backgroundColor: "#C23A2B",
                borderRadius: "50%",
              }}
            />
          )}
        </span>
      );
    });
  };

  return (
    <div className="flex items-center justify-center w-full h-full p-4">
      <div
        ref={ref}
        className={`paper-texture relative ${
          showBorder ? "double-border-cinnabar corner-deco" : ""
        }`}
        style={{
          width: "560px",
          height: "720px",
          padding: showBorder ? "40px" : "28px",
        }}
      >
        <div
          style={{
            writingMode: "vertical-rl",
            WebkitWritingMode: "vertical-rl" as any,
            textOrientation: "upright",
            fontFamily,
            fontSize: `${fontSize}px`,
            lineHeight: lineHeight,
            color: "#1A1A1A",
            letterSpacing: "0.2em",
            width: "100%",
            height: "100%",
            overflow: "hidden",
          }}
        >
          {renderText()}
        </div>
      </div>
    </div>
  );
});

PreviewCard.displayName = "PreviewCard";

export default PreviewCard;
