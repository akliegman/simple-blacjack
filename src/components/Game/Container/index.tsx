"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { LoadingIndicator } from "@/components";

interface GameWrapperProps {
  children: React.ReactNode;
  loading?: boolean;
}

export const Container = (props: GameWrapperProps) => {
  const { children, loading } = props;
  const [showContent, setShowContent] = useState(false);
  const delay = 500;

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined;

    if (!loading) {
      timeout = setTimeout(() => {
        setShowContent(true);
      }, delay);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [loading]);

  return (
    <div
      className={clsx(
        "flex",
        "flex-col",
        "items-center",
        "justify-center",
        "pt-16",
        "bg-blue-100",
        "h-screen",
        "z-[--z-game]",
      )}
    >
      <AnimatePresence>
        {loading ? (
          <motion.div
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LoadingIndicator />
          </motion.div>
        ) : showContent ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className={clsx(
              "grow",
              "relative",
              "overflow-hidden",
              "h-100",
              "w-full",
              "flex",
              "flex-col",
            )}
          >
            {children}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};
