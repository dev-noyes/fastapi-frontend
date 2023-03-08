import * as React from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

export default function YoutubeFollowers() {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  React.useEffect(() => {
    const animation = animate(count, 1000, { duration: 2 });
    return animation.stop;
  }, []);

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
        <motion.h1 style={{ color: "white", marginRight: "1vw" }}>{rounded}</motion.h1>
        <h6 style={{ color: "#fff" }}>구독자</h6>
      </div>
    </div>
  );
}
