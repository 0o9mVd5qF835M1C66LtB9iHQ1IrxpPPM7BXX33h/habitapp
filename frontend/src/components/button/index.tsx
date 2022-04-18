import { ReactNode } from "react";

type ButtonProps = {
  children?: ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
  outline?: boolean;
  type?: "button" | "submit" | "reset";
  icon?: ReactNode;
  onClick?(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
};

export function Button({
  children,
  type,
  className,
  icon,
  onClick,
}: ButtonProps) {
  return (
    <button
      className={`${className} flex items-center justify-center rounded-lg text-base transition-colors hover:bg-primary-500`}
      onClick={onClick}
      type={type || "button"}
    >
      {icon ? <span className="mr-2">{icon}</span> : null}
      {children}
    </button>
  );
}
