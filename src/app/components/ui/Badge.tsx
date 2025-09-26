import { cn } from "@/app/lib/utils"; // your utility function for conditional classnames

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
  variant?:
    | "default"
    | "outline"
    | "success"
    | "danger"
    | "jungle"
    | "warning"
    | "destructive";
};

export function Badge({
  children,
  className,
  variant = "default",
}: BadgeProps) {
  const baseClasses =
    "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors";

  const variants = {
    default: "bg-gray-100 text-gray-800",
    outline: "border border-gray-400 text-gray-700",
    success: "bg-green-500 text-white",
    warning: "bg-yellow-400 text-gray-900",
    destructive: "bg-red-600 text-white",
    danger: "bg-red-500 text-white", // same as destructive, use either
    jungle:
      "bg-gradient-to-r from-green-700 to-lime-500 text-white shadow-[0_0_6px_rgba(0,255,128,0.5)]",
  };

  return (
    <span className={cn(baseClasses, variants[variant], className)}>
      {children}
    </span>
  );
}
