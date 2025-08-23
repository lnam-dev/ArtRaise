"use client";

import React, { FC } from "react";
import SliderFullscreen from "./slider-fullscreen";
import SliderClassic from "./slider-classic";
import { TSliderBaseProps } from "~/types/slider";
import { TArtPiece } from "~/types/art";

interface SliderWrapperProps extends TSliderBaseProps {
  variant?: "fullscreen" | "classic";
  orientation?: TArtPiece["orientation"];
}

const SliderWrapper: FC<SliderWrapperProps> = ({ 
  variant = "fullscreen", 
  orientation = "landscape",
  ...props 
}) => {
  switch (variant) {
    case "classic":
      return <SliderClassic {...props} orientation={orientation} />;
    case "fullscreen":
    default:
      return <SliderFullscreen {...props} />;
  }
};

export default SliderWrapper;
