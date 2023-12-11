import { ReactNode } from "react";

const Button = ({
  onClick,
  children,
  size,
}: {
  onClick?: () => void;
  children: ReactNode;
  size: "small" | "medium" | "large";
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center justify-center rounded-full bg-[#354A71] px-4 font-poppins text-white hover:bg-blue-700 ${
        size === "small" ? "text-s" : size === "medium" ? "text-m" : "text-lg"
      } ${size === "small" ? "h-6" : size === "medium" ? "h-8" : "h-10"}`}
    >
      {children}
    </button>
  );
};

export default Button;
