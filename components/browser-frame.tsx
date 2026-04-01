import { cn } from "@/lib/cn";

interface BrowserFrameProps {
  url: string;
  children: React.ReactNode;
  className?: string;
}

export function BrowserFrame({ url, children, className }: BrowserFrameProps) {
  return (
    <div
      className={cn(
        "rounded-[6px] overflow-hidden border border-border-strong/50 shadow-[0_2px_8px_rgba(0,0,0,0.06)]",
        className
      )}
    >
      {/* Chrome bar — ultra thin */}
      <div className="flex items-center gap-[5px] bg-surface border-b border-border px-[8px] h-[16px]">
        {/* Traffic light dots */}
        <div className="flex gap-[3px]">
          <span className="size-[4px] rounded-full bg-[#ef4444]" />
          <span className="size-[4px] rounded-full bg-[#f59e0b]" />
          <span className="size-[4px] rounded-full bg-[#22c55e]" />
        </div>
        {/* URL */}
        <span className="text-[8px] text-text-tertiary truncate leading-none">
          {url}
        </span>
      </div>

      {/* Viewport */}
      <div>
        {children}
      </div>
    </div>
  );
}
