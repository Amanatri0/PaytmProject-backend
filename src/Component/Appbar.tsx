import { useNavigate } from "react-router-dom";
import { Icon } from "./icon";

interface AppbarProps {
  username: string;
}

export const Appbar = ({ username }: AppbarProps) => {
  const navigate = useNavigate();

  return (
    <div className="h-20 shadow-md">
      <nav className=" md:mx-10 flex justify-between items-center p-5 text-lg">
        <div className="flex items-center ">
          <Icon to="/" />
        </div>
        <div className="flex items-center gap-3 ">
          Welcome
          <span className="text-blue-700 font-bold"> {username}</span>
          <button
            onClick={() => navigate("/setting")}
            className="rounded-full size-12 bg-slate-200 flex justify-center items-center cursor-pointer mr-5 "
          >
            <span className=" flex items-center text-xl">
              {username ? username[0] : ""}
            </span>
          </button>
        </div>
      </nav>
    </div>
  );
};
