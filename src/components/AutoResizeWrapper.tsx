import { useEffect, useRef } from "react";
import { getCurrentWebviewWindow } from "@tauri-apps/api/webviewWindow";
import { LogicalSize } from "@tauri-apps/api/window";

interface AutoResizeWrapperProps {
  children: React.ReactNode;
  forceSize?: { width: number; height: number };
  deps?: any[];
}

export default function AutoResizeWrapper({ children, forceSize, deps = [] }: AutoResizeWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const win = getCurrentWebviewWindow();

    const resizeToFit = async () => {
      if (forceSize) {
        await win.setSize(new LogicalSize(forceSize.width, forceSize.height));
      } else if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        await win.setSize(new LogicalSize(Math.ceil(rect.width), Math.ceil(rect.height)));
      }
    };

    // 🚀 Always resize once right away
    resizeToFit();

    // If not forcing a fixed size, also watch for changes
    if (!forceSize && containerRef.current) {
      const observer = new ResizeObserver(async (entries) => {
        for (const entry of entries) {
          const { width, height } = entry.contentRect;
          await win.setSize(new LogicalSize(Math.ceil(width), Math.ceil(height)));
        }
      });

      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, [forceSize, ...deps]);

  return (
    <div ref={containerRef} style={{ display: "inline-block" }}>
      {children}
    </div>
  );
}
