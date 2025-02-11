import { motion } from "motion/react";

export const Masqure = () => {
  const icons = [
    "./adidas.svg",
    "./amazon.svg",
    "./myntra.png",
    "./nike.svg",
    "./spotify.svg",
    "./puma.svg",
    "./jio.svg",
    "./prime.svg",
    "./netflix.svg",
    "./googleplay.svg",
  ];

  return (
    <>
      <div>
        <div className="flex">
          <motion.div
            initial={{
              x: 0,
            }}
            animate={{
              x: "-100%",
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="flex flex-shrink-0"
          >
            {icons.map((image, index) => {
              return (
                <img
                  src={image}
                  key={index}
                  className=" h-20 w-30 md:h-30 md:w-40 md:mr-[80px] mr-[50px] "
                />
              );
            })}
          </motion.div>
          <motion.div
            initial={{
              x: 0,
            }}
            animate={{
              x: "-100%",
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="flex flex-shrink-0"
          >
            {icons.map((image, index) => {
              return (
                <img
                  src={image}
                  key={index}
                  className="h-20 w-30 md:h-30 md:w-40 md:mr-[80px] mr-[50px]"
                />
              );
            })}
          </motion.div>
          <motion.div
            initial={{
              x: 0,
            }}
            animate={{
              x: "-100%",
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="flex flex-shrink-0"
          >
            {icons.map((image, index) => {
              return (
                <img
                  src={image}
                  key={index}
                  className="h-20 w-30 md:h-30 md:w-40 md:mr-[80px] mr-[50px] "
                />
              );
            })}
          </motion.div>
        </div>
      </div>
    </>
  );
};
