import { cn } from "@/lib/cn";

export default function Inputs(props: {
  text: string;
  holder: string;
  name?: string;
  ref?: any;
  onChange?: any;
  value?: string;
  inputClassName?: string;
  spanClassName?: string;
  sectionClassName?: string;
  type?: string;
}) {
  const {
    text,
    holder,
    name,
    onChange,
    value,
    ref,
    inputClassName,
    spanClassName,
    sectionClassName,
  } = props;
  return (
    <div className={cn("flex flex-col gap-1 w-full", sectionClassName)}>
      <span className={cn("text-textInput text-sm", spanClassName)}>
        {text}
      </span>
      <input
        ref={ref}
        defaultValue={value}
        onChange={onChange}
        type={
          props.type
            ? props.type
            : text.includes("Password")
            ? "password"
            : "text"
        }
        name={name}
        placeholder={holder}
        className={cn(
          " border w-full border-input px-4 py-2 text-sm rounded-md placeholder:text-placeholder placeholder:text-sm outline-none",
          inputClassName
        )}
      />
    </div>
  );
}
