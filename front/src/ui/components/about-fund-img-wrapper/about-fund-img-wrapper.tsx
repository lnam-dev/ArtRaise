"use client";

import React, { FC } from "react";
import Image from "next/image";
import ButtonTransparent from "../button-transparent/button-transparent";
import styles from "./about-fund-img-wrapper.module.css";

interface AboutFundImgWrapperProps {
  src: string;
  alt: string;
  buttonText: string;
  onButtonClick: () => void;
  className?: string;
}

const AboutFundImgWrapper: FC<AboutFundImgWrapperProps> = ({
  src,
  alt,
  buttonText,
  onButtonClick,
  className = "",
}) => {
  return (
    <div className={`${styles.wrapper} ${className}`}>
      <div className={styles.imageContainer}>
        <Image
          src={src}
          alt={alt}
          fill
          className={styles.image}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 546px"
          priority
        />
      </div>

      {buttonText && (
        <div className={styles.buttonOverlay}>
          <ButtonTransparent onClick={onButtonClick}>
            {buttonText}
          </ButtonTransparent>
        </div>
      )}
    </div>
  );
};

export default AboutFundImgWrapper;
