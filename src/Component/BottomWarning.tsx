import { Link } from "react-router-dom";

interface BottomProps {
  label: string;
  buttonText: string;
  to: string;
  onClick: () => void;
}

export function BottomWarning({ label, buttonText, to, onClick }: BottomProps) {
  return (
    <div className="space-y-5 flex flex-col w-full justify-center items-center">
      <div>
        <button
          onClick={onClick}
          className=" bg-stone-700 text-white py-2 px-9 text-xl border-2 rounded-md cursor-pointer focus:ring-1 hover:shadow-xl hover:bg-[#edf6f6] hover:text-stone-700 "
        >
          Submit
        </button>
      </div>
      <span>
        {label}
        <Link to={to}>
          <u>{buttonText}</u>
        </Link>
      </span>
    </div>
  );
}
