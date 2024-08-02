import clsx from "clsx";

export const Header = () => {
  return (
    <header
      className={clsx(
        "flex",
        "items-center",
        "justify-center",
        "p-4",
        "bg-blue-400",
        "text-white",
        "text-xl",
        "z-[--z-header]",
        "fixed",
        "top-0",
        "w-full",
        "h-16",
      )}
    >
      <h1>♠️ Simple Blackjack</h1>
    </header>
  );
};
