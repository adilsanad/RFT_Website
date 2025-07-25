import React from "react";
import Marquee from "react-fast-marquee";

interface MarqueeData {
  src: string;
  alt: string;
}

interface MarqueeSectionProps {
  data: MarqueeData[];
  title: React.ReactNode;
  className?: string;
  gradientColor?: string;
  imageClass?: string;
}

export default function MarqueeSection({ data, title, className = "", gradientColor = "#FFFFFF", imageClass='h-12 px-12' }: MarqueeSectionProps) {
  return (
    <section className={`col-span-full w-full py-16 ${className}`}>
      <div className="flex flex-col">
        <div className="flex items-center justify-center text-center">
          {title}
        </div>
        <div className="flex w-full relative">
          <div className={`z-20 absolute top-0 bottom-0 w-full bg-[linear-gradient(90deg,_${gradientColor}_5.29%,_rgba(236,247,239,0.18)_17.31%,_rgba(236,247,239,0)_82.69%,_${gradientColor}_94.71%)]`}></div>
          <Marquee className="flex opacity-60 py-12 z-10" autoFill={true}>
            {data.map((image, index) => (
              <div key={index} className="flex items-center">
                <img
                  className={`${imageClass}`}
                  src={image.src}
                  alt={image.alt}
                />
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}