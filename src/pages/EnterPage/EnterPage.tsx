import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import css from "./EnterPage.module.css";

import Image1 from "../../images/main-page/blue-pills.jpg";
import Image2 from "../../images/main-page/books.jpg";
import Image3 from "../../images/main-page/bottle.jpg";
import Image4 from "../../images/main-page/herbs-in-bottles.jpg";
import Image5 from "../../images/main-page/nurse.jpg";
import Image6 from "../../images/main-page/pill-and-water.jpg";

const EnterPage = () => {
  const variants = {
    initial: {
      x: 0,
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 1,
      },
    },
  };

  return (
    <section className={css.gallery}>
      <div className={css.h1Wrapper}>
        <NavLink to="/login">
          <motion.h1
            className={css.shopName}
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            MEDICINE SHOP
          </motion.h1>
        </NavLink>
      </div>

      <motion.div
        className={css.imgWrapper}
        variants={{
          animate: {
            transition: {
              staggerChildren: 0.5,
            },
          },
        }}
        initial="initial"
        animate="animate"
      >
        {[Image1, Image2, Image3, Image4, Image5, Image6].map(
          (image, index) => (
            <motion.img
              key={index}
              src={image}
              alt={`Image${index + 1}`}
              className={css.image}
              variants={variants}
            />
          )
        )}
      </motion.div>
    </section>
  );
};

export default EnterPage;
