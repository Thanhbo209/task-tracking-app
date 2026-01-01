import Link from "next/link";
import clsx from "clsx";

const Button = ({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  disabled = false,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-150 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-sky-500 text-white  focus:ring-sky-400",
    secondary:
      "inline-flex items-center gap-3 px-5 py-3 rounded-lg font-semibold text-slate-900 bg-linear-to-r from-purple-500 to-sky-400 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition",
    third: "bg-white text-black hover:bg-gray-300 transition duration-300",
    outline:
      "inline-flex items-center justify-center px-5 py-3 rounded-lg border border-white/10 bg-white/3 text-sky-100 hover:bg-white/5 transition",
    ghost: "text-sky-300 hover:bg-sky-300/10 focus:ring-sky-300",
    danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-400",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2 text-sm md:text-base",
    lg: "px-7 py-3 text-base",
  };

  const classes = clsx(baseStyles, variants[variant], sizes[size], className);

  //  Nếu có href → dùng Link (chuyển trang)
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  //  Nếu không → button thường (onclick)
  return (
    <button className={classes} disabled={disabled} {...props}>
      {children}
    </button>
  );
};

export default Button;
