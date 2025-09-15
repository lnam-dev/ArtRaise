"use client";
import { useState, useEffect, useRef, useCallback } from "react";

type SlideTextDataType = {
  title: string;
  subtitle: string;
};

interface TurnaboutProps
  extends React.ComponentPropsWithoutRef<React.ElementType> {
  slideTextData: SlideTextDataType[];
  tag: React.ElementType;
  type?: "vertical";
  currentIndex: number;
  duration?: number;
  animation?: string;
  wrapperClass?: string;
  textClass?: string;
}

const Turnabout: React.FC<TurnaboutProps> = ({
  slideTextData,
  tag: Tag,
  type = "vertical",
  currentIndex,
  duration = 500,
  animation = "ease-in-out",
  wrapperClass,
  textClass,
}) => {
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [heights, setHeights] = useState<number[]>([]);
  const [currentHeight, setCurrentHeight] = useState<number>(0);

  const validatedIndex =
    currentIndex >= slideTextData.length ? 0 : currentIndex;

  const setRef = useCallback((el: HTMLDivElement | null, index: number) => {
    if (el) refs.current[index] = el;
  }, []);

  useEffect(() => {
    const newHeights = refs.current.map((el) => el?.offsetHeight || 0);
    setHeights(newHeights);

    setTimeout(() => {
      if (newHeights[validatedIndex] !== undefined) {
        setCurrentHeight(newHeights[validatedIndex]);
      }
    }, 10);
  }, [slideTextData, validatedIndex]);

  const translateY = heights
    .slice(0, validatedIndex)
    .reduce((acc, h) => acc + h, 0);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden transition-[height] duration-300 ease-in-out lg:w-[calc(100vw-618px)] ${wrapperClass}`}
      style={{ height: `108px`, minHeight: "1em" }}>
      <div
        className={`flex flex-col transition-transform h-[108px] duration-[${duration}ms] ${animation}`}
        style={{ transform: `translateY(-${translateY}px)`, height: "108px" }}>
        {slideTextData &&
          slideTextData.map(({ title, subtitle }, index) => (
            <Tag
              key={index}
              ref={(el: any) => setRef(el, index)}
              className="lg:pl-[26px] lg:pt-[6px] lg:pb-[10px] inline-block pl-[36px] lg:h-[108px] h-[100px] w-[214px] lg:w-full">
              <div className="font-namu lg:text-[48px] font-normal text-[32px]">
                {title}
              </div>
              {subtitle && (
                <div className="font-fixel lg:text-[24px] font-normal text-[15px] pt-[12px] lg:pt-0">
                  {subtitle}
                </div>
              )}
            </Tag>
          ))}
      </div>
    </div>
  );
};

export default Turnabout;
