import { ReactNode } from "react";
import ReactDOM from "react-dom";

const modalsContainer = document.getElementById("modals");

type ModalsProps = {
  children?: ReactNode;
  isOpen?: boolean;
};

export function Modal(props: ModalsProps) {
  if (modalsContainer === null) {
    throw new Error(`Modals container is missing in the document.`);
  }

  return ReactDOM.createPortal(
    <div className="absolute w-full">{props.children}</div>,
    modalsContainer
  );
}
