export function ToolIcon({
  icon,
  size = 20,
  className = "",
}: {
  icon: string
  size?: number
  className?: string
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://skills.syvixor.com/api/icons?i=${icon}`}
      alt=""
      aria-hidden
      width={size}
      height={size}
      style={{ width: size, height: size }}
      className={className}
    />
  )
}
