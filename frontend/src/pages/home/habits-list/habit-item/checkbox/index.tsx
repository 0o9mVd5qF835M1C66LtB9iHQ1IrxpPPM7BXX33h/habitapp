import { IoCheckmarkCircle, IoEllipseOutline } from "react-icons/io5";

type Props = {
  onComplete: () => void;
  onUncomplete: () => void;
  isCompleted: boolean;
};

export function Checkbox({ onComplete, onUncomplete, isCompleted }: Props) {
  function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.stopPropagation();
    isCompleted ? onUncomplete() : onComplete();
  }

  return (
    <div
      onClick={handleClick}
      className="flex items-center justify-center w-[40px]"
    >
      {isCompleted ? (
        <IoCheckmarkCircle className="text-3xl text-purple-1" />
      ) : (
        <>
          <IoEllipseOutline className="text-3xl text-purple-1" />
          <div className="rounded-full absolute bg-purple-1 w-[20px] h-[20px] opacity-0 hover:animate-ping hover:opacity-100"></div>
        </>
      )}
    </div>
  );
}
