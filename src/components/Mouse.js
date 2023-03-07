import { motion } from "framer-motion";

export default function Mouse() {
  return (
    <div style={{ width: "3vw", height: "3vw", backgroundColor: "#fff" }}>
      <motion.div
        animate={{
          y: [0, 24, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "loop",
        }}
      />
    </div>
  );
}
