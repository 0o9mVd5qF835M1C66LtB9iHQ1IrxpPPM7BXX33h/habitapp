import { ReactNode } from "react";

type ButtonProps = {
  children?: ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
};

export function Button({ children, type, className, onClick }: ButtonProps) {
  return (
    <button
      className={`${className} p-3 rounded-md text-lg align-middle`}
      onClick={onClick}
      type={type || "button"}
    >
      {children}
    </button>
  );
}
