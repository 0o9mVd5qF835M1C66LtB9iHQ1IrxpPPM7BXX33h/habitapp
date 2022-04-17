type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export function Input(props: InputProps) {
  return (
    <>
      {props.label ? (
        <label
          className="text-sm text-gray-700 font-medium mb-1"
          htmlFor={`input-label-${props.label}`}
        >
          {props.label}
        </label>
      ) : null}
      <input
        {...props}
        id={props.label ? `input-label-${props.label}` : undefined}
        className={`${
          props.className || ""
        } p-2 border border-gray-300 placeholder:text-gray-500 placeholder:text-base rounded-md`}
      />
    </>
  );
}
