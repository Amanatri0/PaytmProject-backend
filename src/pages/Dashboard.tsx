import { useEffect, useState } from "react";
import { Appbar } from "../Component/Appbar";
import { Balance } from "../Component/Balance";
import { Users } from "../Component/Users";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const [user, setuser] = useState({
    // FIXME: check later if there is any error in this field
    id: "",
    username: "",
    email: "",
    account: {
      balance: "",
    },
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }

    axios
      .get("http://localhost:3000/api/v1/user/currect/user", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setuser(response.data.userDetails);
      });
  }, [navigate]);

  return (
    <div className="h-full w-full">
      <Appbar username={user?.username} />

      <div className="mx-10 md:mx-20 my-8">
        <Balance value={user?.account.balance} />
        <hr className="mt-6 text-slate-300 w-full" />
        <Users />
      </div>
    </div>
  );
};
