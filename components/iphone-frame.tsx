import { cn } from "@/lib/cn";

interface IPhoneFrameProps {
  children: React.ReactNode;
  className?: string;
}

export function IPhoneFrame({
  children,
  className,
}: IPhoneFrameProps) {
  return (
    <div
      className={cn(
        "relative",
        className
      )}
    >
      {/* Device frame — inspired by devicescss.xyz iPhone 14 */}
      <div
        className="relative rounded-[15.9%] border border-zinc-800 bg-zinc-950 overflow-hidden"
        style={{
          padding: "4.4%",
          boxShadow:
            "inset 0 0 3px 1px rgba(180,188,196,0.15), inset 0 0 0 4px #272c31",
        }}
      >
        {/* Notch */}
        <div className="absolute top-[4.4%] left-1/2 -translate-x-1/2 w-[37%] h-[3.5%] bg-zinc-950 rounded-b-[10px] z-10" />

        {/* Screen */}
        <div className="relative rounded-[11.5%] overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
