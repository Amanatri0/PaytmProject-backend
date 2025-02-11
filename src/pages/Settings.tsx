import { KeyRound, LockKeyholeOpen } from "lucide-react";
import { Inputstyle } from "./InputsStyle";
import { useState } from "react";
import axios from "axios";
import { Loading } from "../Component/Loading";
import { useNavigate } from "react-router-dom";
import { OtherButton } from "../Component/OtherButton";

export function Settings() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const navigate = useNavigate();

  async function ChangingPassword() {
    setLoader(true);
    try {
      await axios.put(
        "http://localhost:3000/api/v1/user/update",
        {
          oldPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      setLoader(false);
      alert(
        "Password has been successfully changed, please logout and re-login"
      );
      window.location.reload();
    } catch (error) {
      alert("Incorrect password, please retry");
      console.log((error as Error).message);
      window.location.reload();
    }
  }

  async function DeleteAccount() {
    setDeleteLoader(true);
    await axios.delete("http://localhost:3000/api/v1/user/delete", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    setDeleteLoader(false);
    navigate("/signup");
  }

  function RemoveToken() {
    localStorage.removeItem("token");
    navigate("/signup");
  }

  return (
    <div className="h-screen w-screen bg-white grid place-items-center">
      <div className="w-[90%]  md:w-[45%] rounded-xl shadow-[0px_2px_4px_rgba(0,0,0,2)]">
        <div className=" p-5 h-[60%] lg:h-[55%]">
          <div className=" space-y-5">
            <p className="text-xl lg:text-3xl">Change Password</p>
            <Inputstyle
              onChange={(e) => {
                setOldPassword(e.target.value);
              }}
              placeholder="Old Password"
              type="password"
              icon={<KeyRound />}
            />
            <Inputstyle
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
              placeholder="New Password"
              type="password"
              icon={<LockKeyholeOpen />}
            />
            {loader ? (
              <Loading />
            ) : (
              <OtherButton
                onClick={ChangingPassword}
                text="Submit"
                className="px-9"
              />
            )}
          </div>

          <div className=" h-full flex justify-between">
            <div className="flex flex-col w-full justify-center items-center ">
              <OtherButton
                className="px-[100px] lg:px-[150px] my-5"
                text="Logout"
                onClick={RemoveToken}
              />
              {deleteLoader ? (
                <Loading />
              ) : (
                <OtherButton
                  className="px-[100px] lg:px-[150px] hover:text-[#DD0004] hover:bg-gray-800 hover:border-[#DD0004] hover:border-[2px]"
                  text="Delete"
                  onClick={DeleteAccount}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
