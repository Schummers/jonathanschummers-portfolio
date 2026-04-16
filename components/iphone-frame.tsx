import { cn } from "@/lib/cn";

interface IPhoneFrameProps {
  children: React.ReactNode;
  className?: string;
}

export function IPhoneFrame({ children, className }: IPhoneFrameProps) {
  return (
    <div
      className={cn(
        "rounded-[16px] border-2 border-zinc-900 dark:border-zinc-700 overflow-hidden",
        className
      )}
    >
      {children}
    </div>
  );
}
