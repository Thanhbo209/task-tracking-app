import clsx from "clsx";

const Input = ({
  label,
  type = "text",
  error,
  iconLeft,
  iconRight,
  className,
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="mb-2 ml-4 block text-sm font-medium text-white">
          {label}
        </label>
      )}

      <div className="relative">
        {/* Icon Left */}
        {iconLeft && (
          <span className="pointer-events-none absolute left-4.5 top-1/2 -translate-y-1/2 text-white">
            {iconLeft}
          </span>
        )}

        <input
          type={type}
          className={clsx(
            "w-full rounded-3xl border  bg-transparent py-3 text-sm text-white placeholder:text-white transition-all focus:outline-none",
            iconLeft ? "pl-12 " : "pl-6 ",
            iconRight ? "pr-10" : "pr-4",
            "border-(--border) focus:border-white focus:ring-2 focus:ring-white/90 transition duration-300",
            error &&
              "border-red-500 focus:border-red-500 focus:ring-red-500/30",
            className
          )}
          {...props}
        />

        {/* Icon Right */}
        {iconRight && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white">
            {iconRight}
          </span>
        )}
      </div>

      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
};

export default Input;
