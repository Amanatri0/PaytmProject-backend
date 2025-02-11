import { motion } from "motion/react";

function PageLoader() {
  return (
    <>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: "-100%" },
          visible: { opacity: 1, y: 0 },
        }}
        initial="visible"
        animate="hidden"
        transition={{
          duration: 3,
          delay: 2,
        }}
        className="fixed inset-0 bg-blue-950 z-50 rounded-b-md"
      >
        <motion.h1
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          initial="visible"
          animate="hidden"
          transition={{
            duration: 1.5,
            delay: 1,
          }}
          className="ml-20 text-transparent bg-clip-text bg-gradient-to-r from-blue-50 to-blue-950 grid h-screen place-items-center text-3xl md:lg:text-7xl "
        >
          Experience New Things everyday
        </motion.h1>
      </motion.div>
    </>
  );
}

export default PageLoader;
