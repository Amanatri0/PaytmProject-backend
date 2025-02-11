import { Link } from "react-router-dom";
import image from "/icon.png";

interface LinkProps {
  to: string;
}

export function Icon({ to }: LinkProps) {
  return (
    <div>
      <img className="size-12 rounded-full" src={image} alt="" />
      <Link to={to}></Link>
    </div>
  );
}
