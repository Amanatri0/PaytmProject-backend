import { motion } from "motion/react";
import { Masqure } from "./Allicons";

export function SlideAnimation() {
  return (
    <>
      <motion.div className=" flex overflow-hidden justify-center items-center">
        <Masqure />
      </motion.div>
    </>
  );
}
