type InputProps = React.HTMLAttributes<HTMLInputElement> & {};

export function Input(props: InputProps) {
  return (
    <input
      {...props}
      className={`${
        props.className || ""
      } p-2 border border-gray-300 placeholder:text-gray-500 placeholder:text-base rounded-md`}
    />
  );
}
