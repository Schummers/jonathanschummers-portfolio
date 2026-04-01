import { cn } from "@/lib/cn";

interface IPhoneFrameProps {
  children: React.ReactNode;
  showHomeIndicator?: boolean;
  className?: string;
}

export function IPhoneFrame({
  children,
  showHomeIndicator = false,
  className,
}: IPhoneFrameProps) {
  return (
    <div
      className={cn(
        "relative rounded-[clamp(24px,8%,45px)] shadow-[0_0_2px_2px_rgba(255,255,255,0.1)] border-[clamp(4px,1.5%,8px)] border-zinc-900",
        className
      )}
    >
      {/* Dynamic Island */}
      <div className="absolute top-[4px] left-1/2 -translate-x-1/2 w-[25%] max-w-[90px] h-[clamp(10px,3.5%,22px)] bg-zinc-900 rounded-full z-20" />

      {/* Inner border glow */}
      <div className="absolute -inset-px border-[2px] border-zinc-700/40 rounded-[clamp(20px,7%,37px)] pointer-events-none" />

      {/* Screen viewport */}
      <div className="relative w-full h-full rounded-[clamp(18px,6.5%,37px)] overflow-hidden">
        {children}
      </div>

      {/* Home indicator (optional) */}
      {showHomeIndicator && (
        <div className="absolute bottom-[3px] left-1/2 -translate-x-1/2 w-[28%] max-w-[80px] h-[3px] bg-white/80 rounded-full z-20" />
      )}
    </div>
  );
}
