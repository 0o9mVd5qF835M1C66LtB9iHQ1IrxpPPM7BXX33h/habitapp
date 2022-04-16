import { ReactNode } from "react";

type ButtonProps = {
  children?: ReactNode;
  className?: string;
  onClick?(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
};

export function Button({ children, className, onClick }: ButtonProps) {
  return (
    <button
      className={`${className} p-3 rounded-md text-lg align-middle`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
