import { forwardRef } from "react";
import { useCardStore } from "@/store/useCardStore";

const PreviewCard = forwardRef<HTMLDivElement>((_, ref) => {
  const { text, fontFamily, fontSize, lineHeight, showDots, showBorder } = useCardStore();

  const lines = text.split("\n").filter((line) => line.length > 0);

  const getCharDots = (char: string) => {
    const dotAfter = /[，。！？；：、,.!?;:]/;
    return dotAfter.test(char);
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
          padding: showBorder ? "36px" : "24px",
        }}
      >
        <div
          className="vertical-text relative w-full h-full flex justify-start items-start"
          style={{
            fontFamily,
            fontSize: `${fontSize}px`,
            lineHeight,
            color: "#1A1A1A",
            letterSpacing: "0.15em",
          }}
        >
          {lines.length === 0 ? (
            <span className="text-ink-700/40 vertical-text">請輸入文字...</span>
          ) : (
            lines.map((line, lineIndex) => (
              <div
                key={lineIndex}
                className="flex flex-col items-center relative"
                style={{
                  marginRight: lineIndex < lines.length - 1 ? `${fontSize * 0.8}px` : "0",
                }}
              >
                {Array.from(line).map((char, charIndex) => {
                  const shouldShowDot = showDots && getCharDots(char);
                  const isPunctuation = /[，。！？；：、,.!?;:]/.test(char);
                  return (
                    <span
                      key={charIndex}
                      className="relative inline-flex items-center justify-center"
                      style={{
                        height: `${fontSize * lineHeight}px`,
                        width: `${fontSize * 1.1}px`,
                      }}
                    >
                      <span
                        style={{
                          fontSize: isPunctuation ? `${fontSize * 0.6}px` : undefined,
                          color: isPunctuation && showDots ? "#C23A2B" : undefined,
                        }}
                      >
                        {char}
                      </span>
                      {shouldShowDot && (
                        <span
                          className="dot-marker"
                          style={{
                            right: `-${fontSize * 0.25}px`,
                            top: "50%",
                            width: `${Math.max(6, fontSize * 0.22)}px`,
                            height: `${Math.max(6, fontSize * 0.22)}px`,
                          }}
                        />
                      )}
                    </span>
                  );
                })}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
});

PreviewCard.displayName = "PreviewCard";

export default PreviewCard;
