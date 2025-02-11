import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "motion/react";

import { Button } from "./Button";

export const Users = () => {
  const [users, setUser] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/user/details", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setUser(response.data.userDetails);
      })
      .catch((e) => {
        alert((e as Error).message);
      });
  }, []);

  return (
    <>
      <div className="font-bold mt-6 text-lg">Users</div>
      <div className="my-2">
        <input
          // onChange={(e) => {
          //   setFilter(e.target.value);
          // }}
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-slate-200"
        ></input>
      </div>
      <div className="w-full flex justify-center">
        <div className="w-[100%] md:w-[75%]">
          {users.map((user) => (
            <motion.div
              variants={{
                hidden: { opacity: 0, y: -50 },
                visible: { opacity: 1, y: 0 },
              }}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5 }}
            >
              <User user={user} />
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

interface UserProps {
  user?: {
    username?: string;
    id?: number;
  };
}

function User({ user }: UserProps) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center my-3 rounded-2xl shadow-[1px_1px_2px_rgba(0,0,0,2)] ">
      <div className="flex items-center">
        <button className="cursor-pointer flex justify-center items-center rounded-full size-12 bg-slate-200 mx-3 my-1">
          <span className=" text-xl">
            {user?.username ? user.username[0] : ""}
          </span>
        </button>
        <span>
          <p>{user ? user.username : " "}</p>
        </span>
      </div>
      <Button
        className="cursor-pointer "
        onClick={() => {
          navigate(
            `/sendmoney?id=${user ? user.id : " "}&name=${
              user ? user.username : " "
            }`
          );
        }}
        label={"Send Money"}
      />
    </div>
  );
}
