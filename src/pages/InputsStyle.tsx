import { ReactElement, Ref } from "react";

type InputstyleProps = {
  placeholder: string;
  type?: string;
  icon?: ReactElement;
  reference?: Ref<HTMLInputElement> | string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function Inputstyle({
  placeholder,
  type,
  icon,
  reference,
  onChange,
}: InputstyleProps) {
  return (
    <span className=" flex items-center rounded-md w-[300px]">
      <div className="p-1 size-8 rounded-l-md border-r-2 border-stone-400 shadow-xl ">
        {icon}
      </div>
      <input
        className="rounded-t-md w-[250px] ml-2 border-b outline-none"
        type={type}
        placeholder={placeholder}
        ref={reference}
        onChange={onChange}
      />
    </span>
  );
}
