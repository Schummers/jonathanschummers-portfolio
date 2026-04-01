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
        "bg-zinc-900 dark:bg-zinc-800 rounded-[28px] p-[8px] shadow-[0_8px_32px_rgba(0,0,0,0.12)]",
        className
      )}
    >
      {/* Dynamic Island */}
      <div className="relative z-10 mx-auto w-[72px] h-[20px] bg-black rounded-full" />

      {/* Viewport — negative top margin so content tucks under the island */}
      <div className="rounded-[20px] overflow-hidden -mt-[10px]">
        {children}
      </div>

      {/* Home indicator (optional) */}
      {showHomeIndicator && (
        <div className="mx-auto mt-[8px] mb-[4px] w-[80px] h-[4px] bg-white rounded-full" />
      )}
    </div>
  );
}
