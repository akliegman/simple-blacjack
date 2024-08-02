"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { Button } from "@/components";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export const Modal = (props: ModalProps) => {
  const {
    children,
    isOpen: providedIsOpen = false,
    onClose: providedOnClose,
  } = props;
  const [isOpen, setIsOpen] = useState(providedIsOpen);

  const onClose = () => {
    setIsOpen(false);
    providedOnClose();
  };

  useEffect(() => {
    setIsOpen(providedIsOpen);
  }, [providedIsOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={clsx(
            "fixed",
            "top-0",
            "left-0",
            "right-0",
            "bottom-0",
            "bg-black/50",
            "backdrop-blur-xs",
            "flex",
            "items-center",
            "justify-center",
            "z-[--z-overlay]",
          )}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className={clsx(
              "p-8",
              "rounded-xl",
              "z-[-z-modal]",
              "relative",
              "flex",
              "flex-col",
              "items-center",
              "justify-start",
              "w-fit",
              "max-w-[calc(100%-4rem)]",
              "shadow-2xl",
              "bg-white",
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-2 right-2">
              <Button onClick={onClose} variant="black" wrapper="none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </Button>
            </div>
            <div
              className={clsx(
                "py-2",
                "px-6",
                "flex",
                "flex-col",
                "items-center",
                "justify-center",
              )}
            >
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
