import { useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { Icon } from "./icon";

export function NavigationBar() {
  const navigate = useNavigate();
  return (
    <nav className="flex justify-between items-center px-4 pt-5 md:px-10 md:py-5">
      <div>
        <Icon to="/" />
      </div>
      <div className="space-x-4">
        <Button label="Signup" onClick={() => navigate("/signup")} />
        <Button label="Login" onClick={() => navigate("/login")} />
      </div>
    </nav>
  );
}
