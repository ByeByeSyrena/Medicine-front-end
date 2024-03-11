import React, { useState, useEffect } from "react";
import css from "./EnterPage.module.css";

import imageLinks from "../../data/imageLinks";

import { NavLink } from "react-router-dom";

import image1 from "../../images/main-page/blue-pills.jpg";
import image2 from "../../images/main-page/books.jpg";
import image3 from "../../images/main-page/bottle.jpg";
import image4 from "../../images/main-page/herbs-in-bottles.jpg";
import image5 from "../../images/main-page/nurse.jpg";
import image6 from "../../images/main-page/pill-and-water.jpg";
import image7 from "../../images/main-page/pipette.jpg";
import image8 from "../../images/main-page/staff.jpg";
import image9 from "../../images/main-page/suit.jpg";

const EnterPage: React.FC = () => {
  const [panX, setPanX] = useState<number>(0);
  const [panY, setPanY] = useState<number>(0);

  useEffect(() => {
    const gallery = document.getElementById("gallery") as HTMLElement;

    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const xDecimal = mouseX / window.innerWidth;
      const yDecimal = mouseY / window.innerHeight;
      const maxX = gallery.offsetWidth - window.innerWidth;
      const maxY = gallery.offsetHeight - window.innerHeight;
      const newPanX = maxX * xDecimal * -1;
      const newPanY = maxY * yDecimal * -1;
      setPanX(newPanX);
      setPanY(newPanY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [panX, panY]);

  return (
    <section
      id="gallery"
      className={css.gallery}
      style={{ transform: `translate(${panX}px, ${panY}px)` }}
    >
      <div className={css.tile}>
        <img src={image1} alt="image1" />
      </div>
      <div className={css.tile}>
        <img src={image2} alt="image2" />
      </div>
      <div className={css.tile}>
        <img src={image3} alt="image3" />
      </div>
      <div className={css.tile}>
        <img src={image4} alt="image4" />
      </div>
      <div className={css.tile}>
        <img src={image5} alt="image5" />
      </div>
      <div className={css.tile}>
        <img src={image6} alt="image6" />
      </div>
      <div className={css.tile}>
        <img src={image7} alt="image7" />
      </div>
      <div className={css.tile}>
        <img src={image8} alt="image8" />
      </div>
      <div className={css.tile}>
        <img src={image9} alt="image9" />
      </div>
      <NavLink to="/login" className={css.loginBtn}>
        LOG IN
      </NavLink>
      <NavLink to="/signup" className={css.signupBtn}>
        SIGN UP
      </NavLink>
      <h1 className={css.shopName}>MEDICINE SHOP</h1>
    </section>
  );
};

export default EnterPage;
