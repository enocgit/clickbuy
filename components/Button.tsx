type Props = {
  text: string;
  className: string;
};

const Button = ({ text, className }: Props) => {
  return (
    <button
      className={`btn rounded-none border-none px-6 bg-brand-accent text-white ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
