import { motion, AnimatePresence } from "framer-motion";
import * as React from "react";
import Tilt from "react-parallax-tilt";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import book1 from "../assets/main/book-1.png";
import book2 from "../assets/main/book-2.png";
import Insta from "../assets/main/insta.png";
import NaverBlog from "../assets/main/naver-blog.png";

const data = [
  {
    title: "프론트엔드 로드맵",
    subtitle: "프론트엔드를 준비하는 이들을 위한 전자책",
    img: book2,
    link: "https://kmong.com/gig/438197?selfMarketingCode=RJHnsrI2ou",
  },
  {
    title: "백엔드 로드맵",
    subtitle: "백엔드를 준비하는 이들을 위한 전자책",
    img: book1,
    link: "https://kmong.com/gig/450274?selfMarketingCode=26AgKBpD47",
  },
  {
    title: "인스타그램",
    subtitle: "인스타그램으로 카드뉴스를 확인해보세요.",
    img: Insta,
    link: "https://www.instagram.com/dev_yangdongjun/",
  },
  {
    title: "네이버블로그",
    subtitle: "개발과 관련된 글들을 읽어보세요.",
    img: NaverBlog,
    link: "https://blog.naver.com/dev-noyes",
  },
];

export default function Career() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography textAlign={"center"} color="#fefefe" variant="h5" sx={{ mt: 10, mb:3 }}>
        Career & SNS
      </Typography>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {data.map((item, index) => {
          return (
            <Grid item xs={4} sm={4} md={3} key={index}>
              <Tilt>
                <AnimatePresence>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 1,
                      delay: 0.5 * (index + 1),
                      ease: "easeOut",
                    }}
                  >
                    <div
                      style={{
                        width: "15vw",
                        height: "15vw",
                        border: "5px solid transparent",
                        borderRadius: 10,
                        borderImageSlice: 1,
                        backgroundImage: "linear-gradient(#333, #333), linear-gradient(90.13deg, #00cea8 1.9%, #bf61ff 97.5%)",
                        backgroundOrigin: "border-box",
                        backgroundClip: "content-box, border-box",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#333333",
                      }}
                    >
                      <a href={item.link} target="_blank">
                        <img src={item.img} style={{ width: "12vw", height: "12vw", objectFit: "contain" }} />
                      </a>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </Tilt>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
