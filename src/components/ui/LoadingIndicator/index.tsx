"use client";

import clsx from "clsx";

export const LoadingIndicator = () => {
  return (
    <div
      className={clsx(
        "flex",
        "flex-col",
        "items-center",
        "justify-center",
        "text-blue-600",
        "gap-1",
        "aspect-square",
        "relative",
        "p-24",
        "before:content-['']",
        "before:absolute",
        "before:top-0",
        "before:left-0",
        "before:w-full",
        "before:h-full",
        "before:rounded-full",
        "before:aspect-square",
        "before:border-4",
        "before:border-x-blue-300",
        "before:border-solid",
        "before:border-y-transparent",
        "before:animate-[spin_3s_linear_infinite]",
        "before:duration-5000",
        "before:infinite",
        "before:z-0",
      )}
    >
      <span className={clsx("text-4xl")}>♣️</span>
      <span className={clsx("font-semibold")}>Shuffling...</span>
    </div>
  );
};
