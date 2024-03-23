import { ReactNode } from "react";

const Button = ({
  href,
  onClick,
  children,
  size,
  className,
  disabled,
}: {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  size: "small" | "medium" | "large";
  className?: string;
  disabled?: boolean;
}) => {
  const sizes = {
    small: "text-s h-6",
    medium: "text-m h-8",
    large: "text-lg h-10",
  };

  const classes = `${className} ${sizes[size]} flex w-full items-center justify-center rounded-full bg-[#354A71] px-4 font-poppins text-white hover:bg-blue-700`;

  if (href !== undefined) {
    return (
      <a className={classes} href={href}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
