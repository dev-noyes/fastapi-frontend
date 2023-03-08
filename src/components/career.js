import { motion, AnimatePresence } from "framer-motion";
import * as React from "react";
import Tilt from "react-parallax-tilt";

import Book from "../assets/book.png";
import Insta from "../assets/insta.png";
import NaverBlog from "../assets/naver-blog.png";

const data = [
  { title: "프론트엔드 로드맵", subtitle: "프론트엔드를 준비하는 이들을 위한 전자책", img: Book },
  { title: "백엔드 로드맵", subtitle: "백엔드를 준비하는 이들을 위한 전자책", img: Book },
  //{ title: "인스타그램", subtitle: "인스타그램으로 카드뉴스를 확인해보세요.", img: Insta },
  //{ title: "네이버블로그", subtitle: "개발과 관련된 글들을 읽어보세요.", img: NaverBlog },
];

export default function Career() {
  return (
    <motion.div style={{ display: "flex", flexWrap: "wrap" }} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
      {data.map((item, index) => {
        return (
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
                    width: "15vw",
                    height: "15vw",
                    marginRight: "2vw",
                    marginTop: "2vh",
                    backgroundColor: "#333333",
                  }}
                >
                  <div
                    style={{
                      display:"flex",
                      flexDirection:"column",
                      justifyContent:"center",
                      alignItems: "center",
                      paddingLeft: "1vw",
                      paddingRight: "1vw",
                      paddingTop: "1vw",
                      paddingBottom: "1vw",
                    }}
                  >
                    <img src={item.img} style={{ width: "5vw", height: "5vw" }} />
                    <h3 style={{ color: "#fff" }}>{item.title}</h3>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </Tilt>
        );
      })}
    </motion.div>
  );
}
