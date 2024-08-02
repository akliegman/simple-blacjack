import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
  variant?: "blue" | "red" | "green" | "black";
  wrapper?: "default" | "none";
}

export const Button = (props: ButtonProps) => {
  const {
    children,
    className,
    variant = "blue",
    wrapper = "default",
    ...rest
  } = props;

  const variantClasses = {
    blue: clsx(
      "bg-blue-700",
      "hover:bg-blue-900",
      "focus:ring-blue-300",
      "text-white",
    ),
    red: clsx(
      "bg-red-700",
      "hover:bg-red-900",
      "focus:ring-red-300",
      "text-white",
    ),
    green: clsx(
      "bg-green-700",
      "hover:bg-green-900",
      "focus:ring-green-300",
      "text-white",
    ),
    black: clsx(
      "bg-transparent",
      "focus:ring-neutral-300",
      "text-neutral-950/75",
      "hover:text-black",
    ),
  };

  const wrapperClasses = {
    default: clsx("px-4", "py-2"),
    none: "",
  };

  return (
    <button
      className={clsx(
        "rounded-lg",
        "shadow-sm",
        "text-lg",
        "tracking-wide",
        "transition-all",
        wrapperClasses[wrapper],
        variantClasses[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
