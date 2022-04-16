import { ReactNode } from "react";

type PageContainerProps = {
  children?: ReactNode;
};

export function PageContainer(props: PageContainerProps) {
  return <div className="w-[600px] h-screen m-auto">{props.children}</div>;
}
