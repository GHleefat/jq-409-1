import { useCardStore, FONT_OPTIONS } from "@/store/useCardStore";
import { Type, AlignVerticalSpaceAround, Minimize2, CircleDot, Square, Download } from "lucide-react";
import html2canvas from "html2canvas";
import { useRef, useState } from "react";

interface EditorPanelProps {
  previewRef: React.RefObject<HTMLDivElement | null>;
}

export default function EditorPanel({ previewRef }: EditorPanelProps) {
  const {
    text,
    fontFamily,
    fontSize,
    lineHeight,
    showDots,
    showBorder,
    setText,
    setFontFamily,
    setFontSize,
    setLineHeight,
    setShowDots,
    setShowBorder,
  } = useCardStore();

  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    if (!previewRef.current) return;
    setExporting(true);
    try {
      const canvas = await html2canvas(previewRef.current, {
        backgroundColor: "#F5F0E6",
        scale: 2,
        useCORS: true,
        logging: false,
      });
      const link = document.createElement("a");
      link.download = `古籍卡片_${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error("导出失败:", err);
    } finally {
      setExporting(false);
    }
  };

  const ToggleSwitch = ({
    checked,
    onChange,
    label,
    icon: Icon,
  }: {
    checked: boolean;
    onChange: (v: boolean) => void;
    label: string;
    icon: React.ElementType;
  }) => (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`flex items-center justify-between w-full px-4 py-3 rounded-lg border transition-all duration-200 ${
        checked
          ? "border-cinnabar-500 bg-rice-50"
          : "border-rice-300 bg-white hover:border-rice-300"
      }`}
    >
      <div className="flex items-center gap-2 text-ink-800">
        <Icon size={18} className={checked ? "text-cinnabar-500" : "text-ink-700"} />
        <span className="text-sm font-medium">{label}</span>
      </div>
      <div
        className={`w-11 h-6 rounded-full relative transition-colors duration-200 ${
          checked ? "bg-cinnabar-500" : "bg-rice-300"
        }`}
      >
        <div
          className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
            checked ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </div>
    </button>
  );

  return (
    <div className="flex flex-col gap-5 p-6 bg-white/80 backdrop-blur rounded-2xl border border-rice-300 shadow-sm h-full">
      <div className="flex items-center gap-2 pb-3 border-b border-rice-200">
        <Type className="text-cinnabar-500" size={20} />
        <h2 className="text-lg font-semibold text-ink-900">编辑设置</h2>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-ink-800">古籍文字</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="在此输入古籍摘句..."
          rows={6}
          className="w-full px-4 py-3 rounded-lg border border-rice-300 bg-rice-50 text-ink-900 placeholder-ink-700/50 resize-none text-base leading-relaxed"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-ink-800">字体</label>
        <select
          value={fontFamily}
          onChange={(e) => setFontFamily(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-rice-300 bg-rice-50 text-ink-900 text-base cursor-pointer"
        >
          {FONT_OPTIONS.map((font) => (
            <option key={font.value} value={font.value} style={{ fontFamily: font.value }}>
              {font.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-ink-800 flex items-center gap-1.5">
            <Minimize2 size={16} />
            字号
          </label>
          <span className="text-sm text-ink-700 tabular-nums">{fontSize}px</span>
        </div>
        <input
          type="range"
          min={16}
          max={48}
          step={1}
          value={fontSize}
          onChange={(e) => setFontSize(Number(e.target.value))}
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-ink-800 flex items-center gap-1.5">
            <AlignVerticalSpaceAround size={16} />
            行间距
          </label>
          <span className="text-sm text-ink-700 tabular-nums">{lineHeight.toFixed(1)}</span>
        </div>
        <input
          type="range"
          min={0.8}
          max={2.5}
          step={0.1}
          value={lineHeight}
          onChange={(e) => setLineHeight(Number(e.target.value))}
        />
      </div>

      <div className="flex flex-col gap-3">
        <label className="text-sm font-medium text-ink-800">装饰效果</label>
        <ToggleSwitch
          checked={showDots}
          onChange={setShowDots}
          label="红色句读圈点"
          icon={CircleDot}
        />
        <ToggleSwitch
          checked={showBorder}
          onChange={setShowBorder}
          label="版框双线边框"
          icon={Square}
        />
      </div>

      <div className="mt-auto pt-4">
        <button
          onClick={handleExport}
          disabled={exporting}
          className="btn-primary w-full flex items-center justify-center gap-2 text-base py-3"
        >
          <Download size={18} />
          {exporting ? "导出中..." : "导出为图片"}
        </button>
      </div>
    </div>
  );
}
