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
        "rounded-[var(--radius-frame-browser)] overflow-hidden border border-border-strong/50 shadow-[var(--shadow-mockup)]",
        className
      )}
    >
      {/* Chrome bar — ultra thin */}
      <div className="flex items-center gap-[5px] bg-surface border-b border-border px-[8px] h-[16px]">
        {/* Traffic light dots */}
        <div className="flex gap-[3px]">
          <span className="size-[4px] rounded-full bg-red-500" />
          <span className="size-[4px] rounded-full bg-amber-500" />
          <span className="size-[4px] rounded-full bg-green-500" />
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
