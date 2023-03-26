import * as React from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

export default function YoutubeFollowers() {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const [subscriber, setSubscriber] = React.useState(1000);

  React.useEffect(() => {
    if (subscriber === 0) {
      const animation = animate(count, subscriber, { duration: 0.1 });
      return animation.stop;
    }
    else{
      const animation = animate(count, subscriber, { duration: 8 });
      return animation.stop;
    }
  }, [subscriber]);

  React.useEffect(() => {
    const timer = setInterval(async () => {
      setSubscriber(0);
      const res = await fetch(`https://fastapi-google-trend.up.railway.app/api/channel/UCqcqc3TH6KTfGrLwGh__73g`);
      if (res.ok) {
        const json = await res.json();
        setSubscriber(json.subscriber_count);
      }
    }, 10000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
        <motion.h1 style={{ color: "white", marginRight: "1vw" }}>{rounded}</motion.h1>
        <h6 style={{ color: "#fff" }}>Subscribers</h6>
      </div>
    </div>
  );
}
