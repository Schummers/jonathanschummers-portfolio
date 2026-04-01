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
        "rounded-[8px] overflow-hidden border border-border",
        className
      )}
    >
      {/* Chrome bar — thin single line */}
      <div className="flex items-center gap-[6px] bg-surface border-b border-border px-[8px] py-[5px]">
        {/* Traffic light dots */}
        <div className="flex gap-[4px]">
          <span className="size-[6px] rounded-full bg-[#ef4444]" />
          <span className="size-[6px] rounded-full bg-[#f59e0b]" />
          <span className="size-[6px] rounded-full bg-[#22c55e]" />
        </div>
        {/* URL */}
        <span className="text-[10px] text-text-tertiary truncate">
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
