import { motion } from "motion/react";
import PageLoader from "../Component/PageLoader";
import { Button } from "../Component/Button";
import { useNavigate } from "react-router-dom";
import { Cat, Dog, FanIcon, ScanFaceIcon } from "lucide-react";
import { NavigationBar } from "../Component/NavigationBar";
import { SlideAnimation } from "../Component/SlideAnimation";

const Sample = () => {
  alert("Sample footer, click doesn't work for now.");
};

export function LandingPage() {
  const navigate = useNavigate();
  return (
    <motion.div className="h-screen" id="main">
      <PageLoader />
      <section
        id="section1"
        className="min-h-[90vh] flex flex-col justify-between md:px-10 p-4"
      >
        <NavigationBar />
        <div className="relative bg-cover bg-[url(./money.jpg)] md:h-[700px] md:w-full h-[400px] mb-4 rounded-sm">
          <div className="flex justify-center items-center md:text-2xl md:mt-20 mt-8 font-mono">
            <Button label="Get started" onClick={() => navigate("/signup")} />
          </div>

          <div className="flex flex-col justify-end items-end md:mx-40 font-serif bg-clip-text bg-gradient-to-b from-blue-900 to-blue-300 text-transparent mr-4">
            <h1 className="text-2xl md:text-4xl text-end ">Better</h1>
            <h1 className="text-4xl md:text-6xl">Faster</h1>
            <h1 className="text-5xl md:text-8xl">Reliable</h1>
          </div>
        </div>
      </section>
      <section className="h-[20vh] mt-2 md:my-6">
        <div>
          <motion.div>
            <SlideAnimation />
          </motion.div>
        </div>
      </section>

      <section
        id="section2"
        className=" md:min-h-[70vh] min-h-[50vh]  rounded-sm "
      >
        <div className="flex items-center justify-between p-5 md:px-15">
          <div className="w-[50vw] ">
            <h1 className="text-2xl md:text-5xl text-[#e4841e] ">
              Pay anyone directly from your bank account.
            </h1>
            <br />
            <h3 className="text-sm md:text-xl text-[#13296C] md:w-[30vw] ">
              Pay anyone, everywhere. Make contactless & secure payments
              in-stores or online using Paytm UPI or Directly from your Bank
              Account. Plus, send & receive money from anyone.
            </h3>
          </div>
          <img
            className="size-[40vh] md:size-[70vh] rounded-full "
            src="https://i.pinimg.com/736x/95/a1/d0/95a1d0a1226d81bde38336c7eee5c5d4.jpg"
            alt=""
          />
        </div>
      </section>

      {/* Footer */}

      <footer className="h-[25vh] bg-blue-100 mt-10">
        <div className="flex justify-between md:mx-40 mx-20 py-4">
          <div className="">
            <h2 className="font-bold text-md md:text-2xl ">Legal</h2>
            <ul className="text-sm md:text-lg">
              <li>
                <a onClick={Sample}>Policy</a>
              </li>
              <li>
                <a onClick={Sample}> Return</a>
              </li>
              <li>
                <a onClick={Sample}> Blog</a>
              </li>
              <li>
                <a onClick={Sample}> Instanst</a>
              </li>
            </ul>
          </div>
          <div className="">
            <h2 className="font-bold text-md md:text-2xl">Investement</h2>
            <ul className="text-sm md:text-lg">
              <li>
                <a href="">Policy</a>
              </li>
              <li>
                <a href=""> Return</a>
              </li>
              <li>
                <a href=""> Blog</a>
              </li>
              <li>
                <a href=""> Instanst</a>
              </li>
            </ul>
          </div>
          <div className="">
            <h2 className="font-bold text-md md:text-2xl">Licence </h2>
            <ul className="text-sm md:text-lg">
              <li>
                <a href="">Policy</a>
              </li>
              <li>
                <a href=""> Return</a>
              </li>
              <li>
                <a href=""> Blog</a>
              </li>
              <li>
                <a href=""> Instanst</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-full  h-20 flex items-center justify-center">
          <div className="flex items-center gap-5 p-5">
            <h1 className="text-2xl">Follow </h1>
            <a>
              <Cat onClick={Sample} />
            </a>
            <a>
              <Dog onClick={Sample} />
            </a>
            <a>
              <FanIcon onClick={Sample} />
            </a>
            <a>
              <ScanFaceIcon onClick={Sample} />
            </a>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}
