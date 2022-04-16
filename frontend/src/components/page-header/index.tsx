import { ReactNode } from "react";

type PageHeaderProps = {
  className?: string;
  children?: ReactNode;
};

export function PageHeader(props: PageHeaderProps) {
  return (
    <div className={`w-full h-[72px] ${props.className}`}>{props.children}</div>
  );
}
