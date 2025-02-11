import axios from "axios";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "motion/react";
import { Loading } from "../Component/Loading";
import { Inputstyle } from "./InputsStyle";
import { IndianRupee } from "lucide-react";

export const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const username = searchParams.get("name");
  const [amount, setAmount] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // few check to check if the user have send proper money to proper username
  if (amount <= 0) {
    alert("Amount cannot be less that 0");
    navigate("/dashboard");
  }

  if (username === null) {
    navigate("/dashboard");
  }

  // Onclick transfer logic
  async function SendingMoney() {
    setLoading(true);

    const response = await axios.post(
      "http://localhost:3000/api/v1/account/transfer",
      {
        to: id,
        amount,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    setLoading(false);
    alert(
      `Transfer of amount ₹${amount} is successfull. Current balance is ₹${response.data.balance}`
    );
    navigate("/dashboard");
  }

  return (
    <div className="flex justify-center h-screen bg-gray-200">
      <div className="h-full flex flex-col justify-center">
        <motion.div className="border h-[50%] text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-3xl">
          <div className="flex flex-col space-y-1.5 pt-6">
            <h2 className="text-3xl font-bold text-center">Send Money</h2>
          </div>
          <div className="px-6 space-y-6">
            <div className="flex items-center space-x-6">
              <div className="w-12 h-12 rounded-full bg-blue-800 flex items-center justify-center">
                <span className="text-2xl text-white">
                  {username ? username[0].toUpperCase() : ""}
                </span>
              </div>
              <h3 className="text-2xl font-semibold">{username}</h3>
            </div>
            <div className="space-y-6">
              <div className="">
                <Inputstyle
                  type="number"
                  icon={<IndianRupee />}
                  // className="flex h-10 w-full rounded-md border bg-background px-3 py-5 mt-2 text-sm"
                  placeholder="Enter amount"
                  onChange={(e) => {
                    setAmount(Number(e.target.value));
                  }}
                />
              </div>
              <div className="flex items-center justify-center">
                {loading ? (
                  <Loading />
                ) : (
                  <button
                    onClick={SendingMoney}
                    className="justify-center rounded-md text-xl font-medium cursor-pointer px-4 py-2 w-full bg-blue-400 text-white hover:bg-blue-950 transition-all duration-400 ease-in-out hover:shadow-2xl"
                  >
                    Initiate Transfer
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
