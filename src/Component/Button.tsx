import { twMerge } from "tailwind-merge";

interface ButtonProps {
  label: string;
  className?: string;
  onClick?: () => void;
}

export function Button({ label, onClick, className }: ButtonProps) {
  return (
    <>
      <button
        onClick={onClick}
        className="relative group overflow-hidden border border-blue-200 rounded-2xl cursor-pointer "
      >
        <p className="z-10 relative px-6 py-2 block hover:text-blue-950 ">
          {label}
        </p>
        <span
          className={twMerge(
            `absolute inset-0 bg-blue-300 transform translate-y-9 group-hover:translate-y-0 group-hover:rounded-xl transition-all duration-300 ease-in-out`,
            className
          )}
        ></span>
      </button>
    </>
  );
}
