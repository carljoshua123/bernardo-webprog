import { Link } from "react-router-dom";

const baseClassName =
  "inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-bold transition-all shadow-lg shadow-blue-900/20 active:scale-95";

const Button = ({ text, to, children, className = "", ...props }) => {
  const content = children ?? text;
  const classes = `${baseClassName} ${className}`.trim();

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {content}
    </button>
  );
};

export default Button;