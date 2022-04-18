type Props = {
  title: string;
  isCompleted: boolean;
};

export function Title({ title, isCompleted }: Props) {
  return (
    <div
      className={`text-sm text-orange-1 font-medium ${
        isCompleted ? "line-through" : ""
      } pb-3`}
    >
      {title}
    </div>
  );
}
