import { ReactNode } from "react";

type PageContainerProps = {
  children?: ReactNode;
};

export function PageContainer(props: PageContainerProps) {
  return (
    <div className="flex flex-col w-[390px] h-screen m-auto px-6">
      {props.children}
    </div>
  );
}
