export default function DashboardCard({
  title,
  subtitle,
  children,
  className = "",
  rightSlot,
}) {
  return (
    <div className={`bg-(--background) rounded-xl p-5 shadow-sm ${className}`}>
      {/* Header */}
      {(title || rightSlot) && (
        <div className="flex justify-between items-center mb-4">
          <div>
            {title && (
              <h3 className="text-sm font-semibold text-(--text)">{title}</h3>
            )}
            {subtitle && <p className="text-xs text-(--des)">{subtitle}</p>}
          </div>

          {rightSlot && <div>{rightSlot}</div>}
        </div>
      )}

      {/* Content */}
      <div>{children}</div>
    </div>
  );
}
