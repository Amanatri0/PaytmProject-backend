import { twMerge } from "tailwind-merge";

interface OtherButtonProps {
  className: string;
  onClick: () => void;
  text: string;
}
export function OtherButton({ onClick, text, className }: OtherButtonProps) {
  return (
    <div>
      <button
        onClick={onClick}
        className={twMerge(
          `bg-gray-700 text-white py-2 md:px-5 text-xl border-2 rounded-md cursor-pointer focus:ring-1 hover:shadow-xl hover:bg-[#edf6f6] hover:text-stone-700 transition-all duration-300 ease-in-out `,
          className
        )}
      >
        {text}
      </button>
    </div>
  );
}
