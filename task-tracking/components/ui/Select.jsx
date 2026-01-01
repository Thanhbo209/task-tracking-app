export default function Select({
  value,
  onChange,
  options = [],
  className = "",
  ...props
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`border border-(--border) rounded-3xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
      {...props}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
