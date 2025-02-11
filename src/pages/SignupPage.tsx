import { LockKeyhole, Mail, User } from "lucide-react";
import { Inputstyle } from "./InputsStyle";
import { BottomWarning } from "../Component/BottomWarning";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Loading } from "../Component/Loading";

export function SignupPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function Signupdata() {
    setLoading(true);
    await axios.post("http://localhost:3000/api/v1/user/signup", {
      email,
      username,
      password,
    });
    navigate("/login");
    setLoading(false);
  }

  return (
    <>
      <div className=" flex items-center justify-center fixed size-full bg-white">
        <div className=" flex flex-col scroll-hidden overflow-auto flex-shrinkrink items-center space-y-10 rounded-3xl bg-[#edf6f6] w-96 h-[450px] drop-shadow-[10px_8px_2px_rgba(0,0,0,20)]">
          <div className=" mt-10 text-3xl">
            <b>Signup Page</b>
          </div>
          <div className="space-y-5 text-xl">
            <Inputstyle
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              placeholder="Email"
              icon={<Mail />}
            />
            <Inputstyle
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              type="text"
              placeholder="Username"
              icon={<User />}
            />
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
              onClick={Signupdata}
              label={"Already have an account? "}
              buttonText={"Login"}
              to={"/login"}
            />
          )}
        </div>
      </div>
    </>
  );
}
