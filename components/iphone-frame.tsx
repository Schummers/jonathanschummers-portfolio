import { cn } from "@/lib/cn";

interface IPhoneFrameProps {
  children: React.ReactNode;
  className?: string;
}

export function IPhoneFrame({ children, className }: IPhoneFrameProps) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-frame-iphone)] border-2 border-text-primary overflow-hidden",
        className
      )}
    >
      {children}
    </div>
  );
}
