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
        "rounded-frame-browser overflow-hidden border border-border-strong/50 shadow-mockup",
        className
      )}
    >
      {/* Chrome bar — ultra thin */}
      <div className="flex items-center gap-1 bg-surface border-b border-border px-xs h-sm">
        {/* Traffic light dots */}
        <div className="flex gap-1">
          <span className="size-1 rounded-full bg-red-500" />
          <span className="size-1 rounded-full bg-amber-500" />
          <span className="size-1 rounded-full bg-green-500" />
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
