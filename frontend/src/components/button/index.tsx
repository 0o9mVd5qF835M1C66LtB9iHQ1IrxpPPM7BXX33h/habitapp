import { ReactNode } from "react";

type ButtonProps = {
  children?: ReactNode;
  className?: string;
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
      className={`${className} flex items-center p-3 rounded-md text-lg align-middle justify-center`}
      onClick={onClick}
      type={type || "button"}
    >
      {icon ? <span className="mr-2">{icon}</span> : null}
      {children}
    </button>
  );
}
