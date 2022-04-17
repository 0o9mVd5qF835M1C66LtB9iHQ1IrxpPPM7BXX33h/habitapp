import { ReactNode } from "react";

type FormProps = {
  className?: string;
  children?: ReactNode;
};

export function Form({ className, children }: FormProps) {
  return <form className={className}>{children}</form>;
}
