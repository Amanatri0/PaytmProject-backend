import { LockKeyhole, Mail } from "lucide-react";
import { Inputstyle } from "./InputsStyle";
import { BottomWarning } from "../Component/BottomWarning";
import { useState } from "react";
import axios from "axios";
import { Loading } from "../Component/Loading";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function Logindata() {
    setLoading(true);
    const response = await axios.post(
      "http://localhost:3000/api/v1/user/login",
      {
        email,
        password,
      }
    );

    localStorage.setItem("token", response.data.token);

    navigate("/dashboard");
    setLoading(false);
  }

  return (
    <>
      <div className=" flex items-center justify-center fixed size-full bg-white">
        <div className=" flex flex-col scroll-hidden overflow-auto flex-shrinkrink items-center space-y-10 rounded-3xl  bg-[#edf6f6] w-96 h-[400px] drop-shadow-[10px_8px_2px_rgba(0,0,0,20)]">
          <div className=" mt-10 text-3xl">
            <b>Login Page</b>
          </div>
          <div className="space-y-5 text-2xl">
            <Inputstyle
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="text"
              placeholder="Email"
              icon={<Mail />}
            />
            {/* <Inputstyle placeholder="Username" icon={<User />} /> */}
            <Inputstyle
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              placeholder="Password"
              icon={<LockKeyhole />}
            />
          </div>
          {loading ? (
            <Loading />
          ) : (
            <BottomWarning
              onClick={Logindata}
              label={"Don't have an account? "}
              buttonText={"Register"}
              to={"/signup"}
            />
          )}
        </div>
      </div>
    </>
  );
}
