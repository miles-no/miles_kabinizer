type TitleProps = {
  children?: React.ReactNode;
};

const Title = ({ children }: TitleProps) => {
  return (
    <p className={"font-poppins text-title text-[28px] font-bold"}>
      {children}
    </p>
  );
};

export default Title;
