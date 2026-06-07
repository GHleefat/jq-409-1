import { useRef } from "react";
import EditorPanel from "@/components/EditorPanel";
import PreviewCard from "@/components/PreviewCard";
import { BookOpen } from "lucide-react";

export default function Home() {
  const previewRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-rice-100">
      <header className="bg-white/70 backdrop-blur-sm border-b border-rice-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cinnabar-500 flex items-center justify-center text-white">
            <BookOpen size={22} />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-ink-900 tracking-wide">
              古籍竖排卡片生成器
            </h1>
            <p className="text-xs text-ink-700">
              为古籍数字化团队打造的社交媒体分享工具
            </p>
          </div>
        </div>
        <div className="h-0.5 bg-gradient-to-r from-transparent via-cinnabar-500 to-transparent" />
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-2/5 order-2 lg:order-1">
            <EditorPanel previewRef={previewRef} />
          </div>
          <div className="lg:w-3/5 order-1 lg:order-2 min-h-[600px]">
            <div className="flex flex-col gap-3 h-full">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-ink-900 flex items-center gap-2">
                  <span className="w-1 h-5 bg-cinnabar-500 rounded-sm inline-block" />
                  实时预览
                </h2>
                <span className="text-xs text-ink-700 bg-rice-200 px-2.5 py-1 rounded-full">
                  从上到下 · 从右到左
                </span>
              </div>
              <div className="flex-1 bg-white/50 rounded-2xl border border-rice-200 overflow-auto">
                <PreviewCard ref={previewRef} />
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-rice-200 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 text-center text-sm text-ink-700">
          古籍数字化 · 传统文化传承
        </div>
      </footer>
    </div>
  );
}
