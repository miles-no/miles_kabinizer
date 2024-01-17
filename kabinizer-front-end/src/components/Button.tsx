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
  const sizes = {
    small: "text-s h-6",
    medium: "text-m h-8",
    large: "text-lg h-10",
  };

  return (
    <button
      onClick={onClick}
      className={`${sizes[size]} flex w-full items-center justify-center rounded-full bg-[#354A71] px-4 font-poppins text-white hover:bg-blue-700`}
    >
      {children}
    </button>
  );
};

export default Button;
