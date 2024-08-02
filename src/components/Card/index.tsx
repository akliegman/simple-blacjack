"use client";

import clsx from "clsx";
import { ImgHTMLAttributes } from "react";

interface CardProps extends ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
}

export const Card = (props: CardProps) => {
  const { src, className, ...rest } = props;

  return (
    <img
      className={clsx(
        "flex-0",
        "min-w-24",
        "w-24",
        "aspect-[--card-aspect-ratio]",
        className,
      )}
      src={src}
      {...rest}
    />
  );
};
